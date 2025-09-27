import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/cosmic-background.jpeg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/60 via-black/40 to-purple-900/30" />
      <div className="bottom-fade" />

      <main className="relative z-10 px-6 py-8">
        <div className="max-w-4xl mx-auto mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white text-balance">About HexamGen</h1>
          <Link href="/">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              Home
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 gap-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-white/90 leading-relaxed">
              <p>
                💡 Our Mission... To simplify student life by combining AI, automation, and smart design for better
                timetables, focused revision, and engaging learning.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Why Us</CardTitle>
            </CardHeader>
            <CardContent className="text-white/90 leading-relaxed">
              <p>
                🌟 Why Us... We’ve faced timetable clashes, scattered notes, and confusing exam prep ourselves. That’s
                why we’re building HexamGen—a tool designed by students, for students.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Our Goal</CardTitle>
            </CardHeader>
            <CardContent className="text-white/90 leading-relaxed">
              <p>
                🎯 Our Goal... To transform traditional learning into a smarter, gamified, and stress-free journey that
                helps every student perform at their best.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
