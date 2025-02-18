import AppButton from "@/components/AppButton";
import TabsManagement from "@/components/TabsManagement/TabsManagement";
import { ITab } from "@/utils/types";
import {
  Subjects,
  Semesters,
} from "@views/subjectsAndSemestersManagement/Tabs";
import SemesterDrawer from "./components/SemesterDrawer";
import { useState } from "react";
import SubjectDrawer from "./components/SubjectDrawer";

const SubjectsAndSemestersManagement = () => {
  const [subjectDrawerOpen, setSubjectDrawerOpen] = useState<boolean>(false);
  const [semesterDrawerOpen, setSemesterDrawerOpen] = useState<boolean>(false);
  const tabs: ITab[] = [
    {
      id: "subject",
      label: "Subject",
      content: <Subjects />,
      action: (
        <AppButton
          title="Add Subject"
          variant="fill"
          onClick={() => setSubjectDrawerOpen(true)}
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
          onClick={() => setSemesterDrawerOpen(true)}
        />
      ),
    },
  ];

  return (
    <div className="border border-light-borderGray dark:border-borderGray rounded-md h-full p-2 px-4">
      <TabsManagement tabs={tabs} />
      <SubjectDrawer open={subjectDrawerOpen} setOpen={setSubjectDrawerOpen} />
      <SemesterDrawer
        open={semesterDrawerOpen}
        setOpen={setSemesterDrawerOpen}
      />
    </div>
  );
};

export default SubjectsAndSemestersManagement;
