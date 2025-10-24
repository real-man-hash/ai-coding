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
        throw new Error(errorData.error || '查找匹配失败');
      }

      const result: MatchingResponse = await response.json();
      setMatches(result.matches);
      setSuggestedTopics(result.suggestedTopics);
      setActiveTab('matches');
    } catch (err) {
      setError(err instanceof Error ? err.message : '查找匹配时发生错误');
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
        throw new Error(errorData.error || '加载匹配失败');
      }

      const result = await response.json();
      setMatches(result.matches);
      setActiveTab('matches');
    } catch (err) {
      setError(err instanceof Error ? err.message : '加载匹配时发生错误');
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
        throw new Error(errorData.error || '更新匹配状态失败');
      }

      // Update local state
      setMatches(prev => prev.map(match => 
        match.userId === matchId ? { ...match, status } : match
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : '更新匹配状态失败');
    }
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600';
    if (score >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCompatibilityLabel = (score: number) => {
    if (score >= 0.8) return '完美匹配';
    if (score >= 0.6) return '良好匹配';
    if (score >= 0.4) return '一般匹配';
    return '较差匹配';
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Users className="h-8 w-8" />
          学习伙伴
        </h1>
        <p className="text-muted-foreground">
          基于你的学习模式和知识盲区找到合适的学习伙伴。
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="find-matches">查找匹配</TabsTrigger>
          <TabsTrigger value="matches">我的匹配</TabsTrigger>
          <TabsTrigger value="profile">我的资料</TabsTrigger>
        </TabsList>

        <TabsContent value="find-matches" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                寻找学习伙伴
              </CardTitle>
              <CardDescription>
                基于你的学习模式和知识盲区发现合适的学习伙伴。
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {userProfile && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">你的学习资料</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">科目：</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {userProfile.learningPatterns.preferredSubjects.map((subject, index) => (
                            <Badge key={index} variant="secondary">{subject}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">学习风格：</span>
                        <span className="ml-2 capitalize">{userProfile.learningPatterns.studyStyle}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">可用时间：</span>
                        <span className="ml-2 capitalize">{userProfile.learningPatterns.availability}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">经验水平：</span>
                        <span className="ml-2 capitalize">{userProfile.learningPatterns.experienceLevel}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">知识盲区</h4>
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
                      查找匹配中...
                    </>
                  ) : (
                    <>
                      <Users className="h-4 w-4 mr-2" />
                      查找新匹配
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
                  加载现有
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="matches" className="space-y-6">
          {matches.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">你的学习匹配</h3>
                <Badge variant="outline">找到 {matches.length} 个匹配</Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {matches.map((match, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">学习伙伴 #{match.userId}</CardTitle>
                        <Badge 
                          className={getCompatibilityColor(match.compatibilityScore)}
                          variant="outline"
                        >
                          {getCompatibilityLabel(match.compatibilityScore)}
                        </Badge>
                      </div>
                      <CardDescription>
                        兼容性: {(match.compatibilityScore * 100).toFixed(0)}%
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">学习风格：</span>
                          <span className="capitalize">{match.learningStyle}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">可用时间：</span>
                          <span className="capitalize">{match.availability}</span>
                        </div>
                      </div>

                      {match.commonTopics.length > 0 && (
                        <div>
                          <h5 className="font-medium text-sm mb-2">共同话题</h5>
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
                          <h5 className="font-medium text-sm mb-2">建议活动</h5>
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
                          连接
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleUpdateMatchStatus(match.userId, 'rejected')}
                        >
                          跳过
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
                <h3 className="text-lg font-medium mb-2">暂无匹配</h3>
                <p className="text-muted-foreground text-center mb-4">
                  点击"查找新匹配"来发现合适的学习伙伴。
                </p>
                <Button onClick={() => setActiveTab('find-matches')}>
                  查找匹配
                </Button>
              </CardContent>
            </Card>
          )}

          {suggestedTopics.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  AI 建议讨论话题
                </CardTitle>
                <CardDescription>
                  为你的学习会话提供很好的对话开场白
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
              <CardTitle>我的学习资料</CardTitle>
              <CardDescription>
                用于匹配的学习偏好和知识盲区
              </CardDescription>
            </CardHeader>
            <CardContent>
              {userProfile ? (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">学习模式</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm text-muted-foreground">偏好科目</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {userProfile.learningPatterns.preferredSubjects.map((subject, index) => (
                              <Badge key={index} variant="secondary">{subject}</Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">学习风格</span>
                          <p className="capitalize">{userProfile.learningPatterns.studyStyle}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm text-muted-foreground">可用时间</span>
                          <p className="capitalize">{userProfile.learningPatterns.availability}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">经验水平</span>
                          <p className="capitalize">{userProfile.learningPatterns.experienceLevel}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">知识盲区</h4>
                    <div className="space-y-3">
                      {userProfile.knowledgeGaps.map((gap, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                          <div>
                            <span className="font-medium">{gap.topic}</span>
                            <p className="text-sm text-muted-foreground">
                              置信度: {(gap.confidence * 100).toFixed(0)}%
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
                  <p>加载资料中...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
