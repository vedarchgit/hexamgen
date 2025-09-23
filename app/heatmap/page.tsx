"use client"

import { ArrowLeft, TrendingUp, Calendar, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const TOPIC_HEATMAP_DATA = [
  { topic: "Data Structures & Algorithms", frequency: 95, difficulty: "High", lastAsked: "2023", color: "bg-red-500" },
  { topic: "Database Management Systems", frequency: 88, difficulty: "Medium", lastAsked: "2023", color: "bg-red-400" },
  { topic: "Operating Systems", frequency: 82, difficulty: "Medium", lastAsked: "2023", color: "bg-orange-500" },
  { topic: "Computer Networks", frequency: 78, difficulty: "High", lastAsked: "2023", color: "bg-orange-400" },
  { topic: "Software Engineering", frequency: 75, difficulty: "Medium", lastAsked: "2023", color: "bg-yellow-500" },
  {
    topic: "Object-Oriented Programming",
    frequency: 72,
    difficulty: "Medium",
    lastAsked: "2023",
    color: "bg-yellow-400",
  },
  { topic: "Theory of Computation", frequency: 68, difficulty: "High", lastAsked: "2023", color: "bg-yellow-300" },
  { topic: "Compiler Construction", frequency: 65, difficulty: "High", lastAsked: "2023", color: "bg-green-400" },
  { topic: "Artificial Intelligence", frequency: 62, difficulty: "High", lastAsked: "2023", color: "bg-green-300" },
  { topic: "Web Technology", frequency: 58, difficulty: "Medium", lastAsked: "2023", color: "bg-blue-300" },
]

export default function HeatmapPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/cosmic-background.jpeg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/60 via-black/40 to-purple-900/30" />

      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between p-6 bg-white/5 backdrop-blur-sm border-b border-white/10">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Topic Heatmap</h1>
              <p className="text-white/70">High-frequency exam topics</p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">Most Frequent</CardTitle>
                <TrendingUp className="h-4 w-4 text-red-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">DSA</div>
                <p className="text-xs text-white/60">95% frequency</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">Exam Pattern</CardTitle>
                <Calendar className="h-4 w-4 text-amber-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">2023</div>
                <p className="text-xs text-white/60">Latest analysis</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">Focus Areas</CardTitle>
                <Target className="h-4 w-4 text-emerald-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">7</div>
                <p className="text-xs text-white/60">High priority topics</p>
              </CardContent>
            </Card>
          </div>

          {/* Heatmap */}
          <div className="max-w-6xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Topic Frequency Analysis</CardTitle>
                <CardDescription className="text-white/70">
                  Based on past 5 years of SPPU Computer Engineering question papers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {TOPIC_HEATMAP_DATA.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-4 h-4 rounded ${item.color}`}></div>
                        <div>
                          <h3 className="font-medium text-white">{item.topic}</h3>
                          <p className="text-sm text-white/60">Last asked: {item.lastAsked}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge
                          variant={item.difficulty === "High" ? "destructive" : "secondary"}
                          className={
                            item.difficulty === "High"
                              ? "bg-red-500/20 text-red-300"
                              : "bg-yellow-500/20 text-yellow-300"
                          }
                        >
                          {item.difficulty}
                        </Badge>
                        <div className="text-right">
                          <div className="text-lg font-bold text-white">{item.frequency}%</div>
                          <div className="text-xs text-white/60">frequency</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
                  <h4 className="font-medium text-white mb-3">Frequency Scale</h4>
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span>90-100%</span>
                    <div className="w-4 h-4 bg-orange-500 rounded ml-4"></div>
                    <span>70-89%</span>
                    <div className="w-4 h-4 bg-yellow-500 rounded ml-4"></div>
                    <span>50-69%</span>
                    <div className="w-4 h-4 bg-green-400 rounded ml-4"></div>
                    <span>30-49%</span>
                    <div className="w-4 h-4 bg-blue-400 rounded ml-4"></div>
                    <span>10-29%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
