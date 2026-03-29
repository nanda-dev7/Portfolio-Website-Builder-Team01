import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Layout, Palette, Zap, Globe, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                <Zap className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">NovaFolio</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Features</a>
              <a href="#templates" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Templates</a>
              <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Pricing</a>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost">Log in</Button>
              </Link>
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-indigo-600 uppercase bg-indigo-50 rounded-full">
              The Future of Portfolios
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
              Build a Stunning Portfolio <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                Without Writing Code
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              NovaFolio empowers creators, developers, and designers to launch professional portfolio websites in minutes with AI-powered content and premium templates.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto px-8">
                  Start Building Free <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button variant="secondary" size="lg" className="w-full sm:w-auto px-8">
                View Templates
              </Button>
            </div>
          </motion.div>

          {/* Preview Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-20 relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-[2.5rem] blur-2xl opacity-20 animate-pulse"></div>
            <img
              src="https://picsum.photos/seed/dashboard/1200/800"
              alt="Dashboard Preview"
              className="relative rounded-[2rem] shadow-2xl border border-slate-200 w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything you need to stand out</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Powerful tools designed to help you build a professional online presence that gets results.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Layout, title: "Visual Editor", desc: "Intuitive drag-and-drop interface to build your site exactly how you want it." },
              { icon: Zap, title: "AI Content", desc: "Generate professional bios, project descriptions, and skill lists with Gemini AI." },
              { icon: Palette, title: "Premium Themes", desc: "Choose from a collection of designer-made templates tailored for your profession." },
              { icon: Globe, title: "Custom Domains", desc: "Connect your own domain or use our free subdomains with SSL included." },
              { icon: CheckCircle2, title: "SEO Optimized", desc: "Built-in SEO tools to ensure your portfolio ranks high on search engines." },
              { icon: Zap, title: "Fast Loading", desc: "Optimized for speed and performance, ensuring a smooth visitor experience." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-xl hover:border-indigo-100 transition-all"
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6 text-indigo-600">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto bg-indigo-600 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-50"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to launch your career?</h2>
            <p className="text-indigo-100 text-lg mb-10 max-w-xl mx-auto">Join thousands of professionals who have built their portfolios with NovaFolio.</p>
            <Link to="/register">
              <Button size="lg" variant="secondary" className="px-10">
                Get Started for Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Zap className="text-indigo-500 w-6 h-6" />
            <span className="text-xl font-bold text-white">NovaFolio</span>
          </div>
          <p className="mb-8">© 2026 NovaFolio Inc. All rights reserved.</p>
          <div className="flex justify-center gap-8 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
