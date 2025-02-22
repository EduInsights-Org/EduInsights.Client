import AppButton from "@/components/AppButton";
import verifiedBadge from "@assets/icons/verified.svg";

const AccountVerified = () => {
  return (
    <div className="shadow-xl dark:shadow-mainBg border-[1px] border-light-borderGray dark:border-borderGray rounded-lg flex flex-col bg-light-mainBg dark:bg-mainBg px-8 py-12 w-[420px]">
      <div className="flex justify-center">
        <img
          src={verifiedBadge}
          alt="EduInsights Logo"
          width={110}
          height={110}
        />
      </div>

      <span className="font-extrabold py-8 text-center text-2xl text-light-font01 dark:text-font01">
        Email Verified!
      </span>

      <span className="font-normal text-xs text-center text-light-font01 dark:text-font01">
        Your email has been successfully verified. You can now proceed to use
        your account
      </span>

      <AppButton
        title="Continue to Login"
        variant="fill"
        onClick={() => {
          window.location.href = "/login";
        }}
        className="mt-12 py-5 font-bold"
      />
    </div>
  );
};

export default AccountVerified;
