import { Field, Select } from "@headlessui/react";
import { ChevronDownIcon } from "@radix-ui/themes";
import clsx from "clsx";
import { Drawer } from "rsuite";
import AppButton from "@components/AppButton";
import DrawerTitle from "@/components/DrawerTitle";
import { createSemester, Semester } from "@/slices/semesterSlice";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/slices/store";
import { useToast } from "@/context/ToastContext";
import { SemesterType, YearType } from "@/utils/enums";
import ToastContainer from "@/components/ToastContainer";

interface SemesterDrawerProps {
  open: boolean;
  setOpen: (val: boolean) => void;
}

const SemesterDrawer = ({ open, setOpen }: SemesterDrawerProps) => {
  const dispatch = useAppDispatch();
  const instituteId = useAppSelector((state) => state.institute.institute.id);
  const { addToast } = useToast();
  const [formData, setFormData] = useState<Semester>({
    year: "",
    sem: "",
    instituteId: instituteId,
  });

  const onSubmitSemester = async () => {
    const result = await dispatch(createSemester(formData));

    if (createSemester.fulfilled.match(result)) {
      addToast({
        id: "1",
        message: "Successfully added",
        type: "success",
        duration: 50000,
        swipeDirection: "right",
      });
      resetStates();

      return;
    }

    addToast({
      id: "1",
      message: "Error when adding semester",
      type: "error",
      duration: 50000,
      swipeDirection: "right",
    });
    resetStates();
  };

  const resetStates = () => {
    setFormData({
      year: "",
      sem: "",
      instituteId: instituteId,
    });
  };

  return (
    <Drawer backdrop="static" open={open} onClose={() => setOpen(false)}>
      <Drawer.Header
        style={{ border: "none" }}
        className="bg-light-mainBg dark:bg-mainBg"
      >
        <DrawerTitle title="Add Semester" />
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
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    year: e.target.value,
                  }));
                }}
                value={formData.year}
                required
                name="year"
                id="year"
              >
                <option value=""> Select Year</option>
                <option value={YearType.I}>Year {YearType.I}</option>
                <option value={YearType.II}>Year {YearType.II}</option>
                <option value={YearType.III}>Year {YearType.III}</option>
                <option value={YearType.IV}>Year {YearType.IV}</option>
                <option value={YearType.V}>Year {YearType.V}</option>
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
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    sem: e.target.value,
                  }));
                }}
                value={formData.sem}
                required
                name="sem"
                id="sem"
              >
                <option value="">Select Semester</option>
                <option value={SemesterType.I}>
                  Semester {SemesterType.I}
                </option>
                <option value={SemesterType.II}>
                  Semester {SemesterType.II}
                </option>
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
          onClick={onSubmitSemester}
          className="ml-auto mt-auto"
        />
        <ToastContainer />
      </Drawer.Body>
    </Drawer>
  );
};

export default SemesterDrawer;
