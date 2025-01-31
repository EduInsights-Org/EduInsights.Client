import { APP_NAME } from "@config/config";
import logoLight from "@assets/icons/logo-light.svg";
import logoDark from "@assets/icons/logo-dark.svg";
import { useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@slices/store";
import { register } from "@slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";
import { useTheme } from "@context/ThemeContext";
import { Spinner } from "@radix-ui/themes";
import { RequestState, Role } from "@utils/types";

const Register = () => {
  const { isDarkMode } = useTheme();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const [instituteName, setInstituteName] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const [matchPwd, setMatchPwd] = useState<string>("");

  const dispatch = useAppDispatch();
  const error = useAppSelector((state: RootState) => state.auth.error);
  const registerStatus = useAppSelector(
    (state: RootState) => state.auth.registerStatus
  );

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (pwd !== matchPwd) {
      alert("Passwords do not match!");
      return;
    }
    const result = await dispatch(
      register({
        firstName,
        lastName,
        userName: user,
        password: pwd,
        instituteName,
        role: Role.SuperAdmin,
      })
    );
    if (register.fulfilled.match(result)) navigate("/login");
  };

  return (
    <main className="h-screen flex justify-center items-center flex-col bg-light-subBg dark:bg-subBg gap-y-10">
      <div className="flex justify-center items-center gap-x-2">
        <img
          src={isDarkMode ? logoLight : logoDark}
          alt="EduInsights Logo"
          width={40}
          height={40}
        />
        <span className="font-extrabold text-4xl text-light-font01 dark:text-font01">
          {APP_NAME}
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="shadow-xl dark:shadow-mainBg border-[1px] border-light-borderGray dark:border-borderGray rounded-lg flex flex-col bg-light-mainBg dark:bg-mainBg px-8 py-12 w-[420px]"
      >
        <span className="font-extrabold text-2xl pb-8 text-light-font01 dark:text-font01">
          Create an account
        </span>

        <div className="flex gap-x-2">
          <Field>
            <Label className="text-xs font-light text-light-font02 dark:text-font02">
              First Name
            </Label>
            <Input
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              id="f_name"
              type="text"
              required
              className={clsx(
                "ring-1 ring-inset mt-1 mb-3 block w-full rounded-md bg-light-subBg dark:bg-subBg dark:ring-borderGray ring-light-borderGray py-2.5 px-3 text-sm text-light-font01 dark:text-font01",
                "focus:outline-none data-[focus]:outline-1 data-[focus]:-outline-offset-1 data-[focus]:outline-light-font01 dark:data-[focus]:outline-font01"
              )}
            />
          </Field>
          <Field>
            <Label className="text-xs font-light text-light-font02 dark:text-font02">
              Last Name
            </Label>
            <Input
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              id="l_name"
              type="text"
              required
              className={clsx(
                "ring-1 ring-inset mt-1 mb-3 block w-full rounded-md bg-light-subBg dark:bg-subBg dark:ring-borderGray ring-light-borderGray py-2.5 px-3 text-sm text-light-font01 dark:text-font01",
                "focus:outline-none data-[focus]:outline-1 data-[focus]:-outline-offset-1 data-[focus]:outline-light-font01 dark:data-[focus]:outline-font01"
              )}
            />
          </Field>
        </div>

        <Field>
          <Label className="text-xs font-light text-light-font02 dark:text-font02">
            User Name
          </Label>
          <Input
            onChange={(e) => setUser(e.target.value)}
            value={user}
            id="username"
            type="text"
            required
            className={clsx(
              "ring-1 ring-inset mt-1 mb-3 block w-full rounded-md bg-light-subBg dark:bg-subBg dark:ring-borderGray ring-light-borderGray py-2.5 px-3 text-sm text-light-font01 dark:text-font01",
              "focus:outline-none data-[focus]:outline-1 data-[focus]:-outline-offset-1 data-[focus]:outline-light-font01 dark:data-[focus]:outline-font01"
            )}
          />
        </Field>

        <Field>
          <Label className="text-xs font-light text-light-font02 dark:text-font02">
            Institute Name
          </Label>
          <Input
            onChange={(e) => setInstituteName(e.target.value)}
            value={instituteName}
            id="institute"
            type="text"
            required
            className={clsx(
              "ring-1 ring-inset mt-1 mb-3 block w-full rounded-md bg-light-subBg dark:bg-subBg dark:ring-borderGray ring-light-borderGray py-2.5 px-3 text-sm text-light-font01 dark:text-font01",
              "focus:outline-none data-[focus]:outline-1 data-[focus]:-outline-offset-1 data-[focus]:outline-light-font01 dark:data-[focus]:outline-font01"
            )}
          />
        </Field>

        <Field>
          <Label className="text-xs font-light text-light-font02 dark:text-font02">
            Password
          </Label>
          <Input
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            id="password"
            type="password"
            required
            className={clsx(
              "ring-1 ring-inset mt-1 mb-3 block w-full rounded-md bg-light-subBg dark:bg-subBg dark:ring-borderGray ring-light-borderGray py-2.5 px-3 text-sm text-light-font01 dark:text-font01",
              "focus:outline-none data-[focus]:outline-1 data-[focus]:-outline-offset-1 data-[focus]:outline-light-font01 dark:data-[focus]:outline-font01"
            )}
          />
        </Field>

        <Field>
          <Label className="text-xs font-light text-light-font02 dark:text-font02">
            Confirm Password
          </Label>
          <Input
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            id="confirm_pwd"
            type="password"
            required
            className={clsx(
              "ring-1 ring-inset mt-1 mb-3 block w-full rounded-md bg-light-subBg dark:bg-subBg dark:ring-borderGray ring-light-borderGray py-2.5 px-3 text-sm text-light-font01 dark:text-font01",
              "focus:outline-none data-[focus]:outline-1 data-[focus]:-outline-offset-1 data-[focus]:outline-light-font01 dark:data-[focus]:outline-font01"
            )}
          />
        </Field>

        {error && (
          <span className="font-light text-red-500 text-xs">{error}</span>
        )}

        <button className="flex justify-center items-center rounded-md bg-primaryLight py-3 mt-12 px-4 text-xs font-bold text-light-mainBg min-h-10 hover:bg-primaryDark">
          {registerStatus === RequestState.LOADING ? (
            <Spinner size="1" />
          ) : (
            <>Create an account</>
          )}
        </button>

        <span className="pt-4 text-light-font02 dark:text-font02 text-xs">
          Already have an account?&nbsp;
          <a
            href="/login"
            className="font-bold text-light-font01 dark:text-font01 underline text-xs"
          >
            Login here
          </a>
        </span>
      </form>
    </main>
  );
};

export default Register;
