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
        throw new Error('Failed to load cards');
      }

      const data = await response.json();
      setCards(data.cards || []);
      
      // Extract unique topics
      const uniqueTopics = [...new Set(data.cards?.map((card: Flashcard) => card.relatedTopic) || [])];
      setTopics(uniqueTopics);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load cards');
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
        throw new Error(errorData.error || 'Failed to generate cards');
      }

      const result = await response.json();
      setCards(prev => [...prev, ...result.cards]);
      
      // Update topics
      const newTopics = [...new Set([...topics, ...result.cards.map((card: Flashcard) => card.relatedTopic)])];
      setTopics(newTopics);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate cards');
    } finally {
      setIsGenerating(false);
    }
  };

  const exportToAnki = async () => {
    try {
      setIsExporting(true);
      const response = await fetch(`/api/generate-cards/export?userId=1${selectedTopic !== 'all' ? `&topic=${selectedTopic}` : ''}`);
      
      if (!response.ok) {
        throw new Error('Failed to export cards');
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
      setError(err instanceof Error ? err.message : 'Failed to export cards');
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
        throw new Error('Failed to delete card');
      }

      setCards(prev => prev.filter(card => card.id !== cardId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete card');
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
          <span className="ml-2">Loading cards...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Memory Cards</h1>
        <p className="text-muted-foreground">
          Study with AI-generated memory cards based on your knowledge gaps.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Study Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Filter by Topic</label>
                <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Topics</SelectItem>
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
                  Shuffle
                </Button>
                <Button onClick={generateCards} disabled={isGenerating} size="sm">
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Generate Cards
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
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Export to Anki
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Cards</span>
                  <span className="font-medium">{cards.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Filtered Cards</span>
                  <span className="font-medium">{filteredCards.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Topics</span>
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
                Study with Others
              </CardTitle>
              <CardDescription>
                Find study partners to practice these cards together
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Studying with others can help reinforce your learning and make it more engaging.
                </p>
                <Link href="/buddies">
                  <Button variant="outline" className="w-full">
                    <Users className="h-4 w-4 mr-2" />
                    Find Study Buddies
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
                <h3 className="text-lg font-medium mb-2">No Cards Available</h3>
                <p className="text-muted-foreground text-center mb-4">
                  {selectedTopic === 'all' 
                    ? "Generate some cards to get started with studying."
                    : `No cards found for topic "${selectedTopic}".`
                  }
                </p>
                <Button onClick={generateCards} disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Generate Cards
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
                  Card {currentCardIndex + 1} of {filteredCards.length}
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={prevCard} 
                    disabled={currentCardIndex === 0}
                    variant="outline"
                    size="sm"
                  >
                    Previous
                  </Button>
                  <Button 
                    onClick={nextCard} 
                    disabled={currentCardIndex === filteredCards.length - 1}
                    variant="outline"
                    size="sm"
                  >
                    Next
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
                                <h3 className="font-medium mb-2 text-muted-foreground">Answer:</h3>
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
                                <h3 className="font-medium mb-2 text-muted-foreground">Question:</h3>
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
                          {isFlipped ? 'Show Question' : 'Show Answer'}
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
