import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Award,
  TrendingUp,
  Heart,
  Users,
  Briefcase,
  Edit,
  Settings,
  Share2,
  Flame,
  Calendar,
  Book
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { api } from '../../lib/api';

export default function Profile() {
  const navigate = useNavigate();
  const { user: authUser, isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    bio: '',
    title: '',
    skills: [] as string[],
    interests: [] as string[],
    location: ''
  });

  const [editForm, setEditForm] = useState({
    bio: '',
    title: '',
    skills: '',
    interests: '',
    location: ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    } else {
      fetchProfile();
    }
  }, [isAuthenticated, navigate]);

  const fetchProfile = async () => {
    try {
      const data = await api.users.getProfile();
      setProfile({
        bio: data.bio || '',
        title: data.title || '',
        skills: data.skills || [],
        interests: data.interests || [],
        location: data.location || ''
      });
      setEditForm({
        bio: data.bio || '',
        title: data.title || '',
        skills: (data.skills || []).join(', '),
        interests: (data.interests || []).join(', '),
        location: data.location || ''
      });
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        bio: editForm.bio,
        title: editForm.title,
        location: editForm.location,
        skills: editForm.skills.split(',').map(s => s.trim()).filter(s => s),
        interests: editForm.interests.split(',').map(s => s.trim()).filter(s => s)
      };

      await api.users.updateProfile(updatedData);

      setProfile({
        ...profile,
        ...updatedData
      });

      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
      console.error(error);
    }
  };

  if (!authUser || loading) {
    return <div className="p-8 text-sky-100">Loading profile...</div>;
  }

  // ... (keep static badges, achievements, recentMIS, portfolio for now)
  const badges = [
    { id: 1, name: 'Helper Hero', icon: Heart, earned: true, description: 'Helped 50 people', color: 'from-blue-500 to-cyan-500' },
    { id: 2, name: 'Skill Master', icon: Award, earned: true, description: 'Taught 10 skills', color: 'from-emerald-500 to-teal-500' },
    { id: 3, name: 'Community Builder', icon: Users, earned: true, description: 'Connected 25 neighbors', color: 'from-blue-500 to-cyan-500' },
    { id: 4, name: 'Kindness Streak', icon: Flame, earned: true, description: '30-day helping streak', color: 'from-orange-500 to-amber-500' },
    { id: 5, name: 'Mentor', icon: Book, earned: false, description: 'Mentor 5 people', color: 'from-green-500 to-emerald-500' },
    { id: 6, name: 'Event Organizer', icon: Calendar, earned: false, description: 'Host 3 community events', color: 'from-indigo-500 to-blue-500' }
  ];

  const achievements = [
    { category: 'Professional', count: 24, icon: Briefcase },
    { category: 'Personal', count: 18, icon: Heart },
    { category: 'Community', count: 32, icon: Users },
    { category: 'Total Impact', count: 74, icon: TrendingUp }
  ];

  const recentMIS = [
    { action: 'Taught JavaScript basics', points: 10, date: '2 hours ago', type: 'teaching' },
    { action: 'Helped with moving', points: 8, date: '5 hours ago', type: 'helping' },
    { action: 'Deep conversation with Emma', points: 6, date: 'Yesterday', type: 'conversation' },
    { action: 'Organized study group', points: 8, date: '2 days ago', type: 'community' },
    { action: 'Mentored Sarah in React', points: 10, date: '3 days ago', type: 'teaching' }
  ];

  const portfolio = [
    { title: 'React Workshop Series', description: 'Taught 15 students React fundamentals', impact: '150 MIS earned' },
    { title: 'Community Garden Project', description: 'Organized weekly gardening sessions', impact: '80 MIS earned' },
    { title: 'Mental Health Support', description: 'Provided emotional support in 20+ conversations', impact: '120 MIS earned' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </Button>
              <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => toast.success('Share link copied!')} className="border-slate-200">
                <Share2 className="w-5 h-5 text-slate-600" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => navigate('/settings')} className="border-slate-200">
                <Settings className="w-5 h-5 text-slate-600" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col items-center md:items-start gap-4">
                <Avatar className="w-32 h-32">
                  <AvatarFallback className="bg-slate-100 text-slate-700 text-4xl">
                    {authUser.initials}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  className="w-full md:w-auto"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{authUser.name}</h2>
                    {profile.title && <p className="text-lg text-blue-600 font-medium mb-1">{profile.title}</p>}
                    <p className="text-sky-100 mb-1">{profile.location || authUser.location || 'Your City'}</p>
                    {profile.bio && <p className="text-sky-100 mt-2 max-w-xl">{profile.bio}</p>}
                  </div>

                  <Card className="p-4 bg-slate-900 text-white border-0">
                    <div className="text-center mb-2">
                      <div className="text-4xl font-bold">{authUser.misScore}</div>
                      <div className="text-sm text-blue-100">MIS Score</div>
                    </div>
                    <Badge className="bg-white/20 text-white border-0 w-full justify-center">
                      {authUser.level}
                    </Badge>
                  </Card>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-slate-50 border border-slate-200 rounded-lg">
                    <div className="flex items-center justify-center gap-1 text-2xl font-bold text-slate-900 mb-1">
                      <Flame className="w-6 h-6" />
                      {authUser.streak}
                    </div>
                    <div className="text-sm text-slate-500">Day Streak</div>
                  </div>
                  {/* ... other stats ... */}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* ... Keep Overview content ... */}
            <div className="grid md:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.category}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
                      <achievement.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      {achievement.count}
                    </div>
                    <div className="text-sm text-sky-100">{achievement.category}</div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card className="p-6">
              {/* Recent MIS content... */}
              <h3 className="text-lg font-bold mb-4">Recent MIS Activity</h3>
              <div className="space-y-4">
                {recentMIS.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between pb-4 border-b border-slate-100 last:border-0">
                    <div className="flex items-center gap-3">
                      {/* ... icon logic ... */}
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-sky-200">{activity.date}</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-sky-200 border-0">
                      +{activity.points} MIS
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="badges" className="space-y-6">
            {/* ... Keep Badges content ... */}
            <div className="grid md:grid-cols-3 gap-6">
              {badges.map((badge, index) => (
                <motion.div key={badge.id} /* ... */ >
                  <Card className={`p-6 text-center ${badge.earned ? 'hover:shadow-lg' : 'opacity-60'} transition-all`}>
                    {/* ... badge content ... */}
                    <h3 className="font-bold text-lg mb-2">{badge.name}</h3>
                    {/* ... */}
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Skills I Can Teach</h3>
              <div className="flex flex-wrap gap-3 mb-6">
                {profile.skills.length > 0 ? profile.skills.map((skill) => (
                  <Badge key={skill} className="bg-blue-100 text-blue-700 border-0 px-4 py-2 text-sm">
                    {skill}
                  </Badge>
                )) : <p className="text-slate-500">No skills listed yet.</p>}
              </div>
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Skills
              </Button>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Skills I Want to Learn</h3>
              <div className="flex flex-wrap gap-3 mb-6">
                {profile.interests.length > 0 ? profile.interests.map((skill) => (
                  <Badge key={skill} className="bg-slate-100 text-slate-700 border-0 px-4 py-2 text-sm">
                    {skill}
                  </Badge>
                )) : <p className="text-slate-500">No interests listed yet.</p>}
              </div>
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Skills
              </Button>
            </Card>

            <Card className="p-8 text-center bg-slate-50 border border-slate-200">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-slate-900" />
              <h3 className="font-bold text-lg mb-2">Find Skill Matches</h3>
              <p className="text-slate-600 mb-4">
                Connect with people who can teach you what you want to learn
              </p>
              <Button className="bg-slate-900 text-white hover:bg-slate-800" onClick={() => navigate('/professional')}>
                Browse Matches
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            {/* ... Keep Portfolio content ... */}
            <div className="space-y-4">
              {portfolio.map((item, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  {/* ... item content ... */}
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Professional Title</Label>
              <Input
                id="title"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                placeholder="e.g. Frontend Developer"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={editForm.location}
                onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                placeholder="City, Country"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={editForm.bio}
                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                placeholder="Tell us about yourself..."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="skills">Skills (comma separated)</Label>
              <Input
                id="skills"
                value={editForm.skills}
                onChange={(e) => setEditForm({ ...editForm, skills: e.target.value })}
                placeholder="React, Design, Photography"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="interests">Interests (comma separated)</Label>
              <Input
                id="interests"
                value={editForm.interests}
                onChange={(e) => setEditForm({ ...editForm, interests: e.target.value })}
                placeholder="Python, Marketing, Cooking"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
