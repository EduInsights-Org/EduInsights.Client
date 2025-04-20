import AppTable, { TableColumn } from "@/components/AppTable";
import { getResults, Result } from "@/slices/resultSlice";
import { useAppDispatch, useAppSelector } from "@/slices/store";
import {
  ArrowPathIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Badge } from "@radix-ui/themes";
import { useEffect } from "react";

const ResultManagement = () => {
  const dispatch = useAppDispatch();
  const results = useAppSelector((state) => state.result.results);

  const columns: TableColumn<Result>[] = [
    {
      key: "indexNumber",
      header: "Index Number",
    },
    { key: "semester", header: "Semester" },
    { key: "subjectCode", header: "Subject Code" },
    { key: "subjectName", header: "Subject Name" },
    {
      key: "batch",
      header: "Batch",
    },
    {
      key: "grade",
      header: "Grade",
    },
  ];

  const handleGetResults = async () => {
    dispatch(getResults());
  };
  useEffect(() => {
    handleGetResults();
  }, []);
  return (
    <div className="border flex flex-col rounded-lg overflow-hidden border-light-borderGray dark:border-borderGray w-[730px] h-[500px]">
      <div className="flex gap-x-3 items-center py-4 px-3 bg-light-subBg dark:bg-subBg">
        <button
          onClick={handleGetResults}
          className="ml-auto text-xs text-light-font02 dark:text-font02 flex justify-center items-center gap-x-1"
        >
          <ArrowPathIcon className="size-3" />
          Refresh
        </button>
      </div>
      {results && (
        <AppTable
          data={results}
          columns={columns}
          // loading={subjectsLoading === RequestState.LOADING}
          checkboxSelection
          // onSelect={handleSelect}
          pagination={{
            handlePagination: () => {},
            pageSize: 10,
            totalRecords: 2,
          }}
        />
      )}
    </div>
  );
};

export default ResultManagement;
