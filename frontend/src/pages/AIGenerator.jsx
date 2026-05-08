import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSend, FiClock, FiZap, FiLoader } from 'react-icons/fi'

const sampleResult = {
  name: 'Paneer Bhurji with Onion-Tomato Masala',
  ingredients: ['250g paneer, crumbled', '2 onions, finely chopped', '3 tomatoes, chopped', '2 green chilies', '1 tsp cumin seeds', '1 tsp turmeric', '1 tsp garam masala', 'Salt to taste', 'Fresh cilantro'],
  steps: ['Heat oil in a pan, add cumin seeds and let them splutter.', 'Add chopped onions and sauté until golden brown.', 'Add green chilies and tomatoes, cook until soft.', 'Add turmeric, garam masala, and salt. Mix well.', 'Add crumbled paneer and cook for 5-7 minutes.', 'Garnish with cilantro and serve hot with roti.'],
  nutrition: { calories: 320, protein: '22g', carbs: '14g', fat: '20g' },
  cookTime: '25 minutes', difficulty: 'Easy',
}

export default function AIGenerator() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleGenerate = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    setLoading(true)
    setResult(null)
    // Simulate AI response
    setTimeout(() => { setResult(sampleResult); setLoading(false) }, 2500)
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="text-6xl mb-4">🤖</div>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-3">AI Recipe <span className="gradient-text-warm">Generator</span></h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">Tell us what ingredients you have, and our AI will craft a personalized recipe just for you.</p>
        </motion.div>

        {/* Input */}
        <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} onSubmit={handleGenerate} className="mb-10">
          <div className="glass rounded-2xl p-6">
            <label className="block text-white font-heading font-semibold mb-3">What ingredients do you have?</label>
            <div className="relative">
              <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={3} placeholder="e.g. paneer, onion, tomato, garlic, garam masala..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors text-sm resize-none" />
            </div>
            <div className="flex flex-wrap gap-2 mt-3 mb-4">
              {['paneer, onion, tomato', 'chicken, rice, soy sauce', 'eggs, cheese, spinach'].map((s) => (
                <button key={s} type="button" onClick={() => setInput(s)} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-400 hover:text-white hover:border-primary-500/50 transition-all">
                  {s}
                </button>
              ))}
            </div>
            <button type="submit" disabled={loading || !input.trim()} className="btn-primary w-full !py-3 flex items-center justify-center gap-2 text-base disabled:opacity-50">
              {loading ? <><FiLoader className="w-5 h-5 animate-spin" /> Generating...</> : <><FiZap className="w-5 h-5" /> Generate Recipe</>}
            </button>
          </div>
        </motion.form>

        {/* Result */}
        {result && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-green-400/10 text-green-400">AI Generated</span>
                <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-yellow-400/10 text-yellow-400">{result.difficulty}</span>
              </div>
              <h2 className="text-2xl font-heading font-bold text-white mb-2">{result.name}</h2>
              <div className="flex gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1"><FiClock /> {result.cookTime}</span>
                <span>🔥 {result.nutrition.calories} cal</span>
              </div>
            </div>

            {/* Nutrition */}
            <div className="grid grid-cols-4 gap-3">
              {Object.entries(result.nutrition).map(([k, v]) => (
                <div key={k} className="glass rounded-xl p-4 text-center">
                  <div className="text-lg font-bold text-white">{v}</div>
                  <div className="text-xs text-gray-400 capitalize">{k}</div>
                </div>
              ))}
            </div>

            {/* Ingredients */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-heading font-semibold text-white mb-4">🥘 Ingredients</h3>
              <ul className="space-y-2">
                {result.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-400" /> {ing}
                  </li>
                ))}
              </ul>
            </div>

            {/* Steps */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-heading font-semibold text-white mb-4">👨‍🍳 Instructions</h3>
              <div className="space-y-3">
                {result.steps.map((step, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-xs font-bold shrink-0">{i + 1}</div>
                    <p className="text-gray-300 text-sm pt-0.5">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <button className="btn-primary w-full !py-3">Save This Recipe</button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
