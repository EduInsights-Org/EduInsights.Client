import AppStatCard from "@/components/AppCounterCard";
import AppTable, { TableColumn } from "@/components/AppTable";
import useChart from "@/hooks/useChart";
import {
  getBatchAverageGPAs,
  getStudentsGPAs,
  StudentGPA,
} from "@/slices/resultSlice";
import { useAppDispatch, useAppSelector } from "@/slices/store";
import { RequestState } from "@/utils/enums";
import { getGPAClassInfo } from "@/utils/utils";
import {
  ArrowPathIcon,
  PresentationChartBarIcon,
  SquaresPlusIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { Badge } from "@radix-ui/themes";
import { useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { getChartOptions, setChartData } = useChart();
  const roleDistribution = useAppSelector(
    (state) => state.user.roleDistribution
  );
  const instituteId = useAppSelector((state) => state.institute.institute.id);
  const studentsGPAs = useAppSelector((state) => state.result.studentsGPAs);
  const resultsStatus = useAppSelector((state) => state.result.status);
  const batchGPAInfo = useAppSelector((state) => state.result.batchGPAInfo);

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
  }, [instituteId]);

  return (
    <main className="flex flex-col gap-y-2">
      <div className="flex justify-between gap-x-2">
        {/* cards */}
        <div className="flex w-[15%] flex-col justify-between">
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
        <div className="border flex flex-col rounded-lg overflow-hidden border-light-borderGray dark:border-borderGray w-[50%] h-[500px]">
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
              data={studentsGPAs}
              columns={columns}
              loading={resultsStatus === RequestState.LOADING}
              pagination={{
                handlePagination: () => {},
                pageSize: 10,
                totalRecords: 2,
              }}
            />
          )}
        </div>

        {/* pie */}
        <div className="border rounded-lg overflow-hidden border-light-borderGray dark:border-borderGray w-[35%] h-[500px] flex flex-col">
          <div className="flex items-center py-4 px-3 bg-light-subBg dark:bg-subBg">
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

      <div className="flex justify-between gap-x-2">
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
        <div className="w-[60%] flex gap-x-2 justify-between">
          <AppStatCard
            icon={PresentationChartBarIcon}
            subTitle="Current GPA"
            value={(
              batchGPAInfo.reduce((acc, item) => acc + item.averageGpa, 0) /
              batchGPAInfo.length
            ).toFixed(2)}
          />
          {batchGPAInfo.map((item) => (
            <AppStatCard
              key={item.batchName}
              mainTitle={item.batchName}
              subTitle="Current GPA"
              value={item.averageGpa.toFixed(2)}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
