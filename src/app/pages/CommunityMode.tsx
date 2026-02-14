import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Users,
  MapPin,
  Heart,
  Calendar,
  Gift,
  Star,
  MessageCircle,
  Search,
  Filter,
  Clock,
  CheckCircle,
  UserPlus,
  Home
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

export default function CommunityMode() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'neighbors';

  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [selectedNeighbor, setSelectedNeighbor] = useState<any>(null);
  const [neighbors, setNeighbors] = useState<any[]>([]);
  const [tinyFavors, setTinyFavors] = useState<any[]>([]);
  const [communityEvents, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    } else {
      fetchData();
    }
  }, [isAuthenticated, navigate]);

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      // Try to seed data first if it's empty
      await api.community.seed();

      const dashboardData = await api.community.getDashboardData();

      setNeighbors(dashboardData.neighbors);
      setTinyFavors(dashboardData.tinyFavors);
      setEvents(dashboardData.events);
    } catch (error) {
      console.error('Failed to fetch community data:', error);
      toast.error('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const elderStudentPairs = [
    {
      id: 1,
      elder: 'Mr. Thompson',
      elderInitials: 'MT',
      student: 'Alex R.',
      studentInitials: 'AR',
      activity: 'Teaching Woodworking',
      frequency: 'Weekly',
      impact: 'High'
    },
    {
      id: 2,
      elder: 'Mrs. Garcia',
      elderInitials: 'MG',
      student: 'Sophie L.',
      studentInitials: 'SL',
      activity: 'Cooking Traditional Recipes',
      frequency: 'Bi-weekly',
      impact: 'High'
    }
  ];

  const handleFavorRequest = (neighbor: any) => {
    setSelectedNeighbor(neighbor);
    setShowRequestDialog(true);
  };

  const submitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Request sent to ${selectedNeighbor?.name} !`);
    setShowRequestDialog(false);
  };

  const handleFavorAccept = (favor: any) => {
    toast.success(`Great! ${favor.requester} will be notified.You'll earn ${favor.points} MIS!`);
  };

  // Dummy data for the new layout
  const favors = [
    {
      id: 1,
      type: 'Request',
      title: 'Help with grocery shopping',
      description: 'Need someone to pick up groceries from Safeway on Tuesday morning.',
      misScore: 50,
      distance: '0.5 miles',
      author: 'Jane Doe',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'Offer',
      title: 'Offering dog walking services',
      description: 'Happy to walk your dog in the evenings or weekends. Experienced with all breeds!',
      misScore: 30,
      distance: '1.2 miles',
      author: 'John Smith',
      time: '1 day ago'
    },
    {
      id: 3,
      type: 'Request',
      title: 'Need help assembling IKEA furniture',
      description: 'Just moved in and have a few IKEA pieces that need assembly. Can provide snacks!',
      misScore: 75,
      distance: '0.8 miles',
      author: 'Emily White',
      time: '5 hours ago'
    }
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
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-slate-900" />
                  </div>
                  <h1 className="text-2xl font-bold text-slate-900">Community Mode</h1>
                </div>
                <p className="text-sm text-slate-500">Connect locally and build neighborhood bonds</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
            <TabsTrigger value="neighbors" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Neighbors</span>
            </TabsTrigger>
            <TabsTrigger value="favors" className="flex items-center gap-2">
              <Gift className="w-4 h-4" />
              <span className="hidden sm:inline">Tiny Favors</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Events</span>
            </TabsTrigger>
            <TabsTrigger value="connections" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Connections</span>
            </TabsTrigger>
          </TabsList>

          {/* Neighbors Tab */}
          <TabsContent value="neighbors" className="space-y-6">
            {/* Search Bar */}
            <Card className="p-4">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    placeholder="Search for skills nearby..."
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

            {/* Neighbor Skill Exchange */}
            <div>
              <h2 className="text-xl font-bold mb-4">Neighbors Near You</h2>
              {loading ? (
                <div className="text-center py-8">Loading neighbors...</div>
              ) : neighbors.length === 0 ? (
                <div className="text-center py-8 text-sky-100">
                  <p>No neighbors found yet.</p>
                  <Button variant="outline" className="mt-4" onClick={fetchData}>
                    Refresh
                  </Button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {neighbors.map((neighbor, index) => (
                    <motion.div
                      key={neighbor.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-12 h-12">
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                                {neighbor.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-bold">{neighbor.name}</h3>
                              <div className="flex items-center gap-2 text-sm text-slate-500">
                                <MapPin className="w-3 h-3" />
                                <span>{neighbor.distance} away</span>
                              </div>
                            </div>
                          </div>
                          {neighbor.available ? (
                            <Badge className="bg-green-100 text-green-700 border-0">Available</Badge>
                          ) : (
                            <Badge variant="outline">Busy</Badge>
                          )}
                        </div>

                        <div className="space-y-3 mb-4">
                          <div>
                            <span className="text-xs font-medium text-slate-500">Can help with:</span>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {neighbor.skills.map((skill: string) => (
                                <Badge key={skill} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="text-xs font-medium text-slate-500">Looking for help:</span>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {neighbor.needs.map((need: string) => (
                                <Badge key={need} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                  {need}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                          <div className="flex gap-4 text-sm text-sky-100">
                            <span className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-amber-400" />
                              {neighbor.misScore}
                            </span>
                            <span className="flex items-center gap-1">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              {neighbor.helped} helped
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              Chat
                            </Button>
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-blue-600 to-cyan-600"
                              onClick={() => handleFavorRequest(neighbor)}
                            >
                              Request Help
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <Card className="p-8 text-center mt-6 bg-slate-50 border border-slate-200">
              <Users className="w-12 h-12 mx-auto mb-4 text-slate-900" />
              <h3 className="font-bold text-lg mb-2">Expand Your Neighborhood Network</h3>
              <p className="text-slate-500 mb-4">
                Connect with more neighbors and build a stronger community
              </p>
              <Button className="bg-slate-900 hover:bg-slate-800 text-white">
                <UserPlus className="w-4 h-4 mr-2" />
                Invite Neighbors
              </Button>
            </Card>
          </TabsContent>

          {/* Tiny Favors Tab */}
          <TabsContent value="favors" className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Active Tiny Favors</h2>
              <p className="text-sky-100 mb-6">
                Small acts of kindness that make a big difference
              </p>

              <div className="space-y-4">
                {tinyFavors.map((favor) => (
                  <Card key={favor.id} className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                            {favor.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold">{favor.favor}</h3>
                            <Badge className="bg-sky-100 text-blue-700 border-0">
                              {favor.points} MIS
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 mb-2">Requested by {favor.requester}</p>
                          <div className="flex flex-wrap gap-3 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {favor.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {favor.distance}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {favor.when}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline">View Details</Button>
                        <Button
                          className="bg-gradient-to-r from-green-600 to-emerald-600"
                          onClick={() => handleFavorAccept(favor)}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          I'll Help
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="p-8 text-center mt-6 bg-slate-50 border border-slate-200">
                <Gift className="w-12 h-12 mx-auto mb-4 text-slate-900" />
                <h3 className="font-bold text-lg mb-2">Need a Quick Favor?</h3>
                <p className="text-slate-500 mb-4">
                  Post a tiny favor and get help from your neighbors
                </p>
                <Button className="bg-slate-900 hover:bg-slate-800 text-white">
                  Post Tiny Favor
                </Button>
              </Card>
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Community Events</h2>
              <p className="text-slate-600 mb-6">
                Join local events and meet your neighbors
              </p>

              <div className="space-y-4">
                {communityEvents.map((event) => (
                  <Card key={event.id} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <Badge className="mb-3" variant="outline">
                          {event.category}
                        </Badge>
                        <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                        <div className="space-y-2 text-sm text-slate-600 mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{event.date}</span>
                            <span>•</span>
                            <Clock className="w-4 h-4" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>{event.attendees} attending</span>
                            <span>•</span>
                            <span className="text-slate-500">by {event.organizer}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex md:flex-col gap-2">
                        <Button variant="outline" className="flex-1 md:flex-none">
                          Share
                        </Button>
                        <Button className="flex-1 md:flex-none bg-gradient-to-r from-blue-600 to-cyan-600">
                          Attend
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="p-8 text-center mt-6 bg-slate-50 border border-slate-200">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-slate-900" />
                <h3 className="font-bold text-lg mb-2">Host a Community Event</h3>
                <p className="text-slate-500 mb-4">
                  Bring neighbors together around shared interests
                </p>
                <Button className="bg-slate-900 hover:bg-slate-800 text-white">
                  Create Event
                </Button>
              </Card>
            </div>
          </TabsContent>

          {/* Connections Tab */}
          <TabsContent value="connections" className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Elder-Student Connections</h2>
              <p className="text-slate-600 mb-6">
                Bridging generations through skill-sharing and companionship
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {elderStudentPairs.map((pair) => (
                  <Card key={pair.id} className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-gradient-to-br from-teal-500 to-cyan-500 text-white">
                            {pair.elderInitials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-bold">{pair.elder}</div>
                          <div className="text-xs text-slate-500">Elder</div>
                        </div>
                      </div>
                      <Heart className="w-6 h-6 text-red-500" />
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="font-bold">{pair.student}</div>
                          <div className="text-xs text-slate-500">Student</div>
                        </div>
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-teal-500 text-white">
                            {pair.studentInitials}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Activity:</span>
                        <span className="font-medium">{pair.activity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Frequency:</span>
                        <span className="font-medium">{pair.frequency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Impact:</span>
                        <Badge className="bg-green-100 text-green-700 border-0">
                          {pair.impact}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-8 text-center bg-slate-50 border border-slate-200">
                  <Users className="w-12 h-12 mx-auto mb-4 text-slate-900" />
                  <h3 className="font-bold text-lg mb-2">Are You an Elder?</h3>
                  <p className="text-slate-500 mb-4">
                    Share your wisdom and skills with the next generation
                  </p>
                  <Button className="bg-slate-900 hover:bg-slate-800 w-full text-white">
                    Become a Mentor
                  </Button>
                </Card>

                <Card className="p-8 text-center bg-slate-50 border border-slate-200">
                  <Heart className="w-12 h-12 mx-auto mb-4 text-slate-900" />
                  <h3 className="font-bold text-lg mb-2">Are You a Student?</h3>
                  <p className="text-slate-500 mb-4">
                    Learn valuable life skills and make meaningful connections
                  </p>
                  <Button className="bg-slate-900 hover:bg-slate-800 w-full text-white">
                    Find a Mentor
                  </Button>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Request Dialog */}
      <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Request Help from {selectedNeighbor?.name}</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitRequest} className="space-y-4">
            <div className="space-y-2">
              <Label>What do you need help with?</Label>
              <Input placeholder="e.g., Moving furniture, tech support..." />
            </div>
            <div className="space-y-2">
              <Label>Details</Label>
              <Textarea placeholder="Provide more details about what you need..." rows={4} />
            </div>
            <div className="space-y-2">
              <Label>When do you need help?</Label>
              <Input type="text" placeholder="e.g., This weekend, Tomorrow afternoon..." />
            </div>
            <div className="space-y-2">
              <Label>Estimated time needed</Label>
              <Input type="text" placeholder="e.g., 30 minutes, 1 hour..." />
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
