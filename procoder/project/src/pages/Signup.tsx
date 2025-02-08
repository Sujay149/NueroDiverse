import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion"; // Animation library
import { useNavigate } from "react-router-dom"; // Navigation
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider 
} from "firebase/auth";
import { initializeApp } from "firebase/app";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [learningStyle, setLearningStyle] = useState("Visual");
  const [communication, setCommunication] = useState<string[]>([]);
  const [sensoryPreferences, setSensoryPreferences] = useState<string[]>([]);

  // Handle Communication Preferences (checkboxes)
  const handleCheckboxChange = (value: string, state: string[], setState: React.Dispatch<React.SetStateAction<string[]>>) => {
    setState((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  // Handle Signup
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      
      // Navigate to last visited page (or home if none found)
      const lastPage = localStorage.getItem("lastPage") || "/";
      alert("Signup successful!");
      navigate(lastPage);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Signup Error:", error.message);
        alert(error.message);
      } else {
        console.error("Unexpected error", error);
        alert("An unexpected error occurred.");
      }
    }
  };

  // Handle Google Sign-in
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google User:", result.user);

      // Navigate after signup
      const lastPage = localStorage.getItem("lastPage") || "/";
      alert(`Welcome, ${result.user.displayName}!`);
      navigate(lastPage);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Google Sign-in Error:", error.message);
        alert("Google Sign-in failed!");
      } else {
        console.error("Unexpected error", error);
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <motion.div 
      className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
      <form onSubmit={handleSignup} className="space-y-4">
        
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter your full name"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Preferred Learning Style */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Preferred Learning Style</label>
          <select 
            value={learningStyle} 
            onChange={(e) => setLearningStyle(e.target.value)} 
            className="w-full p-2 border rounded"
          >
            <option value="Visual">Visual</option>
            <option value="Auditory">Auditory</option>
            <option value="Kinesthetic">Kinesthetic</option>
            <option value="Reading/Writing">Reading/Writing</option>
          </select>
        </div>

        {/* Communication Preferences */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Communication Preferences</label>
          <div className="flex gap-2">
            {["Verbal", "Non-verbal", "Text-based", "Sign Language"].map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  checked={communication.includes(option)}
                  onChange={() => handleCheckboxChange(option, communication, setCommunication)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Sensory Preferences */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Sensory Preferences</label>
          <div className="flex gap-2">
            {["Bright Lights", "Soft Music", "Minimal Noise", "Tactile Support"].map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  checked={sensoryPreferences.includes(option)}
                  onChange={() => handleCheckboxChange(option, sensoryPreferences, setSensoryPreferences)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Signup Button with Animation */}
        <motion.button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 px-4 rounded"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sign Up
        </motion.button>
      </form>

      {/* Google Signup Button */}
      <div className="text-center mt-4">
        <p className="text-sm">Or sign up with</p>
        <motion.button
          onClick={signInWithGoogle}
          className="mt-2 flex items-center justify-center border border-gray-300 text-gray-700 py-2 px-4 rounded w-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FcGoogle className="mr-2 text-xl" /> Sign up with Google
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Signup;
