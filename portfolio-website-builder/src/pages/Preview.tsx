import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ChevronLeft, Share2, Download, Globe } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Preview() {
  const { id } = useParams();
  const { activePortfolio, portfolios } = usePortfolio();

  const portfolio = activePortfolio || portfolios.find(p => p.id === id);

  if (!portfolio) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Portfolio not found</h2>
        <Link to="/dashboard">
          <Button>Back to Dashboard</Button>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Preview Toolbar */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-2xl p-2 flex items-center gap-2 shadow-2xl">
        <Link to={`/editor/${id}`}>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <ChevronLeft className="w-4 h-4 mr-2" /> Back to Editor
          </Button>
        </Link>
        <div className="w-px h-6 bg-white/10 mx-2"></div>
        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
          <Share2 className="w-4 h-4 mr-2" /> Share
        </Button>
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
          <Download className="w-4 h-4 mr-2" /> Export
        </Button>
      </div>

      {/* Portfolio Content */}
      <div className="max-w-5xl mx-auto px-6 py-24 space-y-32">
        {portfolio.sections.map((section) => (
          <section key={section.id} className="scroll-mt-24">
            {section.type === 'hero' && (
              <div className="text-center space-y-8">
                <div className="w-32 h-32 bg-indigo-100 rounded-full mx-auto flex items-center justify-center text-4xl shadow-inner">
                  👤
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tight leading-tight">
                  Creative <br />
                  <span className="text-indigo-600">Developer</span>
                </h1>
                <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                  Building digital products, brands, and experiences that push the boundaries of what's possible on the web.
                </p>
                <div className="flex justify-center gap-4 pt-4">
                  <Button size="lg" className="rounded-full px-10">View Work</Button>
                  <Button variant="secondary" size="lg" className="rounded-full px-10">Contact</Button>
                </div>
              </div>
            )}

            {section.type === 'about' && (
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold text-slate-900">About Me</h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    I am a passionate creator with a focus on clean design and robust engineering. With years of experience in the industry, I've helped startups and established companies bring their visions to life.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-2xl">
                      <p className="text-3xl font-bold text-indigo-600">5+</p>
                      <p className="text-sm text-slate-500">Years Experience</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl">
                      <p className="text-3xl font-bold text-indigo-600">50+</p>
                      <p className="text-sm text-slate-500">Projects Completed</p>
                    </div>
                  </div>
                </div>
                <div className="aspect-square bg-slate-100 rounded-[3rem] overflow-hidden">
                  <img 
                    src="https://picsum.photos/seed/about/600/600" 
                    alt="About" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            )}
            
            {/* Other sections would be rendered here */}
          </section>
        ))}
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Globe className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-slate-900">John Doe</span>
          </div>
          <p className="text-slate-500 mb-8">© 2026 John Doe. Built with NovaFolio.</p>
          <div className="flex justify-center gap-6">
            {['Twitter', 'GitHub', 'LinkedIn', 'Dribbble'].map(social => (
              <a key={social} href="#" className="text-sm font-medium text-slate-400 hover:text-indigo-600 transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
