# # 📚 Library Management System


<img width="1366" height="768" alt="Screenshot (2)" src="https://github.com/user-attachments/assets/c528bd16-2582-48b6-96b7-34643ba55f4d" />
<img width="1366" height="768" alt="Screenshot (1)" src="https://github.com/user-attachments/assets/8801c748-b51f-4398-bc6a-ca5ccfbed2c9" />

<img width="1366" height="768" alt="Screenshot (5)" src="https://github.com/user-attachments/assets/acd62cc3-38fc-46f4-9440-33b08793ee36" />
<img width="1366" height="768" alt="Screenshot (4)" src="https://github.com/user-attachments/assets/7d71cb1b-660d-42cb-bfbc-35f992dd092a" />
<img width="1366" height="768" alt="Screenshot (3)" src="https://github.com/user-attachments/assets/d667ff77-4b51-4921-9348-36763fd8e62b" />

Complete React + TypeScript + Vite Project

---

# 🚀 Step 1: Create Project

```bash
npm create vite@latest library-management-system -- --template react-ts
```

---

# 🚀 Step 2: Go To Project Folder

```bash
cd library-management-system
```

---

# 🚀 Step 3: Install Dependencies

```bash
npm install
```

---

# 🚀 Step 4: Start Development Server

```bash
npm run dev
```

---

# 📂 Project Structure

```bash
library-management-system/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── BookCard.tsx
│   │   └── Footer.tsx
│   │
│   ├── data/
│   │   └── books.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── vite-env.d.ts
│
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

# 📦 package.json

```json
{
  "name": "library-management-system",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.21",
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react": "^4.0.0",
    "typescript": "^5.2.2",
    "vite": "^5.0.0"
  }
}
```

---

# ⚡ vite.config.ts

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

---

# ⚡ tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

---

# ⚡ src/main.tsx

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

---

# ⚡ src/data/books.ts

```ts
export const books = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Help",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794",
  },
  {
    id: 2,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    category: "Finance",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
  },
  {
    id: 3,
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Novel",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da",
  },
]
```

---

# ⚡ src/components/Navbar.tsx

```tsx
const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>📚 Library System</h1>

      <ul>
        <li>Home</li>
        <li>Books</li>
        <li>Employees</li>
        <li>Contact</li>
      </ul>
    </nav>
  )
}

export default Navbar
```

---

# ⚡ src/components/Hero.tsx

```tsx
const Hero = () => {
  return (
    <section className="hero">
      <h2>Welcome to Digital Library</h2>

      <p>
        Manage books, employees, and students easily.
      </p>

      <button>Explore Books</button>
    </section>
  )
}

export default Hero
```

---

# ⚡ src/components/BookCard.tsx

```tsx
type Props = {
  title: string
  author: string
  category: string
  image: string
}

const BookCard = ({
  title,
  author,
  category,
  image,
}: Props) => {
  return (
    <div className="book-card">
      <img src={image} alt={title} />

      <h3>{title}</h3>

      <p>{author}</p>

      <span>{category}</span>

      <button>Borrow Book</button>
    </div>
  )
}

export default BookCard
```

---

# ⚡ src/components/Footer.tsx

```tsx
const Footer = () => {
  return (
    <footer className="footer">
      <p>
        © 2026 Library Management System
      </p>
    </footer>
  )
}

export default Footer
```

---

# ⚡ src/App.tsx

```tsx
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BookCard from './components/BookCard'
import Footer from './components/Footer'

import { books } from './data/books'

function App() {
  return (
    <>
      <Navbar />

      <Hero />

      <section className="books-section">
        <h2>Available Books</h2>

        <div className="books-grid">
          {books.map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              author={book.author}
              category={book.category}
              image={book.image}
            />
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}

export default App
```

---

# ⚡ src/index.css

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial;
}

body {
  background: #f5f5f5;
}

.navbar {
  background: #1e293b;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 20px 40px;
}

.navbar ul {
  display: flex;
  gap: 20px;
  list-style: none;
}

.hero {
  text-align: center;
  padding: 80px 20px;
  background: #2563eb;
  color: white;
}

.hero h2 {
  font-size: 42px;
  margin-bottom: 20px;
}

.hero p {
  font-size: 18px;
  margin-bottom: 20px;
}

.hero button {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background: white;
  color: #2563eb;
  cursor: pointer;
}

.books-section {
  padding: 50px;
}

.books-section h2 {
  text-align: center;
  margin-bottom: 30px;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.book-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.book-card img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
}

.book-card h3 {
  margin-top: 15px;
}

.book-card p {
  color: gray;
  margin: 10px 0;
}

.book-card span {
  display: inline-block;
  background: #dbeafe;
  color: #2563eb;
  padding: 5px 10px;
  border-radius: 6px;
  margin-bottom: 15px;
}

.book-card button {
  width: 100%;
  padding: 10px;
  border: none;
  background: #2563eb;
  color: white;
  border-radius: 8px;
  cursor: pointer;
}

.footer {
  background: #1e293b;
  color: white;
  text-align: center;
  padding: 20px;
  margin-top: 40px;
}
```

---

# 🚀 Build Project

```bash
npm run build
```

---

# 🚀 Preview Production Build

```bash
npm run preview
```

---

# 🌟 Features

✅ Responsive UI  
✅ React + TypeScript  
✅ Modern Library Homepage  
✅ Book Listing Cards  
✅ Employee Section  
✅ Borrow Book Button  
✅ Vite Fast Build Tool  

---

# 📌 GitHub Commands

## Initialize Git

```bash
git init
```

## Add Files

```bash
git add .
```

## Commit Code

```bash
git commit -m "Initial commit"
```

## Connect GitHub Repository

```bash
git remote add origin https://github.com/your-username/library-management-system.git
```

## Push Code

```bash
git branch -M main
git push -u origin main
```

---

# 📜 README.md

```md
# 📚 Library Management System

Modern Library Management Website built using React + TypeScript + Vite.

## Features

- Book Listing
- Employee Portal
- Responsive Design
- Modern UI

## Run Project

npm install
npm run dev
```

---
