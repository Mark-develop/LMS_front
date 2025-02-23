import { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard';
import ViewToggle from '../components/ViewToggle';
import Loader from '../components/Loader';
import { motion } from 'framer-motion';

function CoursesPage() {
  const [loading, setLoading] = useState(true);
  const [isGridView, setIsGridView] = useState(true);
  
  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  const courses = [
    {
      id: 1,
      title: "Sieci komputerowe",
      description: "Podstawy działania sieci komputerowych, protokoły, architektury sieciowe, routing i switching",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
      type: "Wykłady",
      semester: "Semestr 3",
      progress: 68,
      teacher: {
        name: "dr. Kowalski",
        avatar: "https://i.pravatar.cc/150?img=11",
        title: "Profesor nadzwyczajny"
      }
    },
    {
      id: 2,
      title: "Bezpieczeństwo cybernetyczne",
      description: "Podstawy bezpieczeństwa systemów informatycznych, kryptografia, zabezpieczenia sieciowe",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
      type: "Ćwiczenia",
      semester: "Semestr 3",
      progress: 45,
      teacher: {
        name: "dr. Nowak",
        avatar: "https://i.pravatar.cc/150?img=12",
        title: "Adiunkt"
      }
    },
    {
      id: 3,
      title: "Programowanie obiektowe",
      description: "Zaawansowane techniki programowania obiektowego, wzorce projektowe, SOLID",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
      type: "Laboratorium",
      semester: "Semestr 4",
      progress: 23,
      teacher: {
        name: "prof. Wiśniewski",
        avatar: "https://i.pravatar.cc/150?img=13",
        title: "Profesor zwyczajny"
      }
    },
    {
      id: 4,
      title: "Bazy danych",
      description: "Projektowanie i implementacja baz danych, SQL, modelowanie danych, normalizacja",
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d",
      type: "Wykłady",
      semester: "Semestr 4",
      progress: 89,
      teacher: {
        name: "dr. Jankowski",
        avatar: "https://i.pravatar.cc/150?img=14",
        title: "Adiunkt"
      }
    }
  ];


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Przedmioty</h1>
          <p className="text-xl text-gray-600">Lista przedmiotów w bieżącym semestrze</p>
        </div>
        <ViewToggle isGridView={isGridView} onToggle={setIsGridView} />
      </div>
      
      <div className={`grid gap-8 ${
        isGridView 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
      }`}>
        {courses.map(course => (
          <CourseCard 
            key={course.id} 
            course={course} 
            isListView={!isGridView}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default CoursesPage; 