export const todoListAppCode = `Here is a complete setup for a simple Todo List application using React, TypeScript, and TailwindCSS:

<boltArtifact id="todo-list-app" title="Todo List App with React and TailwindCSS">
  <boltAction type="file" filePath="package.json">
{
  "name": "todo-list-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint ."
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "eslint": "^9.9.1",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.5.3",
    "vite": "^5.4.2"
  }
}
  </boltAction>
  
  <boltAction type="shell">
    npm install
  </boltAction>
  
  <boltAction type="file" filePath="vite.config.ts">
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
  </boltAction>

  <boltAction type="file" filePath="postcss.config.js">
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
  </boltAction>

  <boltAction type="file" filePath="tailwind.config.js">
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
  </boltAction>

  <boltAction type="file" filePath="index.html">
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Todo App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
  </boltAction>

  <boltAction type="file" filePath="src/index.css">
@tailwind base;
@tailwind components;
@tailwind utilities;
  </boltAction>

  <boltAction type="file" filePath="src/main.tsx">
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
  </boltAction>

  <boltAction type="file" filePath="src/App.tsx">
import React, { useState } from 'react';

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState('');

  const addTodo = () => {
    if (task.trim()) {
      setTodos([...todos, { id: Date.now(), task, completed: false }]);
      setTask('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Todo List</h1>
        <div className="flex mb-4">
          <input
            type="text"
            className="border flex-1 p-2 rounded-l"
            placeholder="Add a task..."
            value={task}
            onChange={e => setTask(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-r"
            onClick={addTodo}
          >
            Add
          </button>
        </div>
        <ul>
          {todos.map(todo => (
            <li
              key={todo.id}
              
            >
              <span onClick={() => toggleTodo(todo.id)} className="flex-1 cursor-pointer">
                {todo.task}
              </span>
              <button
                className="bg-red-500 text-white px-2 rounded"
                onClick={() => removeTodo(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
  </boltAction>

  <boltAction type="file" filePath="src/vite-env.d.ts">
/// <reference types="vite/client" />
  </boltAction>
  
  <boltAction type="shell">
    npm run dev
  </boltAction>
</boltArtifact>`;
