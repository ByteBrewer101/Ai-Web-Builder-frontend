import { beUrl } from "@/constants";

import { useEffect, useState } from "react";
import axios from "axios";

export function useCallTech(inputPrompt: string) {
  const [data, setData] = useState({});
  const [isloading, setIsLoding] = useState(true);
  const [err, setErr] = useState();

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.post(`${beUrl}/technology`, {
          prompt:inputPrompt,
        });
        if (response.data) {
          setData(response.data);
         
        }
      } catch (e) {
        //@ts-ignore
        setErr(e);
      } finally {
        setIsLoding(false);
      }
    })();
  }, [inputPrompt]);

  return { data, isloading, err };
}
