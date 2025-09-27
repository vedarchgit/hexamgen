"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, BookPlus, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function NewSubjectPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [code, setCode] = useState("")
  const [year, setYear] = useState("")
  const [branch, setBranch] = useState("Computer Engineering")

  const handleSave = async () => {
    try {
      const response = await fetch("/api/v1/subjects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, code, year, branch }),
      });
      if (response.ok) {
        router.push("/subjects"); // Redirect to a subjects list page if it exists
      } else {
        const error = await response.json();
        alert(`Failed to save subject: ${error.detail}`);
      }
    } catch (error) {
      console.error("Failed to save subject:", error);
      alert("Failed to save subject.");
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/cosmic-background.jpeg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/60 via-black/40 to-purple-900/30" />

      <header className="relative z-10 flex items-center justify-between p-6 bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center gap-4">
          <Link href="/subjects">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <BookPlus className="h-6 w-6 text-amber-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">Add New Course</h1>
              <p className="text-sm text-amber-200/80">Expand the knowledge base</p>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 p-6">
        <Card className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm border-white/20 text-white">
          <CardHeader>
            <CardTitle>Create a New Course</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Course Name</label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Data Structures & Algorithms"
                className="bg-white/10 border-white/20 focus:bg-white/15 focus:border-amber-400/50"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="code" className="text-sm font-medium">Course Code</label>
                  <Input
                    id="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="e.g., SE-DSA"
                    className="bg-white/10 border-white/20 focus:bg-white/15 focus:border-amber-400/50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="year" className="text-sm font-medium">Year</label>
                  <Input
                    id="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="e.g., SE or TE"
                    className="bg-white/10 border-white/20 focus:bg-white/15 focus:border-amber-400/50"
                  />
                </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="branch" className="text-sm font-medium">Branch</label>
              <Input
                id="branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                placeholder="e.g., Computer Engineering"
                className="bg-white/10 border-white/20 focus:bg-white/15 focus:border-amber-400/50"
              />
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSave} className="bg-amber-500 hover:bg-amber-600 text-black">
                <Save className="h-4 w-4 mr-2" />
                Save Course
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
