
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { StudyPlanResponse } from "./study-plan-form";

interface StudyPlanResultProps {
    data: StudyPlanResponse;
}

export default function StudyPlanResult({ data }: StudyPlanResultProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{data.plan.title}</CardTitle>
                <CardDescription>Your plan until {data.plan.exam_date}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {Object.entries(data.plan.plan_details).map(([week, description]) => (
                    <div key={week}>
                        <h3 className="font-semibold">{week}</h3>
                        <p className="text-muted-foreground">{description}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
