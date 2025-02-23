import { motion } from 'framer-motion';

function ModuleList({ modules }) {
  return (
    <div className="space-y-6">
      {modules.map((module, index) => (
        <motion.div
          key={module.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">{module.title}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              module.completed ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
            }`}>
              {module.completed ? 'Завершено' : 'В процессе'}
            </span>
          </div>
          <p className="text-gray-600 mb-4">{module.description}</p>
          <div className="space-y-3">
            {module.lessons.map((lesson, lessonIndex) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: lessonIndex * 0.05 }}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    lesson.completed ? 'bg-green-500' : 'bg-gray-200'
                  }`}>
                    {lesson.completed && (
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-gray-900">{lesson.title}</span>
                </div>
                <span className="text-sm text-gray-500">{lesson.duration}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default ModuleList; 