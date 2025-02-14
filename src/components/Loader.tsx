export default function Loader(){
    return (
      <div className="flex items-center space-x-4 animate-pulse">
        {/* File Icon */}
        <div className="h-8 w-8 rounded-md bg-gray-200 dark:bg-gray-700"></div>

        {/* File Details */}
        <div className="flex-1 space-y-2">
          {/* File Name */}
          <div className="h-3 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>

          {/* Metadata (e.g., size, type) */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1 h-2 rounded bg-gray-200 dark:bg-gray-700"></div>
            <div className="col-span-1 h-2 rounded bg-gray-200 dark:bg-gray-700"></div>
          </div>
        </div>
      </div>
    );
}