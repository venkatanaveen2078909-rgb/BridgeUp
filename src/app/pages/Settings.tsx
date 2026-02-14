import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  HelpCircle,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export default function Settings() {
  const navigate = useNavigate();
  const { user, isAuthenticated, signOut } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    signOut();
    toast.success('Logged out successfully');
    navigate('/');
  };

  if (!user) {
    return null;
  }

  const settingsSections = [
    {
      title: 'Account',
      icon: User,
      items: [
        { label: 'Edit Profile', action: () => navigate('/profile') },
        { label: 'Change Password', action: () => toast.info('Feature coming soon') },
        { label: 'Privacy Settings', action: () => toast.info('Feature coming soon') }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { label: 'Push Notifications', toggle: true, enabled: true },
        { label: 'Email Notifications', toggle: true, enabled: true },
        { label: 'Mood Check Reminders', toggle: true, enabled: true }
      ]
    },
    {
      title: 'Preferences',
      icon: Palette,
      items: [
        { label: 'Theme', action: () => toast.info('Feature coming soon') },
        { label: 'Language', action: () => toast.info('Feature coming soon') },
        { label: 'Time Zone', action: () => toast.info('Feature coming soon') }
      ]
    },
    {
      title: 'Privacy & Security',
      icon: Shield,
      items: [
        { label: 'Anonymous Mode', toggle: true, enabled: false },
        { label: 'Location Sharing', toggle: true, enabled: true },
        { label: 'Anonymous Mode', description: 'Browse anonymously', type: 'toggle', value: false },
        { label: 'Location Sharing', description: 'Allow sharing your location', type: 'toggle', value: true },
        { label: 'Block List', description: 'Manage blocked users', type: 'button', action: () => toast.info('Feature coming soon') }
      ]
    },
    {
      title: 'Help & Support',
      description: 'Find answers and get assistance.',
      icon: HelpCircle,
      items: [
        { label: 'Help Center', description: 'Browse FAQs and guides', type: 'button', action: () => toast.info('Help Center coming soon') },
        { label: 'Contact Support', description: 'Get in touch with our team', type: 'button', action: () => toast.info('Contact Support coming soon') },
        { label: 'About Bondly', description: 'Learn more about the app', type: 'button', action: () => toast.info('About Bondly coming soon') }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
              <p className="text-sm text-slate-500">Manage your account and preferences</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-700 text-2xl font-bold">
                {user.initials}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-sky-100">{user.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-sky-200">MIS Score:</span>
                  <span className="font-bold text-blue-600">{user.misScore}</span>
                  <span className="text-sm text-sky-200">•</span>
                  <span className="text-sm text-sky-200">Level: {user.level}</span>
                </div>
              </div>
              <Button variant="outline" onClick={() => navigate('/profile')}>
                View Profile
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {settingsSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold">{section.title}</h3>
                </div>
                <Separator className="mb-4" />
                <div className="space-y-4">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`${section.title}-${itemIndex}`} className="cursor-pointer">
                          {item.label}
                        </Label>
                        {'toggle' in item ? (
                          <Switch
                            id={`${section.title}-${itemIndex}`}
                            defaultChecked={item.enabled}
                            onCheckedChange={(checked) =>
                              toast.success(checked ? `${item.label} enabled` : `${item.label} disabled`)
                            }
                          />
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={item.action}
                          >
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}

          {/* Help & Support */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold">Help & Support</h3>
            </div>
            <Separator className="mb-4" />
            <div className="space-y-3">
              <Button
                variant="ghost"
                className="w-full justify-between"
                onClick={() => toast.info('Help Center coming soon')}
              >
                Help Center
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-between"
                onClick={() => toast.info('Contact Support coming soon')}
              >
                Contact Support
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-between"
                onClick={() => toast.info('About Bondly coming soon')}
              >
                About Bondly
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>

          {/* Logout */}
          <Card className="p-6 border-red-200">
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
