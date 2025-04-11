
import React, { useState, useEffect } from 'react';
import { HelpCircle, CheckCircle, XCircle, RefreshCw, ChevronRight } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";

// Quiz questions
const quizQuestions = [
  {
    id: 1,
    question: "Which of these actions would reduce your carbon footprint the most?",
    options: [
      "Taking shorter showers",
      "Using public transportation instead of driving",
      "Turning off lights when leaving a room",
      "Using reusable shopping bags"
    ],
    correctAnswer: 1,
    explanation: "While all options help reduce your carbon footprint, using public transportation instead of driving has the largest impact by significantly reducing greenhouse gas emissions."
  },
  {
    id: 2,
    question: "Which of the following is NOT recyclable in most curbside recycling programs?",
    options: [
      "Aluminum cans",
      "Plastic water bottles",
      "Styrofoam containers",
      "Cardboard boxes"
    ],
    correctAnswer: 2,
    explanation: "Styrofoam (polystyrene) is typically not accepted in curbside recycling programs because it's difficult and costly to recycle. It often ends up in landfills or as litter."
  },
  {
    id: 3,
    question: "Which of these materials takes the longest to decompose in nature?",
    options: [
      "Paper towel",
      "Orange peel",
      "Plastic bottle",
      "Cotton t-shirt"
    ],
    correctAnswer: 2,
    explanation: "Plastic bottles can take up to 450 years to decompose in nature, while paper towels take 2-4 weeks, orange peels take 6 months, and cotton t-shirts take about 5 months to 1 year."
  },
  {
    id: 4,
    question: "Which of the following food choices has the lowest carbon footprint?",
    options: [
      "Locally grown vegetables",
      "Imported beef",
      "Factory-farmed chicken",
      "Farm-raised salmon"
    ],
    correctAnswer: 0,
    explanation: "Locally grown vegetables have the lowest carbon footprint among the options, as they require less transportation and typically use fewer resources than animal products."
  },
  {
    id: 5,
    question: "What is the most effective way to reduce waste in your household?",
    options: [
      "Recycling everything possible",
      "Reducing consumption and buying less",
      "Composting food scraps",
      "Using reusable containers"
    ],
    correctAnswer: 1,
    explanation: "While all options are good practices, reducing consumption (buying less) is most effective following the waste hierarchy: Reduce first, then Reuse, and finally Recycle."
  },
  {
    id: 6,
    question: "Which of these activities saves the most water?",
    options: [
      "Taking a shower instead of a bath",
      "Fixing a leaky faucet",
      "Using a dishwasher instead of hand washing",
      "Collecting rainwater for plants"
    ],
    correctAnswer: 1,
    explanation: "A leaky faucet can waste up to 3,000 gallons per year. Fixing it saves more water than the other options in the long run."
  },
  {
    id: 7,
    question: "Which renewable energy source currently provides the most electricity globally?",
    options: [
      "Solar power",
      "Wind power",
      "Hydropower",
      "Geothermal power"
    ],
    correctAnswer: 2,
    explanation: "Hydropower is currently the largest renewable source of electricity generation globally, accounting for about 16% of total electricity production."
  },
  {
    id: 8,
    question: "What percentage of plastic ever produced has been recycled?",
    options: [
      "About 9%",
      "About 30%",
      "About 50%",
      "About 75%"
    ],
    correctAnswer: 0,
    explanation: "Only about 9% of all plastic ever produced has been recycled. About 12% has been incinerated, while the remaining 79% has accumulated in landfills or the natural environment."
  }
];

const EcoQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<typeof quizQuestions>([]);

  useEffect(() => {
    // Shuffle questions when component mounts
    shuffleQuestions();
  }, []);

  const shuffleQuestions = () => {
    const shuffled = [...quizQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5); // Only use 5 questions per quiz for brevity
    setShuffledQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const handleOptionSelect = (optionIndex: number) => {
    if (isAnswered) return;
    
    setSelectedOption(optionIndex);
    setIsAnswered(true);
    
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    
    if (optionIndex === currentQuestion.correctAnswer) {
      setScore(score + 1);
      toast({
        title: "Correct!",
        description: currentQuestion.explanation,
        className: "bg-green-50 border-green-200 text-green-800",
      });
    } else {
      toast({
        title: "Incorrect",
        description: currentQuestion.explanation,
        variant: "destructive",
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    shuffleQuestions();
  };

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  
  if (shuffledQuestions.length === 0) {
    return <div className="p-8 text-center">Loading quiz questions...</div>;
  }

  return (
    <div className="py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-eco-800 dark:text-eco-100">Eco-Knowledge Quiz</h2>
          <p className="mt-2 text-eco-600 dark:text-eco-300">Test your sustainability knowledge with this interactive quiz</p>
        </div>
        
        <Card className="eco-card overflow-hidden">
          {!quizCompleted ? (
            <div>
              <div className="bg-eco-500 px-6 py-3 text-white flex justify-between items-center">
                <span>Question {currentQuestionIndex + 1} of {shuffledQuestions.length}</span>
                <span>Score: {score}</span>
              </div>
              
              <div className="p-6">
                <Progress
                  value={((currentQuestionIndex + 1) / shuffledQuestions.length) * 100}
                  className="mb-6"
                />
                
                <div className="mb-8">
                  <div className="flex items-start">
                    <HelpCircle className="h-6 w-6 text-eco-500 mt-0.5 mr-2 flex-shrink-0" />
                    <h3 className="text-xl font-semibold text-eco-800 dark:text-eco-100">{currentQuestion.question}</h3>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                      disabled={isAnswered}
                      className={`w-full text-left p-4 rounded-lg border transition-colors ${
                        selectedOption === index 
                          ? index === currentQuestion.correctAnswer
                            ? 'bg-green-50 border-green-300 text-green-800'
                            : 'bg-red-50 border-red-300 text-red-800'
                          : 'border-eco-200 dark:border-eco-700 hover:bg-eco-50 dark:hover:bg-eco-800/50'
                      } ${
                        isAnswered && index === currentQuestion.correctAnswer
                          ? 'bg-green-50 border-green-300 text-green-800'
                          : ''
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="mr-3 flex-shrink-0">
                          {isAnswered ? (
                            index === currentQuestion.correctAnswer ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : selectedOption === index ? (
                              <XCircle className="h-5 w-5 text-red-500" />
                            ) : (
                              <div className="h-5 w-5 rounded-full border-2 border-eco-300" />
                            )
                          ) : (
                            <div className="h-5 w-5 rounded-full border-2 border-eco-300" />
                          )}
                        </div>
                        <span>{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
                
                <div className="mt-8 flex justify-end">
                  <Button
                    onClick={handleNextQuestion}
                    disabled={!isAnswered}
                    className="eco-button-primary"
                  >
                    {currentQuestionIndex < shuffledQuestions.length - 1 ? (
                      <>
                        Next Question
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      'Complete Quiz'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div className="text-center py-6">
                <div className="mb-4">
                  {score / shuffledQuestions.length >= 0.8 ? (
                    <div className="h-24 w-24 mx-auto flex items-center justify-center rounded-full bg-green-100 text-4xl">
                      🌟
                    </div>
                  ) : score / shuffledQuestions.length >= 0.6 ? (
                    <div className="h-24 w-24 mx-auto flex items-center justify-center rounded-full bg-green-100 text-4xl">
                      🌱
                    </div>
                  ) : (
                    <div className="h-24 w-24 mx-auto flex items-center justify-center rounded-full bg-green-100 text-4xl">
                      🌎
                    </div>
                  )}
                </div>
                
                <h3 className="text-2xl font-bold text-eco-800 dark:text-eco-100 mb-2">
                  Quiz Completed!
                </h3>
                
                <p className="text-xl mb-4">
                  Your score: <span className="font-bold text-eco-600">{score}/{shuffledQuestions.length}</span>
                </p>
                
                <div className="max-w-md mx-auto mb-8">
                  <div className="bg-eco-50 dark:bg-eco-800/30 p-4 rounded-lg">
                    {score / shuffledQuestions.length >= 0.8 ? (
                      <p className="text-eco-700 dark:text-eco-300">
                        Impressive! You're an eco-warrior with excellent knowledge about sustainability and environmental issues.
                      </p>
                    ) : score / shuffledQuestions.length >= 0.6 ? (
                      <p className="text-eco-700 dark:text-eco-300">
                        Good job! You have a solid understanding of environmental topics, with some room to learn more.
                      </p>
                    ) : (
                      <p className="text-eco-700 dark:text-eco-300">
                        Thanks for playing! There's always more to learn about sustainability. Try again to improve your score!
                      </p>
                    )}
                  </div>
                </div>
                
                <Button
                  onClick={restartQuiz}
                  className="eco-button-primary flex items-center mx-auto"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Play Again with New Questions
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default EcoQuiz;
