import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Zap, Check, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "0",
      desc: "Perfect for students and beginners",
      features: ["1 Portfolio Site", "NovaFolio Subdomain", "Basic Templates", "Community Support", "SSL Security"],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Professional",
      price: "12",
      desc: "For freelancers and creators",
      features: ["Unlimited Portfolios", "Custom Domain Support", "Premium Templates", "AI Content Assistant", "Priority Support", "Advanced Analytics"],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Agency",
      price: "49",
      desc: "For teams and design studios",
      features: ["Everything in Pro", "Team Collaboration", "White-label Options", "API Access", "Dedicated Manager", "Custom Branding"],
      cta: "Contact Sales",
      popular: false
    }
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
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
              Simple, <span className="text-indigo-600">transparent pricing</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Choose the plan that's right for your career growth. No hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative p-8 rounded-[2.5rem] border ${
                  plan.popular ? 'border-indigo-600 bg-white shadow-2xl scale-105 z-10' : 'border-slate-200 bg-white/50'
                }`}
              >
                {plan.popular && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                )}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                  <p className="text-sm text-slate-500 mb-6">{plan.desc}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-slate-900">${plan.price}</span>
                    <span className="text-slate-500">/month</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div className={`p-1 rounded-full ${plan.popular ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}>
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-sm text-slate-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className="w-full py-6 rounded-2xl" 
                  variant={plan.popular ? 'primary' : 'secondary'}
                >
                  {plan.cta}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
