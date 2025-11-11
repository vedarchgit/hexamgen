import { ArrowLeft, BookOpen, Download, Eye, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function NotesPage() {
  const subjects = [
    { name: "Mathematics", count: 24, color: "bg-blue-500" },
    { name: "Physics", count: 18, color: "bg-green-500" },
    { name: "Chemistry", count: 21, color: "bg-purple-500" },
    { name: "Computer Science", count: 32, color: "bg-orange-500" },
    { name: "English", count: 15, color: "bg-pink-500" },
    { name: "History", count: 12, color: "bg-yellow-500" },
  ]

  const recentNotes = [
    { title: "Calculus Integration Techniques", subject: "Mathematics", pages: 12, date: "2 days ago", views: 156 },
    { title: "Quantum Mechanics Fundamentals", subject: "Physics", pages: 8, date: "3 days ago", views: 89 },
    { title: "Organic Chemistry Reactions", subject: "Chemistry", pages: 15, date: "1 week ago", views: 203 },
    { title: "Data Structures & Algorithms", subject: "Computer Science", pages: 20, date: "4 days ago", views: 312 },
    { title: "Shakespeare's Literary Devices", subject: "English", pages: 6, date: "5 days ago", views: 67 },
    { title: "World War II Timeline", subject: "History", pages: 10, date: "1 week ago", views: 124 },
  ]

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
          <h1 className="text-2xl font-bold text-white">Notes Explorer</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </header>

      <main className="relative z-10 p-6 space-y-8">
        {/* Search Section */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search notes by title, subject, or content..."
              className="w-full h-12 pl-12 pr-4 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 focus:bg-white/15 focus:border-blue-400/50"
            />
          </div>
        </div>

        {/* Subject Categories */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-6">Browse by Subject</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {subjects.map((subject) => (
              <Card
                key={subject.name}
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <CardContent className="p-4 text-center">
                  <div
                    className={`w-12 h-12 ${subject.color} rounded-full mx-auto mb-3 flex items-center justify-center`}
                  >
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-medium text-white text-sm mb-1">{subject.name}</h3>
                  <p className="text-white/60 text-xs">{subject.count} notes</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Notes */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-6">Recent Notes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentNotes.map((note, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary" className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                      {note.subject}
                    </Badge>
                    <span className="text-white/60 text-sm">{note.date}</span>
                  </div>
                  <CardTitle className="text-white text-lg leading-tight">{note.title}</CardTitle>
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
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
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
