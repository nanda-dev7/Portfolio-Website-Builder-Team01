import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Layout, Zap, Palette, Globe, Search, Smartphone, Shield, BarChart3, Users, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function FeaturesPage() {
  const features = [
    { icon: Layout, title: "Drag & Drop Builder", desc: "Build your portfolio visually with our intuitive drag-and-drop interface. No coding required." },
    { icon: Zap, title: "AI-Powered Content", desc: "Let Gemini AI generate professional bios, project descriptions, and skill recommendations for you." },
    { icon: Palette, title: "Designer Templates", desc: "Choose from dozens of premium templates designed specifically for creative professionals." },
    { icon: Globe, title: "Custom Domains", desc: "Connect your own domain name with free SSL certificates provided for every site." },
    { icon: Smartphone, title: "Mobile Responsive", desc: "Your portfolio will look stunning on every device, from smartphones to large desktops." },
    { icon: Search, title: "SEO Optimized", desc: "Built-in tools to help you rank higher on Google and get discovered by recruiters." },
    { icon: Shield, title: "Secure Hosting", desc: "Enterprise-grade security and 99.9% uptime guarantee for your professional site." },
    { icon: BarChart3, title: "Visitor Analytics", desc: "Track your portfolio performance with detailed insights into visitors and engagement." },
    { icon: Users, title: "Social Integration", desc: "Seamlessly connect your social media profiles and professional networks." }
  ];

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
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            Powerful features for <br />
            <span className="text-indigo-600">modern professionals</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-16">
            Everything you need to build, manage, and grow your professional online presence in one place.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all text-left group"
              >
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <f.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
                <p className="text-slate-600 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-indigo-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Ready to build your dream portfolio?</h2>
          <Link to="/register">
            <Button size="lg" variant="secondary" className="px-10">
              Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
