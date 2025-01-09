interface ErrorHandlerProps {
  message: string;
}

const ErrorHandler: React.FC<ErrorHandlerProps> = ({ message }) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-light-lightblack dark:bg-black">
      <div className="shadow-lg border-none border-light-lightblack dark:border-red-600 rounded-lg flex flex-col bg-light-white dark:bg-darkblue px-6 py-8 w-[420px]">
        <div className="flex items-center mb-4 text-red-500">
          <svg
            className="w-8 h-8 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01M12 3a9 9 0 110 18 9 9 0 010-18z"
            />
          </svg>
          <h2 className="text-lg font-semibold text-darkblack dark:text-light-white">
            Error
          </h2>
        </div>
        <p className="mb-4 text-sm text-grayfont">{message}</p>
        <button
          onClick={handleRefresh}
          className="gap-2 rounded-md bg-red-500 py-3 mt-4 text-xs font-semibold text-light-white"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
};

export default ErrorHandler;
