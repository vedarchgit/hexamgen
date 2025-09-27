
"use client";

import { useMutation } from "@tanstack/react-query";
import StudyPlanForm from "./components/study-plan-form";
import StudyPlanResult from "./components/study-plan-result";
import { toast } from "sonner";
import api from "@/lib/api";
import { StudyPlanPayload, StudyPlanResponse } from "./components/study-plan-form";

const generateStudyPlan = async (payload: StudyPlanPayload): Promise<StudyPlanResponse> => {
    const response = await api.post("/api/study-plan/", payload);
    return response.data;
};

export default function StudyPlanPage() {

  const mutation = useMutation<StudyPlanResponse, Error, StudyPlanPayload>({
    mutationFn: generateStudyPlan,
    onSuccess: () => {
      toast("Success!", { description: "Your study plan has been generated." });
    },
    onError: (error) => {
      toast("Error", { description: error.message || "Failed to generate study plan.", duration: 5000, style: { backgroundColor: '#fee2e2', color: '#ef4444' } });
    },
  });

  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Generate Your Study Plan</h1>
        <p className="text-muted-foreground mb-8">Enter your exam date and subjects to get a personalized study schedule.</p>
        <StudyPlanForm mutation={mutation} />

        {mutation.isSuccess && (
          <StudyPlanResult data={mutation.data} />
        )}

        {mutation.isError && (
            <p className="text-red-500">An error occurred: {mutation.error.message}</p>
        )}
      </div>
    </main>
  );
}
