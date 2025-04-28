import AppTable, { TableColumn } from "@/components/AppTable";
import { Semester } from "@/slices/semesterSlice";
import { useAppSelector } from "@/slices/store";
import { RequestState } from "@/utils/enums";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const Semesters = () => {
  const semestersLoading = useAppSelector((state) => state.semester.status);
  const semesters = useAppSelector((state) => state.semester.semesters);

  const columns: TableColumn<Semester>[] = [
    { key: "year", header: "Year" },
    { key: "sem", header: "Semester" },
    {
      key: "id",
      header: "Actions",
      render: (item: Semester) => (
        <div className="flex flex-row gap-x-4 w-fit">
          <PencilIcon
            // onClick={() => handleDeleteUser()}
            className="h-3 w-3 text-light-font01 dark:text-font01"
          />
          <button
          // onClick={() => showCustomPopup(item.id)}
          >
            <TrashIcon className="h-3 w-3 text-light-font01 dark:text-font01" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="border flex flex-col rounded-lg overflow-hidden border-light-borderGray dark:border-borderGray w-[330px] h-[300px]">
      {semesters && (
        <AppTable
          data={semesters}
          columns={columns}
          loading={semestersLoading === RequestState.LOADING}
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

export default Semesters;
