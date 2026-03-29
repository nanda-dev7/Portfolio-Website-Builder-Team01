import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  Save, 
  Eye, 
  Rocket, 
  Monitor, 
  Tablet, 
  Smartphone,
  Plus,
  GripVertical,
  Settings,
  Palette,
  Layout as LayoutIcon,
  Type,
  Image as ImageIcon,
  Trash2,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { cn } from '../../utils/cn';
import { motion, Reorder } from 'motion/react';
import { geminiService } from '../../services/gemini';

export default function Editor() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'sections' | 'theme' | 'settings'>('sections');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [sections, setSections] = useState([
    { id: '1', type: 'hero', title: 'Hero Section', isVisible: true },
    { id: '2', type: 'about', title: 'About Me', isVisible: true },
    { id: '3', type: 'projects', title: 'Projects', isVisible: true },
    { id: '4', type: 'skills', title: 'Skills', isVisible: true },
    { id: '5', type: 'contact', title: 'Contact', isVisible: true },
  ]);

  return (
    <div className="h-screen flex flex-col bg-slate-100 overflow-hidden">
      {/* Editor Header */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="h-8 w-px bg-slate-200"></div>
          <div>
            <h1 className="text-sm font-bold text-slate-900">Personal Portfolio</h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Draft • Last saved 2m ago</p>
          </div>
        </div>

        {/* Device Toggles */}
        <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-xl">
          {[
            { mode: 'desktop', icon: Monitor },
            { mode: 'tablet', icon: Tablet },
            { mode: 'mobile', icon: Smartphone },
          ].map((item) => (
            <button
              key={item.mode}
              onClick={() => setPreviewMode(item.mode as any)}
              className={cn(
                "p-2 rounded-lg transition-all",
                previewMode === item.mode ? "bg-white shadow-sm text-indigo-600" : "text-slate-500 hover:text-slate-900"
              )}
            >
              <item.icon className="w-4 h-4" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm">
            <Save className="w-4 h-4 mr-2" /> Save
          </Button>
          <Link to={`/preview/${id}`}>
            <Button variant="secondary" size="sm">
              <Eye className="w-4 h-4 mr-2" /> Preview
            </Button>
          </Link>
          <Button size="sm">
            <Rocket className="w-4 h-4 mr-2" /> Publish
          </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Panel */}
        <aside className="w-80 bg-white border-r border-slate-200 flex flex-col shrink-0 z-10">
          {/* Tabs */}
          <div className="flex border-b border-slate-100">
            {[
              { id: 'sections', icon: LayoutIcon, label: 'Sections' },
              { id: 'theme', icon: Palette, label: 'Theme' },
              { id: 'settings', icon: Settings, label: 'Settings' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex-1 py-4 flex flex-col items-center gap-1 transition-colors relative",
                  activeTab === tab.id ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"
                )}
              >
                <tab.icon className="w-5 h-5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'sections' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Page Sections</h3>
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                <Reorder.Group axis="y" values={sections} onReorder={setSections} className="space-y-2">
                  {sections.map((section) => (
                    <Reorder.Item 
                      key={section.id} 
                      value={section}
                      className="group bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-3 cursor-grab active:cursor-grabbing hover:border-indigo-200 hover:bg-white transition-all"
                    >
                      <GripVertical className="w-4 h-4 text-slate-300 group-hover:text-slate-400" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-700 truncate">{section.title}</p>
                        <p className="text-[10px] text-slate-400 uppercase font-bold">{section.type}</p>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600">
                          <Settings className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-600">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>

                <Button variant="outline" className="w-full border-dashed border-2 py-6">
                  <Plus className="w-4 h-4 mr-2" /> Add New Section
                </Button>
              </div>
            )}

            {activeTab === 'theme' && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Primary Color</label>
                  <div className="grid grid-cols-5 gap-2">
                    {['#4f46e5', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444'].map((color) => (
                      <button
                        key={color}
                        className="w-full aspect-square rounded-lg border-2 border-white shadow-sm ring-1 ring-slate-200"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Typography</label>
                  <select className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                    <option>Inter (Sans-serif)</option>
                    <option>Playfair Display (Serif)</option>
                    <option>JetBrains Mono (Monospace)</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">AI Magic</label>
                  <Button variant="outline" className="w-full" onClick={async () => {
                    const bio = await geminiService.generateBio('Full Stack Developer', '5 years of experience in React and Node.js');
                    if (bio) alert('AI Generated Bio: ' + bio);
                  }}>
                    <Sparkles className="w-4 h-4 mr-2 text-indigo-600" /> Generate Bio
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Sparkles className="w-4 h-4 mr-2 text-indigo-600" /> Generate Theme
                  </Button>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Preview Area */}
        <main className="flex-1 bg-slate-100 p-8 overflow-y-auto">
          <div 
            className={cn(
              "mx-auto bg-white shadow-2xl transition-all duration-500 min-h-full rounded-t-xl overflow-hidden",
              previewMode === 'desktop' ? "w-full" : previewMode === 'tablet' ? "w-[768px]" : "w-[375px]"
            )}
          >
            {/* Mock Portfolio Content */}
            <div className="p-12 text-center space-y-20">
              <section className="space-y-6">
                <div className="w-24 h-24 bg-indigo-100 rounded-full mx-auto flex items-center justify-center text-3xl">👋</div>
                <h1 className="text-5xl font-black text-slate-900 tracking-tight">I'm John Doe</h1>
                <p className="text-xl text-slate-500 max-w-xl mx-auto leading-relaxed">
                  A passionate full-stack developer building digital experiences that matter.
                </p>
                <div className="flex justify-center gap-4">
                  <Button size="lg">View Projects</Button>
                  <Button variant="secondary" size="lg">Contact Me</Button>
                </div>
              </section>

              <section className="grid grid-cols-2 gap-8 text-left">
                <Card className="p-8 border-none bg-slate-50">
                  <h3 className="text-xl font-bold mb-4">About Me</h3>
                  <p className="text-slate-600 leading-relaxed">
                    With over 5 years of experience in web development, I specialize in creating high-performance applications using modern technologies.
                  </p>
                </Card>
                <Card className="p-8 border-none bg-slate-50">
                  <h3 className="text-xl font-bold mb-4">My Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Node.js', 'Tailwind', 'Firebase'].map(skill => (
                      <span key={skill} className="px-3 py-1 bg-white rounded-full text-sm font-medium shadow-sm border border-slate-100">
                        {skill}
                      </span>
                    ))}
                  </div>
                </Card>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
