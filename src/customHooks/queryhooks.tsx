import { beUrl } from "@/constants";
import { useEffect, useState } from "react";
import axios from "axios";
export function useCallTech(inputPrompt: string) {

  
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState<unknown>();

  useEffect(() => {
    (async function () {
      try {
        // First API call to /technology
        const techResponse = await axios.post(`${beUrl}/technology`, {
          prompt: inputPrompt,
        });
        const { prompts } = techResponse.data;

    
        const messages = [...prompts,inputPrompt].map((content)=>({

          role:"user",
          content
        }))

        // setData(messages)

        const stepsResponse = await axios.post(`${beUrl}/chat`, { messages });
        setData(stepsResponse.data); 
      } catch (e) {
        setErr(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [inputPrompt]);

  if(isLoading){
    console.log("loading...");
  }if(!isLoading){
    console.log(data);
  }

  return { data, isLoading, err };
}
