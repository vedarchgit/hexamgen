"use client"

import { ArrowLeft, BookOpen, Download, Eye, Search, Filter, GraduationCap, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useState } from "react"

const SPPU_SUBJECTS = {
  FE: {
    name: "First Year (Common)",
    subjects: [
      { name: "Engineering Mathematics I", code: "FE-MATH-I", notes: 24, color: "bg-blue-500" },
      { name: "Engineering Mathematics II", code: "FE-MATH-II", notes: 22, color: "bg-blue-600" },
      { name: "Engineering Physics", code: "FE-PHY", notes: 18, color: "bg-green-500" },
      { name: "Engineering Chemistry", code: "FE-CHEM", notes: 21, color: "bg-purple-500" },
      { name: "Programming & Problem Solving (C)", code: "FE-PPS", notes: 32, color: "bg-amber-500" },
      { name: "Basic Electronics Engineering", code: "FE-BEE", notes: 15, color: "bg-pink-500" },
    ],
  },
  SE: {
    name: "Second Year (Computer)",
    subjects: [
      { name: "Data Structures & Algorithms", code: "SE-DSA", notes: 45, color: "bg-red-500" },
      { name: "Object-Oriented Programming (Java)", code: "SE-OOP", notes: 38, color: "bg-orange-500" },
      { name: "Database Management Systems", code: "SE-DBMS", notes: 42, color: "bg-cyan-500" },
      { name: "Operating Systems", code: "SE-OS", notes: 35, color: "bg-indigo-500" },
      { name: "Computer Organization & Architecture", code: "SE-COA", notes: 28, color: "bg-teal-500" },
      { name: "Discrete Mathematics", code: "SE-DM", notes: 25, color: "bg-violet-500" },
    ],
  },
  TE: {
    name: "Third Year (Computer)",
    subjects: [
      { name: "Computer Networks", code: "TE-CN", notes: 40, color: "bg-emerald-500" },
      { name: "Web Technology", code: "TE-WT", notes: 35, color: "bg-rose-500" },
      { name: "Artificial Intelligence & Machine Learning", code: "TE-AIML", notes: 48, color: "bg-purple-600" },
      { name: "Design & Analysis of Algorithms", code: "TE-DAA", notes: 42, color: "bg-red-600" },
      { name: "Data Science & Big Data", code: "TE-DSBD", notes: 38, color: "bg-blue-600" },
      { name: "Systems Programming & Compiler Construction", code: "TE-SPCC", notes: 32, color: "bg-yellow-600" },
    ],
  },
  BE: {
    name: "Final Year (Computer)",
    subjects: [
      { name: "High Performance Computing", code: "BE-HPC", notes: 28, color: "bg-cyan-600" },
      { name: "Machine Learning / Deep Learning", code: "BE-MLDL", notes: 45, color: "bg-purple-700" },
      { name: "Internet of Things", code: "BE-IOT", notes: 35, color: "bg-green-600" },
      { name: "Blockchain Technology", code: "BE-BCT", notes: 30, color: "bg-amber-600" },
      { name: "Information & Cyber Security", code: "BE-ICS", notes: 38, color: "bg-red-700" },
      { name: "Project Work", code: "BE-PROJ", notes: 25, color: "bg-indigo-600" },
    ],
  },
}

const RECENT_NOTES = [
  {
    title: "Sorting Algorithms Implementation",
    subject: "Data Structures & Algorithms",
    year: "SE",
    pages: 15,
    date: "2 days ago",
    views: 245,
  },
  {
    title: "Neural Network Fundamentals",
    subject: "Machine Learning",
    year: "BE",
    pages: 22,
    date: "3 days ago",
    views: 189,
  },
  {
    title: "TCP/IP Protocol Stack",
    subject: "Computer Networks",
    year: "TE",
    pages: 18,
    date: "1 week ago",
    views: 156,
  },
  {
    title: "ACID Properties in DBMS",
    subject: "Database Management",
    year: "SE",
    pages: 12,
    date: "4 days ago",
    views: 203,
  },
  {
    title: "Process Synchronization",
    subject: "Operating Systems",
    year: "SE",
    pages: 16,
    date: "5 days ago",
    views: 178,
  },
  {
    title: "Blockchain Consensus Mechanisms",
    subject: "Blockchain Technology",
    year: "BE",
    pages: 20,
    date: "1 week ago",
    views: 134,
  },
]

export default function NotesPage() {
  const [selectedYear, setSelectedYear] = useState<string>("all")

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

  const filteredSubjects =
    selectedYear === "all"
      ? Object.entries(SPPU_SUBJECTS).flatMap(([year, data]) =>
          data.subjects.map((subject) => ({ ...subject, year, yearName: data.name })),
        )
      : SPPU_SUBJECTS[selectedYear as keyof typeof SPPU_SUBJECTS]?.subjects.map((subject) => ({
          ...subject,
          year: selectedYear,
          yearName: SPPU_SUBJECTS[selectedYear as keyof typeof SPPU_SUBJECTS].name,
        })) || []

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
            <GraduationCap className="h-6 w-6 text-amber-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">Organized Notes</h1>
              <p className="text-sm text-amber-200/80">SPPU Computer Engineering</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Link href="/notes/new">
            <Button variant="solid" size="sm" className="bg-amber-500 hover:bg-amber-600 text-black">
              <Plus className="h-4 w-4 mr-2" />
              Add Note
            </Button>
          </Link>
        </div>
      </header>

      <main className="relative z-10 p-6 space-y-8">
        {/* Search and Filter Section */}
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search notes by title, subject, or content..."
              className="w-full h-12 pl-12 pr-4 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 focus:bg-white/15 focus:border-amber-400/50"
            />
          </div>

          {/* Year Filter */}
          <div className="flex justify-center">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-64 bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {Object.entries(SPPU_SUBJECTS).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Subject Categories */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-6 text-center">
            {selectedYear === "all"
              ? "Browse by Subject"
              : `${SPPU_SUBJECTS[selectedYear as keyof typeof SPPU_SUBJECTS]?.name || ""} Subjects`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {filteredSubjects.map((subject, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`w-12 h-12 ${subject.color} rounded-full flex items-center justify-center flex-shrink-0`}
                    >
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="outline" className={getYearBadgeColor(subject.year)}>
                      {subject.year}
                    </Badge>
                  </div>
                  <h3 className="font-medium text-white text-sm mb-1 leading-tight">{subject.name}</h3>
                  <p className="text-white/60 text-xs mb-2">{subject.code}</p>
                  <p className="text-amber-300 text-sm font-medium">{subject.notes} notes available</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Notes */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-6 text-center">Recent Notes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {RECENT_NOTES.map((note, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className={getYearBadgeColor(note.year)}>
                      {note.year}
                    </Badge>
                    <span className="text-white/60 text-sm">{note.date}</span>
                  </div>
                  <CardTitle className="text-white text-lg leading-tight">{note.title}</CardTitle>
                  <p className="text-amber-300/80 text-sm">{note.subject}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-white/60">
                    <span>{note.pages} pages</span>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{note.views}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-amber-600 hover:bg-amber-700 text-white">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
