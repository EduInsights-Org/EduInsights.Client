import TabsManagement from "@/components/TabsManagement/TabsManagement";
import { ITab } from "@/utils/types";
import {
  Subjects,
  Semesters,
} from "@views/subjectsAndSemestersManagement/Tabs";

const SubjectsAndSemestersManagement = () => {
  const tabs: ITab[] = [
    {
      id: "subject",
      label: "Subject",
      content: <Subjects />,
      action: (
        <button
          className="p-2 bg-black dark:bg-white hover:dark:bg-white/90 rounded-sm px-3 py-3 w-28 h-8 flex items-center justify-center hover:bg-black/90 text-xs font-medium leading-none text-white dark:text-black"
          onClick={() => alert("Subject action button clicked!")}
        >
          Add Subject
        </button>
      ),
    },
    {
      id: "semester",
      label: "Semester",
      content: <Semesters />,
      action: (
        <button
          className="p-2 bg-black dark:bg-white hover:dark:bg-white/90 rounded-sm px-3 py-3 w-28 h-8 flex items-center justify-center hover:bg-black/90 text-xs font-medium leading-none text-white dark:text-black"
          onClick={() => alert("Subject action button clicked!")}
        >
          Add Semesters
        </button>
      ),
    },
  ];

  return (
    <div className="border border-light-borderGray dark:border-borderGray rounded-md h-full p-2 px-4">
      <TabsManagement tabs={tabs} />
    </div>
  );
};

export default SubjectsAndSemestersManagement;
