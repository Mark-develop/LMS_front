import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ModuleList from '../components/ModuleList';
import QuizComponent from '../components/QuizComponent';
import Loader from '../components/Loader';
import { motion } from 'framer-motion';

function CoursePage() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  const courseData = {
    id: 1,
    title: "Sieci komputerowe",
    description: "Podstawy działania sieci komputerowych",
    progress: 35,
    instructor: {
      name: "dr. Kowalski",
      avatar: "https://i.pravatar.cc/150?img=11",
      title: "Profesor nadzwyczajny"
    },
    modules: [
      {
        id: 1,
        title: "Podstawy sieci",
        description: "Podstawowe koncepcje sieci komputerowych",
        completed: true,
        lessons: [
          { id: 1, title: "Wprowadzenie do sieci", duration: "45 min", completed: true },
          { id: 2, title: "Model OSI", duration: "60 min", completed: true },
          { id: 3, title: "Protokoły sieciowe", duration: "90 min", completed: false }
        ]
      },
      {
        id: 2,
        title: "Zaawansowane sieci",
        description: "Zaawansowane koncepcje sieci",
        completed: false,
        lessons: [
          { id: 4, title: "Routing", duration: "120 min", completed: false },
          { id: 5, title: "Switching", duration: "90 min", completed: false },
          { id: 6, title: "Bezpieczeństwo sieci", duration: "60 min", completed: false }
        ]
      }
    ]
  };

  if (loading) return <Loader />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{courseData.title}</h1>
            <p className="text-gray-600">{courseData.description}</p>
          </div>
          <div className="text-center">
            <div className="relative inline-flex items-center justify-center">
              <svg className="w-20 h-20">
                <circle
                  className="text-gray-200"
                  strokeWidth="5"
                  stroke="currentColor"
                  fill="transparent"
                  r="30"
                  cx="40"
                  cy="40"
                />
                <circle
                  className="text-blue-600"
                  strokeWidth="5"
                  strokeDasharray={30 * 2 * Math.PI}
                  strokeDashoffset={30 * 2 * Math.PI * (1 - courseData.progress / 100)}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="30"
                  cx="40"
                  cy="40"
                />
              </svg>
              <span className="absolute text-xl font-semibold text-blue-600">{courseData.progress}%</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Postęp kursu</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-8">
          <img
            src={courseData.instructor.avatar}
            alt={courseData.instructor.name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="font-medium text-gray-900">{courseData.instructor.name}</h3>
            <p className="text-sm text-gray-500">{courseData.instructor.title}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ModuleList modules={courseData.modules} />
        </div>
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Twój postęp</h2>
            <div className="space-y-4">
              {courseData.modules.map(module => (
                <div key={module.id} className="flex items-center justify-between">
                  <span className="text-gray-600">{module.title}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    module.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {module.completed ? 'Ukończone' : 'W trakcie'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default CoursePage; 