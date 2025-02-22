import AppButton from "@/components/AppButton";
import verifiedBadge from "@assets/icons/verified.svg";

const AccountVerified = () => {
  return (
    <div className="w-full flex flex-col">
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
