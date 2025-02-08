import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, BookOpen, Users, Activity, ChevronLeft, ChevronRight } from 'lucide-react';
import { SpeechText } from '../components/speach';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselItems = [
    {
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200",
      title: "Personalized Learning Paths",
      description: "Discover learning strategies tailored to your unique needs"
    },
    {
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200",
      title: "Supportive Community",
      description: "Connect with others who understand your journey"
    },
    {
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200",
      title: "Career Opportunities",
      description: "Find neurodiversity-friendly job opportunities"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  return (
    <div className="space-y-12">
      {/* Carousel Section */}
      <div className="relative h-[400px] overflow-hidden rounded-xl">
        {carouselItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{
              opacity: currentSlide === index ? 1 : 0,
              x: `${(index - currentSlide) * 100}%`
            }}
            transition={{ duration: 0.5 }}
            className="absolute w-full h-full"
          >
            <div
              className="relative w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <SpeechText>
                    <h2 className="text-4xl font-bold mb-4">{item.title}</h2>
                    <p className="text-xl">{item.description}</p>
                  </SpeechText>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: Brain,
            title: 'Brain Games',
            description: 'Engaging activities to enhance cognitive skills and focus.'
          },
          {
            icon: BookOpen,
            title: 'Learning Resources',
            description: 'Access educational materials designed for different learning styles.'
          },
          {
            icon: Users,
            title: 'Community Support',
            description: 'Connect with peers and share experiences in a safe space.'
          },
          {
            icon: Activity,
            title: 'Daily Activities',
            description: 'Structured daily tasks and routines for better organization.'
          }
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          >
            <feature.icon className="h-12 w-12 text-indigo-600 mb-4" />
            <SpeechText>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </SpeechText>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
