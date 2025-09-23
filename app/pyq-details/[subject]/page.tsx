"use client"

import { ArrowLeft, FileText, TrendingUp, Clock, Target, BookOpen, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useParams } from "next/navigation"

const PYQ_SUBJECT_DATA = {
  "data-structures": {
    name: "Data Structures & Algorithms",
    year: "SE",
    totalQuestions: 156,
    avgDifficulty: 8.2,
    frequency: 92,
    lastUpdated: "2024",
    topics: [
      { name: "Arrays & Strings", questions: 28, difficulty: 7.5, frequency: 95, trend: "stable" },
      { name: "Linked Lists", questions: 24, difficulty: 7.8, frequency: 88, trend: "up" },
      { name: "Trees & BST", questions: 32, difficulty: 8.5, frequency: 92, trend: "up" },
      { name: "Graphs", questions: 22, difficulty: 9.1, frequency: 85, trend: "stable" },
      { name: "Sorting Algorithms", questions: 26, difficulty: 7.2, frequency: 90, trend: "down" },
      { name: "Dynamic Programming", questions: 24, difficulty: 9.3, frequency: 78, trend: "up" },
    ],
    yearlyPattern: [
      { year: "2020", questions: 28, avgMarks: 15, difficulty: 7.8 },
      { year: "2021", questions: 32, avgMarks: 16, difficulty: 8.0 },
      { year: "2022", questions: 35, avgMarks: 18, difficulty: 8.1 },
      { year: "2023", questions: 38, avgMarks: 20, difficulty: 8.2 },
      { year: "2024", questions: 42, avgMarks: 22, difficulty: 8.4 },
    ],
    recommendations: [
      { priority: "High", topic: "Trees & BST", reason: "92% frequency, increasing trend", timeToSpend: "25%" },
      {
        priority: "High",
        topic: "Dynamic Programming",
        reason: "High difficulty, growing importance",
        timeToSpend: "20%",
      },
      { priority: "Medium", topic: "Graphs", reason: "Consistent appearance, moderate difficulty", timeToSpend: "18%" },
      { priority: "Medium", topic: "Arrays & Strings", reason: "Foundation topic, high frequency", timeToSpend: "15%" },
    ],
  },
}

export default function PYQDetailsPage() {
  const params = useParams()
  const subject = params.subject as string
  const data = PYQ_SUBJECT_DATA[subject as keyof typeof PYQ_SUBJECT_DATA]

  if (!data) {
    return <div className="text-white">Subject not found</div>
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-500/20 text-red-300 border-red-400/30"
      case "Medium":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-400/30"
      case "Low":
        return "bg-green-500/20 text-green-300 border-green-400/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-400/30"
    }
  }

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
          <Link href="/analyzer">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">{data.name}</h1>
            <p className="text-white/70">Detailed PYQ Analysis</p>
          </div>
        </div>
        <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-400/30">
          {data.year} Subject
        </Badge>
      </header>

      <main className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6 text-center">
                <FileText className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{data.totalQuestions}</div>
                <div className="text-sm text-white/60">Total Questions</div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6 text-center">
                <Target className="h-8 w-8 text-red-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{data.avgDifficulty}/10</div>
                <div className="text-sm text-white/60">Avg Difficulty</div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{data.frequency}%</div>
                <div className="text-sm text-white/60">Frequency</div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{data.lastUpdated}</div>
                <div className="text-sm text-white/60">Last Updated</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="topics" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-white/10 backdrop-blur-sm">
              <TabsTrigger
                value="topics"
                className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300"
              >
                Topic Analysis
              </TabsTrigger>
              <TabsTrigger
                value="trends"
                className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300"
              >
                Yearly Trends
              </TabsTrigger>
              <TabsTrigger
                value="recommendations"
                className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300"
              >
                Study Plan
              </TabsTrigger>
            </TabsList>

            <TabsContent value="topics" className="space-y-6">
              <h2 className="text-xl font-semibold text-white text-center">Topic-wise Breakdown</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.topics.map((topic, index) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-white text-lg">{topic.name}</CardTitle>
                        <div className="flex items-center gap-2">
                          {getTrendIcon(topic.trend)}
                          <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                            {topic.questions} Qs
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">Frequency</span>
                          <span className="text-white">{topic.frequency}%</span>
                        </div>
                        <Progress value={topic.frequency} className="h-2" />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Difficulty: {topic.difficulty}/10</span>
                        <span className="text-amber-300 capitalize">Trend: {topic.trend}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              <h2 className="text-xl font-semibold text-white text-center">5-Year Question Pattern</h2>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {data.yearlyPattern.map((year, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-4">
                          <span className="text-white font-semibold w-12">{year.year}</span>
                          <div className="flex-1 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-white/60">Questions: {year.questions}</span>
                              <span className="text-white/60">Avg Marks: {year.avgMarks}</span>
                              <span className="text-white/60">Difficulty: {year.difficulty}/10</span>
                            </div>
                            <Progress value={(year.questions / 42) * 100} className="h-2" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-400/30">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-white mb-1">Pattern Insight</h4>
                        <p className="text-white/80 text-sm">
                          Questions have increased by 50% over 5 years with a 7.7% rise in difficulty. Focus on advanced
                          topics like Dynamic Programming and Graph algorithms.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6">
              <h2 className="text-xl font-semibold text-white text-center">AI-Powered Study Recommendations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.recommendations.map((rec, index) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-white text-lg">{rec.topic}</CardTitle>
                        <Badge variant="outline" className={getPriorityColor(rec.priority)}>
                          {rec.priority} Priority
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-white/80 text-sm">{rec.reason}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-amber-400" />
                          <span className="text-white text-sm">Study Time: {rec.timeToSpend}</span>
                        </div>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                          Start Learning
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Study Schedule */}
              <Card className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 backdrop-blur-sm border-emerald-400/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                    Recommended 4-Week Study Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-white/10 rounded-lg">
                      <div className="text-lg font-bold text-emerald-400">Week 1</div>
                      <div className="text-sm text-white/80">Arrays & Strings</div>
                      <div className="text-sm text-white/80">Linked Lists</div>
                    </div>
                    <div className="text-center p-4 bg-white/10 rounded-lg">
                      <div className="text-lg font-bold text-blue-400">Week 2</div>
                      <div className="text-sm text-white/80">Trees & BST</div>
                      <div className="text-sm text-white/80">Sorting Algorithms</div>
                    </div>
                    <div className="text-center p-4 bg-white/10 rounded-lg">
                      <div className="text-lg font-bold text-purple-400">Week 3</div>
                      <div className="text-sm text-white/80">Graphs</div>
                      <div className="text-sm text-white/80">Advanced Trees</div>
                    </div>
                    <div className="text-center p-4 bg-white/10 rounded-lg">
                      <div className="text-lg font-bold text-amber-400">Week 4</div>
                      <div className="text-sm text-white/80">Dynamic Programming</div>
                      <div className="text-sm text-white/80">Practice & Review</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
