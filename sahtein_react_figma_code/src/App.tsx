import { useEffect, useState } from "react"
import heroPhoto from "./imports/sahtein-hero.jpg"
import maqlubaPhoto from "./imports/sahtein-maqluba.jpg"
import falafelPhoto from "./imports/sahtein-falafel.jpg"
import shakshukaPhoto from "./imports/sahtein-shakshuka.jpg"
import hummusPhoto from "./imports/sahtein-hummus.jpg"
import bowlPhoto from "./imports/sahtein-bowl.jpg"
import tabboulehPhoto from "./imports/sahtein-tabbouleh.jpg"
import feastPhoto from "./imports/sahtein-feast.jpg"
import kosharyPhoto from "./imports/sahtein-koshary.jpg"

type Page = "home" | "recipes" | "detail" | "dashboard" | "fasting" | "ai" | "planner" | "favorites" | "profile" | "community" | "account" | "admin" | "wireframe"
type AiStep = "input" | "matches" | "create" | "generated"
type Recipe = {
  id: string
  name: string
  cuisine: string
  time: number
  difficulty: string
  calories: number
  protein: number
  fiber: number
  rating: string
  image: string
  description: string
  tags: string[]
  ingredients: { name: string amount: number unit: string }[]
}
type PantryItem = { name: string quantity: string unit: string }
type CommunityPost = {
  id: number
  author: string
  initials: string
  topic: string
  body: string
  time: string
  likes: number
  liked: boolean
  replies: string[]
}

const images = {
  hero: heroPhoto,
  maqluba: maqlubaPhoto,
  falafel: falafelPhoto,
  shakshuka: shakshukaPhoto,
  hummus: hummusPhoto,
  bowl: bowlPhoto,
  tabbouleh: tabboulehPhoto,
  feast: feastPhoto,
  koshary: kosharyPhoto,
}
const recipes: Recipe[] = [
  {
    id: "maqluba",
    name: "Chicken Maqluba",
    cuisine: "Palestinian",
    time: 65,
    difficulty: "Intermediate",
    calories: 520,
    protein: 38,
    fiber: 5,
    rating: "4.9",
    image: images.maqluba,
    description:
      "A fragrant, upside-down rice dish layered with tender chicken and vegetables.",
    tags: ["Dinner", "High protein"],
    ingredients: [
      { name: "chicken breast", amount: 500, unit: "g" },
      { name: "basmati rice", amount: 2, unit: "cups" },
      { name: "eggplant", amount: 1, unit: "whole" },
      { name: "tomatoes", amount: 2, unit: "whole" },
      { name: "onion", amount: 1, unit: "whole" },
      { name: "olive oil", amount: 2, unit: "tbsp" },
      { name: "seven spice", amount: 1, unit: "tsp" },
    ],
  },
  {
    id: "falafel",
    name: "Herby Falafel Plate",
    cuisine: "Lebanese",
    time: 35,
    difficulty: "Easy",
    calories: 385,
    protein: 16,
    fiber: 11,
    rating: "4.8",
    image: images.falafel,
    description:
      "Crispy chickpea falafel with fresh herbs, crunchy salad, and tahini.",
    tags: ["Vegetarian", "Vegan", "Healthy"],
    ingredients: [
      { name: "chickpeas", amount: 2, unit: "cups" },
      { name: "parsley", amount: 1, unit: "cup" },
      { name: "onion", amount: 1, unit: "whole" },
      { name: "tahini", amount: 3, unit: "tbsp" },
    ],
  },
  {
    id: "shakshuka",
    name: "Classic Shakshuka",
    cuisine: "North African",
    time: 30,
    difficulty: "Easy",
    calories: 310,
    protein: 18,
    fiber: 6,
    rating: "4.9",
    image: images.shakshuka,
    description:
      "Soft eggs nestled in a warmly spiced tomato and pepper sauce.",
    tags: ["Breakfast", "Vegetarian", "Low calorie"],
    ingredients: [
      { name: "eggs", amount: 4, unit: "whole" },
      { name: "tomatoes", amount: 4, unit: "whole" },
      { name: "bell pepper", amount: 1, unit: "whole" },
      { name: "onion", amount: 1, unit: "whole" },
    ],
  },
  {
    id: "hummus",
    name: "Silky Hummus & Pita",
    cuisine: "Levantine",
    time: 20,
    difficulty: "Easy",
    calories: 290,
    protein: 12,
    fiber: 8,
    rating: "4.8",
    image: images.hummus,
    description: "Creamy, lemony hummus finished with olive oil and warm pita.",
    tags: ["Snack", "Vegan", "Healthy"],
    ingredients: [
      { name: "chickpeas", amount: 2, unit: "cups" },
      { name: "tahini", amount: 3, unit: "tbsp" },
      { name: "lemon", amount: 1, unit: "whole" },
    ],
  },
  {
    id: "shawarma",
    name: "Chicken Shawarma Bowl",
    cuisine: "Middle Eastern",
    time: 40,
    difficulty: "Easy",
    calories: 480,
    protein: 42,
    fiber: 7,
    rating: "4.9",
    image: images.bowl,
    description:
      "A bright, nourishing bowl with spiced chicken, grains, and greens.",
    tags: ["Dinner", "High protein", "Healthy"],
    ingredients: [
      { name: "chicken breast", amount: 500, unit: "g" },
      { name: "rice", amount: 2, unit: "cups" },
      { name: "tomatoes", amount: 2, unit: "whole" },
      { name: "yogurt", amount: 1, unit: "cup" },
    ],
  },
  {
    id: "tabbouleh",
    name: "Fresh Tabbouleh",
    cuisine: "Lebanese",
    time: 20,
    difficulty: "Easy",
    calories: 210,
    protein: 6,
    fiber: 8,
    rating: "4.7",
    image: images.tabbouleh,
    description:
      "A refreshing parsley-forward salad with lemon, tomatoes, and bulgur.",
    tags: ["Lunch", "Vegan", "Low calorie", "Healthy"],
    ingredients: [
      { name: "parsley", amount: 2, unit: "cups" },
      { name: "tomatoes", amount: 3, unit: "whole" },
      { name: "bulgur", amount: 1, unit: "cup" },
    ],
  },
  {
    id: "pilaf",
    name: "Spiced Chicken Pilaf",
    cuisine: "Jordanian",
    time: 45,
    difficulty: "Easy",
    calories: 465,
    protein: 35,
    fiber: 4,
    rating: "4.8",
    image: images.feast,
    description:
      "Golden spiced rice with tender chicken and toasted aromatics.",
    tags: ["Dinner", "High protein"],
    ingredients: [
      { name: "chicken", amount: 500, unit: "g" },
      { name: "rice", amount: 2, unit: "cups" },
      { name: "onion", amount: 1, unit: "whole" },
    ],
  },
  {
    id: "koshary",
    name: "Egyptian Koshary",
    cuisine: "Egyptian",
    time: 50,
    difficulty: "Intermediate",
    calories: 440,
    protein: 17,
    fiber: 12,
    rating: "4.8",
    image: images.koshary,
    description:
      "Egypt's beloved comfort bowl of lentils, rice, pasta, and tomato sauce.",
    tags: ["Dinner", "Vegetarian", "Vegan"],
    ingredients: [
      { name: "lentils", amount: 1, unit: "cup" },
      { name: "rice", amount: 1, unit: "cup" },
      { name: "tomatoes", amount: 3, unit: "whole" },
    ],
  },
]
const cuisines = [
  "Jordanian",
  "Palestinian",
  "Lebanese",
  "Syrian",
  "Egyptian",
  "Iraqi",
  "Gulf",
  "North African",
  "Turkish",
  "Mediterranean",
  "International",
]
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]
const mealNames = ["Breakfast", "Lunch", "Dinner", "Snack"]
const initialPantry: PantryItem[] = [
  { name: "Chicken", quantity: "500", unit: "g" },
  { name: "Rice", quantity: "2", unit: "cups" },
  { name: "Tomato", quantity: "3", unit: "whole" },
  { name: "Onion", quantity: "1", unit: "whole" },
  { name: "Olive oil", quantity: "2", unit: "tbsp" },
]

function Icon({
  name,
  size = 20,
  fill = "none",
}: {
  name: string
  size?: number
  fill?: string
}) {
  const paths: Record<string, React.ReactNode> = {
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m16 16 5 5" />
      </>
    ),
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
    ),
    arrow: (
      <>
        <path d="M4 12h16" />
        <path d="m14 6 6 6-6 6" />
      </>
    ),
    chevron: <path d="m6 9 6 6 6-6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    star: (
      <path d="m12 2 3.1 6.4 7.1 1-5.1 5 1.2 7-6.3-3.3-6.3 3.3 1.2-7-5.1-5 7.1-1L12 2Z" />
    ),
    spark: (
      <>
        <path d="m12 2 1.8 7.2L21 11l-7.2 1.8L12 20l-1.8-7.2L3 11l7.2-1.8L12 2Z" />
        <path d="m19 18 .5 1.5L21 20l-1.5.5L19 22l-.5-1.5L17 20l1.5-.5L19 18Z" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    minus: <path d="M5 12h14" />,
    close: <path d="M5 5 19 19M19 5 5 19" />,
    check: <path d="m5 12 4 4L19 6" />,
    leaf: (
      <>
        <path d="M20 4C9 4 4 9 4 16a4 4 0 0 0 4 4c7 0 12-5 12-16Z" />
        <path d="M4 20c3-5 7-8 12-11" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 3v4M17 3v4M3 10h18" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    utensils: (
      <>
        <path d="M4 2v8a3 3 0 0 0 6 0V2M7 2v20M18 2c-3 2-4 5-4 10h4v10" />
      </>
    ),
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    sliders: (
      <>
        <path d="M4 7h16M4 17h16" />
        <circle cx="9" cy="7" r="2" fill="currentColor" />
        <circle cx="16" cy="17" r="2" fill="currentColor" />
      </>
    ),
    pause: <path d="M9 5v14M15 5v14" />,
    play: <path d="m8 5 11 7-11 7V5Z" />,
    refresh: (
      <>
        <path d="M20 7v5h-5M4 17v-5h5" />
        <path d="M5.5 9A7 7 0 0 1 18 6l2 1M4 17l2 1a7 7 0 0 0 12.5-3" />
      </>
    ),
    share: (
      <>
        <circle cx="18" cy="5" r="2" />
        <circle cx="6" cy="12" r="2" />
        <circle cx="18" cy="19" r="2" />
        <path d="m8 11 8-5M8 13l8 5" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c-5 4-5 14 0 18M12 3c5 4 5 14 0 18" />
      </>
    ),
    fire: (
      <path d="M12 22c-5 0-8-3.4-8-8 0-3 2-5.5 4-7 0 3 1 4 2 4 1-4 4-7 5-9 0 4 5 7 5 12 0 4.6-3 8-8 8Z" />
    ),
    adjust: (
      <>
        <path d="M4 7h16M4 17h16" />
        <circle cx="8" cy="7" r="2" fill="currentColor" />
        <circle cx="16" cy="17" r="2" fill="currentColor" />
      </>
    ),
    book: (
      <>
        <path d="M12 6C9 4 6 4 3 5v14c3-1 6-1 9 1 3-2 6-2 9-1V5c-3-1-6-1-9 1ZM12 6v14" />
      </>
    ),
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}
const fmt = (n: number) =>
  Number.isInteger(n) ? String(n) : String(Math.round(n * 100) / 100)
const duration = (seconds: number) =>
  [Math.floor(seconds / 3600), Math.floor((seconds % 3600) / 60), seconds % 60]
    .map((n) => String(n).padStart(2, "0"))
    .join(":")
const matchesIngredient = (
  recipeIngredient: string,
  pantryIngredient: string,
) => {
  const a = recipeIngredient.toLowerCase().replace(/s\b/g, "")
  const b = pantryIngredient.toLowerCase().replace(/s\b/g, "")
  return Boolean(a && b && (a.includes(b) || b.includes(a)))
}
const matchCandidates = [
  {
    recipe: recipes[0],
    required: ["chicken", "rice", "tomato", "onion"],
    best: 92,
  },
  { recipe: recipes[6], required: ["chicken", "rice", "onion"], best: 86 },
  {
    recipe: recipes[4],
    required: ["chicken", "tomato", "olive oil"],
    best: 78,
  },
  { recipe: recipes[2], required: ["tomato", "onion", "egg"], best: 76 },
  { recipe: recipes[5], required: ["tomato", "parsley", "bulgur"], best: 75 },
  { recipe: recipes[1], required: ["chickpea", "onion", "parsley"], best: 74 },
]

