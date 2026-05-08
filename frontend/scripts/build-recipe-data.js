import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CSV_PATH = path.resolve(__dirname, '../../DATASET/Food Ingredients and Recipe Dataset with Image Name Mapping.csv');
const OUTPUT_PATH = path.resolve(__dirname, '../src/data/recipes.json');

// Indian recipe keywords for prioritization
const INDIAN_KEYWORDS = [
  'paneer', 'masala', 'biryani', 'tikka', 'tandoori', 'dal', 'daal',
  'naan', 'chapati', 'roti', 'samosa', 'chutney', 'curry', 'korma',
  'vindaloo', 'bhaji', 'pakora', 'dosa', 'idli', 'uttapam', 'paratha',
  'raita', 'lassi', 'gulab', 'jalebi', 'kheer', 'halwa', 'barfi',
  'ladoo', 'pulao', 'pilaf', 'garam', 'turmeric', 'cumin', 'coriander',
  'tamarind', 'ghee', 'cardamom', 'cinnamon', 'saffron', 'chana',
  'aloo', 'gobi', 'palak', 'rajma', 'keema', 'seekh', 'butter chicken',
  'chicken tikka', 'malai', 'kadhai', 'bhuna', 'saag', 'matar',
  'chole', 'puri', 'kulfi', 'rasam', 'sambar', 'pav bhaji',
  'vada', 'upma', 'poha', 'dhokla', 'kofta', 'jalfrezi',
  'mughlai', 'hyderabadi', 'punjabi', 'south indian', 'bengali',
  'gujarati', 'rajasthani', 'goan', 'kerala', 'tamil',
  'indian', 'hindu', 'desi', 'subcontinental',
  'ginger', 'garlic paste', 'yogurt', 'basmati'
];

// Category detection keywords
const NON_VEG_KEYWORDS = ['chicken', 'beef', 'pork', 'lamb', 'mutton', 'fish', 'shrimp', 'prawn', 'salmon', 'tuna', 'crab', 'lobster', 'turkey', 'duck', 'bacon', 'sausage', 'ham', 'steak', 'meat', 'anchov'];
const DESSERT_KEYWORDS = ['cake', 'cookie', 'brownie', 'chocolate', 'ice cream', 'pudding', 'pie', 'tart', 'pastry', 'muffin', 'cupcake', 'frosting', 'candy', 'sugar', 'caramel', 'fudge', 'cheesecake', 'donut', 'sweet', 'dessert', 'biscuit', 'scone', 'meringue', 'mousse', 'custard', 'jalebi', 'gulab', 'halwa', 'kheer', 'barfi', 'ladoo', 'kulfi', 'rasmalai'];
const HEALTHY_KEYWORDS = ['quinoa', 'kale', 'avocado', 'salad', 'smoothie', 'oats', 'granola', 'chia', 'flax', 'protein', 'low-cal', 'vegan', 'gluten-free', 'superfood', 'acai', 'hemp', 'spirulina', 'detox', 'green juice', 'lentil', 'chickpea', 'bean soup', 'tofu', 'tempeh'];
const FAST_FOOD_KEYWORDS = ['burger', 'pizza', 'fries', 'hot dog', 'taco', 'wrap', 'sandwich', 'nachos', 'nugget', 'fried chicken', 'wings', 'quesadilla', 'burrito', 'sub', 'slider', 'corn dog', 'pretzel'];

// Unsplash food image collections organized by category
const FOOD_IMAGES = {
  'Veg': [
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1540914124281-342587941389?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop',
  ],
  'Non-Veg': [
    'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1432139509613-5c4255a1d277?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1610057099443-fde6c99db87f?w=400&h=300&fit=crop',
  ],
  'Desserts': [
    'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400&h=300&fit=crop',
  ],
  'Healthy': [
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1540914124281-342587941389?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=300&fit=crop',
  ],
  'Fast Food': [
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop',
  ],
};

/**
 * Simple CSV line parser that handles quoted fields with commas and newlines
 */
function parseCSVLine(line) {
  const fields = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      fields.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  fields.push(current.trim());
  return fields;
}

/**
 * Parse the CSV file handling multi-line quoted fields
 */
function parseCSV(content) {
  const rows = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < content.length; i++) {
    const ch = content[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
      current += ch;
    } else if ((ch === '\n' || ch === '\r') && !inQuotes) {
      if (ch === '\r' && i + 1 < content.length && content[i + 1] === '\n') {
        i++; // skip \n after \r
      }
      if (current.trim()) {
        rows.push(current);
      }
      current = '';
    } else {
      current += ch;
    }
  }
  if (current.trim()) {
    rows.push(current);
  }
  return rows;
}

function detectCategory(title, ingredients) {
  const text = `${title} ${ingredients}`.toLowerCase();
  
  if (DESSERT_KEYWORDS.some(k => text.includes(k))) return 'Desserts';
  if (FAST_FOOD_KEYWORDS.some(k => text.includes(k))) return 'Fast Food';
  if (NON_VEG_KEYWORDS.some(k => text.includes(k))) return 'Non-Veg';
  if (HEALTHY_KEYWORDS.some(k => text.includes(k))) return 'Healthy';
  return 'Veg';
}

function isIndianRecipe(title, ingredients) {
  const text = `${title} ${ingredients}`.toLowerCase();
  return INDIAN_KEYWORDS.some(k => text.includes(k));
}

function getImage(category, index) {
  const images = FOOD_IMAGES[category] || FOOD_IMAGES['Veg'];
  return images[index % images.length];
}

