
"use client";

import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";

// Dummy SPPU Subjects (replace with fetched data if available)
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
};

interface ContentUploadPayload {
  subject_id: string;
  title: string;
  file: File;
}

const uploadContent = async (payload: ContentUploadPayload) => {
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("subject_code", payload.subject_id);
  formData.append("file", payload.file);

  const response = await api.post("/api/v1/notes/", formData, {
    headers: {
      "x-user-id": "dummy-user-id", // Required by backend
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export default function ContentUploadPage() {
  const router = useRouter();
  const [subjectCode, setSubjectCode] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const mutation = useMutation({
    mutationFn: uploadContent,
    onSuccess: () => {
      toast("Success!", { description: "Content uploaded successfully." });
      router.push("/notes"); // Redirect to notes list page or similar
    },
    onError: (error: any) => {
      let errorMessage = "Failed to upload content.";
      if (error.response?.data?.detail) {
        if (Array.isArray(error.response.data.detail)) {
          errorMessage = error.response.data.detail.map((err: any) => err.msg).join(", ");
        } else if (typeof error.response.data.detail === 'string') {
          errorMessage = error.response.data.detail;
        } else {
          errorMessage = JSON.stringify(error.response.data.detail);
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      toast("Error", { description: errorMessage, duration: 5000, style: { backgroundColor: '#fee2e2', color: '#ef4444' } });
    },
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectCode || !title || !file) {
      toast("Missing Information", { description: "Please fill in all required fields and select a file.", duration: 5000, style: { backgroundColor: '#fee2e2', color: '#ef4444' } });
      return;
    }

    mutation.mutate({
      subject_id: subjectCode, // Sending subjectCode as subject_id for now
      title: title,
      file: file,
    });
  };

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
            <Upload className="h-6 w-6 text-amber-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">Upload Content</h1>
              <p className="text-sm text-amber-200/80">Upload notes, slides, assignments, or other study materials</p>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 p-6">
        <Card className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm border-white/20 text-white">
          <CardHeader>
            <CardTitle>Upload New Study Material</CardTitle>
            <CardDescription>Upload any relevant study material (e.g., PDF, images).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="subjectCode" className="text-sm font-medium">Subject</label>
                <Select value={subjectCode} onValueChange={setSubjectCode}>
                  <SelectTrigger className="bg-white/10 border-white/20 focus:bg-white/15 focus:border-amber-400/50">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(SPPU_SUBJECTS).flatMap(data => (
                      data.subjects.map((s) => (
                        <SelectItem key={s.code} value={s.code}>{s.name}</SelectItem>
                      ))
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">Title</label>
                <Input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Lecture Notes on DSA"
                  className="bg-white/10 border-white/20 focus:bg-white/15 focus:border-amber-400/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="file-upload" className="text-sm font-medium">Select File</label>
                <div className="flex items-center gap-2">
                  <label htmlFor="file-upload-input" className="flex items-center gap-2 cursor-pointer text-sm text-amber-300 hover:text-amber-400">
                      <Upload className="h-4 w-4" />
                      <span>{file ? file.name : "Choose a file..."}</span>
                  </label>
                  <Input id="file-upload-input" type="file" onChange={handleFileChange} className="hidden" />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={mutation.isPending} className="bg-amber-500 hover:bg-amber-600 text-black">
                  {mutation.isPending ? "Uploading..." : "Upload Content"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
