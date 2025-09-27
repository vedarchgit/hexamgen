"use client";

import { useState, ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, BookOpen, Save, Paperclip } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const SPPU_SUBJECTS = {
  FE: {
    name: "First Year (Common)",
    subjects: [
      { name: "Engineering Mathematics I", code: "FE-MATH-I" },
      { name: "Engineering Mathematics II", code: "FE-MATH-II" },
      { name: "Engineering Physics", code: "FE-PHY" },
      { name: "Engineering Chemistry", code: "FE-CHEM" },
      { name: "Programming & Problem Solving (C)", code: "FE-PPS" },
      { name: "Basic Electronics Engineering", code: "FE-BEE" },
    ],
  },
  SE: {
    name: "Second Year (Computer)",
    subjects: [
      { name: "Data Structures & Algorithms", code: "SE-DSA" },
      { name: "Object-Oriented Programming (Java)", code: "SE-OOP" },
      { name: "Database Management Systems", code: "SE-DBMS" },
      { name: "Operating Systems", code: "SE-OS" },
      { name: "Computer Organization & Architecture", code: "SE-COA" },
      { name: "Discrete Mathematics", code: "SE-DM" },
    ],
  },
  TE: {
    name: "Third Year (Computer)",
    subjects: [
      { name: "Computer Networks", code: "TE-CN" },
      { name: "Web Technology", code: "TE-WT" },
      { name: "Artificial Intelligence & Machine Learning", code: "TE-AIML" },
      { name: "Design & Analysis of Algorithms", code: "TE-DAA" },
      { name: "Data Science & Big Data", code: "TE-DSBD" },
      { name: "Systems Programming & Compiler Construction", code: "TE-SPCC" },
    ],
  },
  BE: {
    name: "Final Year (Computer)",
    subjects: [
      { name: "High Performance Computing", code: "BE-HPC" },
      { name: "Machine Learning / Deep Learning", code: "BE-MLDL" },
      { name: "Internet of Things", code: "BE-IOT" },
      { name: "Blockchain Technology", code: "BE-BCT" },
      { name: "Information & Cyber Security", code: "BE-ICS" },
      { name: "Project Work", code: "BE-PROJ" },
    ],
  },
}

export default function NewNotePage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [subject, setSubject] = useState("")
  const [content, setContent] = useState("")
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSaveNote = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("subject_id", subject);
      if (content) {
        formData.append("content_md", content);
      }
      if (file) {
        formData.append("file", file);
      }

      const response = await fetch("/api/v1/notes", {
        method: "POST",
        body: formData,
        headers: {
          "x-user-id": "dummy-user-id", // Add a dummy user ID for now
        },
      });

      if (response.ok) {
        router.push("/notes");
      } else {
        const errorData = await response.json();
        console.error("Backend error:", errorData);
        alert(`Failed to save note: ${errorData.detail || response.statusText}`);
      }
    } catch (error) {
      console.error("Failed to save note:", error);
      alert("Failed to save note.");
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
          <Link href="/notes">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-amber-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">Add New Note</h1>
              <p className="text-sm text-amber-200/80">Create and share your knowledge</p>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 p-6">
        <Card className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm border-white/20 text-white">
          <CardHeader>
            <CardTitle>Create a New Note</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Title</label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a title for your note"
                className="bg-white/10 border-white/20 focus:bg-white/15 focus:border-amber-400/50"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">Subject</label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger className="bg-white/10 border-white/20 focus:bg-white/15 focus:border-amber-400/50">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(SPPU_SUBJECTS).map(([year, data]) => (
                    <optgroup key={year} label={data.name}>
                      {data.subjects.map((s) => (
                        <SelectItem key={s.code} value={s.code}>{s.name}</SelectItem>
                      ))}
                    </optgroup>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="attachment" className="text-sm font-medium">Attach PDF or Image</label>
              <div className="flex items-center gap-2">
                <label htmlFor="file-upload" className="flex items-center gap-2 cursor-pointer text-sm text-amber-300 hover:text-amber-400">
                    <Paperclip className="h-4 w-4" />
                    <span>{file ? file.name : "Choose a file..."}</span>
                </label>
                <Input id="file-upload" type="file" onChange={handleFileChange} className="hidden" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">Content (Markdown supported)</label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your note here..."
                className="min-h-[300px] bg-white/10 border-white/20 focus:bg-white/15 focus:border-amber-400/50"
              />
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSaveNote} className="bg-amber-500 hover:bg-amber-600 text-black">
                <Save className="h-4 w-4 mr-2" />
                Save Note
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
