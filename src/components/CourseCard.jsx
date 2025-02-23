import { Link } from 'react-router-dom';

function CourseCard({ course, isListView = false }) {
  const CardContent = () => (
    <>
      <div className={`${isListView ? 'flex gap-6' : ''}`}>
        <div className={`${isListView ? 'w-48' : 'h-48 mb-4'} overflow-hidden rounded-lg bg-gray-100`}>
          <img 
            src={course.image} 
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 text-xs font-medium bg-purple-100 text-purple-600 rounded-full">
              {course.type}
            </span>
            <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">
              {course.semester}
            </span>
          </div>
          <h2 className="text-xl font-bold text-gray-900">{course.title}</h2>
          <p className="text-gray-600 line-clamp-2">{course.description}</p>
          
          <div className="pt-4">
            <div className="mb-2">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Postęp</span>
                <span className="text-sm text-gray-600">{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <img
                  className="w-8 h-8 rounded-full"
                  src={course.teacher.avatar}
                  alt={course.teacher.name}
                />
                <span className="text-sm text-gray-500">{course.teacher.name}</span>
              </div>
              <Link
                to={`/courses/${course.id}`}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Otwórz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 border border-gray-100
      ${isListView ? 'col-span-full' : ''}`}
    >
      <CardContent />
    </div>
  );
}

export default CourseCard; 