import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Briefcase,
  Users,
  Clock,
  TrendingUp,
  Award,
  Search,
  Filter,
  MessageCircle,
  Send,
  Star,
  UserPlus,
  BookOpen
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';

import { api } from '../../lib/api';

export default function ProfessionalMode() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'skill-swap';

  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<any>(null);
  const [matches, setMatches] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [referrals, setReferrals] = useState<any[]>([]);
  const [mentors, setMentors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    } else {
      fetchData();
    }
  }, [isAuthenticated, navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Try to seed data first if it's empty
      await api.professional.seed();

      const [matchesData, dashboardData] = await Promise.all([
        api.users.getMatches(),
        api.professional.getDashboardData()
      ]);

      setMatches(matchesData);
      setSessions(dashboardData.sessions);
      setReferrals(dashboardData.referrals);
      setMentors(dashboardData.mentors);
    } catch (error) {
      console.error('Failed to fetch professional data:', error);
      toast.error('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // derived state for filtering
  const filteredMatches = matches.filter((person: any) =>
    person.skills.some((skill: string) => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSkillRequest = (person: any) => {
    setSelectedPerson(person);
    setShowRequestDialog(true);
  };

  const submitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Skill swap request sent to ${selectedPerson?.name}!`);
    setShowRequestDialog(false);
  };

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
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
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold">Professional Mode</h1>
              </div>
              <p className="text-sm text-sky-100">Swap skills, find mentors, grow your career</p>
            </div>
            <Button onClick={() => navigate('/profile')} className="bg-gradient-to-r from-blue-600 to-cyan-600">
              View Portfolio
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="skill-swap" value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
            <TabsTrigger value="skill-swap" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Skill Swap</span>
            </TabsTrigger>
            <TabsTrigger value="sessions" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">Sessions</span>
            </TabsTrigger>
            <TabsTrigger value="referrals" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Referrals</span>
            </TabsTrigger>
            <TabsTrigger value="mentors" className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span className="hidden sm:inline">Mentors</span>
            </TabsTrigger>
          </TabsList>

          {/* Skill Swap Tab */}
          <TabsContent value="skill-swap" className="space-y-6">
            {/* Search Bar */}
            <Card className="p-4">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    placeholder="Search for skills you want to learn..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="w-5 h-5" />
                </Button>
              </div>
            </Card>

            {/* Skill Matches */}
            <div>
              <h2 className="text-xl font-bold mb-4">Top Matches for You</h2>
              {loading ? (
                <div className="text-center py-8">Loading matches...</div>
              ) : filteredMatches.length === 0 ? (
                <div className="text-center py-8 text-sky-100">
                  <p>No matches found yet.</p>
                  <p className="text-sm mt-2">Try adding more "Interests" to your profile!</p>
                  <Button variant="outline" className="mt-4" onClick={() => navigate('/profile')}>
                    Update Profile
                  </Button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredMatches.map((person: any, index: number) => (
                    <motion.div
                      key={person._id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-12 h-12">
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                                {person.fullName ? person.fullName.substring(0, 2).toUpperCase() : '??'}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-bold">{person.fullName}</h3>
                              <p className="text-sm text-sky-100">{person.title || 'Bondly Member'}</p>
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-700 border-0">
                            {Math.floor(Math.random() * 20) + 80}% Match
                          </Badge>
                        </div>

                        <p className="text-sm text-sky-100 mb-4 line-clamp-2">{person.bio || 'No bio yet.'}</p>

                        <div className="space-y-3 mb-4">
                          <div>
                            <span className="text-xs font-medium text-sky-100">Can teach:</span>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {person.skills && person.skills.length > 0 ? person.skills.map((skill: string) => (
                                <Badge key={skill} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                  {skill}
                                </Badge>
                              )) : <span className="text-xs text-slate-400">No skills listed</span>}
                            </div>
                          </div>
                          <div>
                            <span className="text-xs font-medium text-sky-100">Wants to learn:</span>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {person.interests && person.interests.length > 0 ? person.interests.map((skill: string) => (
                                <Badge key={skill} variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                                  {skill}
                                </Badge>
                              )) : <span className="text-xs text-slate-400">No interests listed</span>}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div className="flex items-center gap-1 text-sm text-sky-100">
                            <Star className="w-4 h-4 text-brand-blue" />
                            <span>{person.misScore || 0} MIS</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              Message
                            </Button>
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-blue-600 to-cyan-600"
                              onClick={() => handleSkillRequest(person)}
                            >
                              <Send className="w-4 h-4 mr-1" />
                              Request
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions" className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Upcoming Sessions</h2>
              <div className="space-y-4">
                {sessions.map((session) => (
                  <Card key={session.id} className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${session.type === 'Teaching'
                          ? 'bg-gradient-to-br from-green-500 to-emerald-500'
                          : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                          }`}>
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <Badge className="mb-2" variant={session.type === 'Teaching' ? 'default' : 'secondary'}>
                            {session.type}
                          </Badge>
                          <h3 className="font-bold text-lg">{session.topic}</h3>
                          <p className="text-sm text-sky-100">with {session.with}</p>
                          <div className="flex items-center gap-3 mt-2 text-sm text-sky-100">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {session.date}
                            </span>
                            <span>•</span>
                            <span>{session.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline">Reschedule</Button>
                        <Button className="bg-gradient-to-r from-blue-600 to-cyan-600">
                          Join Session
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="p-8 text-center mt-6 bg-accent border-primary/20">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-brand-teal" />
                <h3 className="font-bold text-lg mb-2">Schedule a New Session</h3>
                <p className="text-sky-100 mb-4">Find someone to teach or learn from</p>
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Browse Skill Matches
                </Button>
              </Card>
            </div>
          </TabsContent>

          {/* Referrals Tab */}
          <TabsContent value="referrals" className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Active Referrals</h2>
              <div className="space-y-4">
                {referrals.map((referral) => (
                  <Card key={referral.id} className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-lg">{referral.position}</h3>
                        <p className="text-sky-100">{referral.company}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-sm text-sky-100">Referred by:</span>
                          <span className="text-sm font-medium">{referral.referredBy}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={
                          referral.status === 'Interview Scheduled'
                            ? 'bg-green-100 text-green-700 border-0'
                            : 'bg-blue-100 text-blue-700 border-0'
                        }>
                          {referral.status}
                        </Badge>
                        <span className="text-sm text-sky-100">{referral.date}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="p-8 text-center mt-6 bg-accent border-primary/20">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-brand-blue" />
                <h3 className="font-bold text-lg mb-2">Build Your Network</h3>
                <p className="text-sky-100 mb-4">Connect with professionals who can refer you to opportunities</p>
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600">
                  <Users className="w-4 h-4 mr-2" />
                  Expand Network
                </Button>
              </Card>
            </div>
          </TabsContent>

          {/* Mentors Tab */}
          <TabsContent value="mentors" className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Available Mentors</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {mentors.map((mentor) => (
                  <Card key={mentor.id} className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar className="w-16 h-16">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-lg">
                          {mentor.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{mentor.name}</h3>
                        <p className="text-sm text-sky-100">{mentor.expertise}</p>
                        <div className="flex items-center gap-1 mt-1 text-sm text-sky-100">
                          <Star className="w-4 h-4 text-brand-blue" />
                          <span>{mentor.misScore} MIS</span>
                        </div>
                      </div>
                      {mentor.available && (
                        <Badge className="bg-green-100 text-green-700 border-0">Available</Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4 py-4 border-y border-border">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{mentor.experience}</div>
                        <div className="text-xs text-sky-100">Experience</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-indigo-600">{mentor.mentees}</div>
                        <div className="text-xs text-sky-100">Mentees</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        View Profile
                      </Button>
                      <Button className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600">
                        Request Mentorship
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Request Dialog */}
      <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Request Skill Swap</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitRequest} className="space-y-4">
            <div className="space-y-2">
              <Label>What do you want to learn?</Label>
              <Input placeholder="e.g., React basics, Python programming..." />
            </div>
            <div className="space-y-2">
              <Label>What can you teach?</Label>
              <Input placeholder="e.g., UI Design, JavaScript..." />
            </div>
            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea placeholder="Introduce yourself and explain what you hope to learn..." rows={4} />
            </div>
            <div className="space-y-2">
              <Label>Preferred Time</Label>
              <Input type="text" placeholder="e.g., Weekends, Evenings..." />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-cyan-600">
              Send Request
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div >
  );
}
