import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiX, FiSearch, FiCheck } from 'react-icons/fi'
import { searchRecipes, getFeaturedRecipes } from '../services/recipeDataService'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack']

// Pre-populate with some recipes from the dataset
function getDefaultPlan(recipes) {
  const plan = {}
  let idx = 0
  const daysToFill = ['Monday', 'Tuesday', 'Wednesday']
  daysToFill.forEach(day => {
    plan[day] = {}
    mealTypes.forEach(meal => {
      if (idx < recipes.length) {
        plan[day][meal] = {
          id: recipes[idx].id,
          title: recipes[idx].title,
          calories: recipes[idx].calories,
          image: recipes[idx].image,
        }
        idx++
      }
    })
  })
  return plan
}

export default function MealPlanner() {
  const defaultRecipes = getFeaturedRecipes(12)
  const [plan, setPlan] = useState(() => getDefaultPlan(defaultRecipes))
  const [selectedDay, setSelectedDay] = useState('Monday')
  const [addingMeal, setAddingMeal] = useState(null) // which meal type is being added
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const searchRef = useRef(null)

  // Search for recipes when adding a meal
  useEffect(() => {
    if (addingMeal && searchQuery.trim()) {
      const results = searchRecipes(searchQuery).slice(0, 8)
      setSearchResults(results)
    } else if (addingMeal) {
      setSearchResults(getFeaturedRecipes(8))
    }
  }, [searchQuery, addingMeal])

  // Focus search when opening add modal
  useEffect(() => {
    if (addingMeal && searchRef.current) {
      setTimeout(() => searchRef.current?.focus(), 100)
    }
  }, [addingMeal])

  const addMealToPlan = (recipe) => {
    setPlan(prev => ({
      ...prev,
      [selectedDay]: {
        ...(prev[selectedDay] || {}),
        [addingMeal]: {
          id: recipe.id,
          title: recipe.title,
          calories: recipe.calories,
          image: recipe.image,
        },
      },
    }))
    setAddingMeal(null)
    setSearchQuery('')
  }

  const removeMeal = (day, mealType) => {
    setPlan(prev => {
      const updated = { ...prev }
      if (updated[day]) {
        const dayMeals = { ...updated[day] }
        delete dayMeals[mealType]
        updated[day] = dayMeals
      }
      return updated
    })
  }

  // Calculate stats
  const allMeals = Object.values(plan).flatMap(d => Object.values(d || {}))
  const totalMealsPlanned = allMeals.length
  const totalCalories = allMeals.reduce((sum, m) => sum + (m?.calories || 0), 0)
  const avgDailyCalories = totalMealsPlanned > 0 ? Math.round(totalCalories / Math.max(Object.keys(plan).length, 1)) : 0
  const weekProgress = Math.round((totalMealsPlanned / (days.length * mealTypes.length)) * 100)

  // Get grocery items from planned meals
  const plannedRecipeIds = [...new Set(allMeals.map(m => m?.id).filter(Boolean))]

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-heading font-bold text-white mb-2">Meal <span className="gradient-text">Planner</span></h1>
          <p className="text-gray-400">Plan your weekly meals with recipes from our collection.</p>
        </motion.div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Avg Daily Cal', val: `${avgDailyCalories}`, icon: '🔥' },
            { label: 'Total Calories', val: `${totalCalories}`, icon: '💪' },
            { label: 'Meals Planned', val: `${totalMealsPlanned}`, icon: '🍽️' },
            { label: 'Week Progress', val: `${weekProgress}%`, icon: '📊' },
          ].map((s) => (
            <div key={s.label} className="glass rounded-2xl p-5 text-center card-hover">
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="text-xl font-bold text-white">{s.val}</div>
              <div className="text-xs text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Day Selector */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {days.map((day) => {
            const dayMealCount = Object.keys(plan[day] || {}).length
            return (
              <button key={day} onClick={() => setSelectedDay(day)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all relative ${selectedDay === day ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white' : 'glass text-gray-300 hover:text-white'}`}>
                {day}
                {dayMealCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {dayMealCount}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Meal Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {mealTypes.map((meal) => {
            const plannedMeal = plan[selectedDay]?.[meal]
            return (
              <motion.div key={meal} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-5 card-hover">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-heading font-semibold text-sm">{meal}</h3>
                  <span className="text-lg">{meal === 'Breakfast' ? '🌅' : meal === 'Lunch' ? '☀️' : meal === 'Dinner' ? '🌙' : '🍎'}</span>
                </div>
                {plannedMeal ? (
                  <div>
                    {plannedMeal.image && (
                      <div className="w-full h-24 rounded-xl overflow-hidden mb-3">
                        <img src={plannedMeal.image} alt={plannedMeal.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <Link to={`/recipes/${plannedMeal.id}`} className="text-gray-300 text-sm mb-3 block hover:text-primary-400 transition-colors line-clamp-2">
                      {plannedMeal.title}
                    </Link>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">🔥 {plannedMeal.calories} cal</span>
                      <button onClick={() => removeMeal(selectedDay, meal)} className="text-xs text-red-400 hover:text-red-300 p-1">
                        <FiX className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setAddingMeal(meal)}
                    className="w-full py-6 rounded-xl border-2 border-dashed border-white/10 text-gray-500 hover:border-primary-500/50 hover:text-primary-400 transition-all flex flex-col items-center gap-1 text-sm"
                  >
                    <FiPlus /> Add Meal
                  </button>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Weekly Overview */}
        <div className="glass rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-heading font-semibold text-white mb-4">📅 Weekly Overview</h3>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-8 gap-2 min-w-[700px]">
              <div className="text-xs text-gray-500 font-medium p-2"></div>
              {days.map(d => (
                <div key={d} className={`text-xs font-medium p-2 text-center rounded-lg ${d === selectedDay ? 'text-primary-400 bg-primary-500/10' : 'text-gray-400'}`}>
                  {d.slice(0, 3)}
                </div>
              ))}
              {mealTypes.map(meal => (
                <div key={meal} className="contents">
                  <div className="text-xs text-gray-500 p-2 flex items-center">{meal}</div>
                  {days.map(day => {
                    const hasMeal = !!plan[day]?.[meal]
                    return (
                      <div key={`${day}-${meal}`} className={`p-2 text-center rounded-lg text-xs ${hasMeal ? 'bg-primary-500/10 text-primary-400' : 'text-gray-600'}`}>
                        {hasMeal ? <FiCheck className="w-3.5 h-3.5 mx-auto" /> : '—'}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Grocery List from planned recipes */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-heading font-semibold text-white">🛒 Grocery List</h3>
            <span className="text-sm text-gray-400">{totalMealsPlanned} meals planned</span>
          </div>
          {totalMealsPlanned > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {allMeals.slice(0, 9).map((meal, i) => (
                <label key={i} className="flex items-center gap-2 p-3 rounded-xl hover:bg-white/5 cursor-pointer text-sm text-gray-300">
                  <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 accent-primary-500" />
                  Ingredients for {meal?.title?.slice(0, 30)}{meal?.title?.length > 30 ? '...' : ''}
                </label>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm text-center py-8">Add meals to your plan to generate a grocery list.</p>
          )}
        </div>
      </div>

      {/* Add Meal Modal */}
      <AnimatePresence>
        {addingMeal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => { setAddingMeal(null); setSearchQuery('') }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-strong rounded-2xl p-6 w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-heading font-semibold">
                  Add {addingMeal} — {selectedDay}
                </h3>
                <button onClick={() => { setAddingMeal(null); setSearchQuery('') }} className="text-gray-400 hover:text-white p-1">
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search recipes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
                />
              </div>

              {/* Results */}
              <div className="flex-1 overflow-y-auto space-y-2">
                {searchResults.map((recipe) => (
                  <button
                    key={recipe.id}
                    onClick={() => addMealToPlan(recipe)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors text-left group"
                  >
                    <img src={recipe.image} alt={recipe.title} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate group-hover:text-primary-400 transition-colors">{recipe.title}</p>
                      <p className="text-xs text-gray-500">{recipe.cookTime} • {recipe.calories} cal • {recipe.category}</p>
                    </div>
                    <FiPlus className="w-4 h-4 text-gray-500 group-hover:text-primary-400 shrink-0" />
                  </button>
                ))}
                {searchResults.length === 0 && searchQuery && (
                  <p className="text-center text-gray-500 text-sm py-8">No recipes found for "{searchQuery}"</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
