import { Trophy, Flame, Star, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface GamificationBarProps {
  xp: number
  level: number
  streak: number
  nextLevelXp: number
  className?: string
}

export function GamificationBar({ xp, level, streak, nextLevelXp, className = "" }: GamificationBarProps) {
  const progressToNext = ((xp % 1000) / 1000) * 100

  return (
    <Card className={`${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="flex items-center gap-1 mb-1">
                <Star className="h-4 w-4 text-sky-400" />
                <div className="text-xl font-bold text-sky-300">{xp.toLocaleString()}</div>
              </div>
              <div className="text-xs text-white/80">XP Points</div>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-1 mb-1">
                <Trophy className="h-4 w-4 text-indigo-400" />
                <div className="text-xl font-bold text-indigo-300">Level {level}</div>
              </div>
              <div className="text-xs text-white/80">Scholar</div>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-1 mb-1">
                <Flame className="h-4 w-4 text-violet-400" />
                <div className="text-xl font-bold text-violet-300">{streak}</div>
              </div>
              <div className="text-xs text-white/80">Day Streak</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm text-white/80 mb-1">
                {nextLevelXp - (xp % 1000)} XP to Level {level + 1}
              </div>
              <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden border border-white/10">
                <div
                  className="h-full neon-progress rounded-full transition-[width] duration-700 ease-out"
                  style={{ width: `${progressToNext}%` }}
                />
              </div>
            </div>
            <Badge variant="outline" className="bg-sky-500/20 text-sky-300 border-sky-400/30">
              <TrendingUp className="h-3 w-3 mr-1" />+{Math.floor(Math.random() * 50) + 10}% this week
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
