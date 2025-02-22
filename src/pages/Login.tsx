import { useState } from "react";
import logoLight from "@assets/icons/logo-light.svg";
import logoDark from "@assets/icons/logo-dark.svg";
import { APP_NAME } from "@config/config";
import { login } from "@slices/authSlice";
import { RootState, useAppDispatch, useAppSelector } from "@slices/store";
import { AxiosPrivateService, AxiosPublicService } from "@utils/apiService";
import useAuth from "@hooks/useAuth";
import { Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";
import { useTheme } from "@context/ThemeContext";
import { RequestState } from "@utils/types";
import { getInstituteById } from "@slices/instituteSlice";
import {
  Batch,
  getBatchesByInstituteId,
  selectBatch,
} from "@slices/batchSlice";
import AppButton from "@/components/AppButton";

const Login = () => {
  const { isDarkMode } = useTheme();

  const [email, setEmail] = useState<string>("");

  const [password, setPwd] = useState<string>("");

  const dispatch = useAppDispatch();

  const { setAuth } = useAuth();

  const error = useAppSelector((state: RootState) => state.auth.error);
  const loginStatus = useAppSelector(
    (state: RootState) => state.auth.loginStatus
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      new AxiosPublicService();

      const result = await dispatch(login({ email, password }));

      if (login.fulfilled.match(result)) {
        const token = result.payload.accessToken;
        const instituteId = result.payload.data.userInfo.instituteId;
        new AxiosPrivateService(token);

        setAuth((prev: any) => ({
          ...prev,
          accessToken: token,
        }));

        const instituteResult = await dispatch(getInstituteById(instituteId));

        if (!getInstituteById.fulfilled.match(instituteResult)) {
          throw new Error("Failed to fetch institute");
        }

        const batchesResult = await dispatch(
          getBatchesByInstituteId(instituteId)
        );
        if (!getBatchesByInstituteId.fulfilled.match(batchesResult)) {
          throw new Error("Failed to fetch batches");
        }

        const batches = batchesResult.payload.data as Batch[];

        if (batches.length > 0) {
          dispatch(selectBatch(batches[0].id));
        }
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred during submission:", error);
    }
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
          Login
        </span>

        <Field>
          <Label className="text-xs font-light text-light-font02 dark:text-font02">
            Email
          </Label>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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
            Password
          </Label>
          <Input
            onChange={(e) => setPwd(e.target.value)}
            value={password}
            id="password"
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

        <AppButton
          title="Login"
          variant="fill"
          isLoading={loginStatus === RequestState.LOADING}
          onClick={() => {}}
          className="mt-12 py-5 font-bold"
        />

        <span className="pt-4 text-light-font02 dark:text-font02 text-xs">
          Don't have an account?&nbsp;
          <a
            href="/register"
            className="font-bold text-light-font01 dark:text-font01 underline text-xs"
          >
            Register here
          </a>
        </span>
      </form>
    </main>
  );
};

export default Login;