function estimateCookTime(instructions) {
  if (!instructions) return '30 min';
  const text = instructions.toLowerCase();
  const minuteMatches = text.match(/(\d+)\s*minute/g);
  const hourMatches = text.match(/(\d+)\s*hour/g);
  
  let totalMinutes = 0;
  if (minuteMatches) {
    minuteMatches.forEach(m => {
      const num = parseInt(m);
      if (!isNaN(num)) totalMinutes += num;
    });
  }
  if (hourMatches) {
    hourMatches.forEach(m => {
      const num = parseInt(m);
      if (!isNaN(num)) totalMinutes += num * 60;
    });
  }
  
  if (totalMinutes === 0) totalMinutes = 30;
  if (totalMinutes > 180) totalMinutes = 180;
  
  if (totalMinutes >= 60) {
    const hrs = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    return mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`;
  }
  return `${totalMinutes} min`;
}

function estimateDifficulty(instructions, ingredients) {
  if (!instructions) return 'Medium';
  const steps = instructions.split(/\n|\./).filter(s => s.trim().length > 10).length;
  const ingredientCount = (ingredients.match(/'/g) || []).length / 2;
  
  if (steps <= 3 && ingredientCount <= 5) return 'Easy';
  if (steps >= 8 || ingredientCount >= 15) return 'Hard';
  return 'Medium';
}

function parseIngredientsList(cleanedIngredients) {
  if (!cleanedIngredients) return [];
  try {
    // The cleaned ingredients look like: ['item1', 'item2', ...]
    const matches = cleanedIngredients.match(/'([^']*?)'/g);
    if (matches) {
      return matches.map(m => m.replace(/'/g, '').trim()).filter(Boolean);
    }
  } catch (e) {
    // fallback
  }
  return [];
}

function parseInstructions(instructions) {
  if (!instructions) return [];
  // Split by newline or by sentence-ending periods followed by capital letters
  const steps = instructions
    .split(/\n/)
    .map(s => s.trim())
    .filter(s => s.length > 10);
  
  return steps.map((instruction, i) => ({
    step: i + 1,
    title: `Step ${i + 1}`,
    instruction: instruction,
  }));
}

// Main execution
console.log('📖 Reading CSV file...');
const csvContent = fs.readFileSync(CSV_PATH, 'utf-8');

console.log('🔍 Parsing CSV rows...');
const rawRows = parseCSV(csvContent);
const headerRow = rawRows[0];
console.log(`   Found ${rawRows.length - 1} data rows`);

// Parse all data rows
const allRecipes = [];
let indianRecipes = [];
let otherRecipes = [];

for (let i = 1; i < rawRows.length; i++) {
  const fields = parseCSVLine(rawRows[i]);
  
  // CSV columns: index, Title, Ingredients, Instructions, Image_Name, Cleaned_Ingredients
  if (fields.length < 6) continue;
  
  const title = fields[1];
  const ingredients = fields[2];
  const instructions = fields[3];
  const imageName = fields[4];
  const cleanedIngredients = fields[5];
  
  if (!title || title.length < 3) continue;
  if (!instructions || instructions.length < 20) continue;
  
  const recipe = { title, ingredients, instructions, imageName, cleanedIngredients };
  
  if (isIndianRecipe(title, cleanedIngredients || ingredients)) {
    indianRecipes.push(recipe);
  } else {
    otherRecipes.push(recipe);
  }
}

console.log(`🇮🇳 Found ${indianRecipes.length} Indian recipes`);
console.log(`🌍 Found ${otherRecipes.length} other recipes`);

// Take all Indian recipes (up to 250) + fill rest from others to reach 500
const TARGET_COUNT = 500;
const indianCount = Math.min(indianRecipes.length, 250);
const otherCount = TARGET_COUNT - indianCount;

// Shuffle others for variety
otherRecipes.sort(() => Math.random() - 0.5);

const selectedRecipes = [
  ...indianRecipes.slice(0, indianCount),
  ...otherRecipes.slice(0, otherCount),
];

// Shuffle final selection
selectedRecipes.sort(() => Math.random() - 0.5);

console.log(`✅ Selected ${selectedRecipes.length} recipes (${indianCount} Indian + ${Math.min(otherCount, otherRecipes.length)} other)`);

// Build final JSON
const categoryCounters = {};
const finalRecipes = selectedRecipes.map((r, i) => {
  const category = detectCategory(r.title, r.cleanedIngredients || r.ingredients);
  categoryCounters[category] = (categoryCounters[category] || 0) + 1;
  const catIndex = categoryCounters[category] - 1;
  
  const ingredientsList = parseIngredientsList(r.cleanedIngredients);
  const stepsList = parseInstructions(r.instructions);
  const rating = (3.5 + Math.random() * 1.5).toFixed(1);
  
  return {
    id: i + 1,
    title: r.title,
    image: getImage(category, catIndex),
    imageName: r.imageName,
    cookTime: estimateCookTime(r.instructions),
    difficulty: estimateDifficulty(r.instructions, r.ingredients),
    rating: parseFloat(rating),
    calories: Math.floor(150 + Math.random() * 500),
    category,
    cuisine: isIndianRecipe(r.title, r.cleanedIngredients || r.ingredients) ? 'Indian' : 'International',
    author: { name: 'RecipeHub' },
    ingredients: ingredientsList,
    instructions: r.instructions,
    steps: stepsList,
    servings: Math.floor(2 + Math.random() * 6),
  };
});

// Ensure output directory exists
const outputDir = path.dirname(OUTPUT_PATH);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(OUTPUT_PATH, JSON.stringify(finalRecipes, null, 0));

const fileSizeMB = (fs.statSync(OUTPUT_PATH).size / (1024 * 1024)).toFixed(2);
console.log(`\n📦 Generated ${OUTPUT_PATH}`);
console.log(`   ${finalRecipes.length} recipes, ${fileSizeMB} MB`);
console.log(`   Categories: ${JSON.stringify(categoryCounters)}`);
console.log('✨ Done!');
