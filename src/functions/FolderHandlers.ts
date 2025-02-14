import { FileType } from "@/types";

export function HandleFolder(folder: FileType): Record<string, unknown> {
  if (!folder.isFolder) {
   
    return {
      [folder.name]: {
        file: {
          contents: folder.content || "",
        },
      },
    };
  } else {
    
    const childrenResult: Record<string, unknown> = {};

    if (folder.children && folder.children.length > 0) {
      folder.children.forEach((child) => {
        // Recursively process each child
        const childResult = HandleFolder(child);

        // Merge child result into our children result
        Object.assign(childrenResult, childResult);
      });
    }


    if (folder.name) {
      return {
        [folder.name]: {
          directory: childrenResult,
        },
      };
    } else {
      
      return childrenResult;
    }
  }
}
