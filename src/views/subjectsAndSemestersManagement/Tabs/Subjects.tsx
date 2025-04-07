import AppTable, { TableColumn } from "@/components/AppTable";
import { useAppDispatch, useAppSelector } from "@/slices/store";
import { getSubjects, Subject } from "@/slices/subjectSlice";
import { RequestState } from "@/utils/enums";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

const Subjects = () => {
  const dispatch = useAppDispatch();
  const subjects = useAppSelector(
    (state) => state.subject.paginatedResponse.data
  );
  const subjectsLoading = useAppSelector((state) => state.subject.status);

  const columns: TableColumn<Subject>[] = [
    { key: "code", header: "Code" },
    { key: "name", header: "Name" },
    { key: "credit", header: "Credit" },
    {
      key: "id",
      header: "Actions",
      render: (item: Subject) => (
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

  useEffect(() => {
    dispatch(getSubjects({}));
  }, []);
  return (
    <div className="border flex flex-col rounded-lg overflow-hidden border-light-borderGray dark:border-borderGray w-[500px] h-[500px]">
      {subjects && (
        <AppTable
          data={subjects}
          columns={columns}
          loading={subjectsLoading === RequestState.LOADING}
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

export default Subjects;
