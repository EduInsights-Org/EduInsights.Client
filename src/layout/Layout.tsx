import { Outlet } from "react-router-dom";
import Header from "@layout/header/Header";
import SideBar from "@layout/sideBar/SideBar";
import { Suspense } from "react";
import { useAppSelector } from "@slices/store";
import { RequestState } from "@utils/enums";
import ErrorHandler from "@components/ErrorHandler";

const errorMessage = "Oops! Something went wrong. Please refresh the page.";

const Layout = () => {
  const authStatus = useAppSelector((state) => state.auth.status);
  const instituteStatus = useAppSelector((state) => state.institute.status);

  const isFail = (): boolean => {
    return (
      authStatus === RequestState.FAILED ||
      instituteStatus === RequestState.FAILED
    );
  };

  if (isFail()) return <ErrorHandler message={errorMessage} />;

  return (
    <div className="flex h-screen overflow-hidden bg-light-mainBg dark:bg-mainBg">
      <SideBar />

      <div className="relative flex flex-1 flex-col">
        <Header />

        {/* <!-- ===== View Content Start ===== --> */}
        <main className="flex-1 px-2 pb-2 min-w-[1200px] overflow-auto">
          <Suspense fallback={<h1>Loading</h1>}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default Layout;
