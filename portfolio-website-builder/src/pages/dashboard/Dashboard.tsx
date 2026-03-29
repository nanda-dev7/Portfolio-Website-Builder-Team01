import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  Plus, 
  Eye, 
  Edit3, 
  MoreVertical, 
  TrendingUp, 
  Users, 
  MousePointer2,
  ExternalLink,
  Trash2
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../utils/cn';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'Mon', visits: 400 },
  { name: 'Tue', visits: 300 },
  { name: 'Wed', visits: 600 },
  { name: 'Thu', visits: 800 },
  { name: 'Fri', visits: 500 },
  { name: 'Sat', visits: 900 },
  { name: 'Sun', visits: 1100 },
];

export default function Dashboard() {
  const { user, portfolios, createPortfolio, deletePortfolio } = usePortfolio();
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async () => {
    setIsCreating(true);
    try {
      await createPortfolio('My New Portfolio');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Welcome back, {user?.displayName || 'Creator'}! 👋</h1>
            <p className="text-slate-600">Here's what's happening with your portfolios.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary">
              <TrendingUp className="w-4 h-4 mr-2" /> View Analytics
            </Button>
            <Button onClick={handleCreate} isLoading={isCreating}>
              <Plus className="w-4 h-4 mr-2" /> Create Portfolio
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Total Visits', value: '2,450', change: '+12.5%', icon: Users, color: 'indigo' },
            { label: 'Avg. Session', value: '4m 32s', change: '+5.2%', icon: MousePointer2, color: 'emerald' },
            { label: 'Conversion', value: '18.2%', change: '+2.4%', icon: TrendingUp, color: 'violet' },
          ].map((stat, i) => (
            <Card key={i} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-${stat.color}-50 text-${stat.color}-600`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
            </Card>
          ))}
        </div>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-900">Portfolio Traffic</h3>
            <select className="text-sm border-slate-200 rounded-lg bg-slate-50 px-3 py-1.5 focus:ring-indigo-500">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="visits" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorVisits)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900 text-lg">Your Portfolios</h3>
            <Button variant="ghost" size="sm">View all</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((portfolio) => (
              <Card key={portfolio.id} className="group overflow-hidden">
                <div className="relative h-40 bg-slate-100 overflow-hidden">
                  <img 
                    src={`https://picsum.photos/seed/${portfolio.id}/400/300`} 
                    alt={portfolio.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <Button 
                      size="sm" 
                      className="bg-white text-slate-900 hover:bg-slate-100 border-none"
                      onClick={() => navigate(`/editor/${portfolio.id}`)}
                    >
                      <Edit3 className="w-4 h-4 mr-2" /> Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="bg-white/20 backdrop-blur-md text-white border-white/30 hover:bg-white/30"
                      onClick={() => navigate(`/preview/${portfolio.id}`)}
                    >
                      <Eye className="w-4 h-4 mr-2" /> Preview
                    </Button>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-slate-900 truncate">{portfolio.title}</h4>
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
                      portfolio.status === 'published' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                    )}>
                      {portfolio.status}
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-slate-500 mb-4">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    {portfolio.slug}.nova.folio
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-xs text-slate-400">Updated recently</span>
                    <button 
                      onClick={() => deletePortfolio(portfolio.id)}
                      className="p-1 hover:bg-red-50 rounded-lg transition-colors text-slate-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
            
            <button 
              onClick={handleCreate}
              disabled={isCreating}
              className="h-full min-h-[300px] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-8 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all group disabled:opacity-50"
            >
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                <Plus className="w-6 h-6 text-slate-400 group-hover:text-indigo-600" />
              </div>
              <p className="font-bold text-slate-600 group-hover:text-indigo-600">Create New Portfolio</p>
              <p className="text-xs text-slate-400 mt-1">Start from a template or blank</p>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
