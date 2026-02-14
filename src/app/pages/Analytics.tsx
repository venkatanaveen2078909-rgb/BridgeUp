import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import {
  ArrowLeft,
  Trophy,
  TrendingUp,
  Heart,
  Users,
  Briefcase,
  Calendar,
  Award,
  Target,
  Download
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function Analytics() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const misScoreData = [
    { month: 'Aug', score: 120 },
    { month: 'Sep', score: 145 },
    { month: 'Oct', score: 178 },
    { month: 'Nov', score: 210 },
    { month: 'Dec', score: 245 },
    { month: 'Jan', score: 265 },
    { month: 'Feb', score: 284 }
  ];

  const activityData = [
    { category: 'Teaching', count: 24, color: '#3b82f6' },
    { category: 'Helping', count: 32, color: '#10b981' },
    { category: 'Conversations', count: 18, color: '#f97316' },
    { category: 'Community', count: 20, color: '#14b8a6' }
  ];

  const weeklyActivityData = [
    { day: 'Mon', professional: 4, personal: 2, community: 3 },
    { day: 'Tue', professional: 3, personal: 4, community: 2 },
    { day: 'Wed', professional: 5, personal: 3, community: 4 },
    { day: 'Thu', professional: 2, personal: 5, community: 3 },
    { day: 'Fri', professional: 6, personal: 2, community: 5 },
    { day: 'Sat', professional: 1, personal: 6, community: 7 },
    { day: 'Sun', professional: 2, personal: 4, community: 6 }
  ];

  const moodTrendData = [
    { week: 'Week 1', mood: 3.5 },
    { week: 'Week 2', mood: 3.8 },
    { week: 'Week 3', mood: 4.2 },
    { week: 'Week 4', mood: 4.0 },
    { week: 'Week 5', mood: 4.5 },
    { week: 'Week 6', mood: 4.3 }
  ];

  const impactStats = [
    { label: 'People Helped', value: 28, change: '+12%', color: 'from-green-500 to-emerald-500', icon: Users },
    { label: 'Skills Shared', value: 12, change: '+25%', color: 'from-blue-500 to-cyan-500', icon: Briefcase },
    { label: 'Conversations', value: 18, change: '+8%', color: 'from-orange-500 to-amber-500', icon: Heart },
    { label: 'Community Events', value: 5, change: '+40%', color: 'from-indigo-500 to-blue-500', icon: Calendar }
  ];

  const achievements = [
    { title: 'Reached 200 MIS', date: 'Jan 15, 2026' },
    { title: 'Helped 25 People', date: 'Jan 10, 2026' },
    { title: '30-Day Streak', date: 'Jan 5, 2026' },
    { title: 'First Mentor Session', date: 'Dec 28, 2025' }
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f97316', '#14b8a6'];

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
              <h1 className="text-2xl font-bold text-slate-900">Analytics & Insights</h1>
            </div>
            <Button variant="outline" className="text-slate-900 border-slate-200 hover:bg-slate-50">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-4 gap-6 mb-8"
        >
          {impactStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-0">
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="wellbeing">Well-Being</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* MIS Score Growth */}
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">MIS Score Growth</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={misScoreData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    name="MIS Score"
                    dot={{ fill: '#3b82f6', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Activity Breakdown */}
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Activity Breakdown</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={activityData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {activityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>

              {/* Impact Summary */}
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">This Month's Impact</h3>
                <div className="space-y-4">
                  {activityData.map((activity, index) => (
                    <div key={activity.category}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{activity.category}</span>
                        <span className="text-sm text-slate-500">{activity.count} actions</span>
                      </div>
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(activity.count / 32) * 100}%`,
                            backgroundColor: activity.color
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="font-bold">Total Actions</span>
                    <span className="text-2xl font-bold text-blue-600">94</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Weekly Activity by Mode</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyActivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="day" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="professional" fill="#3b82f6" name="Professional" />
                  <Bar dataKey="personal" fill="#0ea5e9" name="Personal" />
                  <Bar dataKey="community" fill="#14b8a6" name="Community" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50">
                <Briefcase className="w-8 h-8 text-blue-600 mb-3" />
                <div className="text-3xl font-bold text-blue-600 mb-1">23</div>
                <div className="text-sm text-slate-500">Professional Actions</div>
                <div className="mt-3 text-sm text-green-600 font-medium">+15% from last week</div>
              </Card>
              <Card className="p-6 bg-slate-50 border border-slate-200">
                <Heart className="w-8 h-8 text-slate-900 mb-3" />
                <div className="text-3xl font-bold text-slate-900 mb-1">26</div>
                <div className="text-sm text-slate-500">Personal Actions</div>
                <div className="mt-3 text-sm text-green-600 font-medium">+8% from last week</div>
              </Card>
              <Card className="p-6 bg-slate-50 border border-slate-200">
                <Users className="w-8 h-8 text-slate-900 mb-3" />
                <div className="text-3xl font-bold text-slate-900 mb-1">30</div>
                <div className="text-sm text-slate-500">Community Actions</div>
                <div className="mt-3 text-sm text-green-600 font-medium">+22% from last week</div>
              </Card>
            </div>
          </TabsContent>

          {/* Well-Being Tab */}
          <TabsContent value="wellbeing" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Mood Trend (6 Weeks)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={moodTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="week" stroke="#64748b" />
                  <YAxis
                    stroke="#64748b"
                    domain={[0, 5]}
                    ticks={[1, 2, 3, 4, 5]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="mood"
                    stroke="#0ea5e9"
                    strokeWidth={3}
                    name="Average Mood"
                    dot={{ fill: '#0ea5e9', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Well-Being Summary</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <span className="font-medium">Average Mood</span>
                    <span className="text-2xl font-bold text-green-600">4.2/5</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <span className="font-medium">Screen Time</span>
                    <span className="text-2xl font-bold text-blue-600">2h 15m</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="font-medium">Support Sessions</span>
                    <span className="text-2xl font-bold text-slate-900">8</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="font-medium">Deep Conversations</span>
                    <span className="text-2xl font-bold text-slate-900">12</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Insights & Recommendations</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-green-900 mb-1">Mood Improving!</p>
                        <p className="text-sm text-green-700">
                          Your average mood has increased by 0.8 points this month.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-3">
                      <Target className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-900 mb-1">Great Screen Time</p>
                        <p className="text-sm text-blue-700">
                          You're 15% below your screen time goal. Keep it up!
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-start gap-3">
                      <Heart className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-slate-900 mb-1">Stay Connected</p>
                        <p className="text-sm text-slate-700">
                          Regular check-ins help maintain emotional well-being.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Milestones Tab */}
          <TabsContent value="milestones" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Recent Achievements</h3>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold">{achievement.title}</p>
                      <p className="text-sm text-slate-500">{achievement.date}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-0">
                      Completed
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Next Milestones</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Reach 300 MIS</span>
                      <span className="text-sm text-slate-500">284/300</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full" style={{ width: '94.7%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Help 30 People</span>
                      <span className="text-sm text-slate-500">28/30</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full" style={{ width: '93.3%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">15 Skills Shared</span>
                      <span className="text-sm text-slate-500">12/15</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full" style={{ width: '80%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">60-Day Streak</span>
                      <span className="text-sm text-slate-500">12/60</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-orange-500 to-amber-600 rounded-full" style={{ width: '20%' }} />
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-slate-50 border border-slate-200">
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">Keep Going!</h3>
                  <p className="text-slate-500 mb-6">
                    You're making incredible progress. Just 16 more MIS points to reach your next milestone!
                  </p>
                  <Button className="bg-slate-900 text-white hover:bg-slate-800" onClick={() => navigate('/dashboard')}>
                    Continue Journey
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div >
  );
}
