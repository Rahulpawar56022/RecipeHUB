import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiTrash2, FiCheck, FiMinus, FiShoppingCart, FiDollarSign } from 'react-icons/fi'

const initialItems = [
  { id: 1, name: 'Paneer', qty: 2, unit: 'packs', price: 120, checked: false },
  { id: 2, name: 'Onions', qty: 1, unit: 'kg', price: 40, checked: false },
  { id: 3, name: 'Tomatoes', qty: 500, unit: 'g', price: 30, checked: true },
  { id: 4, name: 'Butter', qty: 1, unit: 'pack', price: 55, checked: false },
  { id: 5, name: 'Cream', qty: 200, unit: 'ml', price: 45, checked: false },
  { id: 6, name: 'Garam Masala', qty: 1, unit: 'pack', price: 60, checked: true },
]

export default function ShoppingList() {
  const [items, setItems] = useState(initialItems)
  const [newItem, setNewItem] = useState('')

  const toggleItem = (id) => setItems(items.map(i => i.id === id ? { ...i, checked: !i.checked } : i))
  const removeItem = (id) => setItems(items.filter(i => i.id !== id))
  const addItem = () => {
    if (!newItem.trim()) return
    setItems([...items, { id: Date.now(), name: newItem, qty: 1, unit: 'pcs', price: 0, checked: false }])
    setNewItem('')
  }
  const updateQty = (id, delta) => setItems(items.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i))

  const total = items.reduce((s, i) => s + i.price, 0)
  const checkedCount = items.filter(i => i.checked).length

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-heading font-bold text-white mb-2">Shopping <span className="gradient-text">List</span></h1>
          <p className="text-gray-400">Manage your grocery shopping efficiently.</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="glass rounded-2xl p-4 text-center">
            <FiShoppingCart className="w-6 h-6 mx-auto text-primary-400 mb-1" />
            <div className="text-xl font-bold text-white">{items.length}</div>
            <div className="text-xs text-gray-400">Total Items</div>
          </div>
          <div className="glass rounded-2xl p-4 text-center">
            <FiCheck className="w-6 h-6 mx-auto text-green-400 mb-1" />
            <div className="text-xl font-bold text-white">{checkedCount}/{items.length}</div>
            <div className="text-xs text-gray-400">Completed</div>
          </div>
          <div className="glass rounded-2xl p-4 text-center">
            <FiDollarSign className="w-6 h-6 mx-auto text-accent-400 mb-1" />
            <div className="text-xl font-bold text-white">₹{total}</div>
            <div className="text-xs text-gray-400">Estimated</div>
          </div>
        </div>

        {/* Add Item */}
        <div className="flex gap-2 mb-6">
          <input value={newItem} onChange={(e) => setNewItem(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addItem()}
            placeholder="Add an item..." className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors text-sm" />
          <button onClick={addItem} className="btn-primary !py-3 !px-5"><FiPlus /></button>
        </div>

        {/* Items */}
        <div className="space-y-2">
          {items.map((item) => (
            <motion.div key={item.id} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className={`glass rounded-xl p-4 flex items-center gap-3 transition-all ${item.checked ? 'opacity-50' : ''}`}>
              <button onClick={() => toggleItem(item.id)}
                className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 transition-all ${item.checked ? 'bg-primary-500 border-primary-500' : 'border-white/20 hover:border-primary-500'}`}>
                {item.checked && <FiCheck className="w-3.5 h-3.5 text-white" />}
              </button>
              <span className={`flex-1 text-sm ${item.checked ? 'line-through text-gray-500' : 'text-gray-200'}`}>{item.name}</span>
              <div className="flex items-center gap-1">
                <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 rounded-md bg-white/5 text-gray-400 hover:text-white flex items-center justify-center"><FiMinus className="w-3 h-3" /></button>
                <span className="text-sm text-gray-300 w-12 text-center">{item.qty} {item.unit}</span>
                <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 rounded-md bg-white/5 text-gray-400 hover:text-white flex items-center justify-center"><FiPlus className="w-3 h-3" /></button>
              </div>
              <span className="text-sm text-gray-400 w-16 text-right">₹{item.price}</span>
              <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-300"><FiTrash2 className="w-4 h-4" /></button>
            </motion.div>
          ))}
        </div>

        <button className="w-full btn-primary !py-3 mt-6 flex items-center justify-center gap-2">
          <FiShoppingCart /> Simulate Add to Cart
        </button>
      </div>
    </div>
  )
}
