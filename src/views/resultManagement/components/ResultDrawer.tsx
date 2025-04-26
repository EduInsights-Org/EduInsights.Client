import { Field, Input, Select } from "@headlessui/react";
import { ChevronDownIcon } from "@radix-ui/themes";
import clsx from "clsx";
import { Drawer } from "rsuite";
import AppDivider from "@components/AppDivider";
import AppButton from "@components/AppButton";
import DrawerTitle from "@/components/DrawerTitle";
import { useAppDispatch, useAppSelector } from "@/slices/store";
import { addResult, CreateResultPayload } from "@/slices/resultSlice";
import { RequestState } from "@/utils/enums";
import { useToast } from "@/context/ToastContext";
import ToastContainer from "@/components/ToastContainer";
import useCSV, { CSVConfig } from "@/hooks/useCSV";
import AppDragDropArea from "@/components/AppDragDropArea";
import { useState } from "react";

interface ResultDrawerProps {
  open: boolean;
  setOpen: (val: boolean) => void;
}
interface ResultCSVConfig {
  indexNumber: string;
  grade: string;
  semesterId?: string;
  subjectId?: string;
  instituteId: string;
}

const ResultDrawer = ({ open, setOpen }: ResultDrawerProps) => {
  const semesters = useAppSelector((state) => state.semester.semesters);
  const subjects = useAppSelector((state) => state.subject.subjects);
  const instituteId = useAppSelector((state) => state.institute.institute.id);
  const addResultStatus = useAppSelector((state) => state.result.createStatus);
  const dispatch = useAppDispatch();
  const { addToast } = useToast();

  const [semester, setSemester] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [grade, setGrade] = useState<string>("");
  const [indexNumber, setIndexNumber] = useState<string>("");

  const userCSVConfig: CSVConfig<ResultCSVConfig> = {
    headers: {
      indexNumber: "indexNumber",
      grade: "grade",
      semesterId: "",
      subjectId: "",
      instituteId: "",
    },
    requiredHeaders: ["indexNumber", "grade"],
    defaultValues: {
      semesterId: semester,
      subjectId: subject,
      instituteId: instituteId,
    },
  };

  const {
    parsedData,
    error: csvFileError,
    fileName,
    handleCSVSelect,
    resetCSVFile,
  } = useCSV<CreateResultPayload>(userCSVConfig);

  const handleSubmit = async () => {
    const result = await dispatch(
      addResult({
        grade: grade,
        indexNumber: indexNumber,
        subjectId: subject,
        semesterId: semester,
        instituteId: instituteId,
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
          {/* semester */}
          <Field className="w-1/2">
            <div className="relative">
              <Select
                className={clsx(
                  "ring-1 ring-inset appearance-none mt-1 block w-full rounded-md bg-light-subBg dark:bg-subBg dark:ring-borderGray ring-light-borderGray py-2.5 px-3 text-sm text-light-font01 dark:text-font01",
                  "focus:outline-none data-[focus]:outline-1 data-[focus]:-outline-offset-1 data-[focus]:outline-light-font01 dark:data-[focus]:outline-font01",
                  "*:text-black"
                )}
                onChange={(e) => setSemester(e.target.value)}
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

          {/* subject */}
          <Field className="w-1/2">
            <div className="relative">
              <Select
                className={clsx(
                  "ring-1 ring-inset appearance-none mt-1 block w-full rounded-md bg-light-subBg dark:bg-subBg dark:ring-borderGray ring-light-borderGray py-2.5 px-3 text-sm text-light-font01 dark:text-font01",
                  "focus:outline-none data-[focus]:outline-1 data-[focus]:-outline-offset-1 data-[focus]:outline-light-font01 dark:data-[focus]:outline-font01",
                  "*:text-black"
                )}
                onChange={(e) => setSubject(e.target.value)}
              >
                <option value="">Select Subject</option>
                {subjects.map((item) => (
                  <option key={item.code} value={item.id}>
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
          {/* indexNumber */}
          <Field className="w-1/2">
            <Input
              id="indexNumber"
              placeholder="Index Number"
              type="text"
              required
              className={clsx(
                "ring-1 ring-inset block w-full rounded-md bg-light-subBg dark:bg-subBg dark:ring-borderGray ring-light-borderGray py-2.5 px-3 text-sm text-light-font01 dark:text-font01",
                "focus:outline-none data-[focus]:outline-1 data-[focus]:-outline-offset-1 data-[focus]:outline-light-font01 dark:data-[focus]:outline-font01"
              )}
              onChange={(e) => setIndexNumber(e.target.value)}
            />
          </Field>

          {/* grade */}
          <Field className="w-1/2">
            <div className="relative">
              <Select
                className={clsx(
                  "ring-1 ring-inset appearance-none block w-full rounded-md bg-light-subBg dark:bg-subBg dark:ring-borderGray ring-light-borderGray py-2.5 px-3 text-sm text-light-font01 dark:text-font01",
                  "focus:outline-none data-[focus]:outline-1 data-[focus]:-outline-offset-1 data-[focus]:outline-light-font01 dark:data-[focus]:outline-font01",
                  "*:text-black"
                )}
                onChange={(e) => setGrade(e.target.value)}
              >
                <option value=""> Select Grade</option>
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="A-">A-</option>
                <option value="B+">B</option>
                <option value="B">B+</option>
                <option value="B-">B-</option>
                <option value="C+">C+</option>
                <option value="C">C</option>
                <option value="C-">C-</option>
                <option value="D+">D+</option>
                <option value="D">D</option>
                <option value="D-">D-</option>
                <option value="E">E</option>
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

        <AppDivider label="Or" className="mb-4 mt-6" />

        <div className="flex gap-x-2 justify-between mb-1">
          {/* semester */}
          <Field className="w-1/2">
            <div className="relative">
              <Select
                className={clsx(
                  "ring-1 ring-inset appearance-none mt-1 block w-full rounded-md bg-light-subBg dark:bg-subBg dark:ring-borderGray ring-light-borderGray py-2.5 px-3 text-sm text-light-font01 dark:text-font01",
                  "focus:outline-none data-[focus]:outline-1 data-[focus]:-outline-offset-1 data-[focus]:outline-light-font01 dark:data-[focus]:outline-font01",
                  "*:text-black"
                )}
                onChange={(e) => setSemester(e.target.value)}
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

          {/* subject */}
          <Field className="w-1/2">
            <div className="relative">
              <Select
                className={clsx(
                  "ring-1 ring-inset appearance-none mt-1 block w-full rounded-md bg-light-subBg dark:bg-subBg dark:ring-borderGray ring-light-borderGray py-2.5 px-3 text-sm text-light-font01 dark:text-font01",
                  "focus:outline-none data-[focus]:outline-1 data-[focus]:-outline-offset-1 data-[focus]:outline-light-font01 dark:data-[focus]:outline-font01",
                  "*:text-black"
                )}
                onChange={(e) => setSubject(e.target.value)}
              >
                <option value="">Select Subject</option>
                {subjects.map((item) => (
                  <option key={item.code} value={item.id}>
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

        <AppDragDropArea
          csvFileError={csvFileError}
          dataList={parsedData}
          fileName={fileName}
          handleCSVSelect={handleCSVSelect}
          resetCSVFile={resetCSVFile}
        />

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
