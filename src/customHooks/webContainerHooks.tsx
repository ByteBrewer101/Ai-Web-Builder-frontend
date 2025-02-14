import { useEffect, useState } from "react";
import { WebContainer } from "@webcontainer/api";

export function useWebContainer() {
  const [webcontainer, setWebcontainer] = useState<WebContainer>();

  const [isloading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);

    async function main() {
      const webcontainerInstance = await WebContainer.boot();
      setWebcontainer(webcontainerInstance);
    }
    main();
    setIsLoading(false);
   
  }, []);
  

  return { webcontainer, isloading };
}
 