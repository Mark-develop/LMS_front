function QuizComponent({ quiz }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-bold mb-4">{quiz.title}</h3>
      <div className="space-y-4">
        {quiz.questions?.map((question) => (
          <div key={question.id} className="border-b pb-4">
            <p className="font-medium mb-2">{question.question}</p>
            <div className="space-y-2">
              {question.answers?.map((answer, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input type="radio" name={`question-${question.id}`} />
                  <span>{answer}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button className="mt-6 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
        Отправить ответы
      </button>
    </div>
  );
}

export default QuizComponent; 