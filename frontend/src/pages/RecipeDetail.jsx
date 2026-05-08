import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getRecipeById } from '../services/recipeDataService'
import { FiClock, FiUsers, FiHeart, FiBookmark, FiShare2, FiPrinter, FiStar, FiCheck, FiArrowLeft } from 'react-icons/fi'

export default function RecipeDetail() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [checkedIngredients, setCheckedIngredients] = useState([])
  const [activeTab, setActiveTab] = useState('ingredients')
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    setLoading(true)
    const found = getRecipeById(id)
    setRecipe(found)
    setLoading(false)
    setCheckedIngredients([])
    setActiveTab('ingredients')
    window.scrollTo(0, 0)
  }, [id])

  const toggleIngredient = (i) => {
    setCheckedIngredients(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])
  }

  if (loading) {
    return (
      <div className="pt-24 pb-16 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-float">🍳</div>
          <p className="text-gray-400">Loading recipe...</p>
        </div>
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="pt-24 pb-16 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-heading font-bold text-white mb-2">Recipe Not Found</h2>
          <p className="text-gray-400 mb-6">The recipe you're looking for doesn't exist.</p>
          <Link to="/recipes" className="btn-primary inline-flex items-center gap-2">
            <FiArrowLeft /> Browse Recipes
          </Link>
        </div>
      </div>
    )
  }

  const ingredients = recipe.ingredients || []
  const steps = recipe.steps || []
  const reviews = [
    { id: 1, user: 'Ananya R.', rating: 5, comment: 'Absolutely delicious! My family loved it.', date: '2 days ago' },
    { id: 2, user: 'David K.', rating: 4, comment: 'Great recipe, turned out perfectly!', date: '1 week ago' },
  ]

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
          <Link to="/recipes" className="inline-flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors text-sm">
            <FiArrowLeft className="w-4 h-4" /> Back to Recipes
          </Link>
        </motion.div>

        {/* Hero Image */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative rounded-3xl overflow-hidden mb-8">
          <img src={recipe.image} alt={recipe.title} className="w-full h-72 sm:h-96 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${
                recipe.category === 'Veg' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                recipe.category === 'Non-Veg' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                'bg-primary-500/20 text-primary-400 border-primary-500/30'
              }`}>{recipe.category}</span>
              <span className="px-3 py-1 rounded-lg bg-yellow-400/20 text-yellow-400 text-sm font-medium">{recipe.difficulty}</span>
              {recipe.cuisine && <span className="px-3 py-1 rounded-lg bg-blue-400/20 text-blue-400 text-sm font-medium">{recipe.cuisine}</span>}
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white">{recipe.title}</h1>
          </div>
        </motion.div>

        {/* Info Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-4 text-sm text-gray-300">
            <span className="flex items-center gap-1"><FiClock className="text-primary-400" /> {recipe.cookTime}</span>
            <span className="flex items-center gap-1"><FiUsers className="text-primary-400" /> {recipe.servings || 4} servings</span>
            <span className="flex items-center gap-1"><FiStar className="text-yellow-400 fill-yellow-400" /> {recipe.rating}</span>
            <span>🔥 {recipe.calories} cal</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setIsLiked(!isLiked)} className={`p-2.5 rounded-xl transition-all ${isLiked ? 'bg-red-500 text-white' : 'glass text-gray-300 hover:text-red-400'}`}><FiHeart className={isLiked ? 'fill-current' : ''} /></button>
            <button onClick={() => setIsSaved(!isSaved)} className={`p-2.5 rounded-xl transition-all ${isSaved ? 'bg-primary-500 text-white' : 'glass text-gray-300 hover:text-primary-400'}`}><FiBookmark className={isSaved ? 'fill-current' : ''} /></button>
            <button className="p-2.5 rounded-xl glass text-gray-300 hover:text-white"><FiShare2 /></button>
            <button onClick={() => window.print()} className="p-2.5 rounded-xl glass text-gray-300 hover:text-white"><FiPrinter /></button>
          </div>
        </div>

        {/* Nutrition */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {[
            { label: 'Calories', val: recipe.calories, unit: 'kcal' },
            { label: 'Protein', val: Math.floor(recipe.calories * 0.12) + 'g' },
            { label: 'Carbs', val: Math.floor(recipe.calories * 0.15) + 'g' },
            { label: 'Fat', val: Math.floor(recipe.calories * 0.08) + 'g' },
          ].map((n) => (
            <div key={n.label} className="glass rounded-xl p-4 text-center">
              <div className="text-lg font-bold text-white">{n.val}</div>
              <div className="text-xs text-gray-400">{n.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 p-1 glass rounded-xl w-fit">
          {['ingredients', 'steps', 'reviews'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white' : 'text-gray-400 hover:text-white'}`}>
              {tab} {tab === 'ingredients' && `(${ingredients.length})`}
              {tab === 'steps' && `(${steps.length})`}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'ingredients' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl p-6">
            <h3 className="text-xl font-heading font-semibold text-white mb-4">Ingredients</h3>
            {ingredients.length > 0 ? (
              <ul className="space-y-3">
                {ingredients.map((ing, i) => (
                  <li key={i} onClick={() => toggleIngredient(i)}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${checkedIngredients.includes(i) ? 'bg-primary-500/10 line-through text-gray-500' : 'hover:bg-white/5 text-gray-300'}`}>
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${checkedIngredients.includes(i) ? 'bg-primary-500 border-primary-500' : 'border-white/20'}`}>
                      {checkedIngredients.includes(i) && <FiCheck className="w-3 h-3 text-white" />}
                    </div>
                    {ing}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 text-sm">No ingredient list available for this recipe.</p>
            )}
          </motion.div>
        )}

        {activeTab === 'steps' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {steps.length > 0 ? steps.map((s) => (
              <div key={s.step} className="glass rounded-2xl p-6 flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold shrink-0">{s.step}</div>
                <div>
                  <h4 className="text-white font-heading font-semibold mb-1">{s.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{s.instruction}</p>
                </div>
              </div>
            )) : (
              <div className="glass rounded-2xl p-6">
                <h4 className="text-white font-heading font-semibold mb-3">Instructions</h4>
                <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">{recipe.instructions}</p>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'reviews' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {reviews.map((r) => (
              <div key={r.id} className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-xs font-bold">{r.user.charAt(0)}</div>
                    <span className="text-white font-medium text-sm">{r.user}</span>
                  </div>
                  <span className="text-xs text-gray-500">{r.date}</span>
                </div>
                <div className="flex gap-0.5 mb-2">{Array.from({ length: r.rating }).map((_, i) => <FiStar key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />)}</div>
                <p className="text-gray-400 text-sm">{r.comment}</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
