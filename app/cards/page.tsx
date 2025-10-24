'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Download, Shuffle, Plus, Trash2, BookOpen, Users } from 'lucide-react';
import Link from 'next/link';
import type { Flashcard } from '@/types';

export default function CardsPage() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [filteredCards, setFilteredCards] = useState<Flashcard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [topics, setTopics] = useState<string[]>([]);

  useEffect(() => {
    loadCards();
  }, []);

  useEffect(() => {
    filterCards();
  }, [cards, selectedTopic]);

  const loadCards = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/generate-cards?userId=1');
      
      if (!response.ok) {
        throw new Error('加载卡片失败');
      }

      const data = await response.json();
      setCards(data.cards || []);
      
      // Extract unique topics
      const uniqueTopics = [...new Set(data.cards?.map((card: Flashcard) => card.relatedTopic) || [])];
      setTopics(uniqueTopics);
    } catch (err) {
      setError(err instanceof Error ? err.message : '加载卡片失败');
    } finally {
      setIsLoading(false);
    }
  };

  const filterCards = () => {
    if (selectedTopic === 'all') {
      setFilteredCards(cards);
    } else {
      setFilteredCards(cards.filter(card => card.relatedTopic === selectedTopic));
    }
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  const generateCards = async () => {
    try {
      setIsGenerating(true);
      setError(null);

      const response = await fetch('/api/generate-cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topics: ['mathematics', 'programming', 'science'],
          difficulty: 'intermediate'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '生成卡片失败');
      }

      const result = await response.json();
      setCards(prev => [...prev, ...result.cards]);
      
      // Update topics
      const newTopics = [...new Set([...topics, ...result.cards.map((card: Flashcard) => card.relatedTopic)])];
      setTopics(newTopics);
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成卡片失败');
    } finally {
      setIsGenerating(false);
    }
  };

  const exportToAnki = async () => {
    try {
      setIsExporting(true);
      const response = await fetch(`/api/generate-cards/export?userId=1${selectedTopic !== 'all' ? `&topic=${selectedTopic}` : ''}`);
      
      if (!response.ok) {
        throw new Error('导出卡片失败');
      }

      const csvContent = await response.text();
      
      // Download CSV file
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `anki-cards-${selectedTopic === 'all' ? 'all' : selectedTopic}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : '导出卡片失败');
    } finally {
      setIsExporting(false);
    }
  };

  const deleteCard = async (cardId: number) => {
    try {
      const response = await fetch(`/api/generate-cards?userId=1&cardId=${cardId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('删除卡片失败');
      }

      setCards(prev => prev.filter(card => card.id !== cardId));
    } catch (err) {
      setError(err instanceof Error ? err.message : '删除卡片失败');
    }
  };

  const shuffleCards = () => {
    const shuffled = [...filteredCards].sort(() => Math.random() - 0.5);
    setFilteredCards(shuffled);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  const nextCard = () => {
    if (currentCardIndex < filteredCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">加载卡片中...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">记忆卡片</h1>
        <p className="text-muted-foreground">
          使用基于你知识盲区的AI生成记忆卡片进行学习。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                学习控制
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">按主题筛选</label>
                <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择主题" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">所有主题</SelectItem>
                    {topics.map(topic => (
                      <SelectItem key={topic} value={topic}>
                        {topic}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button onClick={shuffleCards} variant="outline" size="sm">
                  <Shuffle className="h-4 w-4 mr-2" />
                  打乱
                </Button>
                <Button onClick={generateCards} disabled={isGenerating} size="sm">
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      生成中...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      生成卡片
                    </>
                  )}
                </Button>
              </div>

              <Button 
                onClick={exportToAnki} 
                disabled={isExporting || filteredCards.length === 0}
                variant="outline"
                className="w-full"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    导出中...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    导出到 Anki
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle>统计信息</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">总卡片数</span>
                  <span className="font-medium">{cards.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">筛选后卡片</span>
                  <span className="font-medium">{filteredCards.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">主题数</span>
                  <span className="font-medium">{topics.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Integration with Study Buddies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                与他人学习
              </CardTitle>
              <CardDescription>
                寻找学习伙伴一起练习这些卡片
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  与他人一起学习可以加强你的学习效果，让学习更有趣。
                </p>
                <Link href="/buddies">
                  <Button variant="outline" className="w-full">
                    <Users className="h-4 w-4 mr-2" />
                    寻找学习伙伴
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Card Display */}
        <div className="lg:col-span-2">
          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {filteredCards.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <BookOpen className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">暂无卡片</h3>
                <p className="text-muted-foreground text-center mb-4">
                  {selectedTopic === 'all' 
                    ? "生成一些卡片开始学习。"
                    : `主题"${selectedTopic}"下没有找到卡片。`
                  }
                </p>
                <Button onClick={generateCards} disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      生成中...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      生成卡片
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Card Navigation */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  第 {currentCardIndex + 1} 张，共 {filteredCards.length} 张
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={prevCard} 
                    disabled={currentCardIndex === 0}
                    variant="outline"
                    size="sm"
                  >
                    上一张
                  </Button>
                  <Button 
                    onClick={nextCard} 
                    disabled={currentCardIndex === filteredCards.length - 1}
                    variant="outline"
                    size="sm"
                  >
                    下一张
                  </Button>
                </div>
              </div>

              {/* Flashcard */}
              <motion.div
                key={currentCardIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="min-h-[300px]">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="secondary">
                        {filteredCards[currentCardIndex]?.relatedTopic}
                      </Badge>
                      <Button
                        onClick={() => deleteCard(filteredCards[currentCardIndex].id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="text-center space-y-4">
                      <div className="min-h-[200px] flex items-center justify-center">
                        <motion.div
                          key={isFlipped ? 'answer' : 'question'}
                          initial={{ rotateY: 90, opacity: 0 }}
                          animate={{ rotateY: 0, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="text-lg"
                        >
                          <AnimatePresence mode="wait">
                            {isFlipped ? (
                              <motion.div
                                key="answer"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <h3 className="font-medium mb-2 text-muted-foreground">答案：</h3>
                                <p>{filteredCards[currentCardIndex]?.answer}</p>
                              </motion.div>
                            ) : (
                              <motion.div
                                key="question"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <h3 className="font-medium mb-2 text-muted-foreground">问题：</h3>
                                <p>{filteredCards[currentCardIndex]?.question}</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button onClick={flipCard} className="w-full">
                          {isFlipped ? '显示问题' : '显示答案'}
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
