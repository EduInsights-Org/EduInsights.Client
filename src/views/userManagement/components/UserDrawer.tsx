import { Field, Label, Input, Select } from "@headlessui/react";
import { ChevronDownIcon } from "@radix-ui/themes";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "@slices/store";
import {
  addMultipleUsers,
  addUser,
  AddUsersResponse,
  CreateUserPayload,
} from "@slices/userSlice";
import { useToast } from "@context/ToastContext";
import ToastContainer from "@components/ToastContainer";
import { RequestState, Role } from "@utils/enums";
import useCSV, { CSVConfig } from "@hooks/useCSV";
import { useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Drawer } from "rsuite";
import AppButton from "@components/AppButton";
import AppDivider from "@components/AppDivider";
import AppDragDropArea from "@/components/AppDragDropArea";

interface UserDrawerProps {
  open: boolean;
  setOpen: (val: boolean) => void;
}

const UserDrawer = ({ open, setOpen }: UserDrawerProps) => {
  interface UserData {
    firstName: string;
    lastName: string;
    indexNumber: string;
    email: string;
    role: string;
    instituteId: string;
    batchId: string;
    password: string;
  }

  const { addToast } = useToast();
  const dispatch = useAppDispatch();
  const addUserStatus = useAppSelector((state) => state.user.addUserStatus);
  const addMultipleUsersStatus = useAppSelector(
    (state) => state.user.addMultipleUsersStatus
  );
  const instituteId = useAppSelector((state) => state.institute.institute!.id);
  const batchId = useAppSelector((state) => state.batch.selectedBatchId!);

  const [userName, setUserName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [indexNumber, setIndexNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<Role>(Role.Student);

  const [errors, setErrors] = useState({
    userName: false,
    firstName: false,
    lastName: false,
    indexNumber: false,
    email: false,
  });

  const userCSVConfig: CSVConfig<UserData> = {
    headers: {
      firstName: "firstName",
      lastName: "lastName",
      indexNumber: "indexNumber",
      email: "email",
      role: "role",
      instituteId: "instituteId",
      batchId: "batchId",
      password: "password",
    },
    requiredHeaders: ["firstName", "lastName", "email", "role"],
    defaultValues: {
      password: "123321",
      instituteId: instituteId,
      batchId: batchId,
    },
    validateRow: (row) => {
      return row.email.includes("@");
    },
  };

  const {
    parsedData: usersList,
    error: csvFileError,
    fileName,
    handleCSVSelect,
    resetCSVFile,
  } = useCSV<UserData>(userCSVConfig);

  const handleCreateUsers = () => {
    if (!usersList) return;
    dispatch(addMultipleUsers(usersList)).then((result) => {
      const responseMessage = result.payload.data as AddUsersResponse;
      const isAllAreSuccessfullyAdded: boolean =
        responseMessage.existingUsers.length === 0 &&
        responseMessage.invalidUsers.length === 0 &&
        responseMessage.addedUsers.length > 0;

      const invalidM =
        responseMessage.invalidUsers.length > 0
          ? `Invalid users (${responseMessage.invalidUsers.length})`
          : "";

      const existingMe =
        responseMessage.existingUsers.length > 0
          ? `Existing users (${responseMessage.existingUsers.length})`
          : "";

      const successM =
        responseMessage.addedUsers.length > 0
          ? `Successfully added users (${responseMessage.addedUsers.length})`
          : "";

      const warningMessage = `${invalidM} ${
        existingMe.length > 0 && invalidM.length > 0 ? "|" : ""
      } ${existingMe} ${
        successM.length > 0 && existingMe.length > 0 ? "|" : ""
      } ${successM}`;

      addToast({
        id: "1",
        message: isAllAreSuccessfullyAdded
          ? `Successfully added ${responseMessage.addedUsers.length} users`
          : warningMessage,
        type: isAllAreSuccessfullyAdded ? "success" : "warning",
        duration: 50000,
        swipeDirection: "right",
      });
    });
  };

  const handleCreateUser = () => {
    if (!checkValidation()) return;
    const user: CreateUserPayload = {
      firstName,
      lastName,
      indexNumber,
      email,
      instituteId,
      batchId,
      password: "123321",
      role,
    };
    dispatch(addUser(user)).then((result) => {
      const isResponseSuccess = result.payload.success as boolean;
      const responseMessage = result.payload.message as string;
      addToast({
        id: "1",
        message: responseMessage,
        type: isResponseSuccess ? "success" : "warning",
        duration: 5000,
        swipeDirection: "right",
      });

      isResponseSuccess && resetFields();
    });
  };

  const checkValidation = (): boolean => {
    const newErrors = {
      userName: userName.trim().length === 0,
      firstName: firstName.trim().length === 0,
      lastName: lastName.trim().length === 0,
      indexNumber: indexNumber.trim().length === 0,
      email: email.trim().length === 0,
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((hasError) => hasError);
  };

  const resetFields = () => {
    setUserName("");
    setFirstName("");
    setLastName("");
    setIndexNumber("");
    setEmail("");
    setRole(Role.Student);
    setErrors({
      userName: false,
      firstName: false,
      lastName: false,
      indexNumber: false,
      email: false,
    });
  };

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
            Add Users
          </Drawer.Title>

          {batchId === null && (
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
          <Field className="w-full">
            <Label className="text-xs font-light text-light-font02 dark:text-font02">
              First Name
            </Label>
            <Input
              onChange={(e) => {
                checkValidation();
                setFirstName(e.target.value);
              }}
              value={firstName}
              id="firstName"
              type="text"
              required
              className={clsx(
                "ring-1 ring-inset mt-1 mb-3 block w-full rounded-md bg-light-subBg dark:bg-subBg py-2.5 px-3 text-sm text-light-font01 dark:text-font01",
                "bg-light-subBg dark:bg-subBg",
                errors.firstName
                  ? "ring-red-500 dark:ring-red-500"
                  : "ring-light-borderGray dark:ring-borderGray",
                "focus:outline-none data-[focus]:outline-1 data-[focus]:-outline-offset-1 data-[focus]:outline-light-font01 dark:data-[focus]:outline-font01"
              )}
            />
          </Field>
          <Field className="w-full">
            <Label className="text-xs font-light text-light-font02 dark:text-font02">
              Last Name
            </Label>
            <Input
              onChange={(e) => {
                checkValidation();
                setLastName(e.target.value);
              }}
              value={lastName}
              id="lastName"
              type="text"
              required
              className={clsx(
                "ring-1 ring-inset mt-1 mb-3 block w-full rounded-md bg-light-subBg dark:bg-subBg py-2.5 px-3 text-sm text-light-font01 dark:text-font01",
                "bg-light-subBg dark:bg-subBg",
                errors.lastName
                  ? "ring-red-500 dark:ring-red-500"
                  : "ring-light-borderGray dark:ring-borderGray",
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
              onChange={(e) => {
                checkValidation();
                setUserName(e.target.value);
              }}
              value={userName}
              id="username"
              type="text"
              required
              className={clsx(
                "ring-1 ring-inset mt-1 mb-3 block w-full rounded-md bg-light-subBg dark:bg-subBg py-2.5 px-3 text-sm text-light-font01 dark:text-font01",
                "bg-light-subBg dark:bg-subBg",
                errors.userName
                  ? "ring-red-500 dark:ring-red-500"
                  : "ring-light-borderGray dark:ring-borderGray",
                "focus:outline-none data-[focus]:outline-1 data-[focus]:-outline-offset-1 data-[focus]:outline-light-font01 dark:data-[focus]:outline-font01"
              )}
            />
          </Field>
          <Field className="w-full">
            <Label className="text-xs font-light text-light-font02 dark:text-font02">
              Index Number
            </Label>
            <Input
              onChange={(e) => {
                checkValidation();
                setIndexNumber(e.target.value);
              }}
              value={indexNumber}
              id="username"
              type="text"
              required
              className={clsx(
                "ring-1 ring-inset mt-1 mb-3 block w-full rounded-md bg-light-subBg dark:bg-subBg py-2.5 px-3 text-sm text-light-font01 dark:text-font01",
                "bg-light-subBg dark:bg-subBg",
                errors.indexNumber
                  ? "ring-red-500 dark:ring-red-500"
                  : "ring-light-borderGray dark:ring-borderGray",
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
              onChange={(e) => {
                checkValidation();
                setEmail(e.target.value);
              }}
              value={email}
              id="username"
              type="text"
              required
              className={clsx(
                "ring-1 ring-inset mt-1 mb-3 block w-full rounded-md bg-light-subBg dark:bg-subBg py-2.5 px-3 text-sm text-light-font01 dark:text-font01",
                "bg-light-subBg dark:bg-subBg",
                errors.email
                  ? "ring-red-500 dark:ring-red-500"
                  : "ring-light-borderGray dark:ring-borderGray",
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
                  "*:text-black"
                )}
                value={role}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === Role.SuperAdmin) return setRole(Role.SuperAdmin);
                  if (val === Role.Admin) return setRole(Role.Admin);
                  if (val === Role.dataEntry) return setRole(Role.dataEntry);
                  if (val === Role.Student) return setRole(Role.Student);
                }}
              >
                <option value="SUPER_ADMIN">Super admin</option>
                <option value="ADMIN">Admin</option>
                <option value="DATA_ENTRY">Data entry</option>
                <option value="STUDENT">Student</option>
              </Select>
              <ChevronDownIcon
                className="group pointer-events-none absolute top-4 right-2.5 size-2 fill-light-font02 dark:fill-font02"
                aria-hidden="true"
              />
            </div>
          </Field>
        </div>

        <AppButton
          title="Add User"
          variant="fill"
          onClick={() => handleCreateUser()}
          isLoading={addUserStatus === RequestState.LOADING}
          className="ml-auto mt-auto"
        />

        <AppDivider label="Or" className="my-8" />

        <AppDragDropArea
          csvFileError={csvFileError}
          dataList={usersList}
          fileName={fileName}
          handleCSVSelect={handleCSVSelect}
          resetCSVFile={resetCSVFile}
        />

        <AppButton
          title="Add Users"
          variant="fill"
          onClick={() => handleCreateUsers()}
          isLoading={addMultipleUsersStatus === RequestState.LOADING}
          className="ml-auto mt-auto"
        />

        <ToastContainer />
      </Drawer.Body>
    </Drawer>
  );
};

export default UserDrawer;
