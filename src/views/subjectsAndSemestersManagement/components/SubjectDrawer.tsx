import { Field, Input, Select } from "@headlessui/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@radix-ui/themes";
import clsx from "clsx";
import { Drawer } from "rsuite";
import AppDivider from "@components/AppDivider";
import AppButton from "@components/AppButton";
import { useState } from "react";
import DrawerTitle from "@/components/DrawerTitle";
import { Subject } from "@/slices/subjectSlice";

interface SubjectDrawerProps {
  open: boolean;
  setOpen: (val: boolean) => void;
}

const SubjectDrawer = ({ open, setOpen }: SubjectDrawerProps) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [allSubjects, setAllSubjects] = useState<Subject[]>([
    {
      name: "",
      code: "",
      credit: "",
    },
  ]);

  const addAnotherSubject = () => {
    setIsValid(false);
    if (allSubjects.length >= 4) return;

    setAllSubjects((prev) => [
      ...prev,
      {
        name: "",
        code: "",
        credit: "",
      },
    ]);
  };

  const handleAddSubjects = () => {
    // Add
    console.log(allSubjects[0].credit.length);
  };

  const checkPreviousSubjectsFilled = (prev: Subject[]) => {
    for (const subject of prev) {
      if (subject.name.length == 0) {
        setIsValid(false);
        return false;
      }
      if (subject.code.length == 0) {
        setIsValid(false);
        return false;
      }
      if (subject.credit.length == 0) {
        setIsValid(false);
        return false;
      }
    }

    setIsValid(true);
  };

  return (
    <Drawer backdrop="static" open={open} onClose={() => setOpen(false)}>
      <Drawer.Header
        style={{ border: "none" }}
        className="bg-light-mainBg dark:bg-mainBg"
      >
        <DrawerTitle title="Add Subject" />
      </Drawer.Header>
      <Drawer.Body
        className="flex flex-col bg-light-mainBg dark:bg-mainBg gap-y-4"
        style={{ paddingTop: 0, paddingLeft: 40, paddingRight: 40 }}
      >
        {allSubjects.map((subject, index) => (
          <>
            <div className="flex gap-x-2 justify-between">
              <Field className="w-full">
                <Input
                  id="batchName"
                  placeholder="Subject Name"
                  type="text"
                  required
                  value={subject.name}
                  onChange={(e) => {
                    setAllSubjects((prev) => {
                      const newSubjects = [...prev];
                      newSubjects[index].name = e.target.value;
                      checkPreviousSubjectsFilled(newSubjects);
                      return newSubjects;
                    });
                  }}
                  className={clsx(
                    "ring-1 ring-inset block w-full rounded-md bg-light-subBg dark:bg-subBg dark:ring-borderGray ring-light-borderGray py-2.5 px-3 text-sm text-light-font01 dark:text-font01",
                    "focus:outline-none data-[focus]:outline-1 data-[focus]:-outline-offset-1 data-[focus]:outline-light-font01 dark:data-[focus]:outline-font01"
                  )}
                />
              </Field>
            </div>
            <div className="flex gap-x-2 justify-between">
              <Field className="w-1/2">
                <Input
                  id="batchName"
                  placeholder="Subject Code"
                  type="text"
                  required
                  value={subject.code}
                  onChange={(e) => {
                    setAllSubjects((prev) => {
                      const newSubjects = [...prev];
                      newSubjects[index].code = e.target.value;
                      checkPreviousSubjectsFilled(newSubjects);
                      return newSubjects;
                    });
                  }}
                  className={clsx(
                    "ring-1 ring-inset block w-full rounded-md bg-light-subBg dark:bg-subBg dark:ring-borderGray ring-light-borderGray py-2.5 px-3 text-sm text-light-font01 dark:text-font01",
                    "focus:outline-none data-[focus]:outline-1 data-[focus]:-outline-offset-1 data-[focus]:outline-light-font01 dark:data-[focus]:outline-font01"
                  )}
                />
              </Field>
              <Field className="w-1/2">
                <div className="relative">
                  <Select
                    id="credit"
                    name="credit"
                    value={subject.credit}
                    onChange={(e) => {
                      setAllSubjects((prev) => {
                        const newSubjects = [...prev];
                        newSubjects[index].credit = e.target.value;
                        checkPreviousSubjectsFilled(newSubjects);
                        return newSubjects;
                      });
                    }}
                    className={clsx(
                      "ring-1 ring-inset appearance-none block w-full rounded-md bg-light-subBg dark:bg-subBg dark:ring-borderGray ring-light-borderGray py-2.5 px-3 text-sm text-light-font01 dark:text-font01",
                      "focus:outline-none data-[focus]:outline-1 data-[focus]:-outline-offset-1 data-[focus]:outline-light-font01 dark:data-[focus]:outline-font01",
                      "*:text-black"
                    )}
                  >
                    <option value="SUPER_ADMIN">No of Credit</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                  </Select>
                  <ChevronDownIcon
                    className="group pointer-events-none absolute top-4 right-2.5 size-2 fill-light-font02 dark:fill-font02"
                    aria-hidden="true"
                  />
                </div>
              </Field>
            </div>

            {index !== allSubjects.length - 1 && (
              <AppDivider className="my-2" />
            )}
          </>
        ))}

        {allSubjects.length < 4 && isValid && (
          <AppDivider label="Add" onClick={addAnotherSubject} />
        )}

        <AppButton
          title="Add Subject"
          variant="fill"
          onClick={handleAddSubjects}
          className="ml-auto mt-auto"
        />
      </Drawer.Body>
    </Drawer>
  );
};

export default SubjectDrawer;
