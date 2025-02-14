import { atom } from "recoil";
import { FileType, Step } from "@/types";

const filesDefault: FileType[] = [
  {
    name: "src",
    path: "src",
    isFolder: true,
    children: [
      {
        name: "App.tsx",
        path: "src/App.tsx",
        content:
          "export default function App() {\n  return <div>Hello World</div>\n}",
        isFolder: false,
      },
      {
        name: "components",
        path: "src/components",
        isFolder: true,
        children: [
          {
            name: "Button.tsx",
            path: "src/components/Button.tsx",
            content:
              "export default function Button() {\n  return <button>Click</button>\n}",
            isFolder: false,
          },
        ],
      },
    ],
  },
];


export const stepsState = atom<Step[]>({
  key: "stepsState",
  default: [], 
});

export const filesState = atom<FileType[]>({
  key:"filesState",
  default:filesDefault
})

