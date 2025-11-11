import { Home, Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function HexamGenPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background with blue gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/10" />

      {/* Curved background element for transparency effect */}
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-blue-600/10 to-transparent rounded-t-[100px] transform translate-y-32" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6 bg-white/5 backdrop-blur-sm border-b border-white/10">
        <h1 className="text-2xl font-bold text-white">HexamGen</h1>
        <div className="flex items-center gap-4">
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
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-88px)] px-6 py-12">
        {/* Search Section */}
        <div className="w-full max-w-2xl mb-16">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for courses, notes, or topics..."
              className="w-full h-14 pl-6 pr-32 text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 focus:bg-white/15 focus:border-blue-400/50"
            />
            <Button className="absolute right-2 top-2 h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium">
              Search
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {/* Notes Card */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-orange-400 mb-2">Notes</CardTitle>
              <CardDescription className="text-white/80 text-base leading-relaxed">
                Access all your study notes in one place, organized by subject.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link href="/notes">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 font-medium">Explore</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Quizzes Card */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-orange-400 mb-2">Quizzes</CardTitle>
              <CardDescription className="text-white/80 text-base leading-relaxed">
                Test your knowledge with interactive quizzes and instant feedback.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link href="/quizzes">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 font-medium">Explore</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Analyzer Card */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-orange-400 mb-2">Analyzer</CardTitle>
              <CardDescription className="text-white/80 text-base leading-relaxed">
                Analyze previous year questions to focus on important topics.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link href="/analyzer">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 font-medium">Explore</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
