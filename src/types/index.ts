export enum StepType{
    CreateFile,
    CreateFolder,
    EditFile,
    DeleteFile,
    RunScript

}


export interface ApiMessage {
  role: string;
  content: string;
};

export interface Step{
    id:number,
    title:string,
    description:string,
    type:StepType,
    status:'pending'|'in-progress'|'completed',
    code?:string,
    path?:string
}

export interface FileType {
  name: string;
  path: string;
  content?: string;
  isFolder: boolean;
  children?: FileType[];
}

export interface FileExplorerProps {
  files: FileType[];
  selectedFile?: FileType;
  onSelectFile: (file: FileType) => void;
  loading:boolean
}


