'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Loader2, Users, Heart, MessageCircle, Star, Clock, BookOpen, Target } from 'lucide-react';
import type { UserProfile, MatchResult, MatchingResponse } from '@/lib/services/matching';

export default function BuddiesPage() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [suggestedTopics, setSuggestedTopics] = useState<Array<{topic: string, reason: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFindingMatches, setIsFindingMatches] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('find-matches');

  // Mock user profile - in a real app, this would come from authentication/user context
  useEffect(() => {
    const mockProfile: UserProfile = {
      userId: '1',
      learningPatterns: {
        preferredSubjects: ['mathematics', 'computer science', 'physics'],
        studyStyle: 'visual',
        availability: 'evening',
        experienceLevel: 'intermediate'
      },
      knowledgeGaps: [
        { topic: 'linear algebra', confidence: 0.3 },
        { topic: 'machine learning', confidence: 0.4 },
        { topic: 'quantum mechanics', confidence: 0.2 }
      ]
    };
    setUserProfile(mockProfile);
  }, []);

  const handleFindMatches = async () => {
    if (!userProfile) return;

    setIsFindingMatches(true);
    setError(null);

    try {
      const response = await fetch('/api/match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userProfile),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to find matches');
      }

      const result: MatchingResponse = await response.json();
      setMatches(result.matches);
      setSuggestedTopics(result.suggestedTopics);
      setActiveTab('matches');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while finding matches');
    } finally {
      setIsFindingMatches(false);
    }
  };

  const handleLoadExistingMatches = async () => {
    if (!userProfile) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/match?userId=${userProfile.userId}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to load matches');
      }

      const result = await response.json();
      setMatches(result.matches);
      setActiveTab('matches');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while loading matches');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateMatchStatus = async (matchId: string, status: 'accepted' | 'rejected' | 'active') => {
    try {
      const response = await fetch(`/api/match?matchId=${matchId}&status=${status}`, {
        method: 'PUT',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update match status');
      }

      // Update local state
      setMatches(prev => prev.map(match => 
        match.userId === matchId ? { ...match, status } : match
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update match status');
    }
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600';
    if (score >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCompatibilityLabel = (score: number) => {
    if (score >= 0.8) return 'Excellent Match';
    if (score >= 0.6) return 'Good Match';
    if (score >= 0.4) return 'Fair Match';
    return 'Poor Match';
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Users className="h-8 w-8" />
          Study Buddies
        </h1>
        <p className="text-muted-foreground">
          Find compatible study partners based on your learning patterns and knowledge gaps.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="find-matches">Find Matches</TabsTrigger>
          <TabsTrigger value="matches">My Matches</TabsTrigger>
          <TabsTrigger value="profile">My Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="find-matches" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Find Study Buddies
              </CardTitle>
              <CardDescription>
                Discover compatible study partners based on your learning patterns and knowledge gaps.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {userProfile && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Your Learning Profile</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Subjects:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {userProfile.learningPatterns.preferredSubjects.map((subject, index) => (
                            <Badge key={index} variant="secondary">{subject}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Study Style:</span>
                        <span className="ml-2 capitalize">{userProfile.learningPatterns.studyStyle}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Availability:</span>
                        <span className="ml-2 capitalize">{userProfile.learningPatterns.availability}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Experience Level:</span>
                        <span className="ml-2 capitalize">{userProfile.learningPatterns.experienceLevel}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Knowledge Gaps</h4>
                    <div className="space-y-2">
                      {userProfile.knowledgeGaps.map((gap, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg">
                          <span className="font-medium">{gap.topic}</span>
                          <div className="flex items-center gap-2">
                            <Progress value={gap.confidence * 100} className="w-20 h-2" />
                            <span className="text-sm text-muted-foreground">
                              {(gap.confidence * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <Button 
                  onClick={handleFindMatches} 
                  disabled={isFindingMatches}
                  className="flex-1"
                >
                  {isFindingMatches ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Finding Matches...
                    </>
                  ) : (
                    <>
                      <Users className="h-4 w-4 mr-2" />
                      Find New Matches
                    </>
                  )}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={handleLoadExistingMatches}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Clock className="h-4 w-4 mr-2" />
                  )}
                  Load Existing
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="matches" className="space-y-6">
          {matches.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Your Study Matches</h3>
                <Badge variant="outline">{matches.length} matches found</Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {matches.map((match, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Study Buddy #{match.userId}</CardTitle>
                        <Badge 
                          className={getCompatibilityColor(match.compatibilityScore)}
                          variant="outline"
                        >
                          {getCompatibilityLabel(match.compatibilityScore)}
                        </Badge>
                      </div>
                      <CardDescription>
                        Compatibility: {(match.compatibilityScore * 100).toFixed(0)}%
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Learning Style:</span>
                          <span className="capitalize">{match.learningStyle}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Availability:</span>
                          <span className="capitalize">{match.availability}</span>
                        </div>
                      </div>

                      {match.commonTopics.length > 0 && (
                        <div>
                          <h5 className="font-medium text-sm mb-2">Common Topics</h5>
                          <div className="flex flex-wrap gap-1">
                            {match.commonTopics.map((topic, topicIndex) => (
                              <Badge key={topicIndex} variant="secondary" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {match.suggestedActivities.length > 0 && (
                        <div>
                          <h5 className="font-medium text-sm mb-2">Suggested Activities</h5>
                          <ul className="space-y-1">
                            {match.suggestedActivities.slice(0, 3).map((activity, activityIndex) => (
                              <li key={activityIndex} className="text-sm text-muted-foreground flex items-start">
                                <span className="mr-2">•</span>
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex gap-2 pt-2">
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleUpdateMatchStatus(match.userId, 'accepted')}
                        >
                          <Heart className="h-4 w-4 mr-1" />
                          Connect
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleUpdateMatchStatus(match.userId, 'rejected')}
                        >
                          Pass
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Users className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Matches Yet</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Click "Find New Matches" to discover compatible study partners.
                </p>
                <Button onClick={() => setActiveTab('find-matches')}>
                  Find Matches
                </Button>
              </CardContent>
            </Card>
          )}

          {suggestedTopics.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  AI-Suggested Discussion Topics
                </CardTitle>
                <CardDescription>
                  Great conversation starters for your study sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {suggestedTopics.map((topic, index) => (
                    <div key={index} className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900">{topic.topic}</h4>
                      <p className="text-sm text-blue-700 mt-1">{topic.reason}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Learning Profile</CardTitle>
              <CardDescription>
                Your learning preferences and knowledge gaps used for matching
              </CardDescription>
            </CardHeader>
            <CardContent>
              {userProfile ? (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Learning Patterns</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm text-muted-foreground">Preferred Subjects</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {userProfile.learningPatterns.preferredSubjects.map((subject, index) => (
                              <Badge key={index} variant="secondary">{subject}</Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Study Style</span>
                          <p className="capitalize">{userProfile.learningPatterns.studyStyle}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm text-muted-foreground">Availability</span>
                          <p className="capitalize">{userProfile.learningPatterns.availability}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Experience Level</span>
                          <p className="capitalize">{userProfile.learningPatterns.experienceLevel}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Knowledge Gaps</h4>
                    <div className="space-y-3">
                      {userProfile.knowledgeGaps.map((gap, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                          <div>
                            <span className="font-medium">{gap.topic}</span>
                            <p className="text-sm text-muted-foreground">
                              Confidence level: {(gap.confidence * 100).toFixed(0)}%
                            </p>
                          </div>
                          <div className="w-32">
                            <Progress value={gap.confidence * 100} className="h-2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Loading profile...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