function Wireframe({ navigate }: { navigate: (page: Page) => void }) {
  const panels = [
    ["Home / discovery", "home"],
    ["Recipe browsing", "recipes"],
    ["Recipe detail", "detail"],
    ["Healthy dashboard", "dashboard"],
    ["Fasting timer", "fasting"],
    ["AI ingredients", "ai"],
    ["Top 3 matches", "ai"],
    ["Create recipe", "ai"],
    ["Generated recipe", "ai"],
    ["Meal planner", "planner"],
    ["Favorites", "favorites"],
    ["User profile", "profile"],
    ["Sign in", "account"],
    ["Create account", "account"],
    ["Community feed", "community"],
    ["Community thread", "community"],
    ["Admin analytics", "admin"],
    ["Recipe management", "admin"],
    ["Recipe editor", "admin"],
    ["Community moderation", "admin"],
  ]
  return (
    <main className="wire-page">
      <div className="container">
        <div className="wire-heading">
          <div>
            <span className="eyebrow">THE COMPLETE BLUEPRINT</span>
            <h1>Sahtein system wireframe</h1>
            <p>
              Twenty connected screens across the public product, member
              community, account journey, and admin workspace.
            </p>
          </div>
          <button className="wire-primary" onClick={() => navigate("home")}>
            Open live prototype <Icon name="arrow" size={17} />
          </button>
        </div>
        <div className="wire-flow">
          DISCOVER <Icon name="arrow" size={14} /> COOK{" "}
          <Icon name="arrow" size={14} /> CONNECT{" "}
          <Icon name="arrow" size={14} /> MANAGE
        </div>
        <div className="wire-grid">
          {panels.map(([panel, target], i) => (
            <button
              className="wire-panel"
              key={panel}
              onClick={() => navigate(target as Page)}
            >
              <div className="wire-panel-top">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <strong>{panel}</strong>
              </div>
              <div className="wire-nav" />
              <div className="wire-block wide" />
              <div className="wire-line" />
              <div className="wire-line short" />
              <div className="wire-boxes">
                <div />
                <div />
                <div />
              </div>
              <div className="wire-button" />
            </button>
          ))}
        </div>
        <div className="wire-footer">
          <span>WIREFRAME → VISUAL DESIGN → INTERACTIVE PROTOTYPE</span>
          <button onClick={() => navigate("admin")}>
            Explore admin workspace <Icon name="arrow" size={16} />
          </button>
        </div>
      </div>
    </main>
  )
}

const initialPosts: CommunityPost[] = [
  {
    id: 1,
    author: "Maya Haddad",
    initials: "MH",
    topic: "Kitchen stories",
    body: "My grandmother always toasted the vermicelli until it was deeply golden before adding rice. What tiny family technique makes your food taste like home?",
    time: "12 min ago",
    likes: 24,
    liked: false,
    replies: [
      "The pinch of cinnamon in lentil soup—always.",
      "Finishing hummus with ice water changed everything.",
    ],
  },
  {
    id: 2,
    author: "Omar Nasser",
    initials: "ON",
    topic: "Dinner help",
    body: "I have eggplant, tomatoes, chickpeas, and about 40 minutes. Would you go musaka-style or make a warm chickpea bowl?",
    time: "38 min ago",
    likes: 11,
    liked: false,
    replies: [
      "Warm bowl, with lots of lemon and tahini.",
      "Musaka and save a portion for tomorrow!",
    ],
  },
  {
    id: 3,
    author: "Leen Saleh",
    initials: "LS",
    topic: "Off topic",
    body: "What is everyone listening to while they cook this week? I need a new kitchen playlist.",
    time: "1 hr ago",
    likes: 18,
    liked: false,
    replies: [
      "Old Fairuz records, every Sunday.",
      "The Khruangbin radio mix is perfect for prep.",
    ],
  },
]

function RecipeCard({
  recipe,
  healthy,
  favorite,
  onFavorite,
  onOpen,
  compact = false,
}: {
  recipe: Recipe
  healthy: boolean
  favorite: boolean
  onFavorite: () => void
  onOpen: () => void
  compact?: boolean
}) {
  return (
    <article className={`recipe-card ${compact ? "compact" : ""}`}>
      <div className="card-image-wrap">
        <button
          className="card-image-button"
          onClick={onOpen}
          aria-label={`View ${recipe.name}`}
        >
          <img src={recipe.image} alt={recipe.name} loading="lazy" />
        </button>
        <button
          className={`favorite-button ${favorite ? "saved" : ""}`}
          aria-label={
            favorite
              ? `Remove ${recipe.name} from favorites`
              : `Save ${recipe.name}`
          }
          onClick={onFavorite}
        >
          <Icon
            name="heart"
            size={19}
            fill={favorite ? "currentColor" : "none"}
          />
        </button>
        {healthy && (
          <span className="image-badge">
            <Icon name="leaf" size={13} /> {recipe.calories} kcal / serving
          </span>
        )}
      </div>
      <div className="card-content">
        <div className="card-kicker">
          {recipe.cuisine} <span>·</span> {recipe.tags[0]}
        </div>
        <button className="card-title" onClick={onOpen}>
          {recipe.name}
        </button>
        {!compact && <p>{recipe.description}</p>}
        <div className="card-meta">
          <span>
            <Icon name="star" size={14} fill="currentColor" /> {recipe.rating}
          </span>
          <span>
            <Icon name="clock" size={15} /> {recipe.time} min
          </span>
          {healthy ? (
            <span>{recipe.protein}g protein</span>
          ) : (
            <span>{recipe.difficulty}</span>
          )}
        </div>
      </div>
    </article>
  )
}

