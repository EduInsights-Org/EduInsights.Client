import { Field, Input, Select } from "@headlessui/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@radix-ui/themes";
import clsx from "clsx";
import { Drawer } from "rsuite";
import AppButton from "@components/AppButton";

interface SemesterDrawerProps {
  open: boolean;
  setOpen: (val: boolean) => void;
}

const SemesterDrawer = ({ open, setOpen }: SemesterDrawerProps) => {
  return (
    <Drawer backdrop="static" open={open} onClose={() => setOpen(false)}>
      <Drawer.Header
        style={{ border: "none" }}
        className="bg-light-mainBg dark:bg-mainBg"
      >
        <div className="flex justify-between items-center w-full">
          <Drawer.Title
            style={{ fontSize: "18px", fontWeight: "700" }}
            className="text-lg font-bold text-light-font01 dark:text-font01"
          >
            Add Semester
          </Drawer.Title>

          {true === null && (
            <span className="flex items-center gap-x-2 px-4 py-2 text-xs font-medium rounded-sm text-[#bd5622] dark:text-[#df985d] bg-[#fdf0d9] dark:bg-[#301f13]">
              <InformationCircleIcon className="h-4" />
              Please Select a Batch before adding Users
            </span>
          )}
        </div>
      </Drawer.Header>
      <Drawer.Body
        className="flex flex-col bg-light-mainBg dark:bg-mainBg"
        style={{ paddingTop: 0, paddingLeft: 40, paddingRight: 40 }}
      >
        <div className="flex gap-x-2 justify-between">
          <Field className="w-1/2">
            <div className="relative">
              <Select
                className={clsx(
                  "ring-1 ring-inset appearance-none block w-full rounded-md bg-light-subBg dark:bg-subBg dark:ring-borderGray ring-light-borderGray py-2.5 px-3 text-sm text-light-font01 dark:text-font01",
                  "focus:outline-none data-[focus]:outline-1 data-[focus]:-outline-offset-1 data-[focus]:outline-light-font01 dark:data-[focus]:outline-font01",
                  "*:text-black"
                )}
              >
                <option value="SUPER_ADMIN"> Select Year</option>
                <option value="ADMIN">Year I</option>
                <option value="ADMIN">Year II</option>
                <option value="ADMIN">Year III</option>
                <option value="ADMIN">Year IV</option>
                <option value="ADMIN">Year V</option>
              </Select>
              <ChevronDownIcon
                className="group pointer-events-none absolute top-4 right-2.5 size-2 fill-light-font02 dark:fill-font02"
                aria-hidden="true"
              />
            </div>
          </Field>
          <Field className="w-1/2">
            <div className="relative">
              <Select
                className={clsx(
                  "ring-1 ring-inset appearance-none block w-full rounded-md bg-light-subBg dark:bg-subBg dark:ring-borderGray ring-light-borderGray py-2.5 px-3 text-sm text-light-font01 dark:text-font01",
                  "focus:outline-none data-[focus]:outline-1 data-[focus]:-outline-offset-1 data-[focus]:outline-light-font01 dark:data-[focus]:outline-font01",
                  "*:text-black"
                )}
              >
                <option value="SUPER_ADMIN"> Select Semester</option>
                <option value="ADMIN">Semester I</option>
                <option value="ADMIN">Semester II</option>
              </Select>
              <ChevronDownIcon
                className="group pointer-events-none absolute top-4 right-2.5 size-2 fill-light-font02 dark:fill-font02"
                aria-hidden="true"
              />
            </div>
          </Field>
        </div>

        <AppButton
          title="Add Semester"
          variant="fill"
          onClick={() => {}}
          className="ml-auto mt-auto"
        />
      </Drawer.Body>
    </Drawer>
  );
};

export default SemesterDrawer;
