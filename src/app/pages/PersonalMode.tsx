import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Heart,
  Smile,
  Meh,
  Frown,
  MessageCircle,
  Users,
  Sparkles,
  Send,
  Lock,
  TrendingUp,
  Brain,
  Wind,
  Moon
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Progress } from '../components/ui/progress';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';

import { api } from '../../lib/api';

export default function PersonalMode() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'mood-check';

  const { isAuthenticated } = useAuth();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodNote, setMoodNote] = useState('');
  const [moodHistory, setMoodHistory] = useState<any[]>([]);

  const [supportRooms, setSupportRooms] = useState<any[]>([]);
  const [conversationPrompts, setConversationPrompts] = useState<any[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    } else {
      fetchMoods();
      fetchSupportRooms();
      fetchPrompts();
    }
  }, [isAuthenticated, navigate]);

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };

  const fetchMoods = async () => {
    try {
      const data = await api.moods.getAll();
      setMoodHistory(data);
    } catch (error) {
      console.error('Failed to fetch moods:', error);
    }
  };

  const fetchSupportRooms = async () => {
    try {
      const data = await api.supportRooms.getAll();
      // If no rooms, seed them (dev helper)
      if (data.length === 0) {
        await api.supportRooms.seed();
        const seededData = await api.supportRooms.getAll();
        setSupportRooms(seededData);
      } else {
        setSupportRooms(data);
      }
    } catch (error) {
      console.error('Failed to fetch support rooms:', error);
    }
  };

  const fetchPrompts = async () => {
    try {
      const data = await api.prompts.getAll();
      // If no prompts, seed them (dev helper)
      if (data.length === 0) {
        await api.prompts.seed();
        const seededData = await api.prompts.getAll();
        setConversationPrompts(seededData);
      } else {
        setConversationPrompts(data);
      }
    } catch (error) {
      console.error('Failed to fetch prompts:', error);
    }
  };

  const handleJoinRoom = async (roomId: string) => {
    try {
      await api.supportRooms.join(roomId);
      toast.success('Joined support room successfully!');
      fetchSupportRooms(); // Refresh to show updated member count
    } catch (error) {
      toast.error('Failed to join room.');
    }
  };

  const moods = [
    { id: 'great', label: 'Great', icon: Smile, color: 'from-green-500 to-emerald-500', emoji: '😊' },
    { id: 'good', label: 'Good', icon: Smile, color: 'from-blue-500 to-cyan-500', emoji: '🙂' },
    { id: 'okay', label: 'Okay', icon: Meh, color: 'from-yellow-500 to-orange-500', emoji: '😐' },
    { id: 'down', label: 'Down', icon: Frown, color: 'from-orange-500 to-red-500', emoji: '😔' },
    { id: 'struggling', label: 'Struggling', icon: Frown, color: 'from-slate-500 to-gray-500', emoji: '😢' }
  ];

  // Static for now, can be moved to DB later if needed
  const wellBeingTools = [
    {
      id: 1,
      name: 'Guided Breathing',
      icon: Wind,
      description: '5-minute calming exercise',
      duration: '5 min',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      name: 'Gratitude Journal',
      icon: Sparkles,
      description: 'Write what you\'re thankful for',
      duration: '10 min',
      color: 'from-orange-500 to-amber-500'
    },
    {
      id: 3,
      name: 'Sleep Better',
      icon: Moon,
      description: 'Wind-down routine reminder',
      duration: '3 min',
      color: 'from-blue-600 to-sky-600'
    },
    {
      id: 4,
      name: 'AI Chat Helper',
      icon: Brain,
      description: 'Talk through your thoughts',
      duration: 'Anytime',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const screenTimeStats = {
    today: '2h 15m',
    average: '2h 45m',
    goal: '3h',
    improvement: '+15%'
  };

  const handleMoodSubmit = async () => {
    if (selectedMood) {
      try {
        await api.moods.add({ mood: selectedMood, note: moodNote });
        toast.success('Mood logged! Keep tracking your emotional journey.');
        setSelectedMood(null);
        setMoodNote('');
        fetchMoods(); // Refresh history
      } catch (error) {
        toast.error('Failed to save mood. Please try again.');
        console.error(error);
      }
    }
  };



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
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                    <Heart className="w-5 h-5 text-slate-900" />
                  </div>
                  <h1 className="text-2xl font-bold text-slate-900">Personal Mode</h1>
                </div>
                <p className="text-sm text-slate-500">Your emotional well-being space</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="mood-check" value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
            <TabsTrigger value="mood-check" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Mood Check</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Support</span>
            </TabsTrigger>
            <TabsTrigger value="conversations" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Prompts</span>
            </TabsTrigger>
            <TabsTrigger value="wellbeing" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Tools</span>
            </TabsTrigger>
          </TabsList>

          {/* Mood Check Tab */}
          <TabsContent value="mood-check" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-center mb-2">How are you feeling today?</h2>
                <p className="text-center text-sky-100 mb-8">
                  Track your emotional journey and get personalized support
                </p>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                  {moods.map((mood) => (
                    <motion.div
                      key={mood.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Card
                        className={`p-6 cursor-pointer text-center transition-all ${selectedMood === mood.id
                          ? 'ring-2 ring-sky-500 shadow-lg'
                          : 'hover:shadow-md'
                          }`}
                        onClick={() => setSelectedMood(mood.id)}
                      >
                        <div className={`w-16 h-16 bg-gradient-to-br ${mood.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                          <span className="text-3xl">{mood.emoji}</span>
                        </div>
                        <div className="font-medium">{mood.label}</div>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {selectedMood && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Want to share more? (Optional)
                      </label>
                      <Textarea
                        placeholder="What's on your mind? This is a safe space..."
                        value={moodNote}
                        onChange={(e) => setMoodNote(e.target.value)}
                        rows={4}
                      />
                    </div>
                    <Button
                      onClick={handleMoodSubmit}
                      className="w-full bg-slate-900 text-white hover:bg-slate-800"
                    >
                      Log Mood
                    </Button>
                  </motion.div>
                )}
              </Card>
            </motion.div>

            {/* Mood Insights */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Recent Mood History</h3>
                <div className="space-y-4 max-h-[300px] overflow-y-auto">
                  {moodHistory.length === 0 ? (
                    <p className="text-slate-400 text-sm">No moods logged yet. Start today!</p>
                  ) : (
                    moodHistory.map((entry: any) => (
                      <div key={entry._id} className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border shadow-sm">
                        <div className="text-2xl">
                          {moods.find(m => m.id === entry.mood)?.emoji || '😐'}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <span className="font-medium capitalize text-sky-100">{entry.mood}</span>
                            <span className="text-xs text-slate-400">
                              {new Date(entry.date).toLocaleDateString()}
                            </span>
                          </div>
                          {entry.note && (
                            <p className="text-sm text-sky-100 mt-1 line-clamp-1">{entry.note}</p>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Screen Time Tracker</h3>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-slate-50 border border-slate-200 rounded-lg">
                    <div className="text-4xl font-bold text-blue-600 mb-1">
                      {screenTimeStats.today}
                    </div>
                    <div className="text-sm text-sky-100">Today's Usage</div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-sky-100">Daily Goal</span>
                      <span className="font-medium">{screenTimeStats.goal}</span>
                    </div>
                    <Progress value={75} />

                    <div className="flex justify-between text-sm pt-2">
                      <span className="text-sky-100">7-day Average</span>
                      <span className="font-medium">{screenTimeStats.average}</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-0">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {screenTimeStats.improvement} better than last week
                    </Badge>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Support Rooms Tab */}
          <TabsContent value="support" className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Anonymous Support Rooms</h2>
              <p className="text-sky-100 mb-6">
                Join safe, moderated spaces to share and connect with others
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {supportRooms.map((room, index) => (
                  <motion.div
                    key={room.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-lg mb-1">{room.name}</h3>
                          <p className="text-sm text-sky-100">{room.description}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-700 border-0 flex-shrink-0">
                          <Lock className="w-3 h-3 mr-1" />
                          Private
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 mb-4 text-sm text-sky-100">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {room.members} members
                        </span>
                        <span>•</span>
                        <span className="text-green-600 font-medium">
                          {room.active} active now
                        </span>
                      </div>

                      <Button
                        onClick={() => handleJoinRoom(room._id)}
                        className="w-full bg-blue-600 text-white hover:bg-blue-700"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Join Room
                      </Button>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <Card className="p-8 text-center mt-6 bg-slate-50 border border-slate-200">
                <Heart className="w-12 h-12 mx-auto mb-4 text-slate-900" />
                <h3 className="font-bold text-lg mb-2">Need Immediate Support?</h3>
                <p className="text-slate-500 mb-4">
                  Connect with trained listeners 24/7
                </p>
                <Button className="bg-slate-900 hover:bg-slate-800 text-white">
                  Talk to Someone Now
                </Button>
              </Card>
            </div>
          </TabsContent>

          {/* Conversation Prompts Tab */}
          <TabsContent value="conversations" className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Deep Conversation Prompts</h2>
              <p className="text-slate-600 mb-6">
                Move beyond small talk with meaningful questions
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {conversationPrompts.map((prompt, index) => (
                  <motion.div
                    key={prompt.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-6 hover:shadow-lg transition-shadow">
                      <Badge className="mb-4" variant="outline">
                        {prompt.category}
                      </Badge>
                      <h3 className="font-bold text-lg mb-4 leading-relaxed">
                        {prompt.question}
                      </h3>
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">
                          Share with Friend
                        </Button>
                        <Button className={`flex-1 bg-gradient-to-r ${prompt.color}`}>
                          <Send className="w-4 h-4 mr-2" />
                          Discuss
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <Card className="p-8 text-center mt-6 bg-slate-50 border border-slate-200">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 text-slate-900" />
                <h3 className="font-bold text-lg mb-2">AI Conversation Helper</h3>
                <p className="text-slate-500 mb-4">
                  Get suggestions for keeping conversations meaningful and engaging
                </p>
                <Button className="bg-slate-900 hover:bg-slate-800 text-white">
                  Try AI Helper
                </Button>
              </Card>
            </div>
          </TabsContent>

          {/* Well-Being Tools Tab */}
          <TabsContent value="wellbeing" className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Well-Being Tools</h2>
              <p className="text-slate-600 mb-6">
                Take care of your mental and emotional health
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {wellBeingTools.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card className="p-6 cursor-pointer hover:shadow-lg transition-all">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${tool.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <tool.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-1">{tool.name}</h3>
                          <p className="text-sm text-slate-600">{tool.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{tool.duration}</Badge>
                        <Button size="sm" className={`bg-gradient-to-r ${tool.color}`}>
                          Start
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <Card className="p-6 bg-slate-50 border border-slate-200">
                  <h3 className="font-bold text-lg mb-4 text-slate-900">Daily Affirmations</h3>
                  <p className="text-lg italic text-slate-600 mb-4">
                    "You are capable of amazing things. One step at a time."
                  </p>
                  <Button variant="outline" className="w-full border-slate-300 hover:bg-slate-100">
                    Get New Affirmation
                  </Button>
                </Card>

                <Card className="p-6 bg-slate-50 border border-slate-200">
                  <h3 className="font-bold text-lg mb-4 text-slate-900">Talk to a Friend Reminder</h3>
                  <p className="text-slate-600 mb-4">
                    You haven't connected with Sarah in 5 days. Reach out?
                  </p>
                  <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                    Send Message
                  </Button>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div >
  );
}
