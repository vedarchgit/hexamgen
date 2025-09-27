
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { UseMutationResult } from "@tanstack/react-query";

export interface StudyPlanPayload {
    exam_date: string;
    subjects: string[];
}

export interface StudyPlanResponse {
    plan: {
        title: string;
        exam_date: string;
        plan_details: Record<string, string>;
    };
}

interface StudyPlanFormProps {
    mutation: UseMutationResult<StudyPlanResponse, Error, StudyPlanPayload, unknown>;
}

export default function StudyPlanForm({ mutation }: StudyPlanFormProps) {
    const [examDate, setExamDate] = useState("");
    const [subjects, setSubjects] = useState("");


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const subjectsArray = subjects.split(",").map(s => s.trim()).filter(s => s);
        if (!examDate || subjectsArray.length === 0) {
            toast("Missing Information", { description: "Please provide an exam date and at least one subject.", duration: 5000, style: { backgroundColor: '#fee2e2', color: '#ef4444' } });
            return;
        }
        mutation.mutate({ exam_date: examDate, subjects: subjectsArray });
    };

    return (
        <Card className="mb-8">
            <CardHeader>
                <CardTitle>Details</CardTitle>
                <CardDescription>All fields are required.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="examDate" className="block text-sm font-medium mb-2">Exam Date</label>
                        <Input
                            id="examDate"
                            type="date"
                            value={examDate}
                            onChange={(e) => setExamDate(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="subjects" className="block text-sm font-medium mb-2">Subjects (comma-separated)</label>
                        <Input
                            id="subjects"
                            type="text"
                            value={subjects}
                            onChange={(e) => setSubjects(e.target.value)}
                            placeholder="e.g., Math, Physics, History"
                            required
                        />
                    </div>
                    <Button type="submit" disabled={mutation.isPending}>
                        {mutation.isPending ? "Generating..." : "Generate Plan"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
