import { DarkModeToggle } from "./dark-mode-toggle";
import {useNavigate} from "react-router-dom"
import { SignedIn,SignedOut,SignInButton,UserButton } from "@clerk/clerk-react";

import { Avatar } from "@radix-ui/react-avatar";

export default function TopBar(){

  const nav = useNavigate()

    return (
      <div className="   z-10 backdrop-blur-xl p-2 shadow-lg shadow-pink-900/20 flex justify-between items-center px-4 fixed w-full  ">
        <button onClick={() => nav("/")} className="text-2xl font-semibold">
          AI Web Builder
        </button>

        <div className="flex items-center justify-center space-x-2 px-2 ">
          <DarkModeToggle />
        

          <Avatar>
           
            <header>
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </header>
          </Avatar>
        </div>
      </div>
    );
}