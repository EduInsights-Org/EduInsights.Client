import { Field, Label, Input, Select } from "@headlessui/react";
import { CheckIcon, ExclamationCircleIcon } from "@heroicons/react/16/solid";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@radix-ui/themes";
import clsx from "clsx";
import { Drawer } from "rsuite";

interface ResultDrawerProps {
  open: boolean;
  setOpen: (val: boolean) => void;
}

const ResultDrawer = ({ open, setOpen }: ResultDrawerProps) => {
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
            Add Results
          </Drawer.Title>

          <button
            onClick={() => setOpen(false)}
            className="p-2 bg-primaryLight rounded-full hover:bg-primaryDark"
          >
            <CheckIcon className="h-5 w-5 text-white" />
          </button>
        </div>
      </Drawer.Header>
      <Drawer.Body
        className="bg-light-mainBg dark:bg-mainBg"
        style={{ paddingTop: 0, paddingLeft: 40, paddingRight: 40 }}
      >
        <div className="flex gap-x-2 justify-between">
          <Field className="w-full">
            <Label className="text-xs font-light text-light-font02 dark:text-font02">
              First Name
            </Label>
            <Input
              // onChange={(e) => setUser(e.target.value)}
              // value={user}
              id="username"
              type="text"
              required
              className={clsx(
                "ring-1 ring-inset mt-1 mb-3 block w-full rounded-md bg-light-subBg dark:bg-subBg dark:ring-borderGray ring-light-borderGray py-2.5 px-3 text-sm text-light-font01 dark:text-font01",
                "focus:outline-none data-[focus]:outline-1 data-[focus]:-outline-offset-1 data-[focus]:outline-light-font01 dark:data-[focus]:outline-font01"
              )}
            />
          </Field>
          <Field className="w-full">
            <Label className="text-xs font-light text-light-font02 dark:text-font02">
              Last Name
            </Label>
            <Input
              // onChange={(e) => setUser(e.target.value)}
              // value={user}
              id="username"
              type="text"
              required
              className={clsx(
                "ring-1 ring-inset mt-1 mb-3 block w-full rounded-md bg-light-subBg dark:bg-subBg dark:ring-borderGray ring-light-borderGray py-2.5 px-3 text-sm text-light-font01 dark:text-font01",
                "focus:outline-none data-[focus]:outline-1 data-[focus]:-outline-offset-1 data-[focus]:outline-light-font01 dark:data-[focus]:outline-font01"
              )}
            />
          </Field>
        </div>

        <div className="flex gap-x-2 justify-between">
          <Field className="w-full">
            <Label className="text-xs font-light text-light-font02 dark:text-font02">
              User Name
            </Label>
            <Input
              // onChange={(e) => setUser(e.target.value)}
              // value={user}
              id="username"
              type="text"
              required
              className={clsx(
                "ring-1 ring-inset mt-1 mb-3 block w-full rounded-md bg-light-subBg dark:bg-subBg dark:ring-borderGray ring-light-borderGray py-2.5 px-3 text-sm text-light-font01 dark:text-font01",
                "focus:outline-none data-[focus]:outline-1 data-[focus]:-outline-offset-1 data-[focus]:outline-light-font01 dark:data-[focus]:outline-font01"
              )}
            />
          </Field>
          <Field className="w-full">
            <Label className="text-xs font-light text-light-font02 dark:text-font02">
              Index Number
            </Label>
            <Input
              // onChange={(e) => setUser(e.target.value)}
              // value={user}
              id="username"
              type="text"
              required
              className={clsx(
                "ring-1 ring-inset mt-1 mb-3 block w-full rounded-md bg-light-subBg dark:bg-subBg dark:ring-borderGray ring-light-borderGray py-2.5 px-3 text-sm text-light-font01 dark:text-font01",
                "focus:outline-none data-[focus]:outline-1 data-[focus]:-outline-offset-1 data-[focus]:outline-light-font01 dark:data-[focus]:outline-font01"
              )}
            />
          </Field>
        </div>

        <div className="flex gap-x-2 justify-between">
          <Field className="w-full">
            <Label className="text-xs font-light text-light-font02 dark:text-font02">
              Email
            </Label>
            <Input
              // onChange={(e) => setUser(e.target.value)}
              // value={user}
              id="username"
              type="text"
              required
              className={clsx(
                "ring-1 ring-inset mt-1 block w-full rounded-md bg-light-subBg dark:bg-subBg dark:ring-borderGray ring-light-borderGray py-2.5 px-3 text-sm text-light-font01 dark:text-font01",
                "focus:outline-none data-[focus]:outline-1 data-[focus]:-outline-offset-1 data-[focus]:outline-light-font01 dark:data-[focus]:outline-font01"
              )}
            />
          </Field>
          <Field className="w-full">
            <Label className="text-xs font-light text-light-font02 dark:text-font02">
              Role
            </Label>
            <div className="relative">
              <Select
                className={clsx(
                  "ring-1 ring-inset appearance-none mt-1 block w-full rounded-md bg-light-subBg dark:bg-subBg dark:ring-borderGray ring-light-borderGray py-2.5 px-3 text-sm text-light-font01 dark:text-font01",
                  "focus:outline-none data-[focus]:outline-1 data-[focus]:-outline-offset-1 data-[focus]:outline-light-font01 dark:data-[focus]:outline-font01",
                  // Make the text of each option black on Windows
                  "*:text-black"
                )}
              >
                <option value="Student">Student</option>
                <option value="super_admin">Super admin</option>
                <option value="admin">Admin</option>
                <option value="data_entry">Data entry</option>
              </Select>
              <ChevronDownIcon
                className="group pointer-events-none absolute top-4 right-2.5 size-2 fill-light-font02 dark:fill-font02"
                aria-hidden="true"
              />
            </div>
          </Field>
        </div>

        <div className="h-[1px] bg-light-borderGray dark:bg-borderGray my-8" />

        <div className="flex gap-x-2 justify-between">
          <label
            form="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-56 border-[1.8px] border-light-borderGray dark:border-borderGray border-dashed rounded-md cursor-pointer bg-light-subBg dark:bg-subBg hover:bg-light-mainBg dark:hover:bg-mainBg"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-2 text-light-font02 dark:text-font02"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="text-sm text-light-font02 dark:text-font02">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-light-font02 dark:text-font02">
                CSV file
              </p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>

        <div className="flex items-center gap-x-2 mt-6 border rounded-md bg-[#e9f6eb] dark:bg-[#192d23] border-[#45855f] dark:border-[#59aa77] px-2 py-4">
          <CheckCircleIcon className="h-10 w-10 dark:text-[#59aa77] text-[#45855f]" />
          <div className="flex flex-col gap-y-1">
            <span className="text-sm font-semibold leading-none dark:text-[#59aa77] text-[#45855f]">
              Document Name.csv
            </span>
            <span className="flex gap-x-2 items-center text-xs leading-none dark:text-[#59aa77] text-[#45855f]">
              Ready to save
            </span>
          </div>
        </div>

        <div className="flex items-center gap-x-2 mt-6 border rounded-md bg-[#fdf0d9] dark:bg-[#301f13] dark:border-[#df985d] border-[#bd5622] px-2 py-4">
          <ExclamationCircleIcon className="h-10 w-10 text-[#bd5622] dark:text-[#df985d]" />
          <div className="flex flex-col gap-y-1">
            <span className="text-sm font-semibold leading-none text-[#bd5622] dark:text-[#df985d]">
              Document Name.csv
            </span>
            <span className="flex gap-x-2 items-center text-xs leading-none text-[#bd5622] dark:text-[#df985d]">
              Invalid data found
            </span>
          </div>
        </div>
      </Drawer.Body>
    </Drawer>
  );
};

export default ResultDrawer;
