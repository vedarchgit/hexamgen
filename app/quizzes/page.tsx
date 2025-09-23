"use client"

import { ArrowLeft, Clock, Trophy, Target, Play, Users, Star, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { useState } from "react"

const SPPU_QUIZ_CATEGORIES = [
  { id: "all", name: "All Quizzes", count: 156 },
  { id: "FE", name: "First Year", count: 32 },
  { id: "SE", name: "Second Year", count: 45 },
  { id: "TE", name: "Third Year", count: 42 },
  { id: "BE", name: "Final Year", count: 37 },
]

const FEATURED_QUIZZES = [
  {
    title: "Data Structures Mastery Challenge",
    subject: "Data Structures & Algorithms",
    year: "SE",
    difficulty: "Hard",
    questions: 30,
    duration: "60 min",
    participants: 2847,
    rating: 4.9,
    progress: 0,
    color: "bg-red-500",
    streak: 15,
  },
  {
    title: "AI/ML Fundamentals Quiz",
    subject: "Artificial Intelligence",
    year: "TE",
    difficulty: "Medium",
    questions: 25,
    duration: "45 min",
    participants: 1892,
    rating: 4.7,
    progress: 40,
    color: "bg-purple-500",
    streak: 8,
  },
  {
    title: "Computer Networks Deep Dive",
    subject: "Computer Networks",
    year: "TE",
    difficulty: "Hard",
    questions: 28,
    duration: "50 min",
    participants: 1456,
    rating: 4.8,
    progress: 0,
    color: "bg-emerald-500",
    streak: 12,
  },
]

const DAILY_CHALLENGES = [
  { title: "SPPU SE DSA Daily", questions: 15, duration: "20 min", difficulty: "Medium", xp: 150, streak: 7 },
  { title: "TE Networks Quick Test", questions: 10, duration: "15 min", difficulty: "Easy", xp: 100, streak: 3 },
  { title: "BE ML Sprint Challenge", questions: 12, duration: "18 min", difficulty: "Hard", xp: 200, streak: 5 },
  { title: "FE Programming Basics", questions: 8, duration: "12 min", difficulty: "Easy", xp: 80, streak: 12 },
]

export default function QuizzesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "Hard":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
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
            <Trophy className="h-6 w-6 text-emerald-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">Daily Quiz</h1>
              <p className="text-sm text-emerald-200/80">Gamified Learning for SPPU</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-200 border-emerald-400/30">
            <Flame className="h-4 w-4 mr-1" />7 Day Streak
          </Badge>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <Trophy className="h-4 w-4 mr-2" />
            Leaderboard
          </Button>
        </div>
      </header>

      <main className="relative z-10 p-6 space-y-8">
        {/* Category Filter */}
        <section>
          <div className="flex flex-wrap gap-2 justify-center">
            {SPPU_QUIZ_CATEGORIES.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={
                  selectedCategory === category.id
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "text-white hover:bg-white/10"
                }
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
        </section>

        {/* Daily Challenges */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-6 text-center">Today's Challenges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {DAILY_CHALLENGES.map((quiz, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-emerald-500/20 to-amber-500/20 backdrop-blur-sm border-emerald-400/30 hover:from-emerald-500/30 hover:to-amber-500/30 transition-all duration-300 hover:scale-105"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="bg-amber-500/20 text-amber-300 border-amber-400/30">
                      Daily
                    </Badge>
                    <div className="flex items-center gap-1 text-amber-300">
                      <Flame className="h-4 w-4" />
                      <span className="text-sm font-bold">{quiz.streak}</span>
                    </div>
                  </div>
                  <CardTitle className="text-white text-base leading-tight">{quiz.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm text-white/60">
                    <div className="flex justify-between">
                      <span>Questions:</span>
                      <span className="text-white">{quiz.questions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="text-white">{quiz.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>XP Reward:</span>
                      <span className="text-amber-300 font-bold">{quiz.xp} XP</span>
                    </div>
                  </div>
                  <Badge variant="outline" className={getDifficultyColor(quiz.difficulty) + " w-full justify-center"}>
                    {quiz.difficulty}
                  </Badge>
                  <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                    <Play className="h-3 w-3 mr-2" />
                    Start Challenge
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Quizzes */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-6 text-center">Featured SPPU Quizzes</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {FEATURED_QUIZZES.map((quiz, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex gap-2">
                      <Badge variant="outline" className={getYearBadgeColor(quiz.year)}>
                        {quiz.year}
                      </Badge>
                      <Badge variant="outline" className={getDifficultyColor(quiz.difficulty)}>
                        {quiz.difficulty}
                      </Badge>
                    </div>
                    {quiz.streak > 0 && (
                      <div className="flex items-center gap-1 text-amber-300">
                        <Flame className="h-4 w-4" />
                        <span className="text-sm font-bold">{quiz.streak}</span>
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-white text-lg leading-tight">{quiz.title}</CardTitle>
                  <p className="text-amber-300/80 text-sm">{quiz.subject}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm text-white/60">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      <span>{quiz.questions} questions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{quiz.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{quiz.participants.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span>{quiz.rating}</span>
                    </div>
                  </div>

                  {quiz.progress > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Progress</span>
                        <span className="text-white">{quiz.progress}%</span>
                      </div>
                      <Progress value={quiz.progress} className="h-2" />
                    </div>
                  )}

                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                    <Play className="h-4 w-4 mr-2" />
                    {quiz.progress > 0 ? "Continue Quiz" : "Start Quiz"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Gamification Stats */}
        <section>
          <Card className="bg-gradient-to-r from-emerald-500/20 to-amber-500/20 backdrop-blur-sm border-emerald-400/30 max-w-4xl mx-auto">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Your Quiz Performance</h3>
                <p className="text-white/70">Keep up the great work!</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-400">847</div>
                  <div className="text-sm text-white/80">Quizzes Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-400">12,450</div>
                  <div className="text-sm text-white/80">Total XP</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">87%</div>
                  <div className="text-sm text-white/80">Average Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">15</div>
                  <div className="text-sm text-white/80">Current Streak</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
