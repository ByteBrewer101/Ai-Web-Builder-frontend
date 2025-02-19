import { useEffect, useState } from "react";
import { WebContainer } from "@webcontainer/api";
import { useRecoilState } from "recoil";
import { webContainerInstance } from "@/states";

export function useWebContainer() {
  const [webcontainer, setWebcontainer] = useRecoilState(webContainerInstance)


  const [isloading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);

    async function main() {
      if(!webcontainer){

        const webcontainerInstance = await WebContainer.boot();
        setWebcontainer(webcontainerInstance);
      }
    }
    main();
    setIsLoading(false);
   
  }, [setWebcontainer,webcontainer]);
  

  return { webcontainer, isloading };
}
 