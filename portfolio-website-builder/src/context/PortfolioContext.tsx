import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp,
  getDocFromServer
} from 'firebase/firestore';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { db, auth } from '../firebase';
import { Portfolio, PortfolioSection } from '../types';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: any;
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface PortfolioContextType {
  user: FirebaseUser | null;
  isAuthReady: boolean;
  portfolios: Portfolio[];
  activePortfolio: Portfolio | null;
  setActivePortfolio: (portfolio: Portfolio | null) => void;
  createPortfolio: (title: string) => Promise<void>;
  updatePortfolio: (id: string, updates: Partial<Portfolio>) => Promise<void>;
  deletePortfolio: (id: string) => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [activePortfolio, setActivePortfolio] = useState<Portfolio | null>(null);

  // Test connection to Firestore
  useEffect(() => {
    const testConnection = async () => {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration.");
        }
      }
    };
    testConnection();
  }, []);

  // Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  // Portfolios listener
  useEffect(() => {
    if (!isAuthReady || !user) {
      setPortfolios([]);
      return;
    }

    const path = 'portfolios';
    const q = query(collection(db, path), where('userId', '==', user.uid));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Portfolio[];
      setPortfolios(docs);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });

    return () => unsubscribe();
  }, [isAuthReady, user]);

  const createPortfolio = async (title: string) => {
    if (!user) return;
    const path = 'portfolios';
    try {
      await addDoc(collection(db, path), {
        userId: user.uid,
        title,
        slug: title.toLowerCase().replace(/\s+/g, '-'),
        theme: { primaryColor: '#4f46e5', fontFamily: 'Inter', mode: 'light' },
        sections: [
          { id: '1', type: 'hero', title: 'Hero Section', content: {}, isVisible: true, order: 0 },
        ],
        seo: { title: `${title} | Portfolio`, description: '', keywords: [] },
        status: 'draft',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  const updatePortfolio = async (id: string, updates: Partial<Portfolio>) => {
    const path = `portfolios/${id}`;
    try {
      await updateDoc(doc(db, 'portfolios', id), {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  const deletePortfolio = async (id: string) => {
    const path = `portfolios/${id}`;
    try {
      await deleteDoc(doc(db, 'portfolios', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  return (
    <PortfolioContext.Provider value={{ 
      user, 
      isAuthReady, 
      portfolios, 
      activePortfolio, 
      setActivePortfolio,
      createPortfolio,
      updatePortfolio,
      deletePortfolio
    }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
