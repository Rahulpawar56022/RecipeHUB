import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiClock, FiHeart, FiBookmark, FiStar } from 'react-icons/fi'
import { useState } from 'react'

export default function RecipeCard({ recipe, index = 0 }) {
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const {
    id = 1,
    title = 'Delicious Recipe',
    image = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    cookTime = '30 min',
    difficulty = 'Medium',
    rating = 4.5,
    calories = 320,
    category = 'Veg',
    cuisine = '',
    author = { name: 'RecipeHub' },
  } = recipe || {}

  const difficultyColor = {
    Easy: 'text-green-400 bg-green-400/10',
    Medium: 'text-yellow-400 bg-yellow-400/10',
    Hard: 'text-red-400 bg-red-400/10',
  }

  const categoryStyle = {
    'Veg': 'bg-green-500/20 text-green-400 border border-green-500/30',
    'Non-Veg': 'bg-red-500/20 text-red-400 border border-red-500/30',
    'Desserts': 'bg-pink-500/20 text-pink-400 border border-pink-500/30',
    'Healthy': 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
    'Fast Food': 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.5) }}
      className="group relative glass rounded-2xl overflow-hidden card-hover"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${categoryStyle[category] || 'bg-primary-500/20 text-primary-400 border border-primary-500/30'}`}>
            {category}
          </span>
        </div>

        {/* Cuisine Badge */}
        {cuisine && cuisine !== 'International' && (
          <div className="absolute top-3 left-[calc(3rem+0.5rem)]" style={{ left: 'auto', right: 'auto', top: '3.25rem' }}>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30 absolute top-0 left-3">
              {cuisine}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-2">
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={(e) => { e.preventDefault(); setIsLiked(!isLiked) }}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              isLiked ? 'bg-red-500 text-white' : 'bg-black/40 backdrop-blur-sm text-white hover:bg-red-500'
            }`}
          >
            <FiHeart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={(e) => { e.preventDefault(); setIsSaved(!isSaved) }}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              isSaved ? 'bg-primary-500 text-white' : 'bg-black/40 backdrop-blur-sm text-white hover:bg-primary-500'
            }`}
          >
            <FiBookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </motion.button>
        </div>

        {/* Calories */}
        <div className="absolute bottom-3 right-3 px-2 py-1 rounded-lg bg-black/40 backdrop-blur-sm text-xs text-white font-medium">
          🔥 {calories} cal
        </div>
      </div>

      {/* Content */}
      <Link to={`/recipes/${id}`} className="block p-4">
        <h3 className="text-white font-heading font-semibold text-lg mb-2 group-hover:text-primary-400 transition-colors line-clamp-1">
          {title}
        </h3>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-gray-400 text-sm">
              <FiClock className="w-3.5 h-3.5" />
              <span>{cookTime}</span>
            </div>
            <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${difficultyColor[difficulty] || difficultyColor['Medium']}`}>
              {difficulty}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <FiStar className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            <span className="text-sm text-yellow-400 font-medium">{rating}</span>
          </div>
        </div>

        {/* Author */}
        <div className="flex items-center gap-2 pt-3 border-t border-white/5">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white text-[10px] font-bold">
            {author.name?.charAt(0) || 'R'}
          </div>
          <span className="text-xs text-gray-400">by {author.name || 'RecipeHub'}</span>
        </div>
      </Link>
    </motion.div>
  )
}
