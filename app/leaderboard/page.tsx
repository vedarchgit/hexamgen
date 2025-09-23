"use client"

import { ArrowLeft, Trophy, Medal, Crown, Star, Target, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

const LEADERBOARD_DATA = [
  {
    rank: 1,
    name: "Arjun Sharma",
    year: "TE",
    xp: 15420,
    level: 18,
    streak: 45,
    quizzes: 234,
    accuracy: 94,
    avatar: "/student-avatar.png",
    badge: "Scholar Supreme",
  },
  {
    rank: 2,
    name: "Priya Patel",
    year: "BE",
    xp: 14890,
    level: 17,
    streak: 38,
    quizzes: 198,
    accuracy: 92,
    avatar: "/female-student-avatar.png",
    badge: "Quiz Master",
  },
  {
    rank: 3,
    name: "Rohit Desai",
    year: "SE",
    xp: 13750,
    level: 16,
    streak: 42,
    quizzes: 187,
    accuracy: 89,
    avatar: "/male-student-avatar.png",
    badge: "Code Warrior",
  },
  {
    rank: 4,
    name: "Sneha Kulkarni",
    year: "TE",
    xp: 12980,
    level: 15,
    streak: 29,
    quizzes: 165,
    accuracy: 91,
    avatar: "/female-student-avatar.png",
    badge: "AI Enthusiast",
  },
  {
    rank: 5,
    name: "Vikram Singh",
    year: "BE",
    xp: 12340,
    level: 15,
    streak: 33,
    quizzes: 156,
    accuracy: 88,
    avatar: "/male-student-avatar.png",
    badge: "Network Ninja",
  },
]

const ACHIEVEMENTS = [
  {
    title: "First Steps",
    description: "Complete your first quiz",
    icon: Target,
    unlocked: true,
    rarity: "Common",
    xp: 50,
  },
  {
    title: "Week Warrior",
    description: "Maintain a 7-day streak",
    icon: Flame,
    unlocked: true,
    rarity: "Uncommon",
    xp: 200,
  },
  {
    title: "Century Club",
    description: "Complete 100 quizzes",
    icon: Trophy,
    unlocked: true,
    rarity: "Rare",
    xp: 500,
  },
  {
    title: "Perfect Score",
    description: "Score 100% on a Hard quiz",
    icon: Star,
    unlocked: false,
    rarity: "Epic",
    xp: 1000,
  },
  {
    title: "SPPU Legend",
    description: "Reach Level 20",
    icon: Crown,
    unlocked: false,
    rarity: "Legendary",
    xp: 2000,
  },
]

const WEEKLY_CHALLENGES = [
  {
    title: "DSA Marathon",
    description: "Complete 10 DSA quizzes this week",
    progress: 7,
    total: 10,
    xp: 500,
    timeLeft: "2 days",
  },
  {
    title: "Perfect Streak",
    description: "Maintain daily quiz streak for 7 days",
    progress: 5,
    total: 7,
    xp: 300,
    timeLeft: "2 days",
  },
  {
    title: "Subject Master",
    description: "Score 90%+ in 5 different subjects",
    progress: 3,
    total: 5,
    xp: 400,
    timeLeft: "4 days",
  },
]

export default function LeaderboardPage() {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-400" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-300" />
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-white/60">#{rank}</span>
    }
  }

  const getYearBadgeColor = (year: string) => {
    switch (year) {
      case "FE":
        return "bg-blue-500/20 text-blue-300 border-blue-400/30"
      case "SE":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-400/30"
      case "TE":
        return "bg-amber-500/20 text-amber-300 border-amber-400/30"
      case "BE":
        return "bg-purple-500/20 text-purple-300 border-purple-400/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-400/30"
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "bg-gray-500/20 text-gray-300 border-gray-400/30"
      case "Uncommon":
        return "bg-green-500/20 text-green-300 border-green-400/30"
      case "Rare":
        return "bg-blue-500/20 text-blue-300 border-blue-400/30"
      case "Epic":
        return "bg-purple-500/20 text-purple-300 border-purple-400/30"
      case "Legendary":
        return "bg-amber-500/20 text-amber-300 border-amber-400/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-400/30"
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/cosmic-background.jpeg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/60 via-black/40 to-purple-900/30" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6 bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <Trophy className="h-6 w-6 text-amber-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">Leaderboard</h1>
              <p className="text-sm text-amber-200/80">SPPU Champions</p>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 p-6">
        <Tabs defaultValue="leaderboard" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 bg-white/10 backdrop-blur-sm">
            <TabsTrigger
              value="leaderboard"
              className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-300"
            >
              Leaderboard
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-300"
            >
              Achievements
            </TabsTrigger>
            <TabsTrigger
              value="challenges"
              className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-300"
            >
              Challenges
            </TabsTrigger>
          </TabsList>

          <TabsContent value="leaderboard" className="space-y-6">
            {/* Your Rank Card */}
            <Card className="bg-gradient-to-r from-amber-500/20 to-emerald-500/20 backdrop-blur-sm border-amber-400/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-amber-400">#12</div>
                      <div className="text-sm text-white/80">Your Rank</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-400">8,450</div>
                      <div className="text-sm text-white/80">XP Points</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">Level 12</div>
                      <div className="text-sm text-white/80">Scholar</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">2,550 XP to next rank</div>
                    <Progress value={75} className="w-32 h-2 mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Performers */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white text-center">Top SPPU Performers</h2>
              {LEADERBOARD_DATA.map((user, index) => (
                <Card
                  key={index}
                  className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12">{getRankIcon(user.rank)}</div>
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-white">{user.name}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={getYearBadgeColor(user.year)}>
                              {user.year}
                            </Badge>
                            <Badge variant="outline" className="bg-amber-500/20 text-amber-300 border-amber-400/30">
                              {user.badge}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-6 text-center">
                        <div>
                          <div className="text-lg font-bold text-amber-400">{user.xp.toLocaleString()}</div>
                          <div className="text-xs text-white/60">XP</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-emerald-400">L{user.level}</div>
                          <div className="text-xs text-white/60">Level</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-red-400">{user.streak}</div>
                          <div className="text-xs text-white/60">Streak</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-blue-400">{user.accuracy}%</div>
                          <div className="text-xs text-white/60">Accuracy</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Your Achievements</h2>
              <p className="text-white/70">Unlock badges by completing challenges and reaching milestones</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ACHIEVEMENTS.map((achievement, index) => (
                <Card
                  key={index}
                  className={`backdrop-blur-sm border-white/20 transition-all duration-300 hover:scale-105 ${
                    achievement.unlocked
                      ? "bg-gradient-to-br from-amber-500/20 to-emerald-500/20 border-amber-400/30"
                      : "bg-white/5 border-white/10 opacity-60"
                  }`}
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                        achievement.unlocked ? "bg-amber-500/30" : "bg-white/10"
                      }`}
                    >
                      <achievement.icon
                        className={`h-8 w-8 ${achievement.unlocked ? "text-amber-400" : "text-white/40"}`}
                      />
                    </div>
                    <h3 className="font-semibold text-white mb-2">{achievement.title}</h3>
                    <p className="text-white/70 text-sm mb-3">{achievement.description}</p>
                    <div className="flex items-center justify-center gap-2">
                      <Badge variant="outline" className={getRarityColor(achievement.rarity)}>
                        {achievement.rarity}
                      </Badge>
                      <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                        {achievement.xp} XP
                      </Badge>
                    </div>
                    {achievement.unlocked && (
                      <Badge className="mt-3 bg-emerald-500/20 text-emerald-300 border-emerald-400/30">Unlocked!</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Weekly Challenges</h2>
              <p className="text-white/70">Complete challenges to earn bonus XP and exclusive badges</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {WEEKLY_CHALLENGES.map((challenge, index) => (
                <Card
                  key={index}
                  className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-white text-lg">{challenge.title}</CardTitle>
                      <Badge variant="outline" className="bg-purple-500/20 text-purple-300 border-purple-400/30">
                        {challenge.timeLeft}
                      </Badge>
                    </div>
                    <p className="text-white/70 text-sm">{challenge.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Progress</span>
                        <span className="text-white">
                          {challenge.progress}/{challenge.total}
                        </span>
                      </div>
                      <Progress value={(challenge.progress / challenge.total) * 100} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-amber-500/20 text-amber-300 border-amber-400/30">
                        {challenge.xp} XP Reward
                      </Badge>
                      <Button
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        disabled={challenge.progress >= challenge.total}
                      >
                        {challenge.progress >= challenge.total ? "Completed" : "Continue"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
