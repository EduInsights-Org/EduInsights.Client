import AppButton from "@/components/AppButton";
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
        <AppButton
          title="Add Subject"
          variant="fill"
          onClick={() => console.log("Arun")}
        />
      ),
    },
    {
      id: "semester",
      label: "Semester",
      content: <Semesters />,
      action: (
        <AppButton
          title="Add Semester"
          variant="fill"
          onClick={() => console.log("Arun")}
        />
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
