import { Ripple } from "@/components/magicui/ripple";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useAuth } from "@clerk/clerk-react";


export function HeroSection() {
  const [prompt, setPrompt] = useState("");

  const { isSignedIn } = useAuth();




  function ButtonHandler() {
    if (isSignedIn) {
      nav("/product", { state: { prompt } });
    } else {
      toast.info("You are not signed in");
    }
  }

  const nav = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br dark:from-gray-900 to-black overflow-hidden relative">
      {/* Background gradient circles */}
      <div className="absolute opacity-40 -top-40 -left-40 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      <div className="absolute opacity-30 -bottom-40 -right-40 w-96 h-96 bg-pink-500 rounded-full blur-3xl"></div>

      {/* Animated stars */}
      <div className="absolute inset-0 overflow-hidden">
        <Ripple className="opacity-40" />
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 mb-8 text-center"
      >
        <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-amber-400 mb-4">
          AI Website Builder
        </h1>
        <p className="dark:text-gray-300 text-lg max-w-xl mx-auto">
          Create beautiful, responsive websites in seconds with AI. Just
          describe what you want.
        </p>
      </motion.div>

      <div className="backdrop-blur-md z-10 w-full max-w-md mx-4 md:max-w-xl overflow-hidden rounded-xl border border-white/10 shadow-2xl">
        <div className="w-full p-6 md:p-8 space-y-6 dark:bg-black/40">
          <div className="relative">
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the website you want to create..."
              className=" pr-24 py-6 dark:bg-black/50  backdrop-blur-lg border-gray-700 focus:border-purple-400 transition-all duration-300 shadow-lg rounded-lg"
            />
            <Button
              onClick={ButtonHandler}
              className="absolute right-1 top-1 h-10 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium transition-all duration-300 rounded-md"
              disabled={!prompt.trim()}
            >
              Generate
            </Button>
          </div>
          <div className="flex items-center justify-center space-x-4 text-sm dark:text-gray-400">
            <span>Try: "Portfolio site"</span>
            <span>"E-commerce store"</span>
            <span>"Blog"</span>
            
          </div>
        </div>
      </div>

      {/* Feature badges */}
      <div className="flex flex-wrap justify-center gap-3 mt-8 max-w-xl mx-auto px-4">
        <span className="px-3 py-1 bg-black/10 dark:bg-white/10 backdrop-blur-sm rounded-full text-xs dark:text-gray-300">
          Fully Responsive
        </span>
        <span className="px-3 py-1 bg-black/10 dark:bg-white/10 backdrop-blur-sm rounded-full text-xs dark:text-gray-300">
          Custom Styles
        </span>
        <span className="px-3 py-1 bg-black/10 dark:bg-white/10 backdrop-blur-sm rounded-full text-xs dark:text-gray-300">
          SEO Optimized
        </span>
        <span className="px-3 py-1 bg-black/10 dark:bg-white/10 backdrop-blur-sm rounded-full text-xs dark:text-gray-300">
          Ready-to-deploy
        </span>
      </div>
    </div>
  );
}
