'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadarChart } from '@/components/ui/radar-chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Loader2, Upload, FileText, Brain, Image } from 'lucide-react';
import { ocrService } from '@/lib/services/ocr';
import type { AnalyzeResponse, RadarChartData } from '@/types';

export default function AnalyzePage() {
  const [content, setContent] = useState('');
  const [userAssessment, setUserAssessment] = useState<Record<string, number>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isProcessingOCR, setIsProcessingOCR] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!content.trim()) {
      setError('Please enter some content to analyze');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: content.trim(),
          userAssessment: Object.keys(userAssessment).length > 0 ? userAssessment : undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const result = await response.json();
      setAnalysisResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during analysis');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validation = ocrService.validateImageFile(file);
    if (!validation.valid) {
      setError(validation.error || 'Invalid file');
      return;
    }

    // Check if it's an image file
    if (file.type.startsWith('image/')) {
      setIsProcessingOCR(true);
      setError(null);
      
      try {
        const ocrResult = await ocrService.extractTextFromImage(file);
        setContent(ocrResult.text);
      } catch (err) {
        setError('Failed to process image. Please try again.');
      } finally {
        setIsProcessingOCR(false);
      }
    } else {
      // Handle text files
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setContent(text);
      };
      reader.readAsText(file);
    }
  };

  const convertToRadarData = (topics: Array<{ topic: string; confidence: number; isBlindSpot: boolean }>): RadarChartData[] => {
    return topics.map(topic => ({
      topic: topic.topic,
      confidence: topic.confidence,
      fullMark: 1,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Knowledge Gap Analysis</h1>
        <p className="text-muted-foreground">
          Upload your learning content and discover your knowledge blind spots with AI-powered analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Learning Content
            </CardTitle>
            <CardDescription>
              Paste your study material or upload a file for analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="file-upload" className="sr-only">
                Upload file
              </Label>
              <input
                id="file-upload"
                type="file"
                accept=".txt,.md,.pdf,.jpg,.jpeg,.png,.gif,.webp"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById('file-upload')?.click()}
                className="w-full"
                disabled={isProcessingOCR}
              >
                {isProcessingOCR ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing Image...
                  </>
                ) : (
                  <>
                    <Image className="h-4 w-4 mr-2" />
                    Upload File or Image
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground mt-1">
                Supports text files (.txt, .md, .pdf) and images (.jpg, .png, .gif, .webp)
              </p>
            </div>

            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Paste your learning content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[200px] mt-1"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}

            <Button 
              onClick={handleAnalyze} 
              disabled={isAnalyzing || !content.trim()}
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Analyze Content
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <div className="space-y-6">
          {analysisResult && (
            <>
              {/* Radar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Knowledge Gap Radar</CardTitle>
                  <CardDescription>
                    Visual representation of your knowledge areas and blind spots
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadarChart 
                    data={convertToRadarData(analysisResult.analysis.topics)}
                    width={400}
                    height={300}
                  />
                </CardContent>
              </Card>

              {/* Analysis Results */}
              <Card>
                <CardHeader>
                  <CardTitle>Analysis Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="blind-spots" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="blind-spots">Blind Spots</TabsTrigger>
                      <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="blind-spots" className="space-y-4">
                      <div className="space-y-2">
                        {analysisResult.blindSpots.length > 0 ? (
                          analysisResult.blindSpots.map((blindSpot, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                              <div>
                                <Badge variant="destructive" className="mr-2">
                                  Blind Spot
                                </Badge>
                                <span className="font-medium">{blindSpot.topic}</span>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Confidence: {(blindSpot.confidence * 100).toFixed(0)}%
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8 text-muted-foreground">
                            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>No blind spots detected! Great job!</p>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="analysis" className="space-y-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">AI Analysis</h4>
                          <p className="text-sm text-muted-foreground">
                            {analysisResult.analysis.analysis}
                          </p>
                        </div>
                        
                        {analysisResult.analysis.recommendations && analysisResult.analysis.recommendations.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-2">Recommendations</h4>
                            <ul className="space-y-1">
                              {analysisResult.analysis.recommendations.map((rec, index) => (
                                <li key={index} className="text-sm text-muted-foreground flex items-start">
                                  <span className="mr-2">•</span>
                                  {rec}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </>
          )}

          {!analysisResult && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Brain className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Ready to Analyze</h3>
                <p className="text-muted-foreground text-center">
                  Enter your learning content above and click "Analyze Content" to get started.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
