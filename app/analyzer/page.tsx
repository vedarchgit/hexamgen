"use client"

import { ArrowLeft, TrendingUp, BarChart3, Download, Calendar, Target, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SPPU_YEARS = ["2024", "2023", "2022", "2021", "2020"]
const SPPU_BRANCHES = [
  { id: "all", name: "All Branches" },
  { id: "computer", name: "Computer Engineering" },
  { id: "it", name: "Information Technology" },
  { id: "aids", name: "AI & Data Science" },
]

const SPPU_TOPIC_ANALYSIS = [
  {
    topic: "Data Structures & Algorithms",
    frequency: 92,
    difficulty: "High",
    trend: "up",
    questions: 48,
    year: "SE",
    slug: "data-structures",
  },
  {
    topic: "Database Management Systems",
    frequency: 88,
    difficulty: "Medium",
    trend: "stable",
    questions: 42,
    year: "SE",
    slug: "database-systems",
  },
  {
    topic: "Computer Networks",
    frequency: 85,
    difficulty: "High",
    trend: "up",
    questions: 38,
    year: "TE",
    slug: "computer-networks",
  },
  {
    topic: "Operating Systems",
    frequency: 82,
    difficulty: "Medium",
    trend: "up",
    questions: 35,
    year: "SE",
    slug: "operating-systems",
  },
  {
    topic: "Artificial Intelligence",
    frequency: 78,
    difficulty: "High",
    trend: "up",
    questions: 32,
    year: "TE",
    slug: "artificial-intelligence",
  },
  {
    topic: "Software Engineering",
    frequency: 75,
    difficulty: "Medium",
    trend: "stable",
    questions: 28,
    year: "SE",
    slug: "software-engineering",
  },
  {
    topic: "Machine Learning",
    frequency: 72,
    difficulty: "High",
    trend: "up",
    questions: 25,
    year: "BE",
    slug: "machine-learning",
  },
  {
    topic: "Web Technology",
    frequency: 68,
    difficulty: "Medium",
    trend: "stable",
    questions: 22,
    year: "TE",
    slug: "web-technology",
  },
]

const YEARLY_TRENDS = [
  { year: "2020", questions: 285, avgDifficulty: 6.8, branches: 3 },
  { year: "2021", questions: 312, avgDifficulty: 7.1, branches: 3 },
  { year: "2022", questions: 345, avgDifficulty: 7.3, branches: 4 },
  { year: "2023", questions: 378, avgDifficulty: 7.6, branches: 4 },
  { year: "2024", questions: 402, avgDifficulty: 7.8, branches: 4 },
]

const DIFFICULTY_DISTRIBUTION = [
  { level: "Easy", percentage: 22, count: 88, color: "bg-green-500" },
  { level: "Medium", percentage: 48, count: 193, color: "bg-yellow-500" },
  { level: "Hard", percentage: 30, count: 121, color: "bg-red-500" },
]

export default function AnalyzerPage() {
  const [selectedYear, setSelectedYear] = useState("2024")
  const [selectedBranch, setSelectedBranch] = useState("computer")

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-400" />
      case "down":
        return <TrendingUp className="h-4 w-4 text-red-400 rotate-180" />
      default:
        return <div className="h-4 w-4 bg-yellow-400 rounded-full" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "High":
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
            <BarChart3 className="h-6 w-6 text-blue-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">PYQ Analyzer</h1>
              <p className="text-sm text-blue-200/80">SPPU Past Year Analysis</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </header>

      <main className="relative z-10 p-6 space-y-8">
        {/* Filters */}
        <section className="flex flex-wrap gap-4 justify-center">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-32 bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SPPU_YEARS.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedBranch} onValueChange={setSelectedBranch}>
            <SelectTrigger className="w-56 bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <SelectValue placeholder="Select Branch" />
            </SelectTrigger>
            <SelectContent>
              {SPPU_BRANCHES.map((branch) => (
                <SelectItem key={branch.id} value={branch.id}>
                  {branch.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </section>

        {/* Overview Stats */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Total Questions</p>
                  <p className="text-2xl font-bold text-white">402</p>
                  <p className="text-xs text-blue-400">SPPU 2024</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Avg Difficulty</p>
                  <p className="text-2xl font-bold text-white">7.8/10</p>
                  <p className="text-xs text-green-400">+0.2 from 2023</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Most Frequent</p>
                  <p className="text-lg font-bold text-white">DSA</p>
                  <p className="text-xs text-amber-400">92% frequency</p>
                </div>
                <Target className="h-8 w-8 text-amber-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Growth Rate</p>
                  <p className="text-2xl font-bold text-green-400">+6.3%</p>
                  <p className="text-xs text-white/60">vs 2023</p>
                </div>
                <Calendar className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Topic Analysis */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-6 text-center">SPPU Topic Frequency Analysis</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {SPPU_TOPIC_ANALYSIS.map((topic, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-white text-lg mb-1">{topic.topic}</CardTitle>
                      <Badge variant="outline" className={getYearBadgeColor(topic.year)}>
                        {topic.year} Subject
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(topic.trend)}
                      <Badge variant="outline" className={getDifficultyColor(topic.difficulty)}>
                        {topic.difficulty}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Frequency in PYQs</span>
                      <span className="text-white font-bold">{topic.frequency}%</span>
                    </div>
                    <Progress value={topic.frequency} className="h-2" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 text-sm">Questions: {topic.questions}</span>
                    <Link href={`/pyq-details/${topic.slug}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-blue-400/30 text-blue-300 hover:bg-blue-500/20 bg-transparent"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Difficulty Distribution */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-6 text-center">SPPU Difficulty Distribution</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {DIFFICULTY_DISTRIBUTION.map((item, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className={`w-16 h-16 ${item.color} rounded-full mx-auto flex items-center justify-center`}>
                      <span className="text-white font-bold text-xl">{item.percentage}%</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">{item.level}</h3>
                      <p className="text-white/60">{item.count} questions</p>
                      <p className="text-amber-300 text-sm">SPPU Pattern</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 5-Year SPPU Trends */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-6 text-center">5-Year SPPU Trend Analysis</h2>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-4xl mx-auto">
            <CardContent className="p-6">
              <div className="space-y-4">
                {YEARLY_TRENDS.map((year, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-4">
                      <span className="text-white font-semibold w-12">{year.year}</span>
                      <div className="flex-1">
                        <div className="flex justify-between mb-2 text-sm">
                          <span className="text-white/60">Questions: {year.questions}</span>
                          <span className="text-white/60">Avg Difficulty: {year.avgDifficulty}/10</span>
                          <span className="text-amber-300">Branches: {year.branches}</span>
                        </div>
                        <Progress value={(year.questions / 402) * 100} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-400/30">
                <p className="text-white text-sm text-center">
                  <strong>SPPU Insight:</strong> Question complexity has increased by 14.7% over 5 years, with AI/ML
                  topics showing 300% growth since 2022.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Yearly Questions Trend Chart */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-6 text-center">Yearly Questions Trend</h2>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-4xl mx-auto">
            <CardContent className="p-6 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={YEARLY_TRENDS}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff30" />
                  <XAxis dataKey="year" stroke="#ffffff" />
                  <YAxis stroke="#ffffff" />
                  <Tooltip
                    cursor={{ fill: "#ffffff10" }}
                    contentStyle={{ backgroundColor: "#1a202c", border: "none", borderRadius: "8px" }}
                    itemStyle={{ color: "#ffffff" }}
                  />
                  <Legend />
                  <Bar dataKey="questions" fill="#8884d8" name="Total Questions" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
