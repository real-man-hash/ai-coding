'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-linear-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            AI 学习伙伴雷达
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            通过 AI 驱动的学习分析，自动识别知识盲区、生成记忆卡，并智能匹配最合拍的学习搭子
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="text-lg px-8">
                免费注册
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button size="lg" variant="outline" className="text-lg px-8">
                立即登录
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
