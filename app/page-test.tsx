'use client';

import Link from "next/link";
import { useSession, signOut } from 'next-auth/react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, BookOpen, Users, ArrowRight, LogOut, User } from "lucide-react";

export default function Home() {
  const { data: session, status } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        {session && (
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-700">欢迎回来，{session.user?.name}！</span>
              <Badge variant="secondary">{session.user?.email}</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="outline">
                  进入仪表板
                </Button>
              </Link>
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                退出登录
              </Button>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-linear-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            AI 学习伙伴雷达
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            通过 AI 驱动的学习分析，自动识别知识盲区、生成记忆卡，并智能匹配最合拍的学习搭子
          </p>
          {!session && (
            <div className="flex gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="text-lg px-8">
                  免费注册
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link href="/auth/signin">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  立即登录
                </Button>
              </Link>
            </div>
          )}
          {session && (
            <div className="flex gap-4 justify-center">
              <Link href="/analyze">
                <Button size="lg" className="text-lg px-8">
                  <Brain className="h-5 w-5 mr-2" />
                  开始分析
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  查看仪表板
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>AI 知识盲区雷达</CardTitle>
              <CardDescription>
                上传学习内容，AI 自动分析并识别你的知识盲区
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• 智能文本分析</li>
                <li>• 图像 OCR 识别</li>
                <li>• 可视化雷达图</li>
                <li>• 个性化建议</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>AI 记忆卡生成</CardTitle>
              <CardDescription>
                基于盲区分析自动生成高质量的问答记忆卡
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• 智能问答生成</li>
                <li>• 翻转动画效果</li>
                <li>• Anki 格式导出</li>
                <li>• 多难度级别</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>学习搭子匹配</CardTitle>
              <CardDescription>
                根据学习模式和知识结构智能匹配学习伙伴
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• 智能匹配算法</li>
                <li>• 相似盲区分析</li>
                <li>• AI 推荐话题</li>
                <li>• 学习社群</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* How it Works */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-8">如何工作</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">上传内容</h3>
              <p className="text-sm text-muted-foreground">上传学习资料或粘贴文本内容</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">AI 分析</h3>
              <p className="text-sm text-muted-foreground">AI 识别知识点和盲区</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">生成卡片</h3>
              <p className="text-sm text-muted-foreground">自动生成记忆卡和练习题</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="font-semibold mb-2">匹配搭子</h3>
              <p className="text-sm text-muted-foreground">找到志同道合的学习伙伴</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-2xl p-12 shadow-lg">
          {session ? (
            <>
              <h2 className="text-3xl font-bold mb-4">继续你的智能学习之旅</h2>
              <p className="text-lg text-muted-foreground mb-8">
                欢迎回来，{session.user?.name}！让 AI 继续成为你的学习伙伴
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/analyze">
                  <Button size="lg" className="text-lg px-8">
                    <Brain className="h-5 w-5 mr-2" />
                    开始分析
                  </Button>
                </Link>
                <Link href="/cards">
                  <Button size="lg" variant="outline" className="text-lg px-8">
                    <BookOpen className="h-5 w-5 mr-2" />
                    学习卡片
                  </Button>
                </Link>
                <Link href="/buddies">
                  <Button size="lg" variant="outline" className="text-lg px-8">
                    <Users className="h-5 w-5 mr-2" />
                    寻找伙伴
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-4">开始你的智能学习之旅</h2>
              <p className="text-lg text-muted-foreground mb-8">
                让 AI 成为你的学习伙伴，让学习不再孤独、不再盲目
              </p>
              <Link href="/analyze">
                <Button size="lg" className="text-lg px-8">
                  <Brain className="h-5 w-5 mr-2" />
                  立即开始分析
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}