import { Field, Input, Select } from "@headlessui/react";
import { ChevronDownIcon } from "@radix-ui/themes";
import clsx from "clsx";
import { Drawer } from "rsuite";
import AppDivider from "@components/AppDivider";
import AppButton from "@components/AppButton";
import DrawerTitle from "@/components/DrawerTitle";
import { useAppDispatch, useAppSelector } from "@/slices/store";
import { addResult } from "@/slices/resultSlice";
import { RequestState } from "@/utils/enums";
import { useToast } from "@/context/ToastContext";
import ToastContainer from "@/components/ToastContainer";

interface ResultDrawerProps {
  open: boolean;
  setOpen: (val: boolean) => void;
}

const ResultDrawer = ({ open, setOpen }: ResultDrawerProps) => {
  const semesters = useAppSelector((state) => state.semester.semesters);
  const subjects = useAppSelector((state) => state.subject.subjects);
  const addResultStatus = useAppSelector((state) => state.result.createStatus);
  const dispatch = useAppDispatch();
  const { addToast } = useToast();

  const handleSubmit = async () => {
    const result = await dispatch(
      addResult({
        grade: "A",
        indexNumber: "18APC00001",
        subjectId: "67f37cd7ae2c746d43787c6c",
        semesterId: "67f495053a54bf4a2c0b2cd3",
      })
    );

    if (addResult.fulfilled.match(result)) {
      addToast({
        type: "success",
        message: "Result added successfully",
        id: "add-result-success",
      });
      return;
    }

    addToast({
      type: "error",
      message: "Error when adding result",
      id: "add-result-error",
    });
    console.log("Error when adding result");
  };

  return (
    <Drawer backdrop="static" open={open} onClose={() => setOpen(false)}>
      <Drawer.Header
        style={{ border: "none" }}
        className="bg-light-mainBg dark:bg-mainBg"
      >
        <DrawerTitle title="Add Results" />
      </Drawer.Header>
      <Drawer.Body
        className="flex flex-col bg-light-mainBg dark:bg-mainBg gap-y-4"
        style={{ paddingTop: 0, paddingLeft: 40, paddingRight: 40 }}
      >
        <div className="flex gap-x-2 justify-between">
          <Field className="w-1/2">
            <div className="relative">
              <Select
                className={clsx(
                  "ring-1 ring-inset appearance-none mt-1 block w-full rounded-md bg-light-subBg dark:bg-subBg dark:ring-borderGray ring-light-borderGray py-2.5 px-3 text-sm text-light-font01 dark:text-font01",
                  "focus:outline-none data-[focus]:outline-1 data-[focus]:-outline-offset-1 data-[focus]:outline-light-font01 dark:data-[focus]:outline-font01",
                  "*:text-black"
                )}
              >
                <option value=""> Select Semester</option>
                {semesters.map((item) => (
                  <option key={item.id} value={item.id}>
                    Year {item.year} Sem {item.sem}
                  </option>
                ))}
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
                  "ring-1 ring-inset appearance-none mt-1 block w-full rounded-md bg-light-subBg dark:bg-subBg dark:ring-borderGray ring-light-borderGray py-2.5 px-3 text-sm text-light-font01 dark:text-font01",
                  "focus:outline-none data-[focus]:outline-1 data-[focus]:-outline-offset-1 data-[focus]:outline-light-font01 dark:data-[focus]:outline-font01",
                  "*:text-black"
                )}
              >
                <option value="SUPER_ADMIN"> Select Subject</option>
                {subjects.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.name}
                  </option>
                ))}
              </Select>
              <ChevronDownIcon
                className="group pointer-events-none absolute top-4 right-2.5 size-2 fill-light-font02 dark:fill-font02"
                aria-hidden="true"
              />
            </div>
          </Field>
        </div>

        <div className="flex gap-x-2 justify-between">
          <Field className="w-1/2">
            <Input
              id="batchName"
              placeholder="Index Number"
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
                <option value="SUPER_ADMIN"> Select Grade</option>
                <option value="ADMIN">A</option>
                <option value="ADMIN">A+</option>
                <option value="ADMIN">A-</option>
                <option value="ADMIN">B</option>
                <option value="ADMIN">B+</option>
                <option value="ADMIN">B-</option>
              </Select>
              <ChevronDownIcon
                className="group pointer-events-none absolute top-4 right-2.5 size-2 fill-light-font02 dark:fill-font02"
                aria-hidden="true"
              />
            </div>
          </Field>
        </div>

        <AppButton
          title="Add Result"
          variant="fill"
          onClick={handleSubmit}
          className="ml-auto mt-auto"
          isLoading={addResultStatus === RequestState.LOADING}
        />

        <AppDivider label="Or" className="my-6" />

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

        <AppButton
          title="Add Results"
          variant="fill"
          onClick={() => {}}
          className="ml-auto mt-auto"
        />
      </Drawer.Body>
      <ToastContainer />
    </Drawer>
  );
};

export default ResultDrawer;
