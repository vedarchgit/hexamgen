
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
import { ArrowLeft, PlusCircle, Trash2, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

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

interface Question {
  id: string;
  text: string;
  choices: string[];
  correct: number; // index of the correct choice
}

interface QuizCreatePayload {
  subject_code: string;
  title: string;
  is_daily: boolean;
  questions: Question[];
}

const createQuiz = async (payload: QuizCreatePayload) => {
  const response = await api.post("/api/v1/quizzes/", payload);
  return response.data;
};

export default function NewQuizPage() {
  const router = useRouter();
  const [subjectCode, setSubjectCode] = useState("");
  const [title, setTitle] = useState("");
  const [isDaily, setIsDaily] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([
    { id: "1", text: "", choices: ["", "", "", ""], correct: 0 },
  ]);

  const mutation = useMutation({
    mutationFn: createQuiz,
    onSuccess: () => {
      toast("Success!", { description: "Quiz created successfully." });
      router.push("/quizzes"); // Redirect to quizzes list page or similar
    },
    onError: (error: any) => {
      toast("Error", { description: error.response?.data?.detail || error.message || "Failed to create quiz.", duration: 5000, style: { backgroundColor: '#fee2e2', color: '#ef4444' } });
    },
  });

  const handleAddQuestion = () => {
    setQuestions([...questions, { id: String(questions.length + 1), text: "", choices: ["", "", "", ""], correct: 0 }]);
  };

  const handleRemoveQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (index: number, field: keyof Question, value: string | number) => {
    const newQuestions = [...questions];
    if (field === "choices") {
      // This case is handled by handleChoiceChange
      return;
    }
    (newQuestions[index] as any)[field] = value;
    setQuestions(newQuestions);
  };

  const handleChoiceChange = (qIndex: number, cIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].choices[cIndex] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (qIndex: number, cIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].correct = cIndex;
    setQuestions(newQuestions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectCode || !title || questions.some(q => !q.text || q.choices.some(c => !c))) {
      toast("Missing Information", { description: "Please fill in all quiz details and ensure all questions have text and choices.", duration: 5000, style: { backgroundColor: '#fee2e2', color: '#ef4444' } });
      return;
    }

    mutation.mutate({
      subject_code: subjectCode,
      title,
      is_daily: isDaily,
      questions: questions.map(q => ({ ...q, id: String(q.id) })) // Ensure IDs are strings
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
          <Link href="/quizzes">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <PlusCircle className="h-6 w-6 text-amber-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">Create New Quiz</h1>
              <p className="text-sm text-amber-200/80">Design your own multiple-choice quiz</p>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 p-6">
        <Card className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm border-white/20 text-white">
          <CardHeader>
            <CardTitle>Quiz Details</CardTitle>
            <CardDescription>Fill in the details for your new quiz.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">Quiz Title</label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Data Structures Basics"
                  className="bg-white/10 border-white/20 focus:bg-white/15 focus:border-amber-400/50"
                  required
                />
              </div>

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

              <div className="flex items-center space-x-2">
                <Switch
                  id="isDaily"
                  checked={isDaily}
                  onCheckedChange={setIsDaily}
                />
                <Label htmlFor="isDaily">Mark as Daily Quiz</Label>
              </div>

              <h2 className="text-xl font-bold mt-8">Questions</h2>
              {questions.map((q, qIndex) => (
                <Card key={q.id} className="bg-white/5 border-white/10 p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Question {qIndex + 1}</h3>
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveQuestion(qIndex)} className="text-red-400 hover:bg-white/10">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    placeholder="Enter question text"
                    value={q.text}
                    onChange={(e) => handleQuestionChange(qIndex, "text", e.target.value)}
                    className="bg-white/10 border-white/20 focus:bg-white/15 focus:border-amber-400/50"
                    required
                  />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Choices:</p>
                    {q.choices.map((choice, cIndex) => (
                      <div key={cIndex} className="flex items-center gap-2">
                        <Input
                          placeholder={`Choice ${cIndex + 1}`}
                          value={choice}
                          onChange={(e) => handleChoiceChange(qIndex, cIndex, e.target.value)}
                          className="bg-white/10 border-white/20 focus:bg-white/15 focus:border-amber-400/50"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleCorrectAnswerChange(qIndex, cIndex)}
                          className={cn(
                            "text-gray-400 hover:text-green-500",
                            q.correct === cIndex && "text-green-500"
                          )}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
              <Button type="button" onClick={handleAddQuestion} variant="outline" className="w-full text-white border-white/20 hover:bg-white/10">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Question
              </Button>

              <div className="flex justify-end">
                <Button type="submit" disabled={mutation.isPending} className="bg-amber-500 hover:bg-amber-600 text-black">
                  {mutation.isPending ? "Creating Quiz..." : "Create Quiz"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
