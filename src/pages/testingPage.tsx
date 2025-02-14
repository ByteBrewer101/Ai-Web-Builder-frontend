import { useWebContainer } from "@/customHooks/webContainerHooks";
import { HandleFolder } from "@/functions/FolderHandlers";
import { filesState } from "@/states";
import { FileType } from "@/types";
// import { useEffect } from "react";
import { useRecoilValue } from "recoil";

export default function TestingPage() {
  const {webcontainer,isloading} = useWebContainer();

  const files:FileType[] =  useRecoilValue(filesState)

async function handler(){
  const result = {};

  files.forEach(element => {
      const fileResult=HandleFolder(element);
    Object.assign(result, fileResult);
  });

  console.log(result);

 if(!isloading){
   await webcontainer?.mount(result)
   await webcontainer?.spawn("npm", ["install"]);
   await webcontainer?.spawn("npm",["run","dev"])
 }

 
}



  return (
    <div className="h-screen flex items-center justify-center">
      <button onClick={handler} >run test webcontainer</button>
    </div>
  );
}
