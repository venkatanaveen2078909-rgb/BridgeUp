import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  Heart,
  Briefcase,
  Users,
  Brain,
  Star,
  Shield,
  Menu,
  X,
  Loader2,
  TrendingUp,
  Award,
  MessageCircle,
  MapPin,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Logo } from '../components/ui/Logo';
import { Card } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export default function LandingPage() {
  const navigate = useNavigate();
  const { signIn, signUp, isAuthenticated } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;

    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!isLogin && !name) {
      toast.error('Please enter your name');
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast.error(error.message);
        } else {
          toast.success('Welcome back!');
          setShowAuth(false);
        }
      } else {
        const { error } = await signUp(email, password, name);
        if (error) {
          toast.error(error.message);
        } else {
          toast.success('Account created! Please check your email for verification.');
          setShowAuth(false);
        }
      }
    } catch (error) {
      toast.error('An unexpected error occurred.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: Briefcase,
      title: 'Professional Mode',
      description: 'Skill swap, referrals, mentorship, and career growth',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Heart,
      title: 'Personal Mode',
      description: 'Mood check-ins, emotional support, and meaningful conversations',
      color: 'from-blue-400 to-cyan-400'
    },
    {
      icon: Users,
      title: 'Community Mode',
      description: 'Connect with neighbors, share skills, and build local bonds',
      color: 'from-blue-600 to-indigo-600'
    },
    {
      icon: Star,
      title: 'Meaningful Interaction Score',
      description: 'Earn points for empathy, teaching, and helping others',
      color: 'from-amber-500 to-orange-500'
    },
    {
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Smart conversation helpers and emotional well-being tools',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Shield,
      title: 'Safe & Supportive',
      description: 'Anonymous support rooms and toxic-free interactions',
      color: 'from-slate-500 to-slate-600'
    }
  ];



  return (
    <div className="min-h-screen bg-white text-slate-900">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <Logo className="w-10 h-10" />
              <span className="text-2xl font-bold text-white">
                Bridge Up
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sky-100 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-sky-100 hover:text-white transition-colors">How It Works</a>
              <a href="#impact" className="text-sky-100 hover:text-white transition-colors">Impact</a>
              <Button onClick={() => setShowAuth(true)} className="bg-brand-blue hover:bg-brand-blue/90 text-white">
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-sky-500 text-white border-sky-400 border-t border-border"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block text-slate-700 hover:text-blue-600 transition-colors">Features</a>
              <a href="#how-it-works" className="block text-slate-700 hover:text-blue-600 transition-colors">How It Works</a>
              <a href="#impact" className="block text-slate-700 hover:text-blue-600 transition-colors">Impact</a>
              <Button onClick={() => setShowAuth(true)} className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white">
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 bg-brand-blue/10 text-brand-blue rounded-full text-sm font-semibold">
                🌟 Turning Digital Engagement into Meaningful Human Connection
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
              Social Media That Actually Connects
            </h1>

            <p className="text-xl md:text-2xl text-sky-100 mb-8 leading-relaxed">
              We turn social media from attention-seeking into empathy-building.
              Build real friendships, share skills, and improve well-being.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => setShowAuth(true)}
                className="bg-brand-blue hover:bg-brand-blue/90 text-white text-lg px-8 py-6"
              >
                Start Connecting <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-lg px-8 py-6 border-2"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Three Modes, Infinite Connections
            </h2>
            <p className="text-xl text-sky-100">
              Everything you need to build meaningful relationships
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-xl transition-shadow cursor-pointer border border-slate-200 hover:border-slate-300 h-full bg-white text-slate-900">
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-sky-100">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Meaningful Interaction Score
            </h2>
            <p className="text-xl text-slate-600">
              Earn points for kindness, not likes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { action: 'Teaching someone', points: '+10', icon: TrendingUp, color: 'green' },
              { action: 'Helping neighbor', points: '+8', icon: MapPin, color: 'blue' },
              { action: 'Honest conversation', points: '+6', icon: MessageCircle, color: 'blue' },
              { action: 'Toxic message', points: '-5', icon: Shield, color: 'red' }
            ].map((item, index) => (
              <motion.div
                key={item.action}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-white text-slate-900 border border-slate-200 hover:border-slate-300">
                  <div className={`w-16 h-16 bg-${item.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <item.icon className={`w-8 h-8 text-${item.color}-600`} />
                  </div>
                  <div className={`text-3xl font-bold mb-2 text-${item.color}-600`}>
                    {item.points}
                  </div>
                  <div className="text-sky-100">{item.action}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Real Impact, Real Results
            </h2>
            <p className="text-xl text-sky-100">
              Bridge Up helps create a better digital world
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Reduce Social Media Addiction', icon: Brain },
              { title: 'Reduce Loneliness', icon: Heart },
              { title: 'Build Real Friendships', icon: Users },
              { title: 'Improve Emotional Well-Being', icon: Sparkles },
              { title: 'Increase Employability', icon: TrendingUp },
              { title: 'Bridge Up helps create a better digital world', icon: Award }
            ].map((impact, index) => (
              <motion.div
                key={impact.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${index % 2 === 0 ? 'bg-brand-teal/10' : 'bg-brand-blue/10'}`}>
                      <impact.icon className={`w-6 h-6 ${index % 2 === 0 ? 'text-brand-teal' : 'text-brand-blue'}`} />
                    </div>
                    <h3 className="font-bold text-lg">{impact.title}</h3>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <Card className="p-12 bg-slate-900 text-white border-0">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to Build Real Connections?
            </h2>
            <p className="text-xl mb-8 text-slate-300">
              Be among the first to experience a new kind of social media focused on meaningful human connection
            </p>
            <Button
              size="lg"
              onClick={() => setShowAuth(true)}
              className="bg-brand-blue text-white hover:bg-brand-blue/90 text-lg px-8 py-6"
            >
              Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Card>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-900/50 border-t border-slate-800 text-foreground">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Logo className="w-10 h-10" />
            <span className="text-2xl font-bold text-white">Bridge Up</span>
          </div>
          <p className="text-sky-100 mb-4">
            Turning digital engagement into meaningful human connection
          </p>
          <p className="text-sky-100 text-sm">
            © 2026 Bridge Up. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Auth Dialog */}
      <Dialog open={showAuth} onOpenChange={setShowAuth}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              {isLogin ? 'Welcome Back!' : 'Join Bridge Up'}
            </DialogTitle>
            <DialogDescription className="text-center">
              {isLogin ? 'Sign in to your account to continue' : 'Create your account to start building meaningful connections'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  required
                  disabled={isLoading}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isLogin ? 'Signing In...' : 'Creating Account...'}
                </>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </Button>
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="w-full text-center text-sm text-sky-100 hover:text-brand-orange transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}