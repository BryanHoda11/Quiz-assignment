import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [Questions, setQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState({});
  const [score, setScore] = useState(0);
  const totalQuestions = Questions.length;

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch("http://localhost:5000/proxy");
      const data = await response.json();
      setQuestions(data.questions);
    };

    fetchQuestions();
  }, []);

  const handleOptionClick = (qIndex, index, isCorrect) => {
    if (selectedOption[qIndex] !== undefined) return;

    setSelectedOption((prev) => ({
      ...prev,
      [qIndex]: {
        selected: index,
        correct: isCorrect ? index : Questions[qIndex].options.findIndex(opt => opt.is_correct)
      },
    }));

    if (isCorrect) {
      setScore(score + 1);
    }
  };

  return (
    <>
      <div className="quiz-container bg-white mx-auto h-auto w-1/2 my-10 p-5 rounded-xl shadow-md shadow-purple-600">
        <h2 className='text-center text-purple-500 text-xl font-semibold font-sans'>Quiz Assignment</h2>
        <hr className='my-5 w-[90%] mx-auto h-[0.5px] bg-purple-700' />

        <div className="faq w-[90%] mx-auto">
          {Questions.length === 0 ? (
            <p className='text-center text-lg my-4'>Loading...</p>
          ) : (
            Questions.map((question, qIndex) => (
              <div key={question.id} className="mb-6">
                <p className="question font-semibold">{qIndex + 1}. {question.description}</p>
                <ul className="flex flex-col mt-4 list-disc list-inside">
                  {question.options?.map((option, index) => (
                    <li
                      key={index}
                      onClick={() => handleOptionClick(qIndex, index, option.is_correct)}
                      className={`border border-purple-600 py-4 px-3 my-2 cursor-pointer rounded-lg 
                      ${selectedOption[qIndex]?.selected === index
                          ? (option.is_correct ? "bg-green-500 text-white" : "bg-red-500 text-white")
                          : selectedOption[qIndex]?.selected !== undefined && option.is_correct
                            ? "bg-blue-500 text-white"
                            : ""}`
                      }
                    >
                      {option.description}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>

        {Questions.length > 0 && Object.keys(selectedOption).length === totalQuestions && (
          <div className="text-center text-xl bg-white p-10 font-bold text-purple-600">
            🎉Congratulations Quiz Completed! You Scored: {score} / {totalQuestions}
          </div>
        )}

      </div>
    </>
  )
}

export default App
