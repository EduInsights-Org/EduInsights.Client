import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

interface AppDragDropAreaProps {
  csvFileError: string | null;
  dataList: any[] | null;
  handleCSVSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetCSVFile: () => void;
  fileName: string;
}
const AppDragDropArea = ({
  csvFileError,
  dataList,
  handleCSVSelect,
  resetCSVFile,
  fileName,
}: AppDragDropAreaProps) => {
  const CSVResetButton = () => {
    return (
      <button onClick={() => resetCSVFile()}>
        <XCircleIcon className="h-5 w-5 absolute top-2 right-2 text-light-font02 dark:text-font02" />
      </button>
    );
  };

  return (
    <div
      className={clsx(
        "flex gap-x-2 justify-between w-full h-56 border-[1px] rounded-md",
        {
          "border-light-borderGray dark:border-borderGray border-dashed":
            csvFileError === null && dataList === null,
          "border-[#bd5622] dark:border-[#df985d]": csvFileError,
          "border-[#45855f] dark:border-[#59aa77]":
            dataList && csvFileError === null,
        }
      )}
    >
      {csvFileError === null && dataList === null ? (
        <label
          form="dropzone-file"
          className="flex flex-col items-center justify-center w-full cursor-pointer bg-light-subBg dark:bg-subBg hover:bg-light-mainBg dark:hover:bg-mainBg rounded-md"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-2 text-light-font02 dark:text-font02"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="text-sm text-light-font02 dark:text-font02">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-light-font02 dark:text-font02">
              CSV file
            </p>
          </div>
          <input
            type="file"
            accept=".csv"
            className="hidden"
            onChange={(e) => {
              handleCSVSelect(e);
            }}
          />
        </label>
      ) : (
        <>
          {csvFileError ? (
            <div className="relative flex items-center justify-center gap-x-2 w-full bg-[#fdf0d9] dark:bg-[#301f13] px-2 rounded-md">
              <ExclamationCircleIcon className="h-10 w-10 text-[#bd5622] dark:text-[#df985d]" />
              <CSVResetButton />
              <div className="flex flex-col gap-y-1">
                <span className="text-sm font-semibold leading-none text-[#bd5622] dark:text-[#df985d]">
                  {fileName}
                </span>
                <span className="flex gap-x-2 items-center text-xs leading-none text-[#bd5622] dark:text-[#df985d]">
                  {csvFileError}
                </span>
              </div>
            </div>
          ) : (
            <div className="relative flex items-center justify-center w-full gap-x-2 rounded-md bg-[#e9f6eb] dark:bg-[#192d23] dark:border-[#59aa77] px-2">
              <CheckCircleIcon className="h-10 w-10 dark:text-[#59aa77] text-[#45855f]" />
              <CSVResetButton />
              <div className="flex flex-col gap-y-1">
                <span className="text-sm font-semibold leading-none dark:text-[#59aa77] text-[#45855f]">
                  {fileName}
                </span>
                <span className="flex gap-x-2 items-center text-xs leading-none dark:text-[#59aa77] text-[#45855f]">
                  Ready to save
                </span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AppDragDropArea;
