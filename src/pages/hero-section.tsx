import { Button } from "@/components/ui/button";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Input } from "@/components/ui/input";
import { ShineBorder } from "@/components/ui/shine-border";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export function HeroSection() {
  const [prompt, setPrompt] = useState("");

 
  const nav = useNavigate()


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br dark:bg-black">
      <ShineBorder
        className="backdrop-blur-sm absolute z-10 flex h-[300px] w-1/3 flex-col   items-center justify-center overflow-hidden rounded-lg border bg-gray-100 md:shadow-xl"
        color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
      >
        <div className="w-full max-w-2xl px-4 space-y-6">
          <h1 className="text-4xl  font-bold dark:text-white text-center">
            AI Website Builder
          </h1>
          <div className="flex gap-2 ">
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the website you want to create..."
              className="flex-1 shadow-lg shadow-blue-800/30 bg-background/90 backdrop-blur-sm"
            />
            <Button
              variant={"outline"}
              onClick={() => { nav("/product",{state:{prompt}})}}
              className="bg-background shadow-lg shadow-blue-800/30 text-foreground hover:bg-background/90"
            >
              Generate
            </Button>
          </div>
        </div>
      </ShineBorder>
      <DotPattern
      
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]  "
        )}
      />
    </div>
  );
}
