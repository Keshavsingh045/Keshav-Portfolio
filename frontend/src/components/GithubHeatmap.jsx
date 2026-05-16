import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import TiltCard from './TiltCard';
import { Activity } from 'lucide-react';

export default function GithubHeatmap() {
  // Custom theme to match the dark blue/glassmorphism vibe
  const explicitTheme = {
    light: ['#1e293b', '#3b82f6', '#2563eb', '#1d4ed8', '#1e3a8a'],
    dark: ['#0f172a', '#1e3a8a', '#1d4ed8', '#2563eb', '#3b82f6'],
  };

  return (
    <TiltCard>
      <div className="glass-panel p-8 md:p-12 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-700"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h3 className="text-3xl font-black text-white flex items-center gap-3 tracking-tight">
              <Activity className="text-blue-500" size={32} />
              Open Source Activity
            </h3>
            <p className="text-slate-400 mt-2 font-medium">Real-time GitHub Contributions</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm font-bold text-slate-300">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Live Data API
          </div>
        </div>

        <div className="relative z-10 w-full overflow-x-auto pb-4 custom-scrollbar">
          <div className="min-w-[750px] flex justify-center p-4 bg-slate-950/50 rounded-xl border border-slate-800/50">
            <GitHubCalendar 
              username="Keshavsingh045" 
              colorScheme="dark"
              theme={explicitTheme}
              fontSize={14}
              blockSize={14}
              blockMargin={6}
              hideColorLegend={false}
              hideMonthLabels={false}
              hideTotalCount={false}
            />
          </div>
        </div>
      </div>
    </TiltCard>
  );
}
