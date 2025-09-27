
"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, BookOpen, Award, CalendarDays, BarChart3, Upload } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/cosmic-background.jpeg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/60 via-black/40 to-purple-900/30" />

      <header className="relative z-10 flex items-center justify-between p-6 bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center gap-4">
          <LayoutDashboard className="h-6 w-6 text-amber-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-sm text-amber-200/80">Your personalized learning hub</p>
          </div>
        </div>
      </header>

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-10 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {/* Study Plan Card */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" /> Study Plan
            </CardTitle>
            <CardDescription>Generate and view your study schedules.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">No active study plan. Create one now!</p>
            <Link href="/study-plan">
              <Button className="bg-amber-500 hover:bg-amber-600 text-black">Go to Study Plan</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Quizzes Card */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" /> Quizzes
            </CardTitle>
            <CardDescription>Test your knowledge with daily or custom quizzes.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Ready for a challenge? Take a quiz!</p>
            <Link href="/quizzes/new">
              <Button className="bg-amber-500 hover:bg-amber-600 text-black">Create New Quiz</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Leaderboard Card */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" /> Leaderboard
            </CardTitle>
            <CardDescription>See how you rank among your peers.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Check out the top performers!</p>
            <Link href="/leaderboard">
              <Button className="bg-amber-500 hover:bg-amber-600 text-black">View Leaderboard</Button>
            </Link>
          </CardContent>
        </Card>

        {/* PYQ Upload Card */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" /> Upload PYQ
            </CardTitle>
            <CardDescription>Upload previous year question papers.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Contribute to the PYQ database.</p>
            <Link href="/pyq-upload">
              <Button className="bg-amber-500 hover:bg-amber-600 text-black">Upload PYQ</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Content Upload Card */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" /> Upload Content
            </CardTitle>
            <CardDescription>Share your study materials.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Upload notes, slides, assignments.</p>
            <Link href="/content-upload">
              <Button className="bg-amber-500 hover:bg-amber-600 text-black">Upload Content</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Analyzer Card */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" /> Analyzer
            </CardTitle>
            <CardDescription>Analyze your performance and topic trends.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Gain insights into your learning.</p>
            <Link href="/analyzer">
              <Button className="bg-amber-500 hover:bg-amber-600 text-black">Go to Analyzer</Button>
            </Link>
          </CardContent>
        </Card>
      </motion.main>
    </div>
  );
}
