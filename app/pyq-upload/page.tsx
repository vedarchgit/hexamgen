
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

interface UploadPYQPayload {
  subject_code: string;
  exam_year: number;
  term?: string;
  file: File;
}

const uploadPYQ = async (payload: UploadPYQPayload) => {
  const formData = new FormData();
  formData.append("subject_code", payload.subject_code);
  formData.append("exam_year", payload.exam_year.toString());
  if (payload.term) {
    formData.append("term", payload.term);
  }
  formData.append("file", payload.file);

  const response = await api.post("/api/v1/pyq/upload-pyq", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export default function PYQUploadPage() {
  const router = useRouter();
  const [subjectCode, setSubjectCode] = useState("");
  const [examYear, setExamYear] = useState("");
  const [term, setTerm] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const mutation = useMutation({
    mutationFn: uploadPYQ,
    onSuccess: () => {
      toast("Success!", { description: "PYQ uploaded successfully." });
      router.push("/pyq"); // Redirect to PYQ list page or similar
    },
    onError: (error: any) => {
      toast("Error", { description: error.response?.data?.detail || error.message || "Failed to upload PYQ.", duration: 5000, style: { backgroundColor: '#fee2e2', color: '#ef4444' } });
    },
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectCode || !examYear || !file) {
      toast("Missing Information", { description: "Please fill in all required fields and select a file.", duration: 5000, style: { backgroundColor: '#fee2e2', color: '#ef4444' } });
      return;
    }

    mutation.mutate({
      subject_code: subjectCode,
      exam_year: parseInt(examYear),
      term: term || undefined,
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
          <Link href="/pyq">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <Upload className="h-6 w-6 text-amber-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">Upload PYQ</h1>
              <p className="text-sm text-amber-200/80">Upload Previous Year Question papers</p>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 p-6">
        <Card className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm border-white/20 text-white">
          <CardHeader>
            <CardTitle>Upload New PYQ Document</CardTitle>
            <CardDescription>Only PDF files are supported.</CardDescription>
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
                                      </SelectContent>                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="examYear" className="text-sm font-medium">Exam Year</label>
                <Input
                  id="examYear"
                  type="number"
                  value={examYear}
                  onChange={(e) => setExamYear(e.target.value)}
                  placeholder="e.g., 2023"
                  className="bg-white/10 border-white/20 focus:bg-white/15 focus:border-amber-400/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="term" className="text-sm font-medium">Term (Optional)</label>
                <Input
                  id="term"
                  type="text"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  placeholder="e.g., May/June, Nov/Dec"
                  className="bg-white/10 border-white/20 focus:bg-white/15 focus:border-amber-400/50"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="file-upload" className="text-sm font-medium">Select PDF File</label>
                <div className="flex items-center gap-2">
                  <label htmlFor="file-upload-input" className="flex items-center gap-2 cursor-pointer text-sm text-amber-300 hover:text-amber-400">
                      <Upload className="h-4 w-4" />
                      <span>{file ? file.name : "Choose a PDF file..."}</span>
                  </label>
                  <Input id="file-upload-input" type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={mutation.isPending} className="bg-amber-500 hover:bg-amber-600 text-black">
                  {mutation.isPending ? "Uploading..." : "Upload PYQ"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
