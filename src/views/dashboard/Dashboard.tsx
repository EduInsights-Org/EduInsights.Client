import AppStatCard from "@/components/AppCounterCard";
import AppTable, { TableColumn } from "@/components/AppTable";
import useChart from "@/hooks/useChart";
import {
  getBatchAverageGPAs,
  getStudentsGPAs,
  StudentGPA,
} from "@/slices/resultSlice";
import { useAppDispatch, useAppSelector } from "@/slices/store";
import { getUserCount, getUsersByVerificationStatus } from "@/slices/userSlice";
import { RequestState } from "@/utils/enums";
import { getGPAClassInfo } from "@/utils/utils";
import {
  ArrowPathIcon,
  ExclamationCircleIcon,
  PresentationChartBarIcon,
  SquaresPlusIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { Badge } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { getChartOptions, setChartData } = useChart();
  const roleDistribution = useAppSelector(
    (state) => state.user.roleDistribution
  );
  const instituteId = useAppSelector((state) => state.institute.institute.id);
  const instituteName = useAppSelector(
    (state) => state.institute.institute.name
  );
  const studentsGPAs = useAppSelector((state) => state.result.studentsGPAs);
  const resultsStatus = useAppSelector((state) => state.result.status);
  const batchGPAInfo = useAppSelector((state) => state.result.batchGPAInfo);

  const notVerifiedUsers = useAppSelector(
    (state) => state.user.notVerifiedUsers
  );
  const userCount = useAppSelector((state) => state.user.userCount);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const columns: TableColumn<StudentGPA>[] = [
    { key: "indexNumber", header: "Index Number" },
    {
      key: "name",
      header: "Name",
      render: (item: StudentGPA) => {
        const fullName = `${item.firstName} ${item.lastName}`;
        return <>{fullName}</>;
      },
    },
    { key: "batch", header: "Batch" },
    {
      key: "gpa",
      header: "Current GPA",
      render: (item: StudentGPA) => (
        <Badge color={getGPAClassInfo(item.gpa).color}>{item.gpa}</Badge>
      ),
    },
  ];

  const handleGetStudentsGPAs = async () => {
    await dispatch(getStudentsGPAs({ instituteId }));
  };

  const handleGetBatchAverageGPAs = async () => {
    await dispatch(getBatchAverageGPAs({ instituteId }));
  };

  useEffect(() => {
    handleGetStudentsGPAs();
    handleGetBatchAverageGPAs();

    dispatch(
      getUsersByVerificationStatus({ instituteId, isEmailVerified: false })
    );
    dispatch(getUserCount(instituteId));
  }, [instituteId]);

  return (
    <main className="flex flex-col gap-y-2 h-full">
      <div className="flex justify-between gap-x-2">
        {/* cards */}
        <div className="flex w-[15%] flex-col justify-between gap-y-2">
          {/* card one */}
          <AppStatCard
            icon={UserGroupIcon}
            subTitle="Total Students"
            value={roleDistribution.student}
          />
          {/* card two */}
          <AppStatCard
            icon={UsersIcon}
            subTitle="Total Admins"
            value={roleDistribution.admin}
          />

          {/* card two */}
          <AppStatCard
            icon={SquaresPlusIcon}
            subTitle="Total Batches"
            value={batchGPAInfo.length}
          />
        </div>

        {/* table */}
        <div className="border flex flex-col rounded-lg border-light-borderGray dark:border-borderGray w-[50%] h-[500px]">
          {/* table header */}
          <div className="flex gap-x-3 items-center py-4 px-3 bg-light-subBg dark:bg-subBg">
            <button
              onClick={handleGetStudentsGPAs}
              className="ml-auto text-xs text-light-font02 dark:text-font02 flex justify-center items-center gap-x-1"
            >
              <ArrowPathIcon className="size-3" />
              Refresh
            </button>
          </div>
          {studentsGPAs && (
            <AppTable
              data={studentsGPAs.slice(
                (currentPage - 1) * 10,
                currentPage * 10
              )}
              columns={columns}
              loading={resultsStatus === RequestState.LOADING}
              pagination={{
                handlePagination: (targetPage) => {
                  if (targetPage === 1) return setCurrentPage(1);
                  setCurrentPage(currentPage + 1);
                },
                pageSize: 10,
                totalRecords: studentsGPAs.length,
              }}
            />
          )}
        </div>

        {/* pie */}
        <div className="border rounded-lg overflow-hidden border-light-borderGray dark:border-borderGray w-[35%] h-[500px] flex flex-col">
          <div className="flex items-center py-4 px-3 bg-light-subBg dark:bg-subBg overflow-auto">
            <button
              onClick={handleGetBatchAverageGPAs}
              className="ml-auto text-xs text-light-font02 dark:text-font02 flex justify-center items-center gap-x-1"
            >
              <ArrowPathIcon className="size-3" />
              Refresh
            </button>
          </div>
          <Pie
            className="my-auto"
            options={getChartOptions({ title: "Batch GPAs Distribution" })}
            data={setChartData({
              labels: batchGPAInfo.map((item) => item.batchName),
              dataset: batchGPAInfo.map((item) => item.averageGpa),
              datasetLabel: "GPA",
            })}
          />
        </div>
      </div>

      <div className="flex justify-between gap-x-2 h-full">
        {/* pie chart */}
        <div className="pl-1 border rounded-lg overflow-hidden border-light-borderGray dark:border-borderGray min-w-[250px] w-[40%] flex flex-col">
          <Bar
            options={getChartOptions({
              title: "Total Number of Students in Each Batch",
            })}
            data={setChartData({
              labels: batchGPAInfo.map((item) => item.batchName),
              dataset: batchGPAInfo.map((item) => item.totalStudentsInBatch),
              datasetLabel: "Total Students",
            })}
          />
        </div>

        {/* cards */}
        <div className="w-[60%] flex gap-y-2 justify-between flex-col h-full">
          <div className="w-full border p-3 rounded-lg border-light-borderGray dark:border-borderGray flex items-center gap-x-3 h-fit min-w-[138px]">
            {/* Current GPA */}
            <>
              <PresentationChartBarIcon className="size-12 text-light-font01 dark:text-font01 font-thin" />
              <div className="flex flex-col">
                <span className="text-light-font01 dark:text-font01 text-5xl font-semibold">
                  {(
                    batchGPAInfo.reduce(
                      (acc, item) => acc + item.averageGpa,
                      0
                    ) / batchGPAInfo.length
                  ).toFixed(2)}
                </span>
                <span className="text-light-font01 dark:text-font01 text-xs font-light leading-3">
                  {instituteName} Current GPA
                </span>
              </div>
            </>
            <div className="h-full w-[1px] bg-light-borderGray dark:bg-borderGray mx-auto" />
            {/* Total Users */}
            <>
              <UserGroupIcon className="size-12 text-light-font01 dark:text-font01 font-thin" />
              <div className="flex flex-col">
                <span className="text-light-font01 dark:text-font01 text-5xl font-semibold">
                  {userCount}
                </span>
                <span className="text-light-font01 dark:text-font01 text-xs font-light leading-3">
                  Total Users
                </span>
              </div>
            </>
            <div className="h-full w-[1px] bg-light-borderGray dark:bg-borderGray mx-auto" />
            {/* Not Verified Users */}
            <>
              <div className="flex flex-col">
                <div className="flex items-start gap-x-1">
                  <span className="text-light-font01 dark:text-font01 text-5xl font-semibold">
                    {notVerifiedUsers.length}
                  </span>
                  <ExclamationCircleIcon className="size-4 text-yellow-600" />
                </div>

                <span className="text-light-font01 dark:text-font01 text-xs font-light leading-3">
                  Not Verified Users
                </span>
              </div>
            </>
          </div>

          <div className="w-full h-full flex-row flex gap-x-2 justify-between">
            {batchGPAInfo.slice(0, 4).map((item) => (
              <AppStatCard
                key={item.batchName}
                mainTitle={item.batchName}
                subTitle="Current GPA"
                value={item.averageGpa.toFixed(2)}
              />
            ))}
            {batchGPAInfo.length > 4 && (
              <AppStatCard mainTitle="See All" type="seeAll" />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
