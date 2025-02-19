import { beUrl } from "@/constants";
import axios from "axios";
import { ParseXml } from "@/functions/XMlParser";
import { useSetRecoilState } from "recoil";
import { stepsState } from "@/states";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function useCallTech(prompt: string) {
  const setSteps = useSetRecoilState(stepsState);
  const [isloading, setIsLoading] = useState(true);
  const { userId, getToken, isSignedIn } = useAuth();
  const nav = useNavigate();

  async function init(prompt: string) {
    try {
      if (!isSignedIn) {
        toast.info("You are not signed in");
        return;
      }
      const token = await getToken();

      const response = await axios.post(
        `${beUrl}/technology`,
        {
          prompt,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      //@ts-expect-error
      const { prompts, uiPrompts } = response.data;

      setSteps(ParseXml(uiPrompts[0]));

      const messages = [...prompts, prompt].map((content) => ({
        role: "user",
        content,
      }));

      const response2 = await axios.post(
        `${beUrl}/chat`,
        {
          messages,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response2.data;
      //@ts-expect-error
      const AiSteps = ParseXml(data);

      setSteps((prev) => [...prev, ...AiSteps]);
      
    } catch (error) {
      toast.error("You're out of tokens or something went wrong come back tommorrow");
      console.log(error);
      nav("/");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    init(prompt);
  }, [prompt]);

  return { isloading };
}
