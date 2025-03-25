import { Field, Input, Select } from "@headlessui/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@radix-ui/themes";
import clsx from "clsx";
import { Drawer } from "rsuite";
import AppDivider from "@components/AppDivider";
import AppButton from "@components/AppButton";

interface SubjectDrawerProps {
  open: boolean;
  setOpen: (val: boolean) => void;
}

const SubjectDrawer = ({ open, setOpen }: SubjectDrawerProps) => {
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
            Add Subject
          </Drawer.Title>

          {true === null && (
            <span className="flex items-center gap-x-2 px-4 py-2 text-xs font-medium rounded-sm text-[#bd5622] dark:text-[#df985d] bg-[#fdf0d9] dark:bg-[#301f13]">
              <InformationCircleIcon className="h-4" />
              Please Select a Batch before adding Subjects
            </span>
          )}
        </div>
      </Drawer.Header>
      <Drawer.Body
        className="flex flex-col bg-light-mainBg dark:bg-mainBg gap-y-4"
        style={{ paddingTop: 0, paddingLeft: 40, paddingRight: 40 }}
      >
        <div className="flex gap-x-2 justify-between">
          <Field className="w-full">
            <Input
              id="batchName"
              placeholder="Subject Name"
              type="text"
              required
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
              className={clsx(
                "ring-1 ring-inset block w-full rounded-md bg-light-subBg dark:bg-subBg dark:ring-borderGray ring-light-borderGray py-2.5 px-3 text-sm text-light-font01 dark:text-font01",
                "focus:outline-none data-[focus]:outline-1 data-[focus]:-outline-offset-1 data-[focus]:outline-light-font01 dark:data-[focus]:outline-font01"
              )}
            />
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
                <option value="SUPER_ADMIN"> No of Credit</option>
                <option value="ADMIN">0</option>
                <option value="ADMIN">1</option>
                <option value="ADMIN">2</option>
                <option value="ADMIN">3</option>
                <option value="ADMIN">4</option>
                <option value="ADMIN">5</option>
                <option value="ADMIN">6</option>
                <option value="ADMIN">7</option>
                <option value="ADMIN">8</option>
              </Select>
              <ChevronDownIcon
                className="group pointer-events-none absolute top-4 right-2.5 size-2 fill-light-font02 dark:fill-font02"
                aria-hidden="true"
              />
            </div>
          </Field>
        </div>

        <AppDivider label="Add" onClick={() => alert("div")} />

        <AppButton
          title="Add Subject"
          variant="fill"
          onClick={() => {}}
          className="ml-auto mt-auto"
        />
      </Drawer.Body>
    </Drawer>
  );
};

export default SubjectDrawer;
