"use client"

import { ArrowLeft, Clock, Trophy, Target, Play, Users, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { useState } from "react"

export default function QuizzesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Quizzes", count: 45 },
    { id: "math", name: "Mathematics", count: 12 },
    { id: "physics", name: "Physics", count: 8 },
    { id: "chemistry", name: "Chemistry", count: 10 },
    { id: "cs", name: "Computer Science", count: 15 },
  ]

  const featuredQuizzes = [
    {
      title: "Advanced Calculus Challenge",
      subject: "Mathematics",
      difficulty: "Hard",
      questions: 25,
      duration: "45 min",
      participants: 1247,
      rating: 4.8,
      progress: 0,
      color: "bg-blue-500",
    },
    {
      title: "Quantum Physics Fundamentals",
      subject: "Physics",
      difficulty: "Medium",
      questions: 20,
      duration: "30 min",
      participants: 892,
      rating: 4.6,
      progress: 60,
      color: "bg-green-500",
    },
    {
      title: "Organic Chemistry Reactions",
      subject: "Chemistry",
      difficulty: "Medium",
      questions: 18,
      duration: "35 min",
      participants: 1056,
      rating: 4.7,
      progress: 0,
      color: "bg-purple-500",
    },
  ]

  const quickQuizzes = [
    { title: "Linear Algebra Basics", questions: 10, duration: "15 min", difficulty: "Easy" },
    { title: "Thermodynamics Quick Test", questions: 8, duration: "12 min", difficulty: "Medium" },
    { title: "Data Structures Sprint", questions: 12, duration: "18 min", difficulty: "Hard" },
    { title: "Grammar & Syntax Check", questions: 15, duration: "20 min", difficulty: "Easy" },
  ]

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

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background with blue gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/10" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6 bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-white">Interactive Quizzes</h1>
        </div>
        <div className="flex items-center gap-2">
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
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={
                  selectedCategory === category.id
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "text-white hover:bg-white/10"
                }
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
        </section>

        {/* Featured Quizzes */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-6">Featured Quizzes</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featuredQuizzes.map((quiz, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary" className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                      {quiz.subject}
                    </Badge>
                    <Badge variant="outline" className={getDifficultyColor(quiz.difficulty)}>
                      {quiz.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-lg leading-tight">{quiz.title}</CardTitle>
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

                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Play className="h-4 w-4 mr-2" />
                    {quiz.progress > 0 ? "Continue Quiz" : "Start Quiz"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Quizzes */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-6">Quick Quizzes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickQuizzes.map((quiz, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
              >
                <CardHeader className="pb-3">
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
                  </div>
                  <Badge variant="outline" className={getDifficultyColor(quiz.difficulty) + " w-full justify-center"}>
                    {quiz.difficulty}
                  </Badge>
                  <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Play className="h-3 w-3 mr-2" />
                    Start
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
