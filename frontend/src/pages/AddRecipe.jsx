import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiUpload, FiPlus, FiX, FiImage, FiVideo } from 'react-icons/fi'

export default function AddRecipe() {
  const [form, setForm] = useState({ title: '', description: '', prepTime: '', cookTime: '', servings: '', difficulty: 'Easy', category: 'Veg', cuisine: '', calories: '' })
  const [ingredients, setIngredients] = useState([''])
  const [steps, setSteps] = useState([''])
  const [tags, setTags] = useState([])
  const [tagInput, setTagInput] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const addIngredient = () => setIngredients([...ingredients, ''])
  const removeIngredient = (i) => setIngredients(ingredients.filter((_, idx) => idx !== i))
  const updateIngredient = (i, val) => { const n = [...ingredients]; n[i] = val; setIngredients(n) }

  const addStep = () => setSteps([...steps, ''])
  const removeStep = (i) => setSteps(steps.filter((_, idx) => idx !== i))
  const updateStep = (i, val) => { const n = [...steps]; n[i] = val; setSteps(n) }

  const addTag = () => { if (tagInput.trim() && !tags.includes(tagInput.trim())) { setTags([...tags, tagInput.trim()]); setTagInput('') } }
  const removeTag = (t) => setTags(tags.filter(x => x !== t))

  const handleSubmit = (e) => { e.preventDefault(); alert('Recipe submitted! (Backend integration required)') }

  const inputClass = "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors text-sm"

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-heading font-bold text-white mb-2">Add <span className="gradient-text">Recipe</span></h1>
          <p className="text-gray-400 mb-8">Share your culinary creation with the world.</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="glass rounded-2xl p-8 text-center border-2 border-dashed border-white/10 hover:border-primary-500/50 transition-colors cursor-pointer">
            <FiImage className="w-12 h-12 mx-auto text-gray-500 mb-3" />
            <p className="text-gray-400 mb-1">Drag & drop your recipe image here</p>
            <p className="text-xs text-gray-500">or click to browse (PNG, JPG up to 5MB)</p>
            <input type="file" accept="image/*" className="hidden" />
          </div>

          {/* Video Upload */}
          <div className="glass rounded-2xl p-6 text-center border-2 border-dashed border-white/10 hover:border-primary-500/50 transition-colors cursor-pointer">
            <FiVideo className="w-10 h-10 mx-auto text-gray-500 mb-2" />
            <p className="text-sm text-gray-400">Upload cooking video (optional)</p>
            <input type="file" accept="video/*" className="hidden" />
          </div>

          {/* Basic Info */}
          <div className="glass rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-heading font-semibold text-white">Basic Info</h3>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Recipe Title</label>
              <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Butter Chicken" className={inputClass} required />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="Describe your recipe..." className={inputClass + " resize-none"} />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div><label className="block text-sm text-gray-400 mb-1">Prep Time</label><input name="prepTime" value={form.prepTime} onChange={handleChange} placeholder="15 min" className={inputClass} /></div>
              <div><label className="block text-sm text-gray-400 mb-1">Cook Time</label><input name="cookTime" value={form.cookTime} onChange={handleChange} placeholder="30 min" className={inputClass} /></div>
              <div><label className="block text-sm text-gray-400 mb-1">Servings</label><input name="servings" value={form.servings} onChange={handleChange} placeholder="4" className={inputClass} /></div>
              <div><label className="block text-sm text-gray-400 mb-1">Calories</label><input name="calories" value={form.calories} onChange={handleChange} placeholder="380" className={inputClass} /></div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div><label className="block text-sm text-gray-400 mb-1">Difficulty</label>
                <select name="difficulty" value={form.difficulty} onChange={handleChange} className={inputClass}>
                  <option className="bg-gray-900">Easy</option><option className="bg-gray-900">Medium</option><option className="bg-gray-900">Hard</option>
                </select></div>
              <div><label className="block text-sm text-gray-400 mb-1">Category</label>
                <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
                  <option className="bg-gray-900">Veg</option><option className="bg-gray-900">Non-Veg</option><option className="bg-gray-900">Desserts</option><option className="bg-gray-900">Healthy</option>
                </select></div>
              <div><label className="block text-sm text-gray-400 mb-1">Cuisine</label><input name="cuisine" value={form.cuisine} onChange={handleChange} placeholder="Indian" className={inputClass} /></div>
            </div>
          </div>

          {/* Ingredients */}
          <div className="glass rounded-2xl p-6">
            <h3 className="text-lg font-heading font-semibold text-white mb-4">Ingredients</h3>
            <div className="space-y-2">
              {ingredients.map((ing, i) => (
                <div key={i} className="flex gap-2">
                  <input value={ing} onChange={(e) => updateIngredient(i, e.target.value)} placeholder={`Ingredient ${i + 1}`} className={inputClass + " flex-1"} />
                  {ingredients.length > 1 && <button type="button" onClick={() => removeIngredient(i)} className="p-3 rounded-xl text-red-400 hover:bg-red-500/10"><FiX /></button>}
                </div>
              ))}
            </div>
            <button type="button" onClick={addIngredient} className="mt-3 flex items-center gap-2 text-primary-400 text-sm font-medium hover:text-primary-300"><FiPlus /> Add Ingredient</button>
          </div>

          {/* Steps */}
          <div className="glass rounded-2xl p-6">
            <h3 className="text-lg font-heading font-semibold text-white mb-4">Steps</h3>
            <div className="space-y-3">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-sm font-bold shrink-0 mt-1">{i + 1}</div>
                  <textarea value={step} onChange={(e) => updateStep(i, e.target.value)} placeholder={`Step ${i + 1} instructions...`} rows={2} className={inputClass + " flex-1 resize-none"} />
                  {steps.length > 1 && <button type="button" onClick={() => removeStep(i)} className="p-2 rounded-xl text-red-400 hover:bg-red-500/10 mt-1"><FiX /></button>}
                </div>
              ))}
            </div>
            <button type="button" onClick={addStep} className="mt-3 flex items-center gap-2 text-primary-400 text-sm font-medium hover:text-primary-300"><FiPlus /> Add Step</button>
          </div>

          {/* Tags */}
          <div className="glass rounded-2xl p-6">
            <h3 className="text-lg font-heading font-semibold text-white mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((t) => (
                <span key={t} className="flex items-center gap-1 px-3 py-1 rounded-lg bg-primary-500/20 text-primary-400 text-sm">
                  {t} <button type="button" onClick={() => removeTag(t)}><FiX className="w-3 h-3" /></button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())} placeholder="Add a tag..." className={inputClass + " flex-1"} />
              <button type="button" onClick={addTag} className="btn-primary !py-2 !px-4 text-sm">Add</button>
            </div>
          </div>

          <button type="submit" className="w-full btn-primary !py-4 text-lg flex items-center justify-center gap-2">
            <FiUpload /> Publish Recipe
          </button>
        </form>
      </div>
    </div>
  )
}
