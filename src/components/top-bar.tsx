import { DarkModeToggle } from "./dark-mode-toggle";
import {useNavigate} from "react-router-dom"

export default function TopBar(){

  const nav = useNavigate()

    return (
      <div className=" z-10 backdrop-blur-xl shadow-lg shadow-blue-900/20 flex justify-between items-center px-4 fixed w-full  " >
<button onClick={()=>nav("/")} className="text-xl font-semibold" >Name</button>
          <DarkModeToggle />
       
      </div>
    );
}