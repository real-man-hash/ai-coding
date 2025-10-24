'use client';

import { signOut } from 'next-auth/react';
import { useState } from 'react';

export function useSignOut() {
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async (callbackUrl: string = '/') => {
    if (isSigningOut) return; // 防止重复点击
    
    setIsSigningOut(true);
    console.log("🚪 Starting sign out process...");
    
    try {
      // 使用 signOut 并等待完成
      await signOut({ 
        callbackUrl,
        redirect: false // 不自动重定向，手动处理
      });
      
      console.log("✅ Sign out successful, redirecting...");
      // 手动重定向
      window.location.href = callbackUrl;
    } catch (error) {
      console.error("❌ Sign out error:", error);
      // 如果退出失败，强制重定向
      window.location.href = callbackUrl;
    } finally {
      setIsSigningOut(false);
    }
  };

  return {
    handleSignOut,
    isSigningOut
  };
}
