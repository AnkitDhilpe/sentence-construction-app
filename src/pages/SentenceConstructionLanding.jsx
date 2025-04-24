import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PencilLine } from "lucide-react";
import { useScore } from "@/context/ScoreContext";
import questionsData from "@/data/questions.json";

const SentenceConstructionLanding = () => {
  const navigate = useNavigate();
  const { resetScore } = useScore();

  const handleStart = () => {
    resetScore(0); 
    const firstQuestionId = questionsData.data.questions[0]?.questionId;
    if (firstQuestionId) {
      navigate(`/sentence-construction/question/${firstQuestionId}`);
    } else {
      console.error("No questions available.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 px-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <PencilLine className="w-10 h-10 text-gray-600" />
            <h2 className="text-2xl font-semibold">Sentence Construction</h2>
            <p className="text-sm text-gray-600">
              Select the correct words to complete the sentence by arranging the provided options in the right order.
            </p>

            <div className="flex justify-evenly w-full mt-6">
              <div>
                <p className="text-xs text-gray-500">Time Per Question</p>
                <p className="text-base font-medium">30 sec</p>
              </div>
              <Separator orientation="vertical" className="h-10" />
              <div>
                <p className="text-xs text-gray-500">Total Questions</p>
                <p className="text-base font-medium">
                  {questionsData.data.questions.length}
                </p>
              </div>
            </div>

            <div className="flex justify-center space-x-4 mt-8">
              <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleStart}>
                Start
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SentenceConstructionLanding;
