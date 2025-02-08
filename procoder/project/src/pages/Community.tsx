import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Users, Heart, Share2 } from 'lucide-react';

const Community = () => {
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      author: "Sarah M.",
      title: "Tips for Managing ADHD at Work",
      content: "I've found some great strategies for staying focused during work hours...",
      likes: 24,
      comments: [],
      tags: ["ADHD", "Work", "Tips"]
    },
    {
      id: 2,
      author: "Michael R.",
      title: "Dyslexia-Friendly Reading Techniques",
      content: "Here are some methods that have helped me improve my reading speed...",
      likes: 32,
      comments: [],
      tags: ["Dyslexia", "Reading", "Learning"]
    },
    {
      id: 3,
      author: "Alex K.",
      title: "Autism and Social Interactions",
      content: "Let's discuss strategies for navigating social situations...",
      likes: 18,
      comments: [],
      tags: ["Autism", "Social", "Support"]
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newDiscussion, setNewDiscussion] = useState({ title: '', content: '', author: 'Anonymous', tags: '' });

  const handleCreateDiscussion = () => {
    const newPost = {
      id: discussions.length + 1,
      ...newDiscussion,
      likes: 0,
      comments: [],
      tags: newDiscussion.tags.split(',').map(tag => tag.trim())
    };
    setDiscussions([newPost, ...discussions]);
    setShowForm(false);
    setNewDiscussion({ title: '', content: '', author: 'Anonymous', tags: '' });
  };

  const handleLike = (id) => {
    setDiscussions(discussions.map(discussion =>
      discussion.id === id ? { ...discussion, likes: discussion.likes + 1 } : discussion
    ));
  };

  const handleAddComment = (id, comment) => {
    setDiscussions(discussions.map(discussion =>
      discussion.id === id ? { ...discussion, comments: [...discussion.comments, comment] } : discussion
    ));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Community Forum</h1>
        <button onClick={() => setShowForm(true)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          Start New Discussion
        </button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Create a New Discussion</h2>
          <input type="text" className="w-full p-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Title" value={newDiscussion.title} onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })} />
          <textarea className="w-full p-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Content" value={newDiscussion.content} onChange={(e) => setNewDiscussion({ ...newDiscussion, content: e.target.value })} />
          <input type="text" className="w-full p-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tags (comma separated)" value={newDiscussion.tags} onChange={(e) => setNewDiscussion({ ...newDiscussion, tags: e.target.value })} />
          <div className="flex space-x-2">
            <button onClick={handleCreateDiscussion} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">Post</button>
            <button onClick={() => setShowForm(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors">Cancel</button>
          </div>
        </motion.div>
      )}

      <div className="space-y-6">
        {discussions.map((discussion) => (
          <motion.div
            key={discussion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{discussion.title}</h3>
                <p className="text-gray-600 text-sm">Posted by {discussion.author}</p>
              </div>
              <div className="flex space-x-2">
                {discussion.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">{tag}</span>
                ))}
              </div>
            </div>

            <p className="text-gray-700 mb-4">{discussion.content}</p>

            <div className="flex items-center space-x-6 text-gray-600">
              <button className="flex items-center space-x-1 hover:text-red-500 transition-colors" onClick={() => handleLike(discussion.id)}>
                <Heart className="h-5 w-5 text-red-500" />
                <span>{discussion.likes}</span>
              </button>
              <MessageCircle className="h-5 w-5 text-blue-500" />
              <span>{discussion.comments.length}</span>
            </div>

            <div className="mt-4">
              <input type="text" className="w-full p-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Add a comment..." onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim() !== '') {
                  handleAddComment(discussion.id, e.target.value.trim());
                  e.target.value = '';
                }
              }} />
              <div className="mt-2 space-y-2">
                {discussion.comments.map((comment, index) => (
                  <p key={index} className="text-gray-800 text-sm border-b pb-1 mb-1">{comment}</p>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Community;
