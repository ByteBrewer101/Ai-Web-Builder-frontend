import { beUrl } from "@/constants";
import axios from "axios";

import { ParseXml } from "@/functions/XMlParser";
import { useSetRecoilState } from "recoil";
import { stepsState } from "@/states";
import { useEffect, useState } from "react";

export function useCallTech(prompt: string) {
  const setSteps = useSetRecoilState(stepsState);
  const [isloading, setIsLoading] = useState(true);

  async function init(prompt: string) {
    if (isloading) {
      console.log("loading...");
    }
    const response = await axios.post(`${beUrl}/technology`, {
      prompt,
    });
//@ts-expect-error
    const { prompts, uiPrompts } = response.data;

    setSteps(ParseXml(uiPrompts[0]));

  const messages = [...prompts, prompt].map((content) => ({
    role: "user",
    content,
  }));

    const response2 = await axios.post(`${beUrl}/chat`, {
      messages,
    });

    const data = response2.data;

    console.log(data);
    const AiSteps = ParseXml(data);

    setSteps((prev) => [...prev, ...AiSteps]);

    setIsLoading(false);
  }

  useEffect(() => {
    init(prompt);
  }, []);
}
