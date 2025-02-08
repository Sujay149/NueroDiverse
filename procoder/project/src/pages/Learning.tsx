import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Video, FileText, Users } from 'lucide-react';

const Learning = () => {
  const courses = [
    {
      title: "Understanding ADHD",
      level: "Beginner",
      duration: "2 hours",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "Dyslexia Strategies",
      level: "Intermediate",
      duration: "3 hours",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "Autism Awareness",
      level: "Advanced",
      duration: "4 hours",
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1200"
    }
  ];

  return (
    <div className="space-y-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-indigo-600 mb-4">Learning Center</h1>
        <p className="text-xl text-gray-600">Discover resources tailored to your learning style</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {courses.map((course, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img 
              src={course.image} 
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <div className="flex justify-between text-gray-600 mb-4">
                <span>{course.level}</span>
                <span>{course.duration}</span>
              </div>
              <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
                Start Learning
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <section className="bg-indigo-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Learning Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <BookOpen className="h-8 w-8 text-indigo-600 mb-4" />
            <h3 className="font-semibold mb-2">Reading Materials</h3>
            <p className="text-gray-600">Access dyslexia-friendly reading materials</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Video className="h-8 w-8 text-indigo-600 mb-4" />
            <h3 className="font-semibold mb-2">Video Lessons</h3>
            <p className="text-gray-600">Visual learning with closed captions</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FileText className="h-8 w-8 text-indigo-600 mb-4" />
            <h3 className="font-semibold mb-2">Practice Exercises</h3>
            <p className="text-gray-600">Interactive worksheets and exercises</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Users className="h-8 w-8 text-indigo-600 mb-4" />
            <h3 className="font-semibold mb-2">Study Groups</h3>
            <p className="text-gray-600">Join virtual study groups</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Learning;