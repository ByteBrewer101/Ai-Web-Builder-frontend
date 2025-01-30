import { Card } from "@/components/ui/card";
import { Input } from "./ui/input";
import { Sparkles, Send } from "lucide-react";



interface Step {
  description: string;
}

interface StepsPanelProps {
  steps: Step[];
}

export function StepsPanel({ steps }: StepsPanelProps) {
  return (
    <Card className="h-full py-4 px-2 flex flex-col justify-between">
      <h2 className="text-xl font-semibold mb-4">AI Steps</h2>
      <div className="overflow-y-scroll py-2 px-2 " style={ {scrollbarWidth: "none"}} >
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="flex  items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                {index + 1}
              </div>
              <p className="text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="relative w-full">
        <Input
          className="w-full pl-10 pr-12"
          placeholder="Type your message..."
        />

        <Sparkles className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </Card>
  );
}
