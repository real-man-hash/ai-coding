'use client';

import { Radar, RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import type { RadarChartData } from '@/types';

interface RadarChartProps {
  data: RadarChartData[];
  width?: number;
  height?: number;
}

export function RadarChart({ data, width = 400, height = 300 }: RadarChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-muted-foreground">
        No data available for radar chart
      </div>
    );
  }

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={height}>
        <RechartsRadarChart data={data} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
          <PolarGrid />
          <PolarAngleAxis dataKey="topic" />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 1]} 
            tickCount={6}
            tickFormatter={(value) => `${Math.round(value * 100)}%`}
          />
          <Radar
            name="Confidence"
            dataKey="confidence"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}
