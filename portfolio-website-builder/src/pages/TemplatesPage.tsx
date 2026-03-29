import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Zap, Search, Layout, Eye, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../utils/cn';

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Developer', 'Designer', 'Freelancer', 'Photographer', 'Agency', 'Student'];

  const templates = [
    { title: 'Modern Dev', category: 'Developer', image: 'https://picsum.photos/seed/dev/600/400' },
    { title: 'Creative Studio', category: 'Designer', image: 'https://picsum.photos/seed/design/600/400' },
    { title: 'Minimalist', category: 'Freelancer', image: 'https://picsum.photos/seed/minimal/600/400' },
    { title: 'Visual Story', category: 'Photographer', image: 'https://picsum.photos/seed/photo/600/400' },
    { title: 'Agency Pro', category: 'Agency', image: 'https://picsum.photos/seed/agency/600/400' },
    { title: 'Student Starter', category: 'Student', image: 'https://picsum.photos/seed/student/600/400' },
  ];

  const filteredTemplates = activeCategory === 'All' 
    ? templates 
    : templates.filter(t => t.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center gap-2">
              <Zap className="text-indigo-600 w-6 h-6" />
              <span className="text-xl font-bold text-slate-900">NovaFolio</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/login"><Button variant="ghost">Log in</Button></Link>
              <Link to="/register"><Button>Get Started</Button></Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
              Choose your <span className="text-indigo-600">perfect template</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Designer-crafted templates optimized for conversion and professional impact.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-bold transition-all",
                  activeCategory === cat 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" 
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template, i) => (
              <motion.div
                key={i}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl transition-all"
              >
                <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                  <img 
                    src={template.image} 
                    alt={template.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <Button size="sm" className="bg-white text-slate-900 hover:bg-slate-100 border-none">
                      <Eye className="w-4 h-4 mr-2" /> Preview
                    </Button>
                    <Link to="/register">
                      <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-md text-white border-white/30 hover:bg-white/30">
                        Use Template
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-slate-900">{template.title}</h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full">
                      {template.category}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">Fully customizable, responsive design.</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
