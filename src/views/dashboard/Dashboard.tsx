import AppTable, { TableColumn } from "@/components/AppTable";
import useChart from "@/hooks/useChart";
import {
  getBatchAverageGPAs,
  getStudentsGPAs,
  StudentGPA,
} from "@/slices/resultSlice";
import { useAppDispatch, useAppSelector } from "@/slices/store";
import { getGPAClassInfo } from "@/utils/utils";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Badge } from "@radix-ui/themes";
import { useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { getChartOptions, setChartData } = useChart();
  const instituteId = useAppSelector((state) => state.institute.institute.id);
  const studentsGPAs = useAppSelector((state) => state.result.studentsGPAs);
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
      key: "subjectCount",
      header: "Subject Count",
      render: (item: StudentGPA) => {
        return <div className="flex">{item.subjectCount}</div>;
      },
    },
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
      <div className="flex justify-between flex-row-reverse gap-x-2">
        {/* table */}
        <div className="border flex flex-col rounded-lg overflow-hidden border-light-borderGray dark:border-borderGray min-w-[600px] w-[65%] h-[500px]">
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
              // loading={semestersLoading === RequestState.LOADING}
              pagination={{
                handlePagination: () => {},
                pageSize: 10,
                totalRecords: 2,
              }}
            />
          )}
        </div>
        {/* pie */}
        <div className="border rounded-lg overflow-hidden border-light-borderGray dark:border-borderGray min-w-[250px] w-[35%] h-[500px] flex flex-col">
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
            data={setChartData({
              labels: batchGPAInfo.map((item) => item.batchName),
              dataset: batchGPAInfo.map((item) => item.averageGpa),
              datasetLabel: "GPA",
            })}
            options={getChartOptions({ title: "Batch GPAs Distribution" })}
          />
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden border-light-borderGray dark:border-borderGray min-w-[250px] w-[45%] flex flex-col">
        <div className="flex items-center py-4 px-3 bg-light-subBg dark:bg-subBg">
          <button
            onClick={handleGetBatchAverageGPAs}
            className="ml-auto text-xs text-light-font02 dark:text-font02 flex justify-center items-center gap-x-1"
          >
            <ArrowPathIcon className="size-3" />
            Refresh
          </button>
        </div>
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
    </main>
  );
};

export default Dashboard;
