import React, { useState, useEffect } from "react";
import axios from "axios";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [quizSetup, setQuizSetup] = useState({});

  useEffect(() => {
    const setup = JSON.parse(localStorage.getItem("quizSetup"));
    setQuizSetup(setup);
    const fetchQuestions = async () => {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=${setup.numberOfQuestions}&category=${setup.category}&difficulty=${setup.difficulty}&type=multiple`
      );
      setQuestions(response.data.results);
    };
    fetchQuestions();
  }, []);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestion].correct_answer) {
      setScore(score + 1);
      setFeedback("Correct!");
    } else {
      setFeedback("Incorrect!");
    }
    setShowFeedback(true);
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      saveResults();
    }
  };

  const saveResults = () => {
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push({ name: quizSetup.name, score });
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  };

  return (
    <div className="container mx-auto p-4">
      {questions.length > 0 && currentQuestion < questions.length ? (
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">
            Question {currentQuestion + 1} of {questions.length}
          </h2>
          <p className="text-xl mb-4">{questions[currentQuestion].question}</p>
          <div className="flex flex-col space-y-4">
            {questions[currentQuestion].incorrect_answers
              .concat(questions[currentQuestion].correct_answer)
              .sort()
              .map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(answer)}
                  className={`p-2 rounded ${
                    selectedAnswer === answer
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  } hover:bg-gray-300`}
                  disabled={showFeedback}
                >
                  {answer}
                </button>
              ))}
          </div>
          {showFeedback && (
            <div className="mt-4">
              <p
                className={`text-xl ${
                  feedback === "Correct!" ? "text-green-500" : "text-red-500"
                }`}
              >
                {feedback}
              </p>
              <button
                onClick={nextQuestion}
                className="bg-blue-500 text-white p-2 mt-4 rounded hover:bg-blue-600"
              >
                {currentQuestion + 1 < questions.length
                  ? "Next Question"
                  : "View Results"}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <p className="text-2xl">
            Quiz complete! Your score: {score}/{questions.length}
          </p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
