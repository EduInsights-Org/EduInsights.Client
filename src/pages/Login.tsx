import { useState } from "react";
import logoLight from "@assets/icons/logo-light.svg";
import logoDark from "@assets/icons/logo-dark.svg";
import { APP_NAME } from "@config/config";
import {
  login,
  resetErrorMessage,
  sendVerificationCode,
  verifyEmail,
} from "@slices/authSlice";
import { RootState, useAppDispatch, useAppSelector } from "@slices/store";
import { AxiosPrivateService, AxiosPublicService } from "@utils/apiService";
import useAuth from "@hooks/useAuth";
import { Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";
import { useTheme } from "@context/ThemeContext";
import { ErrorCode, RequestState } from "@utils/enums";
import { getInstituteById } from "@slices/instituteSlice";
import {
  Batch,
  getBatchesByInstituteId,
  selectBatch,
} from "@slices/batchSlice";
import AppButton from "@/components/AppButton";
import { Spinner } from "@radix-ui/themes";
import VerificationInput from "@/components/VerificationInput";
import AccountVerified from "@/components/AccountVerified";

const Login = () => {
  const { isDarkMode } = useTheme();

  const [email, setEmail] = useState<string>("");

  const [password, setPwd] = useState<string>("");

  const [code, setCode] = useState<string[]>(Array(6).fill(""));

  const dispatch = useAppDispatch();

  const { setAuth } = useAuth();

  const error = useAppSelector((state: RootState) => state.auth.error);
  const loginStatus = useAppSelector(
    (state: RootState) => state.auth.loginStatus
  );
  const sendVerificationCodeStatus = useAppSelector(
    (state: RootState) => state.auth.sendVerificationCodeStatus
  );
  const isVerificationSent = useAppSelector(
    (state: RootState) => state.auth.isVerificationSent
  );
  const emailVerifyingStatus = useAppSelector(
    (state: RootState) => state.auth.emailVerifyingStatus
  );
  const isVerified = useAppSelector(
    (state: RootState) => state.auth.isVerified
  );
  const errorCode = useAppSelector(
    (state: RootState) => state.auth.errorCode
  ) as ErrorCode;

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

  const handleSendVerificationCode = async () => {
    try {
      new AxiosPublicService();

      const response = await dispatch(sendVerificationCode({ email }));

      if (sendVerificationCode.fulfilled.match(response)) {
        console.log("Verification code sent");
        dispatch(resetErrorMessage());
      } else {
        throw new Error("Failed to send verification code");
      }
    } catch (error) {
      console.error(
        "An error occurred while sending verification code:",
        error
      );
    }
  };

  const handleVerificationSubmit = async () => {
    const result = await dispatch(verifyEmail({ code: code.join(""), email }));
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

      <div className="shadow-xl dark:shadow-mainBg border-[1px] border-light-borderGray dark:border-borderGray rounded-lg flex flex-col bg-light-mainBg dark:bg-mainBg px-8 py-12 w-[420px]">
        {!isVerificationSent ? (
          <form onSubmit={handleSubmit} className="w-full flex flex-col">
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

            {errorCode === ErrorCode.EmailNotVerified && (
              <div className="font-light text-xs flex items-center gap-x-1">
                <span className="text-red-500 ">Please</span>
                <span
                  onClick={handleSendVerificationCode}
                  className="font-bold italic underline cursor-pointer text-red-500"
                >
                  verify
                </span>
                <span className="text-red-500">
                  {" "}
                  your email before logging in.
                </span>
                <span>
                  {sendVerificationCodeStatus === RequestState.LOADING && (
                    <Spinner size={"1"} />
                  )}
                </span>
              </div>
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
        ) : (
          <>
            {!isVerified ? (
              <form className="w-full flex flex-col">
                <span className="font-extrabold text-2xl pb-8 text-light-font01 dark:text-font01">
                  Verify your email
                </span>
                <span className="font-normal text-xs text-light-font01 dark:text-font01">
                  We've sent a 6-digit verification code to <b>{email}</b>{" "}
                  Please enter it below to verify your account.
                </span>

                <VerificationInput code={code} setCode={setCode} />

                {error && (
                  <span className="font-light text-red-500 text-xs">
                    {error}
                  </span>
                )}

                <AppButton
                  title="Verify Email"
                  variant="fill"
                  isLoading={emailVerifyingStatus === RequestState.LOADING}
                  onClick={handleVerificationSubmit}
                  className="mt-12 py-5 font-bold"
                />
              </form>
            ) : (
              <AccountVerified />
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Login;
