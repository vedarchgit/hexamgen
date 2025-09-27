"use client"

import { useState } from "react"
import { Home, Menu, User, GraduationCap, BookOpen, Trophy, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { GamificationBar } from "@/components/gamification-bar"
import Link from "next/link"

const SPPU_SUBJECTS = {
  FE: {
    name: "First Year (Common)",
    subjects: [
      "Engineering Mathematics I",
      "Engineering Mathematics II",
      "Engineering Physics",
      "Engineering Chemistry",
      "Basic Electrical Engineering",
      "Basic Electronics Engineering",
      "Engineering Mechanics",
      "Engineering Graphics",
      "Programming & Problem Solving (C)",
      "Systems in Mechanical Engineering",
    ],
  },
  SE: {
    name: "Second Year (Computer)",
    subjects: [
      "Data Structures & Algorithms",
      "Digital Electronics & Logic Design",
      "Object-Oriented Programming (Java)",
      "Computer Organization & Architecture",
      "Engineering Mathematics III",
      "Discrete Mathematics",
      "Operating Systems",
      "Database Management Systems (DBMS)",
      "Software Engineering",
      "Theory of Computation",
    ],
  },
  TE: {
    name: "Third Year (Computer)",
    subjects: [
      "Computer Networks",
      "Web Technology",
      "Data Science & Big Data",
      "Systems Programming & Compiler Construction",
      "Design & Analysis of Algorithms (DAA)",
      "Human-Computer Interaction (HCI)",
      "Artificial Intelligence & Machine Learning (AI/ML)",
      "Software Project Management",
      "Information Systems & Engineering Economics",
      "Cloud Computing",
      "Cyber Security",
    ],
  },
  BE: {
    name: "Final Year (Computer)",
    subjects: [
      "High Performance Computing",
      "Data Analytics",
      "Machine Learning / Deep Learning",
      "Internet of Things (IoT)",
      "Blockchain Technology",
      "Information & Cyber Security",
      "Distributed Systems",
      "AR/VR",
      "NLP",
      "Advanced DBMS",
      "Project Work (Part I & II)",
      "Seminar",
    ],
  },
}

export default function HexamGenPage() {
  const [selectedYear, setSelectedYear] = useState<string>("")
  const [selectedBranch] = useState("Computer Engineering")

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/cosmic-background.jpeg')",
        }}
      />

      {/* Dark overlay with deep indigo tint for SPPU theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/60 via-black/40 to-purple-900/30" />

      <div className="bottom-fade" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6 bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center gap-3">
          <GraduationCap className="h-8 w-8 text-sky-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">HexamGen</h1>
            <p className="text-sm text-indigo-200/90">SPPU Computer Engineering</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="bg-sky-500/20 text-sky-200 border-sky-400/30">
            Streak: 7 days
          </Badge>

          {/* About link */}
          <Link href="/about">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              About
            </Button>
          </Link>

          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <Home className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <Menu className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 py-8">
        {/* SPPU Selection Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome to HexamGen</h2>
            <p className="text-white/80 text-lg">Your AI-powered study companion for SPPU Computer Engineering</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-white">Select Your Year</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Choose your current year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(SPPU_SUBJECTS).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-white">Branch</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-3 bg-indigo-500/20 rounded-md border border-indigo-400/30">
                  <p className="text-indigo-200 font-medium">{selectedBranch}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Subject Preview */}
          {selectedYear && (
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
              <CardHeader>
                <CardTitle className="text-white">
                  Subjects for {SPPU_SUBJECTS[selectedYear as keyof typeof SPPU_SUBJECTS].name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {SPPU_SUBJECTS[selectedYear as keyof typeof SPPU_SUBJECTS].subjects.map((subject, index) => (
                    <Badge key={index} variant="outline" className="bg-white/5 text-white border-white/20 p-2 text-sm">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Dashboard Cards */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Notes Card */}
            <Card className="glass-card card-hover-neon">
              <CardHeader className="text-center pb-4">
                <BookOpen className="h-12 w-12 text-sky-400 mx-auto mb-3" />
                <CardTitle className="text-xl font-bold text-white mb-2">Organized Notes</CardTitle>
                <CardDescription className="text-white/80 text-sm">
                  Subject-wise notes with smart organization
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link href="/notes">
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 font-medium w-full">
                    Explore Notes
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Daily Quiz Card */}
            <Card className="glass-card card-hover-neon">
              <CardHeader className="text-center pb-4">
                <Trophy className="h-12 w-12 text-indigo-400 mx-auto mb-3" />
                <CardTitle className="text-xl font-bold text-white mb-2">Daily Quiz</CardTitle>
                <CardDescription className="text-white/80 text-sm">
                  Gamified daily challenges and assessments
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link href="/quizzes">
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 font-medium w-full">
                    Take Quiz
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* PYQ Analyzer Card */}
            <Card className="glass-card card-hover-neon">
              <CardHeader className="text-center pb-4">
                <BarChart3 className="h-12 w-12 text-sky-400 mx-auto mb-3" />
                <CardTitle className="text-xl font-bold text-white mb-2">PYQ Analyzer</CardTitle>
                <CardDescription className="text-white/80 text-sm">
                  Past year question analysis and insights
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link href="/analyzer">
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 font-medium w-full">
                    Analyze PYQs
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Topic Heatmap Card */}
            <Card className="glass-card card-hover-neon">
              <CardHeader className="text-center pb-4">
                <div className="h-12 w-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <div className="text-white font-bold text-lg">🔥</div>
                </div>
                <CardTitle className="text-xl font-bold text-white mb-2">Topic Heatmap</CardTitle>
                <CardDescription className="text-white/80 text-sm">
                  High-frequency topics and exam patterns
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link href="/heatmap">
                  <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2 font-medium w-full">
                    View Heatmap
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Gamification Bar */}
        <div className="max-w-6xl mx-auto mt-12">
          <GamificationBar xp={1247} level={12} streak={7} nextLevelXp={1500} />
        </div>
      </main>
    </div>
  )
}
