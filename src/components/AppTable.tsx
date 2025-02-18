import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export interface TableColumn<T> {
  key?: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  onSelect?: (selectedItems: T[]) => void;
  pagination?: {
    handlePagination: (page: number) => void;
    pageSize: number;
    totalRecords: number;
  };
}

const AppTable = <T,>({
  data,
  columns,
  onSelect,
  pagination: { handlePagination, pageSize, totalRecords },
}: TableProps<T>) => {
  const [page, setPage] = useState<number>(1);
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(
    new Set()
  );

  const handleCheckboxChange = (item: T) => {
    const id = item["id"] as string;
    const newSelectedIds = new Set(selectedIds);

    if (newSelectedIds.has(id)) {
      newSelectedIds.delete(id);
    } else {
      newSelectedIds.add(id);
    }

    setSelectedIds(newSelectedIds);

    if (onSelect) {
      const selectedItems = data.filter((item) =>
        newSelectedIds.has(item["id"] as string)
      );
      onSelect(selectedItems);
    }
  };

  const handleSelectAll = () => {
    const allIds = data.map((item) => item["id"] as string);

    if (selectedIds.size === data.length) {
      setSelectedIds(new Set());
      if (onSelect) onSelect([]);
    } else {
      setSelectedIds(new Set(allIds));
      if (onSelect) onSelect(data);
    }
  };

  const handleNextPage = (nextPage: number) => {
    setPage(nextPage);
    if (handlePagination) handlePagination(nextPage);
  };

  const handlePrevPage = (prevPage: number) => {
    setPage(prevPage);
    if (handlePagination) handlePagination(prevPage);
  };

  const isAllSelected = selectedIds.size === data.length;
  return (
    <div className="flex flex-col h-full">
      <table className="w-full text-xs text-left rtl:text-right rounded-lg">
        <thead>
          <tr className="border-b border-light-borderGray dark:border-borderGray text-light-font02 dark:text-font02">
            <th scope="col" className="pl-2">
              <div className="flex items-center">
                <input
                  id="link-checkbox"
                  type="checkbox"
                  value=""
                  className="w-[14px] h-[14px]"
                  onClick={handleSelectAll}
                  checked={isAllSelected}
                />
              </div>
            </th>
            <th scope="col" className="">
              Id
            </th>
            {columns.map((column) => (
              <th scope="col" className="py-2" key={String(column.key)}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            const id = item["id"] as string;

            return (
              <tr
                key={index}
                className="border-light-borderGray dark:border-borderGray"
              >
                <td className="pl-2">
                  <div className="flex items-center">
                    <input
                      id="link-checkbox"
                      type="checkbox"
                      value=""
                      className="w-[14px] h-[14px]"
                      checked={selectedIds.has(id)}
                      onClick={() => handleCheckboxChange(item)}
                    />
                  </div>
                </td>
                <td className="">{index + 1}</td>
                {columns.map((column) => (
                  <td className="py-2" key={String(column.key)}>
                    {column.render
                      ? column.render(item)
                      : (item[column.key as keyof T] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-between items-center py-3 bg-light-subBg dark:bg-subBg mt-auto">
        <span className="text-light-font01 text-xs dark:text-font01 pl-3">
          {selectedIds.size} rows selected
        </span>
        <span className="text-light-font01 text-xs dark:text-font01 ml-auto mr-4">
          Page {page} of {Math.ceil(totalRecords / pageSize)}
        </span>
        <div className="flex justify-end gap-x-4 flex-row pr-2">
          <button
            className="border border-light-borderGray dark:border-borderGray p-1 rounded-md"
            onClick={() => handlePrevPage(page - 1)}
            disabled={page === 1}
          >
            <ChevronLeftIcon className="h-3 w-3 text-light-font01 dark:text-font01" />
          </button>
          <button
            className="border border-light-borderGray dark:border-borderGray p-1 rounded-md"
            onClick={() => handleNextPage(page + 1)}
            disabled={data.length < pageSize}
          >
            <ChevronRightIcon className="h-3 w-3 text-light-font01 dark:text-font01" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppTable;
