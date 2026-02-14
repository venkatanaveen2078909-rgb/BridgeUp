
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  Briefcase,
  Heart,
  Users,
  TrendingUp,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  BarChart3,
  MessageCircle,
  MapPin,
  Flame,
  Sparkles
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Logo } from '../components/ui/Logo';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user: authUser, isAuthenticated, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Redirect to landing if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (!authUser) {
    return null;
  }

  const handleLogout = () => {
    signOut();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const user = {
    name: authUser.name,
    initials: authUser.initials,
    misScore: authUser.misScore,
    level: authUser.level,
    streak: authUser.streak,
    notifications: 5
  };

  const modes = [
    {
      title: 'Professional Mode',
      icon: Briefcase,
      description: 'Swap skills, find mentors, grow your career',
      color: 'from-blue-500 to-cyan-500',
      path: '/professional',
      stats: { active: 'Getting started', pending: 'Ready to explore' }
    },
    {
      title: 'Personal Mode',
      icon: Heart,
      description: 'Check your mood, find support, have meaningful talks',
      color: 'from-pink-500 to-rose-500',
      path: '/personal',
      stats: { active: 'Ready for you', pending: 'Daily check-in available' }
    },
    {
      title: 'Community Mode',
      icon: Users,
      description: 'Connect locally, share favors, build neighborhood bonds',
      color: 'from-purple-500 to-indigo-500',
      path: '/community',
      stats: { active: 'Getting started', pending: 'Ready to connect' }
    }
  ];

  const quickActions = [
    { icon: MessageCircle, label: 'Start Conversation', path: '/personal' },
    { icon: TrendingUp, label: 'Skill Swap', path: '/skill-swap' },
    { icon: MapPin, label: 'Local Skills', path: '/local-skills' },
    { icon: BarChart3, label: 'View Analytics', path: '/analytics' }
  ];



  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                className="md:hidden text-slate-600"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
              <div className="flex items-center gap-2">
                <Logo className="w-10 h-10" />
                <span className="text-xl font-bold text-white">
                  Bridge Up
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                {user.notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {user.notifications}
                  </span>
                )}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}>
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-brand-navy text-white">
                    {user.initials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {
          mobileMenuOpen && (
            <motion.div
              className="md:hidden border-t border-slate-200 bg-white text-slate-900"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="px-4 py-4 space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => navigate('/settings')}
                >
                  <Settings className="w-4 h-4 mr-2" /> Settings
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => navigate('/analytics')}
                >
                  <BarChart3 className="w-4 h-4 mr-2" /> Analytics
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </Button>
              </div>
            </motion.div>
          )
        }
      </nav >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}! 👋</h1>
              <p className="text-slate-500">Let's make today meaningful</p>
            </div>

            <Card className="p-4 bg-white border border-slate-200 shadow-sm text-slate-900">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900">{user.misScore}</div>
                  <div className="text-sm text-slate-500">MIS Score</div>
                </div>
                <div className="h-12 w-px bg-slate-200" />
                <div className="text-center">
                  <div className="flex items-center gap-1 text-2xl font-bold text-slate-900">
                    <Flame className="w-6 h-6 text-slate-900" />
                    {user.streak}
                  </div>
                  <div className="text-sm text-slate-500">Day Streak</div>
                </div>
              </div>
              <Badge className="mt-3 bg-slate-100 text-slate-900 border-slate-200 hover:bg-slate-200">
                {user.level}
              </Badge>
            </Card>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card
                  className="p-4 cursor-pointer hover:shadow-lg transition-shadow text-center"
                  onClick={() => navigate(action.path)}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2 ${index % 2 === 0 ? 'bg-brand-teal/10' : 'bg-brand-blue/10'}`}>
                    <action.icon className={`w-6 h-6 ${index % 2 === 0 ? 'text-brand-teal' : 'text-brand-blue'}`} />
                  </div>
                  <div className="text-sm font-medium">{action.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mode Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-xl font-bold mb-4">Choose Your Mode</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {modes.map((mode, index) => (
              <motion.div
                key={mode.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className="p-6 cursor-pointer hover:shadow-xl transition-all border border-slate-200 hover:border-slate-300 h-full bg-white text-slate-900"
                  onClick={() => navigate(mode.path)}
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-slate-100`}>
                    <mode.icon className="w-8 h-8 text-slate-900" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-900">{mode.title}</h3>
                  <p className="text-slate-500 mb-4">{mode.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Active:</span>
                      <span className="font-medium text-slate-900">{mode.stats.active}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Pending:</span>
                      <span className="font-medium text-slate-900">{mode.stats.pending}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-slate-900 hover:bg-slate-800 text-white">
                    Enter Mode
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity & Progress */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6 bg-slate-50 border border-slate-200">
              <h3 className="text-lg font-bold mb-4 text-slate-900">Recent Activity</h3>
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-200">
                  <Sparkles className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-slate-700 mb-2 font-medium">Your journey starts here!</p>
                <p className="text-sm text-slate-500 mb-4">
                  Start connecting to see your activity
                </p>
                <Button onClick={() => navigate('/personal')} className="bg-slate-900 hover:bg-slate-800 text-white">
                  Start Now
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Progress */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-6 bg-slate-50 border border-slate-200">
              <h3 className="text-lg font-bold mb-4 text-slate-900">Your Progress</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">Next Level</span>
                    <span className="text-sm text-slate-500">0 / 500 MIS</span>
                  </div>
                  <Progress value={0} className="h-2 bg-slate-200" indicatorClassName="bg-blue-600" />
                  <p className="text-xs text-slate-500 mt-1">Start earning points to level up!</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">Weekly Goal</span>
                    <span className="text-sm text-slate-500">0 / 50 points</span>
                  </div>
                  <Progress value={0} className="h-2 bg-slate-200" indicatorClassName="bg-green-600" />
                  <p className="text-xs text-slate-500 mt-1">Complete activities to reach your weekly goal</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-200">
                  <div className="text-center p-3 bg-white rounded-lg border border-slate-200">
                    <div className="text-2xl font-bold text-blue-600">0</div>
                    <div className="text-xs text-slate-500">Skills Shared</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg border border-slate-200">
                    <div className="text-2xl font-bold text-green-600">0</div>
                    <div className="text-xs text-slate-500">People Helped</div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div >
  );
}