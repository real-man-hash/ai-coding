'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadarChart } from '@/components/ui/radar-chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Loader2, Upload, FileText, Brain, Image, Users } from 'lucide-react';
import Link from 'next/link';
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
      setError('请输入要分析的内容');
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
        throw new Error(errorData.error || '分析失败');
      }

      const result = await response.json();
      setAnalysisResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : '分析过程中发生错误');
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
      setError(validation.error || '无效文件');
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
        setError('图像处理失败，请重试。');
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
        <h1 className="text-3xl font-bold mb-2">AI 知识盲区分析</h1>
        <p className="text-muted-foreground">
          上传你的学习内容，通过AI驱动的分析发现你的知识盲区。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              学习内容
            </CardTitle>
            <CardDescription>
              粘贴你的学习材料或上传文件进行分析
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="file-upload" className="sr-only">
                上传文件
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
                    处理图像中...
                  </>
                ) : (
                  <>
                    <Image className="h-4 w-4 mr-2" />
                    上传文件或图像
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground mt-1">
                支持文本文件 (.txt, .md, .pdf) 和图像 (.jpg, .png, .gif, .webp)
              </p>
            </div>

            <div>
              <Label htmlFor="content">内容</Label>
              <Textarea
                id="content"
                placeholder="在此粘贴你的学习内容..."
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
                  分析中...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  分析内容
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
                  <CardTitle>知识盲区雷达图</CardTitle>
                  <CardDescription>
                    你的知识领域和盲区的可视化表示
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
                  <CardTitle>分析结果</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="blind-spots" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="blind-spots">盲区</TabsTrigger>
                      <TabsTrigger value="analysis">AI 分析</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="blind-spots" className="space-y-4">
                      <div className="space-y-2">
                        {analysisResult.blindSpots.length > 0 ? (
                          analysisResult.blindSpots.map((blindSpot, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                              <div>
                                <Badge variant="destructive" className="mr-2">
                                  盲区
                                </Badge>
                                <span className="font-medium">{blindSpot.topic}</span>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                置信度: {(blindSpot.confidence * 100).toFixed(0)}%
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8 text-muted-foreground">
                            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>未检测到盲区！做得很好！</p>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="analysis" className="space-y-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">AI 分析</h4>
                          <p className="text-sm text-muted-foreground">
                            {analysisResult.analysis.analysis}
                          </p>
                        </div>
                        
                        {analysisResult.analysis.recommendations && analysisResult.analysis.recommendations.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-2">建议</h4>
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

              {/* Integration with Study Buddies */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    寻找学习伙伴
                  </CardTitle>
                  <CardDescription>
                    与有相似知识盲区的其他学习者建立联系
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      基于你的分析，与有相似学习目标的其他人一起学习可能会对你有益。
                    </p>
                    <div className="flex gap-2">
                      <Link href="/buddies">
                        <Button>
                          <Users className="h-4 w-4 mr-2" />
                          寻找学习伙伴
                        </Button>
                      </Link>
                      <Link href="/cards">
                        <Button variant="outline">
                          <FileText className="h-4 w-4 mr-2" />
                          生成卡片
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {!analysisResult && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Brain className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">准备分析</h3>
                <p className="text-muted-foreground text-center">
                  在上方输入你的学习内容，然后点击"分析内容"开始。
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