export default function App() {
  const [page, setPage] = useState<Page>("home")
  const [managedRecipes, setManagedRecipes] = useState<Recipe[]>(recipes)
  const [userName, setUserName] = useState<string | null>(null)
  const [accountMode, setAccountMode] = useState<"signin" | "signup">("signup")
  const [accountName, setAccountName] = useState("")
  const [accountEmail, setAccountEmail] = useState("")
  const [accountPassword, setAccountPassword] = useState("")
  const [posts, setPosts] = useState<CommunityPost[]>(initialPosts)
  const [postDraft, setPostDraft] = useState("")
  const [postTopic, setPostTopic] = useState("Kitchen stories")
  const [replyDrafts, setReplyDrafts] = useState<Record<number, string>>({})
  const [adminTab, setAdminTab] =
    useState<"overview" | "recipes" | "community">("overview")
  const [analyticsRange, setAnalyticsRange] = useState("30 days")
  const [editingRecipe, setEditingRecipe] = useState<string | null>(null)
  const [recipeDraft, setRecipeDraft] = useState({
    name: "",
    cuisine: "Levantine",
    description: "",
    time: "30",
    calories: "400",
  })
  const [healthy, setHealthy] = useState(false)
  const [selectedId, setSelectedId] = useState("maqluba")
  const [servings, setServings] = useState(4)
  const [favorites, setFavorites] = useState<string[]>(["shakshuka"])
  const [search, setSearch] = useState("")
  const [cuisineFilter, setCuisineFilter] = useState("All cuisines")
  const [dietFilter, setDietFilter] = useState("All recipes")
  const [sort, setSort] = useState("Most popular")
  const [maxCalories, setMaxCalories] = useState(800)
  const [aiStep, setAiStep] = useState<AiStep>("input")
  const [pantry, setPantry] = useState<PantryItem[]>(initialPantry)
  const [aiServings, setAiServings] = useState(4)
  const [measurement, setMeasurement] = useState("Metric")
  const [diet, setDiet] = useState("High protein")
  const [aiCuisine, setAiCuisine] = useState("Middle Eastern")
  const [mealType, setMealType] = useState("Dinner")
  const [otherPrefs, setOtherPrefs] = useState<string[]>(["Healthy"])
  const [extraNotes, setExtraNotes] = useState("")
  const [calorieLimit, setCalorieLimit] = useState(600)
  const [avoid, setAvoid] = useState("")
  const [adjustOpen, setAdjustOpen] = useState(false)
  const [regenerated, setRegenerated] = useState(false)
  const [plan, setPlan] = useState(16)
  const [fastStatus, setFastStatus] = useState<"idle" | "running" | "paused">(
    "idle",
  )
  const [fastSeconds, setFastSeconds] = useState(0)
  const [fastHistory, setFastHistory] = useState<{
    date: string
    duration: string
    plan: string
  }[]>([
    { date: "Yesterday", duration: "16h 02m", plan: "16:8" },
    { date: "Monday", duration: "15h 48m", plan: "16:8" },
  ])
  const [activeDay, setActiveDay] = useState(0)
  const [planner, setPlanner] = useState<Record<string, string>>({
    "0-Breakfast": "shakshuka",
    "0-Lunch": "tabbouleh",
    "0-Dinner": "shawarma",
    "1-Lunch": "falafel",
    "2-Dinner": "maqluba",
  })
  const [mealPicker, setMealPicker] = useState<string | null>(null)
  const [favTab, setFavTab] = useState("All")
  const [mobileMenu, setMobileMenu] = useState(false)
  const [checked, setChecked] = useState<string[]>([])
  const [cooking, setCooking] = useState(false)
  const selected =
    managedRecipes.find((r) => r.id === selectedId) ||
    managedRecipes[0] ||
    recipes[0]
  const plantBased = diet === "Vegetarian" || diet === "Vegan"
  const generatedName = plantBased
    ? "Spiced Chickpea & Rice Bowl"
    : pantry.some((p) => /chicken/i.test(p.name))
      ? "Healthy Middle Eastern Chicken Bowl"
      : "Your Middle Eastern Kitchen Bowl"
  const generatedCalories = Math.min(
    calorieLimit,
    diet === "Low calorie" ? 410 : 520,
  )
  const generatedProtein = Math.round(
    ((plantBased ? 23 : diet === "High protein" ? 42 : 34) *
      generatedCalories) /
      520,
  )
  const generatedCarbs = Math.round((48 * generatedCalories) / 520)
  const generatedFat = Math.round((18 * generatedCalories) / 520)
  const generatedTotal = generatedCalories * aiServings
  const generatedRecipe: Recipe = {
    ...recipes[4],
    id: "generated",
    name: generatedName,
    cuisine: aiCuisine,
    calories: generatedCalories,
    protein: generatedProtein,
    tags: ["Healthy", "AI Recipes"],
  }
  const allRecipes = [...managedRecipes, generatedRecipe]
  const sourceIngredients = pantry.filter(
    (p) =>
      p.name.trim() &&
      !matchesIngredient(p.name, avoid) &&
      (!plantBased || !/chicken|beef|lamb|meat|fish/i.test(p.name)),
  )
  const generatedIngredients = (
    plantBased &&
    !sourceIngredients.some((p) => /chickpea|lentil|bean/i.test(p.name))
      ? [
          ...sourceIngredients,
          { name: "Chickpeas", quantity: "2", unit: "cups" },
        ]
      : sourceIngredients
  ).map((p) => {
    const amount = p.quantity ? (Number(p.quantity) * aiServings) / 4 : null
    if (amount === null) return { ...p, quantity: "to taste" }
    if (measurement === "Imperial" && p.unit === "g")
      return { ...p, quantity: fmt(amount / 28.35), unit: "oz" }
    if (measurement === "Metric" && (p.unit === "cup" || p.unit === "cups"))
      return {
        ...p,
        quantity: fmt(
          amount * (/rice|chickpea|lentil/i.test(p.name) ? 185 : 240),
        ),
        unit: "g",
      }
    return { ...p, quantity: fmt(amount) }
  })
  const portionIngredients = generatedIngredients.map((p) => ({
    ...p,
    quantity:
      p.quantity === "to taste"
        ? p.quantity
        : fmt(Number(p.quantity) / aiServings),
  }))
  const closestMatches = matchCandidates
    .map((candidate) => {
      const available = candidate.required.filter((ingredient) =>
        pantry.some((p) => matchesIngredient(ingredient, p.name)),
      )
      return {
        ...candidate,
        score: Math.round(
          (candidate.best * available.length) / candidate.required.length,
        ),
        available,
        missing: candidate.required.filter(
          (ingredient) => !available.includes(ingredient),
        ),
      }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
  const plannedCalories = Object.entries(planner)
    .filter(([key]) => key.startsWith(`${activeDay}-`))
    .reduce(
      (sum, [, id]) =>
        sum + (allRecipes.find((r) => r.id === id)?.calories || 0),
      0,
    )
  const consumed = plannedCalories
  const remaining = Math.max(0, 1800 - consumed)

  useEffect(() => {
    if (fastStatus !== "running") return
    const timer = window.setInterval(() => setFastSeconds((s) => s + 1), 1000)
    return () => window.clearInterval(timer)
  }, [fastStatus])
  const navigate = (next: Page) => {
    setPage(next)
    setMobileMenu(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const openRecipe = (id: string) => {
    setSelectedId(id)
    setServings(4)
    setChecked([])
    setCooking(false)
    navigate("detail")
  }
  const toggleFavorite = (id: string) =>
    setFavorites((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id],
    )
  const openAi = (step: AiStep = "input") => {
    setAiStep(step)
    navigate("ai")
  }
  const updatePantry = (
    index: number,
    field: keyof PantryItem,
    value: string,
  ) =>
    setPantry((current) =>
      current.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    )
  const updatePlanner = (key: string, id: string) => {
    setPlanner((current) => ({ ...current, [key]: id }))
    setMealPicker(null)
  }
  const addSelectedToPlan = () => {
    updatePlanner(`${activeDay}-Dinner`, selected.id)
    navigate("planner")
  }
  const addGeneratedToPlan = () => {
    updatePlanner(`${activeDay}-Dinner`, "generated")
    navigate("planner")
  }
  const submitAccount = () => {
    const name =
      accountMode === "signup"
        ? accountName.trim()
        : accountEmail.split("@")[0].replace(/[._-]/g, " ")
    if (!name || !accountEmail.trim() || accountPassword.length < 6) return
    setUserName(name.replace(/\b\w/g, (letter) => letter.toUpperCase()))
    navigate("profile")
  }
  const publishPost = () => {
    if (!userName) {
      setAccountMode("signup")
      navigate("account")
      return
    }
    if (!postDraft.trim()) return
    setPosts((current) => [
      {
        id: Date.now(),
        author: userName,
        initials: userName
          .split(" ")
          .map((word) => word[0])
          .join("")
          .slice(0, 2)
          .toUpperCase(),
        topic: postTopic,
        body: postDraft.trim(),
        time: "Just now",
        likes: 0,
        liked: false,
        replies: [],
      },
      ...current,
    ])
    setPostDraft("")
  }
  const togglePostLike = (id: number) =>
    setPosts((current) =>
      current.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.likes + (post.liked ? -1 : 1),
            }
          : post,
      ),
    )
  const addReply = (id: number) => {
    const reply = replyDrafts[id]?.trim()
    if (!reply) return
    if (!userName) {
      navigate("account")
      return
    }
    setPosts((current) =>
      current.map((post) =>
        post.id === id
          ? { ...post, replies: [...post.replies, `${userName}: ${reply}`] }
          : post,
      ),
    )
    setReplyDrafts((current) => ({ ...current, [id]: "" }))
  }
  const startRecipe = (recipe?: Recipe) => {
    setEditingRecipe(recipe?.id || "new")
    setRecipeDraft({
      name: recipe?.name || "",
      cuisine: recipe?.cuisine || "Levantine",
      description: recipe?.description || "",
      time: String(recipe?.time || 30),
      calories: String(recipe?.calories || 400),
    })
  }
  const saveRecipe = () => {
    if (!recipeDraft.name.trim() || !recipeDraft.description.trim()) return
    if (editingRecipe === "new") {
      const next: Recipe = {
        ...recipes[3],
        id: `${recipeDraft.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`,
        name: recipeDraft.name.trim(),
        cuisine: recipeDraft.cuisine,
        description: recipeDraft.description.trim(),
        time: Number(recipeDraft.time) || 30,
        calories: Number(recipeDraft.calories) || 400,
        image: images.feast,
      }
      setManagedRecipes((current) => [next, ...current])
    } else if (editingRecipe) {
      setManagedRecipes((current) =>
        current.map((recipe) =>
          recipe.id === editingRecipe
            ? {
                ...recipe,
                name: recipeDraft.name.trim(),
                cuisine: recipeDraft.cuisine,
                description: recipeDraft.description.trim(),
                time: Number(recipeDraft.time) || 30,
                calories: Number(recipeDraft.calories) || 400,
              }
            : recipe,
        ),
      )
    }
    setEditingRecipe(null)
  }
  const filtered = managedRecipes
    .filter((r) => {
      const q = search.toLowerCase()
      return (
        (r.name.toLowerCase().includes(q) ||
          r.cuisine.toLowerCase().includes(q) ||
          r.ingredients.some((item) => item.name.includes(q))) &&
        (cuisineFilter === "All cuisines" ||
          r.cuisine === cuisineFilter ||
          (cuisineFilter === "Middle Eastern" &&
            r.cuisine !== "North African")) &&
        (dietFilter === "All recipes" || r.tags.includes(dietFilter)) &&
        (!healthy || r.calories <= maxCalories)
      )
    })
    .sort((a, b) =>
      sort === "Highest rated"
        ? Number(b.rating) - Number(a.rating)
        : sort === "Quickest"
          ? a.time - b.time
          : sort === "Lowest calories"
            ? a.calories - b.calories
            : sort === "Highest protein"
              ? b.protein - a.protein
              : 0,
    )

  return (
    <div className={`app-shell page-${page}`}>
      <div className="announcement">
        <span>GOOD FOOD, GOOD FEELING.</span> A little joy in every bite.{" "}
        <button onClick={() => openAi()}>
          Cook with what you have <Icon name="arrow" size={14} />
        </button>
      </div>
      <header className="site-header">
        <div className="header-inner container">
          <button
            className="brand"
            onClick={() => navigate("home")}
            aria-label="Sahtein home"
          >
            <span className="brand-symbol">✳</span> sahtein
            <span className="brand-dot">.</span>
          </button>
          <nav
            className={`nav-links ${mobileMenu ? "open" : ""}`}
            aria-label="Main navigation"
          >
            {([
              ["home", "Home"],
              ["recipes", "Recipes"],
              [
                healthy ? "dashboard" : "recipes",
                healthy ? "Healthy Day" : "Explore",
              ],
              ["planner", "Meal Planner"],
              ["community", "Community"],
              ["ai", "AI Recipe"],
            ] as [Page, string][]).map(([link, label]) => (
              <button
                key={label}
                className={
                  page === link && (label !== "Explore" || page === "recipes")
                    ? "active"
                    : ""
                }
                onClick={() => (link === "ai" ? openAi() : navigate(link))}
              >
                {label}
              </button>
            ))}
          </nav>
          <div className="header-actions">
            <button
              className={`mode-toggle ${healthy ? "on" : ""}`}
              onClick={() => setHealthy((v) => !v)}
              aria-label={`Switch to ${healthy ? "Classic" : "Healthy"} Mode`}
              aria-pressed={healthy}
            >
              <span className="mode-icon">
                <Icon name={healthy ? "leaf" : "utensils"} size={15} />
              </span>
              <span>{healthy ? "Healthy" : "Classic"} Mode</span>
              <span className="switch-knob" />
            </button>
            <button
              className="icon-button header-icon"
              onClick={() => navigate("favorites")}
              aria-label="Favorites"
            >
              <Icon name="heart" size={20} />
              {favorites.length > 0 && <span className="notification-dot" />}
            </button>
            <button
              className="icon-button header-icon"
              onClick={() => navigate(userName ? "profile" : "account")}
              aria-label={userName ? "Profile" : "Create account"}
            >
              <Icon name="user" size={20} />
            </button>
            <button
              className="icon-button mobile-menu-button"
              onClick={() => setMobileMenu((v) => !v)}
              aria-label="Toggle menu"
            >
              <Icon name={mobileMenu ? "close" : "menu"} />
            </button>
          </div>
        </div>
      </header>
      {page === "wireframe" && <Wireframe navigate={navigate} />}
      {page === "home" && (
        <main>
          <section className="hero">
            <div className="hero-content container">
              <div className="hero-copy">
                <span className="eyebrow">
                  <span className="eyebrow-line" /> MADE FOR THE WAY YOU EAT
                </span>
                <h1>
                  Discover the <em>taste of home.</em>
                </h1>
                <p>
                  Explore the flavors of the Middle East, find meals that feel
                  good, and make something wonderful with what’s already in your
                  kitchen.
                </p>
                <div className="hero-buttons">
                  <button
                    className="button button-dark"
                    onClick={() => navigate("recipes")}
                  >
                    Explore recipes <Icon name="arrow" size={18} />
                  </button>
                  <button
                    className="button button-outline"
                    onClick={() => openAi()}
                  >
                    <Icon name="spark" size={18} /> Create with AI
                  </button>
                </div>
                <div className="hero-social">
                  <div className="avatar-stack">
                    <span>SA</span>
                    <span>MA</span>
                    <span>LN</span>
                  </div>
                  <div>
                    <div className="social-stars">★★★★★</div>
                    <span>Made for food lovers, by food lovers</span>
                  </div>
                </div>
              </div>
              <div className="hero-visual">
                <img
                  src={images.hero}
                  alt="A colorful spread of Middle Eastern food"
                />
                <div className="hero-photo-label">
                  <span className="label-icon">
                    <Icon name="utensils" size={18} />
                  </span>
                  <div>
                    <strong>A table worth gathering around</strong>
                    <small>Fresh ideas. Familiar flavors.</small>
                  </div>
                </div>
                <div className="hero-visual-stamp">
                  FRESH
                  <br /> IDEAS <span>✳</span>
                  <br /> EVERY DAY
                </div>
              </div>
            </div>
            <div className="hero-bottom container">
              <span>THE JOY OF EATING WELL</span>
              <span>01 / 03</span>
            </div>
          </section>
          <section className="quick-categories container">
            <div className="quick-label">
              WHAT ARE YOU
              <br /> CRAVING TODAY?
            </div>
            {[
              ["All recipes", "utensils"],
              ["Quick & easy", "clock"],
              ["Healthy picks", "leaf"],
              ["Cook with AI", "spark"],
            ].map(([label, icon]) => (
              <button
                key={label}
                onClick={() => {
                  if (label === "Cook with AI") openAi()
                  else if (label === "Healthy picks") {
                    setHealthy(true)
                    navigate("recipes")
                  } else {
                    setDietFilter("All recipes")
                    navigate("recipes")
                  }
                }}
              >
                <span>
                  <Icon name={icon} size={22} />
                </span>
                {label}
                <Icon name="arrow" size={16} />
              </button>
            ))}
          </section>
          <section id="popular" className="section container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">FROM OUR KITCHEN TO YOURS</span>
                <h2>
                  Recipes to fall for<span className="accent-mark">.</span>
                </h2>
                <p>
                  Comforting classics and fresh favorites, made to be shared.
                </p>
              </div>
              <button className="text-link" onClick={() => navigate("recipes")}>
                Explore all recipes <Icon name="arrow" size={17} />
              </button>
            </div>
            <div className="recipe-grid home-grid">
              {recipes.slice(0, 4).map((r) => (
                <RecipeCard
                  key={r.id}
                  recipe={r}
                  healthy={healthy}
                  favorite={favorites.includes(r.id)}
                  onFavorite={() => toggleFavorite(r.id)}
                  onOpen={() => openRecipe(r.id)}
                />
              ))}
            </div>
          </section>
          <section className="feature-split container">
            <div className="feature-photo">
              <img
                src={images.bowl}
                alt="Colorful nourishing Middle Eastern bowl"
                loading="lazy"
              />
              <div className="photo-caption">GOOD FOOD, MADE PERSONAL</div>
            </div>
            <div className="feature-copy">
              <span className="eyebrow">A LITTLE HELP IN THE KITCHEN</span>
              <h2>
                Meet your new favorite <em>cooking companion.</em>
              </h2>
              <p>
                Tell us what ingredients you have. We’ll find the three closest
                recipes you can make—or help you create a new one that’s
                entirely yours.
              </p>
              <div className="feature-steps">
                <span>
                  01 <strong>Add your ingredients</strong>
                </span>
                <span>
                  02 <strong>Discover your matches</strong>
                </span>
                <span>
                  03 <strong>Make it your own</strong>
                </span>
              </div>
              <button className="button button-light" onClick={() => openAi()}>
                Try the recipe assistant <Icon name="arrow" size={18} />
              </button>
            </div>
          </section>
          <section className="section container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">A WORLD OF FLAVOR</span>
                <h2>
                  Explore by cuisine<span className="accent-mark">.</span>
                </h2>
              </div>
              <button className="text-link" onClick={() => navigate("recipes")}>
                Browse all <Icon name="arrow" size={17} />
              </button>
            </div>
            <div className="cuisine-grid">
              {cuisines.map((c, i) => (
                <button
                  key={c}
                  onClick={() => {
                    setCuisineFilter(c)
                    navigate("recipes")
                  }}
                >
                  <span className="cuisine-number">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <strong>{c}</strong>
                  <Icon name="arrow" size={18} />
                </button>
              ))}
            </div>
          </section>
          <section className="section healthy-section">
            <div className="container">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">FEEL-GOOD FOOD</span>
                  <h2>
                    Healthy looks delicious
                    <span className="accent-mark">.</span>
                  </h2>
                  <p>
                    Full of flavor, with the numbers that help you feel your
                    best.
                  </p>
                </div>
                <button
                  className="text-link"
                  onClick={() => {
                    setHealthy(true)
                    navigate("dashboard")
                  }}
                >
                  Your healthy day <Icon name="arrow" size={17} />
                </button>
              </div>
              <div className="recipe-grid three-grid">
                {[recipes[4], recipes[5], recipes[2]].map((r) => (
                  <RecipeCard
                    key={r.id}
                    recipe={r}
                    healthy
                    favorite={favorites.includes(r.id)}
                    onFavorite={() => toggleFavorite(r.id)}
                    onOpen={() => openRecipe(r.id)}
                  />
                ))}
              </div>
            </div>
          </section>
        </main>
      )}
      {page === "recipes" && (
        <main className="container standard-page">
          <div className="page-heading">
            <div>
              <span className="eyebrow">FIND YOUR NEXT FAVORITE</span>
              <h1>
                Explore recipes<span className="accent-mark">.</span>
              </h1>
              <p>
                Something delicious for every craving, every kitchen, every day.
              </p>
            </div>
            <div className="heading-decoration">✳</div>
          </div>
          <div className="search-bar">
            <Icon name="search" size={21} />
            <input
              aria-label="Search recipes"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search recipes, ingredients, or cuisines..."
            />
            <button onClick={() => setSearch("")}>
              {search ? "Clear" : "Search"} <Icon name="arrow" size={17} />
            </button>
          </div>
          <div className="browse-layout">
            <aside className="filters">
              <div className="filter-title">
                <h3>Filters</h3>
                <Icon name="sliders" size={19} />
              </div>
              <label>
                Cuisine
                <select
                  value={cuisineFilter}
                  onChange={(e) => setCuisineFilter(e.target.value)}
                >
                  <option>All cuisines</option>
                  <option>Middle Eastern</option>
                  {cuisines.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label>
                Diet & lifestyle
                <select
                  value={dietFilter}
                  onChange={(e) => setDietFilter(e.target.value)}
                >
                  {[
                    "All recipes",
                    "Vegetarian",
                    "Vegan",
                    "High protein",
                    "Low calorie",
                    "Healthy",
                    "Breakfast",
                    "Dinner",
                  ].map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </label>
              <div className="filter-group">
                <label htmlFor="calorie-range">
                  Max calories per serving <strong>{maxCalories} kcal</strong>
                </label>
                <input
                  id="calorie-range"
                  type="range"
                  min="200"
                  max="800"
                  step="50"
                  value={maxCalories}
                  onChange={(e) => {
                    setMaxCalories(Number(e.target.value))
                    setHealthy(true)
                  }}
                />
                <div className="range-labels">
                  <span>200 kcal</span>
                  <span>800 kcal</span>
                </div>
              </div>
              <div className="filter-group">
                <span className="filter-label">Popular filters</span>
                <div className="filter-chips">
                  {["Vegetarian", "Vegan", "High protein", "Low calorie"].map(
                    (tag) => (
                      <button
                        key={tag}
                        className={dietFilter === tag ? "selected" : ""}
                        onClick={() =>
                          setDietFilter(
                            dietFilter === tag ? "All recipes" : tag,
                          )
                        }
                      >
                        {tag}
                      </button>
                    ),
                  )}
                </div>
              </div>
              <button
                className="clear-filters"
                onClick={() => {
                  setSearch("")
                  setCuisineFilter("All cuisines")
                  setDietFilter("All recipes")
                  setMaxCalories(800)
                }}
              >
                Clear all filters
              </button>
            </aside>
            <div className="browse-results">
              <div className="results-top">
                <span>
                  <strong>{filtered.length}</strong> recipes to discover
                </span>
                <label>
                  Sort by{" "}
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                  >
                    {[
                      "Most popular",
                      "Highest rated",
                      "Quickest",
                      "Lowest calories",
                      "Highest protein",
                      "Newest",
                    ].map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </select>
                </label>
              </div>
              {filtered.length ? (
                <div className="recipe-grid results-grid">
                  {filtered.map((r) => (
                    <RecipeCard
                      key={r.id}
                      recipe={r}
                      healthy={healthy}
                      favorite={favorites.includes(r.id)}
                      onFavorite={() => toggleFavorite(r.id)}
                      onOpen={() => openRecipe(r.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <Icon name="search" size={32} />
                  <h3>No recipes found</h3>
                  <p>Try another ingredient or reset your filters.</p>
                  <button
                    className="button button-dark"
                    onClick={() => {
                      setSearch("")
                      setCuisineFilter("All cuisines")
                      setDietFilter("All recipes")
                      setMaxCalories(800)
                    }}
                  >
                    Reset filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      )}
      {page === "detail" && (
        <main className="container standard-page detail-page">
          <button className="back-link" onClick={() => navigate("recipes")}>
            ← Back to recipes
          </button>
          <div className="detail-hero">
            <div className="detail-photo">
              <img src={selected.image} alt={selected.name} />
            </div>
            <div className="detail-intro">
              <span className="eyebrow">
                {selected.cuisine.toUpperCase()} ·{" "}
                {selected.tags[0].toUpperCase()}
              </span>
              <h1>
                {selected.name}
                <span className="accent-mark">.</span>
              </h1>
              <p>
                {selected.description} A dish to gather around and savor, one
                delicious bite at a time.
              </p>
              <div className="detail-rating">
                <Icon name="star" size={17} fill="currentColor" />{" "}
                <strong>{selected.rating}</strong>
                <span>· 128 reviews</span>
              </div>
              <div className="detail-stats">
                <div>
                  <Icon name="clock" />
                  <span>
                    TIME<strong>{selected.time} min</strong>
                  </span>
                </div>
                <div>
                  <Icon name="utensils" />
                  <span>
                    DIFFICULTY<strong>{selected.difficulty}</strong>
                  </span>
                </div>
                <div>
                  <Icon name="fire" />
                  <span>
                    PER SERVING<strong>{selected.calories} kcal</strong>
                  </span>
                </div>
              </div>
              <div className="detail-actions">
                <button
                  className="button button-dark"
                  onClick={() => toggleFavorite(selected.id)}
                >
                  <Icon
                    name="heart"
                    size={17}
                    fill={
                      favorites.includes(selected.id) ? "currentColor" : "none"
                    }
                  />{" "}
                  {favorites.includes(selected.id)
                    ? "Saved recipe"
                    : "Save recipe"}
                </button>
                <button
                  className="button button-outline"
                  onClick={addSelectedToPlan}
                >
                  <Icon name="calendar" size={17} /> Add to meal plan
                </button>
                <button
                  className="icon-button bordered"
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href)
                  }}
                  aria-label="Copy link to recipe"
                >
                  <Icon name="share" size={19} />
                </button>
              </div>
            </div>
          </div>
          <div className="detail-body">
            <div className="detail-main">
              <div className="detail-section">
                <div className="detail-section-header">
                  <div>
                    <span className="eyebrow">GET EVERYTHING READY</span>
                    <h2>Ingredients</h2>
                  </div>
                  <div className="serving-control">
                    <span>Servings</span>
                    <button
                      onClick={() => setServings((s) => Math.max(1, s - 1))}
                      aria-label="Decrease servings"
                    >
                      <Icon name="minus" size={17} />
                    </button>
                    <strong>{servings}</strong>
                    <button
                      onClick={() => setServings((s) => Math.min(20, s + 1))}
                      aria-label="Increase servings"
                    >
                      <Icon name="plus" size={17} />
                    </button>
                  </div>
                </div>
                <p className="serving-note">
                  <Icon name="adjust" size={16} /> Quantities adjust for{" "}
                  {servings} {servings === 1 ? "person" : "people"}. Nutrition
                  is always shown per serving.
                </p>
                <div className="ingredient-list">
                  {selected.ingredients.map((item) => (
                    <label
                      key={item.name}
                      className={checked.includes(item.name) ? "checked" : ""}
                    >
                      <input
                        type="checkbox"
                        checked={checked.includes(item.name)}
                        onChange={() =>
                          setChecked((current) =>
                            current.includes(item.name)
                              ? current.filter((x) => x !== item.name)
                              : [...current, item.name],
                          )
                        }
                      />
                      <span>
                        {fmt((item.amount * servings) / 4)} {item.unit}{" "}
                        {item.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="detail-section">
                <span className="eyebrow">LET'S MAKE IT</span>
                <h2>How to make it</h2>
                <div className="instruction-list">
                  {[
                    "Prepare all your ingredients. Rinse the grains and slice the vegetables into even pieces.",
                    "Warm the olive oil in a deep pot. Cook the aromatics and spices until fragrant, then add the main ingredients.",
                    "Add the grains and liquid, cover, and simmer gently until everything is tender and cooked through.",
                    "Rest for 10 minutes, then serve with fresh herbs, lemon, and a little yogurt if you like.",
                  ].map((text, i) => (
                    <div key={i}>
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      <p>{text}</p>
                    </div>
                  ))}
                </div>
                <button
                  className="button button-dark"
                  onClick={() => setCooking((v) => !v)}
                >
                  <Icon name={cooking ? "check" : "play"} size={17} />
                  {cooking
                    ? "Cooking mode on — you're ready!"
                    : "Start cooking"}
                </button>
              </div>
            </div>
            <aside className="detail-sidebar">
              <div className="nutrition-card">
                <span className="eyebrow">KNOW YOUR PLATE</span>
                <h3>Nutrition at a glance</h3>
                <div className="nutrition-highlight">
                  <strong>{selected.calories}</strong>
                  <span>
                    kcal
                    <br />
                    PER SERVING
                  </span>
                </div>
                <div className="nutrition-rows">
                  <div>
                    <span>Protein</span>
                    <strong>{selected.protein} g</strong>
                  </div>
                  <div>
                    <span>Carbohydrates</span>
                    <strong>{Math.round(selected.calories * 0.09)} g</strong>
                  </div>
                  <div>
                    <span>Fat</span>
                    <strong>{Math.round(selected.calories * 0.035)} g</strong>
                  </div>
                  <div>
                    <span>Fiber</span>
                    <strong>{selected.fiber} g</strong>
                  </div>
                </div>
                <div className="nutrition-foot">
                  {servings} servings · approx. {selected.calories * servings}{" "}
                  kcal total
                </div>
              </div>
              <div className="alternatives-card">
                <span className="eyebrow">MAKE IT YOURS</span>
                <h3>A little healthier</h3>
                <p>Simple swaps, same delicious feeling.</p>
                <ul>
                  <li>Try brown rice instead of white rice</li>
                  <li>Use a little less oil while cooking</li>
                  <li>Serve with low-fat yogurt</li>
                  <li>Grill instead of frying where possible</li>
                </ul>
              </div>
            </aside>
          </div>
        </main>
      )}
      {page === "dashboard" && (
        <main className="container standard-page">
          <div className="page-heading">
            <div>
              <span className="eyebrow">YOUR WELLNESS COMPANION</span>
              <h1>
                Your healthy day<span className="accent-mark">.</span>
              </h1>
              <p>Little choices add up. Here’s how your day is looking.</p>
            </div>
            <button
              className="button button-outline"
              onClick={() => navigate("planner")}
            >
              <Icon name="calendar" size={18} /> View meal planner
            </button>
          </div>
          <div className="dashboard-grid">
            <div className="dashboard-main-card">
              <div>
                <span className="eyebrow">TODAY'S CALORIE GOAL</span>
                <h2>
                  Make room for what
                  <br />
                  <em>nourishes you.</em>
                </h2>
                <div className="daily-numbers">
                  <div>
                    <strong>1,800</strong>
                    <span>Daily target</span>
                  </div>
                  <div>
                    <strong>{consumed.toLocaleString()}</strong>
                    <span>Consumed</span>
                  </div>
                  <div>
                    <strong>{remaining}</strong>
                    <span>Remaining</span>
                  </div>
                </div>
              </div>
              <div
                className="progress-ring"
                style={{
                  background: `conic-gradient(var(--terra) ${Math.min((consumed / 1800) * 100, 100)}%, rgba(255,255,255,.18) 0)`,
                }}
              >
                <div>
                  <strong>{Math.round((consumed / 1800) * 100)}%</strong>
                  <span>OF YOUR GOAL</span>
                </div>
              </div>
            </div>
            <div className="macro-card">
              <span className="eyebrow">NUTRITION SUMMARY</span>
              <h3>The little details</h3>
              {[
                ["Protein", 78, 110],
                ["Carbs", 122, 220],
                ["Fat", 42, 65],
                ["Fiber", 21, 30],
              ].map(([label, value, target]) => (
                <div className="macro-row" key={label}>
                  <div>
                    <strong>{label}</strong>
                    <span>
                      {value}g / {target}g
                    </span>
                  </div>
                  <div className="macro-track">
                    <span
                      style={{
                        width: `${(Number(value) / Number(target)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="dashboard-lower">
            <div className="white-panel">
              <div className="panel-header">
                <div>
                  <span className="eyebrow">A DAY ON YOUR PLATE</span>
                  <h2>Today's meals</h2>
                </div>
                <button
                  className="small-link"
                  onClick={() => navigate("planner")}
                >
                  View plan <Icon name="arrow" size={16} />
                </button>
              </div>
              <div className="today-meals">
                {mealNames.map((meal) => {
                  const r = allRecipes.find(
                    (r) => r.id === planner[`${activeDay}-${meal}`],
                  )
                  return (
                    <div key={meal}>
                      <span className="meal-time">{meal}</span>
                      {r ? (
                        <>
                          <img src={r.image} alt="" />
                          <strong>{r.name}</strong>
                          <span className="meal-calories">
                            {r.calories} kcal
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="empty-meal">
                            Nothing planned yet
                          </span>
                          <button
                            className="small-link"
                            onClick={() => {
                              setMealPicker(`${activeDay}-${meal}`)
                              navigate("planner")
                            }}
                          >
                            + Add meal
                          </button>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="white-panel recommendations">
              <span className="eyebrow">THOUGHTFULLY PICKED FOR YOU</span>
              <h2>What fits your day</h2>
              <p>
                You have <strong>{remaining} kcal</strong> remaining today. Here
                are a few ideas.
              </p>
              {[recipes[4], recipes[2], recipes[5]]
                .filter((r) => r.calories <= remaining)
                .map((r) => (
                  <button key={r.id} onClick={() => openRecipe(r.id)}>
                    <img src={r.image} alt="" />
                    <span>
                      <strong>{r.name}</strong>
                      <small>
                        {r.cuisine} · {r.time} min
                      </small>
                    </span>
                    <b>{r.calories} kcal</b>
                  </button>
                ))}
            </div>
          </div>
        </main>
      )}
      {page === "fasting" && (
        <main className="container standard-page fasting-page">
          <div className="page-heading">
            <div>
              <span className="eyebrow">MAKE SPACE FOR BALANCE</span>
              <h1>
                Intermittent fasting<span className="accent-mark">.</span>
              </h1>
              <p>Your rhythm, your pace. A simple way to stay on track.</p>
            </div>
          </div>
          <div className="fasting-layout">
            <div className="fasting-main">
              <div className="fast-top">
                <span className="eyebrow">YOUR CURRENT FAST</span>
                <span className="fast-status">
                  <span
                    className={fastStatus === "running" ? "pulse-dot" : ""}
                  />
                  {fastStatus === "running"
                    ? "Fasting now"
                    : fastStatus === "paused"
                      ? "Paused"
                      : "Ready when you are"}
                </span>
              </div>
              <div
                className="fast-ring"
                style={{
                  background: `conic-gradient(var(--terra) ${Math.min((fastSeconds / (plan * 3600)) * 100, 100)}%, #e6e7dc 0)`,
                }}
              >
                <div>
                  <Icon name="leaf" size={25} />
                  <strong>{duration(fastSeconds)}</strong>
                  <span>
                    {fastStatus === "idle"
                      ? "LET'S BEGIN"
                      : fastStatus === "paused"
                        ? "PAUSED"
                        : "FASTING"}
                  </span>
                </div>
              </div>
              <p className="fast-next">
                {fastStatus === "idle"
                  ? "Choose a plan and start your fast"
                  : `Next meal in ${Math.max(0, Math.floor((plan * 3600 - fastSeconds) / 3600))}h ${Math.max(0, Math.floor(((plan * 3600 - fastSeconds) % 3600) / 60))}m`}
              </p>
              <div className="fast-actions">
                {fastStatus === "idle" ? (
                  <button
                    className="button button-dark"
                    onClick={() => {
                      setFastSeconds(0)
                      setFastStatus("running")
                    }}
                  >
                    <Icon name="play" size={17} /> Start fast
                  </button>
                ) : (
                  <>
                    <button
                      className="button button-dark"
                      onClick={() =>
                        setFastStatus(
                          fastStatus === "running" ? "paused" : "running",
                        )
                      }
                    >
                      <Icon
                        name={fastStatus === "running" ? "pause" : "play"}
                        size={17}
                      />
                      {fastStatus === "running" ? "Pause" : "Resume"}
                    </button>
                    <button
                      className="button button-outline"
                      onClick={() => {
                        if (fastSeconds > 0)
                          setFastHistory((h) => [
                            {
                              date: "Today",
                              duration: `${Math.floor(fastSeconds / 3600)}h ${Math.floor((fastSeconds % 3600) / 60)}m`,
                              plan: `${plan}:${24 - plan}`,
                            },
                            ...h,
                          ])
                        setFastStatus("idle")
                        setFastSeconds(0)
                      }}
                    >
                      End fast
                    </button>
                  </>
                )}
              </div>
              <div className="fast-timeline">
                <span>FASTING</span>
                <div>
                  <i />
                  <i />
                </div>
                <span>EATING WINDOW</span>
                <div>
                  <i />
                </div>
                <span>FASTING</span>
              </div>
            </div>
            <aside className="fasting-side">
              <div className="white-panel">
                <span className="eyebrow">FIND YOUR RHYTHM</span>
                <h2>Choose your plan</h2>
                <p>Pick what feels right for your routine.</p>
                <div className="fast-plan-list">
                  {[12, 14, 16, 18].map((hours) => (
                    <button
                      className={plan === hours ? "selected" : ""}
                      key={hours}
                      onClick={() => {
                        if (fastStatus === "idle") setPlan(hours)
                      }}
                    >
                      <span>
                        <strong>
                          {hours}:{24 - hours}
                        </strong>
                        <small>
                          {hours === 12
                            ? "A gentle start"
                            : hours === 14
                              ? "Find your flow"
                              : hours === 16
                                ? "The popular choice"
                                : "A longer fast"}
                        </small>
                      </span>
                      <span className="radio-circle" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="white-panel history-panel">
                <div className="panel-header">
                  <div>
                    <span className="eyebrow">YOUR JOURNEY</span>
                    <h2>Fasting history</h2>
                  </div>
                  <Icon name="calendar" size={20} />
                </div>
                {fastHistory.map((item, i) => (
                  <div className="history-row" key={`${item.date}-${i}`}>
                    <span className="history-check">
                      <Icon name="check" size={15} />
                    </span>
                    <span>
                      <strong>{item.date}</strong>
                      <small>{item.plan} plan</small>
                    </span>
                    <b>{item.duration}</b>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </main>
      )}
      {page === "ai" && (
        <main className="container standard-page ai-page">
          <div className="page-heading ai-heading">
            <div>
              <span className="eyebrow">
                <Icon name="spark" size={14} /> YOUR KITCHEN, REIMAGINED
              </span>
              <h1>
                {aiStep === "input"
                  ? "What's in your kitchen?"
                  : aiStep === "matches"
                    ? "Your closest matches."
                    : aiStep === "create"
                      ? "Make it your own."
                      : "Made just for you."}
                <span className="accent-mark">.</span>
              </h1>
              <p>
                {aiStep === "input"
                  ? "Tell us what you have. We’ll find something delicious you can make."
                  : aiStep === "matches"
                    ? "We found three recipes that make the most of your ingredients."
                    : aiStep === "create"
                      ? "A few more details, and we'll dream up your next favorite meal."
                      : "A fresh idea inspired by what's in your kitchen."}
              </p>
            </div>
          </div>
          <div className="ai-steps">
            <span className={aiStep === "input" ? "current" : "done"}>
              01 <b>YOUR INGREDIENTS</b>
            </span>
            <i />
            <span
              className={
                aiStep === "matches"
                  ? "current"
                  : ["create", "generated"].includes(aiStep)
                    ? "done"
                    : ""
              }
            >
              02 <b>FIND A MATCH</b>
            </span>
            <i />
            <span
              className={
                aiStep === "create"
                  ? "current"
                  : aiStep === "generated"
                    ? "done"
                    : ""
              }
            >
              03 <b>CREATE YOUR OWN</b>
            </span>
          </div>
          {aiStep === "input" && (
            <div className="ai-layout">
              <div className="white-panel pantry-panel">
                <div className="panel-header">
                  <div>
                    <span className="eyebrow">START WITH WHAT YOU HAVE</span>
                    <h2>Your ingredients</h2>
                  </div>
                  <span className="item-count">
                    {pantry.length} items added
                  </span>
                </div>
                <p>
                  Measurements are optional. Add as much or as little detail as
                  you know.
                </p>
                <div className="pantry-labels">
                  <span>INGREDIENT</span>
                  <span>
                    QUANTITY <small>(OPTIONAL)</small>
                  </span>
                  <span>MEASUREMENT</span>
                </div>
                <div className="pantry-rows">
                  {pantry.map((item, i) => (
                    <div className="pantry-row" key={i}>
                      <input
                        aria-label={`Ingredient ${i + 1}`}
                        placeholder="e.g. Chicken"
                        value={item.name}
                        onChange={(e) =>
                          updatePantry(i, "name", e.target.value)
                        }
                      />
                      <input
                        aria-label={`Quantity for ${item.name || `ingredient ${i + 1}`}`}
                        placeholder="Optional"
                        type="number"
                        min="0"
                        value={item.quantity}
                        onChange={(e) =>
                          updatePantry(i, "quantity", e.target.value)
                        }
                      />
                      <select
                        aria-label={`Measurement for ${item.name || `ingredient ${i + 1}`}`}
                        value={item.unit}
                        onChange={(e) =>
                          updatePantry(i, "unit", e.target.value)
                        }
                      >
                        {[
                          "g",
                          "kg",
                          "ml",
                          "L",
                          "cup",
                          "cups",
                          "tbsp",
                          "tsp",
                          "piece",
                          "whole",
                        ].map((unit) => (
                          <option key={unit}>{unit}</option>
                        ))}
                      </select>
                      <button
                        className="remove-row"
                        aria-label={`Remove ${item.name || `ingredient ${i + 1}`}`}
                        onClick={() =>
                          setPantry((current) =>
                            current.filter((_, index) => index !== i),
                          )
                        }
                      >
                        <Icon name="close" size={17} />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  className="add-row"
                  onClick={() =>
                    setPantry((current) => [
                      ...current,
                      { name: "", quantity: "", unit: "whole" },
                    ])
                  }
                >
                  <Icon name="plus" size={17} /> Add another ingredient
                </button>
                <div className="pantry-footer">
                  <span>
                    <Icon name="leaf" size={16} /> Don’t know the amount? Just
                    leave it blank.
                  </span>
                  <button
                    className="button button-dark"
                    onClick={() => setAiStep("matches")}
                    disabled={!pantry.some((p) => p.name.trim())}
                  >
                    Find recipes <Icon name="arrow" size={17} />
                  </button>
                </div>
              </div>
              <aside className="ai-help-card">
                <span className="eyebrow">HOW IT WORKS</span>
                <h2>
                  Less waste.
                  <br />
                  <em>More wow.</em>
                </h2>
                <p>
                  We look at what you already have and find the closest recipes
                  from our kitchen.
                </p>
                <div>
                  <span>01</span>
                  <strong>Add ingredients</strong>
                </div>
                <div>
                  <span>02</span>
                  <strong>See your top 3 matches</strong>
                </div>
                <div>
                  <span>03</span>
                  <strong>Create something new if you like</strong>
                </div>
                <Icon name="spark" size={46} />
              </aside>
            </div>
          )}
          {aiStep === "matches" && (
            <>
              <div className="matches-summary">
                <span className="eyebrow">YOU BROUGHT THE INGREDIENTS</span>
                <div>
                  {pantry
                    .filter((p) => p.name.trim())
                    .map((p) => (
                      <span key={p.name}>
                        {p.name}
                        {p.quantity ? ` ${p.quantity} ${p.unit}` : ""}
                      </span>
                    ))}
                </div>
                <button onClick={() => setAiStep("input")}>
                  Edit ingredients <Icon name="adjust" size={15} />
                </button>
              </div>
              <div className="match-grid">
                {closestMatches.map(
                  ({ recipe: r, score, available, missing }) => (
                    <article className="match-card" key={r.id}>
                      <div className="match-image">
                        <img src={r.image} alt={r.name} />
                        <span>{score}% MATCH</span>
                      </div>
                      <div className="match-content">
                        <span className="eyebrow">
                          {r.cuisine.toUpperCase()} · {r.time} MIN
                        </span>
                        <h2>{r.name}</h2>
                        <div className="match-ingredients">
                          <div>
                            <strong>YOU HAVE</strong>
                            <p>
                              <Icon name="check" size={14} />{" "}
                              {available.join(" · ") ||
                                "No matching ingredients yet"}
                            </p>
                          </div>
                          <div>
                            <strong>YOU MAY NEED</strong>
                            <p>
                              <Icon name="plus" size={14} />{" "}
                              {missing.join(", ") || "Nothing essential"}
                            </p>
                          </div>
                        </div>
                        <div className="match-bottom">
                          <span>{r.calories} kcal / serving</span>
                          <button onClick={() => openRecipe(r.id)}>
                            View recipe <Icon name="arrow" size={16} />
                          </button>
                        </div>
                      </div>
                    </article>
                  ),
                )}
              </div>
              <div className="create-cta">
                <div>
                  <span className="eyebrow">
                    NOT QUITE WHAT YOU HAD IN MIND?
                  </span>
                  <h2>
                    Let’s make something <em>entirely yours.</em>
                  </h2>
                  <p>
                    Use your ingredients as a starting point. You choose the
                    rest.
                  </p>
                </div>
                <button
                  className="button button-light"
                  onClick={() => setAiStep("create")}
                >
                  <Icon name="spark" size={18} /> Create my own recipe{" "}
                  <Icon name="arrow" size={17} />
                </button>
              </div>
            </>
          )}
          {aiStep === "create" && (
            <div className="create-layout">
              <div className="white-panel create-form">
                <div className="form-section">
                  <div className="panel-header">
                    <div>
                      <span className="eyebrow">01 / YOUR STARTING POINT</span>
                      <h2>What you're working with</h2>
                    </div>
                    <button
                      className="small-link"
                      onClick={() => setAiStep("input")}
                    >
                      Edit ingredients <Icon name="adjust" size={15} />
                    </button>
                  </div>
                  <div className="ingredient-chips">
                    {pantry
                      .filter((p) => p.name.trim())
                      .map((p, i) => (
                        <span key={i}>
                          {p.name} {p.quantity && `${p.quantity} ${p.unit}`}
                          <button
                            onClick={() =>
                              setPantry((current) =>
                                current.filter((item) => item !== p),
                              )
                            }
                            aria-label={`Remove ${p.name}`}
                          >
                            <Icon name="close" size={13} />
                          </button>
                        </span>
                      ))}
                  </div>
                </div>
                <div className="form-section form-row">
                  <div>
                    <span className="eyebrow">02 / THE DETAILS</span>
                    <h2>How many are joining?</h2>
                    <p>We'll adjust every ingredient to fit your table.</p>
                    <div className="serving-control large">
                      <button
                        onClick={() => setAiServings((s) => Math.max(1, s - 1))}
                        aria-label="Decrease servings"
                      >
                        <Icon name="minus" size={18} />
                      </button>
                      <strong>
                        {aiServings}{" "}
                        <small>{aiServings === 1 ? "person" : "people"}</small>
                      </strong>
                      <button
                        onClick={() =>
                          setAiServings((s) => Math.min(20, s + 1))
                        }
                        aria-label="Increase servings"
                      >
                        <Icon name="plus" size={18} />
                      </button>
                    </div>
                  </div>
                  <div>
                    <span className="eyebrow">03 / YOUR MEASURES</span>
                    <h2>Measurement style</h2>
                    <p>Choose the units you cook with most.</p>
                    <div className="choice-stack">
                      {["Metric", "Imperial", "Cups & Spoons"].map((x) => (
                        <button
                          className={measurement === x ? "chosen" : ""}
                          key={x}
                          onClick={() => setMeasurement(x)}
                        >
                          <span className="radio-circle" />
                          {x}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="form-section">
                  <span className="eyebrow">04 / MAKE IT YOURS</span>
                  <h2>What sounds good?</h2>
                  <div className="form-choice-group">
                    <strong>DIETARY PREFERENCE</strong>
                    <div className="selection-chips">
                      {[
                        "No preference",
                        "Vegetarian",
                        "Vegan",
                        "High protein",
                        "Low calorie",
                        "Low carb",
                        "Gluten-free",
                      ].map((x) => (
                        <button
                          key={x}
                          className={diet === x ? "chosen" : ""}
                          onClick={() => setDiet(x)}
                        >
                          {x}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="form-choice-group">
                    <strong>CUISINE</strong>
                    <div className="selection-chips">
                      {[
                        "Middle Eastern",
                        "Jordanian",
                        "Lebanese",
                        "Palestinian",
                        "Syrian",
                        "Egyptian",
                        "Mediterranean",
                        "International",
                      ].map((x) => (
                        <button
                          key={x}
                          className={aiCuisine === x ? "chosen" : ""}
                          onClick={() => setAiCuisine(x)}
                        >
                          {x}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="form-choice-group">
                    <strong>MEAL TYPE</strong>
                    <div className="selection-chips">
                      {["Breakfast", "Lunch", "Dinner", "Snack"].map((x) => (
                        <button
                          key={x}
                          className={mealType === x ? "chosen" : ""}
                          onClick={() => setMealType(x)}
                        >
                          {x}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="form-choice-group">
                    <strong>ANYTHING ELSE?</strong>
                    <div className="selection-chips">
                      {[
                        "Quick meal",
                        "Budget friendly",
                        "Healthy",
                        "Spicy",
                        "Mild",
                      ].map((x) => (
                        <button
                          key={x}
                          className={otherPrefs.includes(x) ? "chosen" : ""}
                          onClick={() =>
                            setOtherPrefs((v) =>
                              v.includes(x)
                                ? v.filter((t) => t !== x)
                                : [...v, x],
                            )
                          }
                        >
                          {x}
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    value={extraNotes}
                    onChange={(e) => setExtraNotes(e.target.value)}
                    placeholder="e.g. Make it high protein, and not too spicy..."
                    aria-label="Other recipe preferences"
                  />
                </div>
                <div className="create-submit">
                  <span>Made for your kitchen, your tastes, your table.</span>
                  <button
                    className="button button-dark"
                    onClick={() => {
                      setRegenerated(false)
                      setAiStep("generated")
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }}
                  >
                    <Icon name="spark" size={18} /> Generate recipe{" "}
                    <Icon name="arrow" size={17} />
                  </button>
                </div>
              </div>
              <aside className="create-aside">
                <Icon name="spark" size={27} />
                <span className="eyebrow">THE GOOD PART</span>
                <h3>Your recipe, your way.</h3>
                <p>
                  We’ll put together a recipe with ingredients scaled for your
                  group, plus clear nutrition per serving so tracking is easy.
                </p>
                <div>
                  <Icon name="check" size={16} /> Tailored to your preferences
                </div>
                <div>
                  <Icon name="check" size={16} /> Measurements for {aiServings}
                </div>
                <div>
                  <Icon name="check" size={16} /> Nutrition per person
                </div>
              </aside>
            </div>
          )}
          {aiStep === "generated" && (
            <div className="generated-layout">
              <div className="generated-main">
                <div className="generated-hero">
                  <img
                    src={images.bowl}
                    alt="Middle Eastern inspired grain bowl"
                  />
                  <div>
                    <span className="eyebrow">
                      A SAHTEIN ORIGINAL · {aiCuisine.toUpperCase()}
                    </span>
                    <h2>
                      {regenerated
                        ? `${diet === "Low calorie" ? "Light" : "Nourishing"} ${
                            plantBased ? "Chickpea & Rice" : "Chicken"
                          } Bowl`
                        : generatedName}
                    </h2>
                    <p>
                      A colorful, satisfying {diet.toLowerCase()} meal made with
                      the ingredients you already have. Fresh, comforting, and
                      completely yours.
                    </p>
                    <div className="generated-tags">
                      <span>
                        <Icon name="clock" size={15} /> 35 min
                      </span>
                      <span>
                        <Icon name="utensils" size={15} /> Serves {aiServings}
                      </span>
                      <span>
                        <Icon name="leaf" size={15} /> {diet}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="white-panel generated-section">
                  <div className="panel-header">
                    <div>
                      <span className="eyebrow">MADE FOR {aiServings}</span>
                      <h2>Ingredients</h2>
                    </div>
                    <button
                      className="small-link"
                      onClick={() => setAdjustOpen(true)}
                    >
                      Adjust <Icon name="adjust" size={15} />
                    </button>
                  </div>
                  <div className="ingredient-list">
                    {generatedIngredients.map((p, i) => (
                      <label key={i}>
                        <input type="checkbox" />
                        <span>
                          {p.quantity} {p.quantity === "to taste" ? "" : p.unit}{" "}
                          {p.name.toLowerCase()}
                        </span>
                      </label>
                    ))}
                    <label>
                      <input type="checkbox" />
                      <span>{fmt(aiServings / 4)} tsp cumin</span>
                    </label>
                    <label>
                      <input type="checkbox" />
                      <span>{fmt(aiServings / 4)} tsp paprika</span>
                    </label>
                  </div>
                </div>
                <div className="white-panel generated-section">
                  <span className="eyebrow">LET'S GET COOKING</span>
                  <h2>Step by step</h2>
                  <div className="instruction-list">
                    {[
                      "Rinse and prepare your ingredients. Dice the tomatoes and onion, and prepare your protein into bite-sized pieces.",
                      "Season the main ingredients with cumin, paprika, salt, and pepper. Sauté in olive oil until golden and cooked through.",
                      "Cook the rice until fluffy. Gently sauté the onion and tomatoes in the same pan for extra flavor.",
                      "Layer the rice, cooked protein, and vegetables in bowls. Finish with herbs, a squeeze of lemon, and enjoy.",
                    ].map((text, i) => (
                      <div key={i}>
                        <span>{String(i + 1).padStart(2, "0")}</span>
                        <p>{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <aside className="generated-side">
                <div className="nutrition-card generated-nutrition">
                  <span className="eyebrow">THE NUMBERS THAT MATTER</span>
                  <h3>Nutrition</h3>
                  <div className="per-serving-badge">
                    PER SERVING · 1 OF {aiServings} PORTIONS
                  </div>
                  <div className="nutrition-highlight">
                    <strong>{generatedCalories}</strong>
                    <span>
                      kcal
                      <br />
                      PER SERVING
                    </span>
                  </div>
                  <div className="nutrition-rows">
                    <div>
                      <span>Protein</span>
                      <strong>{generatedProtein} g</strong>
                    </div>
                    <div>
                      <span>Carbs</span>
                      <strong>{generatedCarbs} g</strong>
                    </div>
                    <div>
                      <span>Fat</span>
                      <strong>{generatedFat} g</strong>
                    </div>
                    <div>
                      <span>Fiber</span>
                      <strong>7 g</strong>
                    </div>
                  </div>
                  <div className="nutrition-foot">
                    <strong>WHOLE RECIPE</strong>
                    <span>
                      {generatedTotal.toLocaleString()} kcal total for{" "}
                      {aiServings}
                    </span>
                  </div>
                  <small className="estimate-note">
                    Prototype nutrition estimates only; not medical or dietary
                    advice.
                  </small>
                </div>
                <div className="white-panel portion-panel">
                  <span className="eyebrow">TRACK ONE PLATE</span>
                  <h3>One portion, measured.</h3>
                  <p>
                    These are the ingredient amounts for just one of your{" "}
                    {aiServings} servings.
                  </p>
                  {portionIngredients.map((p, i) => (
                    <div key={i}>
                      <span>{p.name}</span>
                      <strong>
                        {p.quantity} {p.quantity === "to taste" ? "" : p.unit}
                      </strong>
                    </div>
                  ))}
                </div>
                <div className="generated-action-list">
                  <button onClick={() => toggleFavorite("generated")}>
                    <Icon
                      name="heart"
                      size={18}
                      fill={
                        favorites.includes("generated")
                          ? "currentColor"
                          : "none"
                      }
                    />
                    {favorites.includes("generated")
                      ? "Saved recipe"
                      : "Save recipe"}
                    <Icon name="arrow" size={16} />
                  </button>
                  <button onClick={addGeneratedToPlan}>
                    <Icon name="calendar" size={18} /> Add to meal plan{" "}
                    <Icon name="arrow" size={16} />
                  </button>
                  <button onClick={() => setCooking((v) => !v)}>
                    <Icon name="play" size={18} />
                    {cooking ? "Cooking mode on" : "Start cooking"}
                    <Icon name="arrow" size={16} />
                  </button>
                  <button onClick={() => setRegenerated((v) => !v)}>
                    <Icon name="refresh" size={18} /> Regenerate{" "}
                    <Icon name="arrow" size={16} />
                  </button>
                  <button onClick={() => setAdjustOpen(true)}>
                    <Icon name="adjust" size={18} /> Adjust recipe{" "}
                    <Icon name="arrow" size={16} />
                  </button>
                </div>
              </aside>
            </div>
          )}
        </main>
      )}
      {page === "planner" && (
        <main className="container standard-page">
          <div className="page-heading">
            <div>
              <span className="eyebrow">
                A LITTLE PLAN, A LOT OF POSSIBILITY
              </span>
              <h1>
                Your meal planner<span className="accent-mark">.</span>
              </h1>
              <p>
                Good food is easier when you have a plan. Build your week, one
                meal at a time.
              </p>
            </div>
            <button
              className="button button-outline"
              onClick={() => navigate("recipes")}
            >
              Find recipes <Icon name="arrow" size={17} />
            </button>
          </div>
          <div className="planner-summary">
            <div>
              <span className="eyebrow">THIS WEEK AT A GLANCE</span>
              <h2>Plan well, eat happily.</h2>
            </div>
            <div>
              <strong>{Object.keys(planner).length}</strong>
              <span>MEALS PLANNED</span>
            </div>
            <div>
              <strong>
                {Object.values(planner)
                  .reduce(
                    (sum, id) =>
                      sum +
                      (allRecipes.find((r) => r.id === id)?.calories || 0),
                    0,
                  )
                  .toLocaleString()}
              </strong>
              <span>PLANNED KCAL THIS WEEK</span>
            </div>
          </div>
          <div className="day-tabs">
            {days.map((day, i) => (
              <button
                className={activeDay === i ? "active" : ""}
                onClick={() => setActiveDay(i)}
                key={day}
              >
                <small>{day.slice(0, 3).toUpperCase()}</small>
                <strong>{i + 12}</strong>
              </button>
            ))}
          </div>
          <div className="planner-day-header">
            <div>
              <span className="eyebrow">YOUR MENU</span>
              <h2>{days[activeDay]}</h2>
            </div>
            <span>{plannedCalories} kcal planned</span>
          </div>
          <div className="planner-meals">
            {mealNames.map((meal) => {
              const key = `${activeDay}-${meal}`
              const r = allRecipes.find((x) => x.id === planner[key])
              return (
                <div className="planner-meal" key={meal}>
                  <span className="planner-meal-label">
                    {meal.toUpperCase()}
                  </span>
                  {r ? (
                    <>
                      <img src={r.image} alt="" />
                      <div className="planner-meal-info">
                        <button
                          onClick={() =>
                            r.id === "generated"
                              ? openAi("generated")
                              : openRecipe(r.id)
                          }
                        >
                          {r.name}
                        </button>
                        <span>{r.cuisine} · 1 portion</span>
                      </div>
                      <strong>{r.calories} kcal</strong>
                      <button
                        className="icon-button"
                        onClick={() => setMealPicker(key)}
                        aria-label={`Replace ${meal}`}
                      >
                        <Icon name="refresh" size={18} />
                      </button>
                      <button
                        className="icon-button"
                        onClick={() =>
                          setPlanner((current) => {
                            const next = { ...current }
                            delete next[key]
                            return next
                          })
                        }
                        aria-label={`Remove ${meal}`}
                      >
                        <Icon name="close" size={18} />
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="planner-empty">
                        Your {meal.toLowerCase()} is waiting for an idea.
                      </span>
                      <button
                        className="small-link"
                        onClick={() => setMealPicker(key)}
                      >
                        <Icon name="plus" size={16} /> Add a recipe
                      </button>
                    </>
                  )}
                </div>
              )
            })}
          </div>
          {mealPicker && (
            <div className="modal-backdrop" onClick={() => setMealPicker(null)}>
              <div
                className="modal meal-modal"
                role="dialog"
                aria-modal="true"
                aria-label="Choose a meal"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="panel-header">
                  <div>
                    <span className="eyebrow">PLAN SOMETHING DELICIOUS</span>
                    <h2>Choose a recipe</h2>
                  </div>
                  <button
                    className="icon-button"
                    onClick={() => setMealPicker(null)}
                    aria-label="Close"
                  >
                    <Icon name="close" />
                  </button>
                </div>
                {allRecipes.map((r) => (
                  <button
                    className="meal-option"
                    key={r.id}
                    onClick={() => updatePlanner(mealPicker, r.id)}
                  >
                    <img src={r.image} alt="" />
                    <span>
                      <strong>{r.name}</strong>
                      <small>
                        {r.time} min · {r.cuisine}
                      </small>
                    </span>
                    <b>{r.calories} kcal</b>
                  </button>
                ))}
              </div>
            </div>
          )}
        </main>
      )}
      {page === "account" && (
        <main className="account-page">
          <div className="account-story">
            <button
              className="brand account-brand"
              onClick={() => navigate("home")}
            >
              <span className="brand-symbol">✳</span> sahtein
              <span className="brand-dot">.</span>
            </button>
            <div>
              <span className="eyebrow">YOUR SEAT AT THE TABLE</span>
              <h1>Cook, save, plan, and share—together.</h1>
              <p>
                A free Sahtein account keeps your recipes, meal plans, healthy
                goals, and community conversations in one welcoming place.
              </p>
              <div className="account-benefits">
                {[
                  "Save recipes and build weekly meal plans",
                  "Join open community conversations",
                  "Keep your preferences across every screen",
                ].map((benefit) => (
                  <span key={benefit}>
                    <Icon name="check" size={17} /> {benefit}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="account-form-wrap">
            <div className="account-form">
              <span className="eyebrow">
                {accountMode === "signup" ? "JOIN SAHTEIN" : "WELCOME BACK"}
              </span>
              <h2>
                {accountMode === "signup"
                  ? "Create your account"
                  : "Sign in to your account"}
              </h2>
              <p>
                {accountMode === "signup"
                  ? "It only takes a moment. Dinner inspiration is waiting."
                  : "Pick up right where you left off."}
              </p>
              {accountMode === "signup" && (
                <label>
                  Your name
                  <input
                    value={accountName}
                    onChange={(event) => setAccountName(event.target.value)}
                    placeholder="e.g. Sara Khalil"
                  />
                </label>
              )}
              <label>
                Email address
                <input
                  type="email"
                  value={accountEmail}
                  onChange={(event) => setAccountEmail(event.target.value)}
                  placeholder="you@example.com"
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  value={accountPassword}
                  onChange={(event) => setAccountPassword(event.target.value)}
                  placeholder="At least 6 characters"
                />
              </label>
              <button
                className="button button-dark account-submit"
                disabled={
                  !accountEmail.trim() ||
                  accountPassword.length < 6 ||
                  (accountMode === "signup" && !accountName.trim())
                }
                onClick={submitAccount}
              >
                {accountMode === "signup" ? "Create free account" : "Sign in"}
                <Icon name="arrow" size={17} />
              </button>
              <button
                className="account-switch"
                onClick={() =>
                  setAccountMode((mode) =>
                    mode === "signup" ? "signin" : "signup",
                  )
                }
              >
                {accountMode === "signup"
                  ? "Already have an account? Sign in"
                  : "New to Sahtein? Create an account"}
              </button>
              <span className="prototype-note">
                Prototype mode: any valid email and 6-character password works.
              </span>
            </div>
          </div>
        </main>
      )}
      {page === "community" && (
        <main className="container standard-page community-page">
          <div className="community-hero">
            <div>
              <span className="eyebrow">THE SAHTEIN TABLE</span>
              <h1>
                Pull up a chair<span className="accent-mark">.</span>
              </h1>
              <p>
                Recipes, kitchen stories, questions, playlists—this is an open
                space for whatever is on your mind.
              </p>
            </div>
            <div className="community-stat">
              <strong>2,418</strong>
              <span>neighbors sharing this week</span>
            </div>
          </div>
          <div className="community-layout">
            <section>
              <div className="community-composer">
                <div className="community-avatar">
                  {userName
                    ? userName
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)
                    : "YOU"}
                </div>
                <div className="composer-main">
                  <textarea
                    value={postDraft}
                    onChange={(event) => setPostDraft(event.target.value)}
                    placeholder={
                      userName
                        ? `What is on your mind, ${userName.split(" ")[0]}?`
                        : "Join the community to start a conversation..."
                    }
                  />
                  <div>
                    <select
                      value={postTopic}
                      onChange={(event) => setPostTopic(event.target.value)}
                    >
                      {[
                        "Kitchen stories",
                        "Dinner help",
                        "Recipe swap",
                        "Off topic",
                      ].map((topic) => (
                        <option key={topic}>{topic}</option>
                      ))}
                    </select>
                    <button
                      className="button button-dark"
                      onClick={publishPost}
                    >
                      {userName ? "Share post" : "Create account to post"}
                      <Icon name="arrow" size={16} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="community-feed">
                {posts.map((post) => (
                  <article className="community-post" key={post.id}>
                    <div className="post-top">
                      <span className="community-avatar">{post.initials}</span>
                      <div>
                        <strong>{post.author}</strong>
                        <span>
                          {post.topic} · {post.time}
                        </span>
                      </div>
                      <button aria-label="More post options">•••</button>
                    </div>
                    <p>{post.body}</p>
                    <div className="post-actions">
                      <button
                        className={post.liked ? "liked" : ""}
                        onClick={() => togglePostLike(post.id)}
                      >
                        <Icon
                          name="heart"
                          size={16}
                          fill={post.liked ? "currentColor" : "none"}
                        />
                        {post.likes}
                      </button>
                      <span>{post.replies.length} replies</span>
                      <button>
                        <Icon name="share" size={15} /> Share
                      </button>
                    </div>
                    {post.replies.length > 0 && (
                      <div className="post-replies">
                        {post.replies.map((reply, index) => (
                          <p key={`${post.id}-${index}`}>{reply}</p>
                        ))}
                      </div>
                    )}
                    <div className="reply-box">
                      <input
                        value={replyDrafts[post.id] || ""}
                        onChange={(event) =>
                          setReplyDrafts((current) => ({
                            ...current,
                            [post.id]: event.target.value,
                          }))
                        }
                        onKeyDown={(event) => {
                          if (event.key === "Enter") addReply(post.id)
                        }}
                        placeholder="Write a reply..."
                      />
                      <button
                        onClick={() => addReply(post.id)}
                        aria-label="Send reply"
                      >
                        <Icon name="arrow" size={16} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
            <aside className="community-aside">
              <div className="white-panel">
                <span className="eyebrow">TRENDING NOW</span>
                <h2>At the table</h2>
                {[
                  ["# Ramadan prep", "148 posts"],
                  ["# Weeknight maqluba", "92 posts"],
                  ["# Pantry challenge", "77 posts"],
                  ["# Kitchen playlists", "53 posts"],
                ].map(([topic, count]) => (
                  <button key={topic}>
                    <strong>{topic}</strong>
                    <span>{count}</span>
                  </button>
                ))}
              </div>
              <div className="community-guideline">
                <Icon name="heart" size={22} />
                <h3>Come as you are.</h3>
                <p>
                  Be generous, stay curious, and make room for every voice at
                  the table.
                </p>
              </div>
            </aside>
          </div>
        </main>
      )}
      {page === "admin" && (
        <main className="admin-shell">
          <aside className="admin-sidebar">
            <button
              className="brand admin-brand"
              onClick={() => navigate("home")}
            >
              <span className="brand-symbol">✳</span> sahtein
              <span className="brand-dot">.</span>
            </button>
            <span className="admin-label">ADMIN WORKSPACE</span>
            <nav>
              {[
                ["overview", "Overview", "adjust"],
                ["recipes", "Recipes", "book"],
                ["community", "Community", "user"],
              ].map(([tab, label, icon]) => (
                <button
                  key={tab}
                  className={adminTab === tab ? "active" : ""}
                  onClick={() =>
                    setAdminTab(tab as "overview" | "recipes" | "community")
                  }
                >
                  <Icon name={icon} size={18} /> {label}
                </button>
              ))}
            </nav>
            <div className="admin-side-bottom">
              <span className="admin-avatar">SA</span>
              <div>
                <strong>Samira A.</strong>
                <span>Administrator</span>
              </div>
            </div>
          </aside>
          <section className="admin-main">
            <div className="admin-topbar">
              <div>
                <span className="eyebrow">SAHTEIN CONTROL ROOM</span>
                <h1>
                  {adminTab === "overview"
                    ? "Good morning, Samira."
                    : adminTab === "recipes"
                      ? "Recipe library"
                      : "Community care"}
                </h1>
              </div>
              <button
                className="button button-outline"
                onClick={() => navigate("home")}
              >
                View live site <Icon name="arrow" size={16} />
              </button>
            </div>
            {adminTab === "overview" && (
              <>
                <div className="analytics-toolbar">
                  <span>Performance overview</span>
                  <select
                    value={analyticsRange}
                    onChange={(event) => setAnalyticsRange(event.target.value)}
                  >
                    {["7 days", "30 days", "90 days"].map((range) => (
                      <option key={range}>{range}</option>
                    ))}
                  </select>
                </div>
                <div className="analytics-cards">
                  {[
                    [
                      "Total users",
                      analyticsRange === "7 days"
                        ? "12.8K"
                        : analyticsRange === "30 days"
                          ? "48.2K"
                          : "126K",
                      "+12.4%",
                    ],
                    [
                      "Recipe views",
                      analyticsRange === "7 days"
                        ? "38.4K"
                        : analyticsRange === "30 days"
                          ? "142K"
                          : "398K",
                      "+18.7%",
                    ],
                    [
                      "Recipes saved",
                      analyticsRange === "7 days"
                        ? "6.1K"
                        : analyticsRange === "30 days"
                          ? "22.6K"
                          : "68.4K",
                      "+9.2%",
                    ],
                    ["Community posts", String(posts.length + 1240), "+24.1%"],
                  ].map(([label, value, change]) => (
                    <div className="analytics-card" key={label}>
                      <span>{label}</span>
                      <strong>{value}</strong>
                      <small>{change} from last period</small>
                    </div>
                  ))}
                </div>
                <div className="analytics-grid">
                  <div className="admin-panel traffic-panel">
                    <div className="admin-panel-heading">
                      <div>
                        <span className="eyebrow">AUDIENCE</span>
                        <h2>Weekly engagement</h2>
                      </div>
                      <span className="live-chip">LIVE DATA</span>
                    </div>
                    <div className="bar-chart">
                      {[44, 61, 48, 76, 68, 92, 81].map((height, index) => (
                        <div key={days[index]}>
                          <span style={{ height: `${height}%` }} />
                          <small>{days[index].slice(0, 3)}</small>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="admin-panel">
                    <div className="admin-panel-heading">
                      <div>
                        <span className="eyebrow">TOP CONTENT</span>
                        <h2>Most loved recipes</h2>
                      </div>
                    </div>
                    <div className="top-recipes">
                      {managedRecipes.slice(0, 4).map((recipe, index) => (
                        <div key={recipe.id}>
                          <span>0{index + 1}</span>
                          <img src={recipe.image} alt="" />
                          <strong>{recipe.name}</strong>
                          <small>
                            {(18.4 - index * 2.7).toFixed(1)}K views
                          </small>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
            {adminTab === "recipes" && (
              <div className="admin-panel recipe-manager">
                <div className="admin-panel-heading">
                  <div>
                    <span className="eyebrow">CONTENT LIBRARY</span>
                    <h2>{managedRecipes.length} published recipes</h2>
                  </div>
                  <button
                    className="button button-dark"
                    onClick={() => startRecipe()}
                  >
                    <Icon name="plus" size={17} /> Add recipe
                  </button>
                </div>
                <div className="admin-table">
                  <div className="admin-table-head">
                    <span>Recipe</span>
                    <span>Cuisine</span>
                    <span>Nutrition</span>
                    <span>Status</span>
                    <span>Actions</span>
                  </div>
                  {managedRecipes.map((recipe) => (
                    <div className="admin-table-row" key={recipe.id}>
                      <div className="admin-recipe-name">
                        <img src={recipe.image} alt="" />
                        <div>
                          <strong>{recipe.name}</strong>
                          <span>
                            {recipe.time} min · {recipe.difficulty}
                          </span>
                        </div>
                      </div>
                      <span>{recipe.cuisine}</span>
                      <span>{recipe.calories} kcal</span>
                      <span className="status-chip">Published</span>
                      <div className="admin-actions">
                        <button onClick={() => startRecipe(recipe)}>
                          Edit
                        </button>
                        <button
                          className="danger-link"
                          onClick={() =>
                            setManagedRecipes((current) =>
                              current.filter((item) => item.id !== recipe.id),
                            )
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {adminTab === "community" && (
              <div className="admin-panel moderation-panel">
                <div className="admin-panel-heading">
                  <div>
                    <span className="eyebrow">COMMUNITY MODERATION</span>
                    <h2>Recent conversations</h2>
                  </div>
                  <span className="status-chip">
                    {posts.length} active posts
                  </span>
                </div>
                {posts.map((post) => (
                  <div className="moderation-row" key={post.id}>
                    <span className="community-avatar">{post.initials}</span>
                    <div>
                      <strong>{post.author}</strong>
                      <span>
                        {post.topic} · {post.time}
                      </span>
                      <p>{post.body}</p>
                    </div>
                    <button
                      className="danger-link"
                      onClick={() =>
                        setPosts((current) =>
                          current.filter((item) => item.id !== post.id),
                        )
                      }
                    >
                      Remove post
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      )}
      {editingRecipe && (
        <div className="modal-backdrop" onClick={() => setEditingRecipe(null)}>
          <div
            className="modal admin-recipe-modal"
            role="dialog"
            aria-modal="true"
            aria-label={editingRecipe === "new" ? "Add recipe" : "Edit recipe"}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="panel-header">
              <div>
                <span className="eyebrow">RECIPE EDITOR</span>
                <h2>
                  {editingRecipe === "new" ? "Add a new recipe" : "Edit recipe"}
                </h2>
              </div>
              <button
                className="icon-button"
                onClick={() => setEditingRecipe(null)}
                aria-label="Close"
              >
                <Icon name="close" />
              </button>
            </div>
            <label>
              Recipe name
              <input
                value={recipeDraft.name}
                onChange={(event) =>
                  setRecipeDraft((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
                placeholder="e.g. Sumac Roast Chicken"
              />
            </label>
            <label>
              Cuisine
              <select
                value={recipeDraft.cuisine}
                onChange={(event) =>
                  setRecipeDraft((current) => ({
                    ...current,
                    cuisine: event.target.value,
                  }))
                }
              >
                {cuisines.map((cuisine) => (
                  <option key={cuisine}>{cuisine}</option>
                ))}
              </select>
            </label>
            <div className="modal-field-row">
              <label>
                Time (minutes)
                <input
                  type="number"
                  value={recipeDraft.time}
                  onChange={(event) =>
                    setRecipeDraft((current) => ({
                      ...current,
                      time: event.target.value,
                    }))
                  }
                />
              </label>
              <label>
                Calories
                <input
                  type="number"
                  value={recipeDraft.calories}
                  onChange={(event) =>
                    setRecipeDraft((current) => ({
                      ...current,
                      calories: event.target.value,
                    }))
                  }
                />
              </label>
            </div>
            <label>
              Description
              <textarea
                value={recipeDraft.description}
                onChange={(event) =>
                  setRecipeDraft((current) => ({
                    ...current,
                    description: event.target.value,
                  }))
                }
                placeholder="Describe what makes this recipe special..."
              />
            </label>
            <button
              className="button button-dark"
              disabled={
                !recipeDraft.name.trim() || !recipeDraft.description.trim()
              }
              onClick={saveRecipe}
            >
              <Icon name="check" size={17} />
              {editingRecipe === "new" ? "Publish recipe" : "Save changes"}
            </button>
          </div>
        </div>
      )}
      {page === "favorites" && (
        <main className="container standard-page">
          <div className="page-heading">
            <div>
              <span className="eyebrow">THE ONES YOU LOVE</span>
              <h1>
                Your favorites<span className="accent-mark">.</span>
              </h1>
              <p>All the recipes worth coming back to, in one happy place.</p>
            </div>
          </div>
          <div className="tab-row">
            {["All", "Middle Eastern", "Healthy", "AI Recipes"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFavTab(tab)}
                className={favTab === tab ? "active" : ""}
              >
                {tab}
              </button>
            ))}
          </div>
          {allRecipes.some(
            (r) =>
              favorites.includes(r.id) &&
              (favTab === "All" ||
                (favTab === "AI Recipes" && r.id === "generated") ||
                (favTab === "Middle Eastern" && r.id !== "generated") ||
                (favTab === "Healthy" && r.tags.includes("Healthy"))),
          ) ? (
            <div className="recipe-grid results-grid">
              {allRecipes
                .filter(
                  (r) =>
                    favorites.includes(r.id) &&
                    (favTab === "All" ||
                      (favTab === "AI Recipes" && r.id === "generated") ||
                      (favTab === "Middle Eastern" && r.id !== "generated") ||
                      (favTab === "Healthy" && r.tags.includes("Healthy"))),
                )
                .map((r) => (
                  <RecipeCard
                    key={r.id}
                    recipe={r}
                    healthy={healthy}
                    favorite
                    onFavorite={() => toggleFavorite(r.id)}
                    onOpen={() =>
                      r.id === "generated"
                        ? openAi("generated")
                        : openRecipe(r.id)
                    }
                  />
                ))}
            </div>
          ) : (
            <div className="empty-state">
              <Icon name="heart" size={35} />
              <h3>No favorites here yet</h3>
              <p>Save a recipe you love and it’ll show up here.</p>
              <button
                className="button button-dark"
                onClick={() => navigate("recipes")}
              >
                Explore recipes <Icon name="arrow" size={17} />
              </button>
            </div>
          )}
        </main>
      )}
      {page === "profile" && (
        <main className="container standard-page">
          <div className="page-heading">
            <div>
              <span className="eyebrow">YOUR LITTLE CORNER</span>
              <h1>
                Your profile<span className="accent-mark">.</span>
              </h1>
              <p>Everything that makes your Sahtein experience yours.</p>
            </div>
          </div>
          <div className="profile-layout">
            <div className="profile-card">
              <div className="profile-avatar">
                {(userName || "Sahtein Food Lover").charAt(0)}
              </div>
              <span className="eyebrow">WELCOME BACK</span>
              <h2>{userName || "Sahtein Food Lover"}</h2>
              <p>Good food. Good company. Good for you.</p>
              <div className="profile-stats">
                <span>
                  <strong>{favorites.length}</strong> saved recipes
                </span>
                <span>
                  <strong>{Object.keys(planner).length}</strong> planned meals
                </span>
              </div>
            </div>
            <div className="white-panel profile-preferences">
              <span className="eyebrow">ALL ABOUT YOU</span>
              <h2>Your preferences</h2>
              {[
                ["Daily calorie target", "1,800 kcal"],
                ["Preferred cuisine", "Middle Eastern"],
                ["Dietary preferences", "High protein · Healthy"],
                ["Measurement system", measurement],
                ["Default servings", "2 people"],
                ["Fasting plan", `${plan}:${24 - plan}`],
              ].map(([label, value]) => (
                <div key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
            <div className="white-panel profile-links">
              <span className="eyebrow">YOUR COLLECTIONS</span>
              <h2>Quick access</h2>
              {[
                ["Saved recipes", "favorites", "heart"],
                ["Meal planner", "planner", "calendar"],
                ["Fasting history", "fasting", "clock"],
                ["AI recipe assistant", "ai", "spark"],
                ["Community table", "community", "user"],
                ["Admin workspace", "admin", "adjust"],
              ].map(([label, target, icon]) => (
                <button
                  key={label}
                  onClick={() =>
                    target === "ai" ? openAi() : navigate(target as Page)
                  }
                >
                  <Icon name={icon} size={18} />
                  {label}
                  <Icon name="arrow" size={16} />
                </button>
              ))}
              {userName && (
                <button
                  className="profile-signout"
                  onClick={() => {
                    setUserName(null)
                    navigate("home")
                  }}
                >
                  <Icon name="close" size={17} /> Sign out
                </button>
              )}
            </div>
          </div>
        </main>
      )}
      {adjustOpen && (
        <div className="modal-backdrop" onClick={() => setAdjustOpen(false)}>
          <div
            className="modal adjust-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Adjust your recipe"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="panel-header">
              <div>
                <span className="eyebrow">MAKE IT FIT YOUR DAY</span>
                <h2>Adjust your recipe</h2>
              </div>
              <button
                className="icon-button"
                onClick={() => setAdjustOpen(false)}
                aria-label="Close"
              >
                <Icon name="close" />
              </button>
            </div>
            <p>
              Change a few details and we'll refresh your recipe and per-serving
              nutrition.
            </p>
            <label>
              Number of servings
              <div className="serving-control">
                <button
                  onClick={() => setAiServings((s) => Math.max(1, s - 1))}
                  aria-label="Decrease servings"
                >
                  <Icon name="minus" size={16} />
                </button>
                <strong>{aiServings}</strong>
                <button
                  onClick={() => setAiServings((s) => Math.min(20, s + 1))}
                  aria-label="Increase servings"
                >
                  <Icon name="plus" size={16} />
                </button>
              </div>
            </label>
            <label>
              Maximum calories per serving
              <input
                type="number"
                min="200"
                max="1200"
                value={calorieLimit}
                onChange={(e) =>
                  setCalorieLimit(Math.max(200, Number(e.target.value) || 200))
                }
              />
            </label>
            <label>
              Preference
              <select value={diet} onChange={(e) => setDiet(e.target.value)}>
                {[
                  "No preference",
                  "High protein",
                  "Low calorie",
                  "Vegetarian",
                  "Vegan",
                  "Gluten-free",
                ].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
            <label>
              Ingredient to avoid
              <input
                placeholder="e.g. Eggplant"
                value={avoid}
                onChange={(e) => setAvoid(e.target.value)}
              />
            </label>
            <button
              className="button button-dark"
              onClick={() => {
                setRegenerated(true)
                setAdjustOpen(false)
              }}
            >
              <Icon name="refresh" size={17} /> Regenerate recipe
            </button>
          </div>
        </div>
      )}
      <footer className="site-footer">
        <div className="container footer-main">
          <div>
            <button className="brand" onClick={() => navigate("home")}>
              <span className="brand-symbol">✳</span> sahtein
              <span className="brand-dot">.</span>
            </button>
            <p>
              Good food brings us together.
              <br />
              Discover, make, and share what you love.
            </p>
          </div>
          <div>
            <span>EXPLORE</span>
            <button onClick={() => navigate("recipes")}>All recipes</button>
            <button
              onClick={() => {
                setHealthy(true)
                navigate("dashboard")
              }}
            >
              Healthy mode
            </button>
            <button onClick={() => openAi()}>AI recipe assistant</button>
          </div>
          <div>
            <span>YOUR SPACE</span>
            <button onClick={() => navigate("planner")}>Meal planner</button>
            <button onClick={() => navigate("community")}>Community</button>
            <button onClick={() => navigate(userName ? "profile" : "account")}>
              {userName ? "Your account" : "Create an account"}
            </button>
            <button onClick={() => navigate("admin")}>Admin workspace</button>
          </div>
          <div className="footer-message">
            Made with care,
            <br />
            <em>served with joy.</em> <span>✳</span>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            © 2026 Sahtein. A recipe prototype made for curious cooks.
          </span>
          <button onClick={() => navigate("wireframe")}>
            View low-fidelity wireframe <Icon name="arrow" size={14} />
          </button>
        </div>
      </footer>
    </div>
  )
}
