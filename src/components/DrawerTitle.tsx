import { useAppSelector } from "@/slices/store";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Drawer } from "rsuite";

interface DrawerTitleProps {
  title:
    | "Add Semester"
    | "Add Subject"
    | "Add Batch"
    | "Add User"
    | "Add Results";
}

const DrawerTitle = ({ title }: DrawerTitleProps) => {
  const isBatchSelected = useAppSelector((state) => state.batch.selectedBatchId)
    ? true
    : false;

  return (
    <div className="flex justify-between items-center w-full">
      <Drawer.Title
        style={{ fontSize: "18px", fontWeight: "700" }}
        className="text-lg font-bold text-light-font01 dark:text-font01"
      >
        {title}
      </Drawer.Title>

      {!isBatchSelected && (
        <span className="flex items-center gap-x-2 px-4 py-2 text-xs font-medium rounded-sm text-[#bd5622] dark:text-[#df985d] bg-[#fdf0d9] dark:bg-[#301f13]">
          <InformationCircleIcon className="h-4" />
          Please Select a Batch before adding Users
        </span>
      )}
    </div>
  );
};

export default DrawerTitle;
