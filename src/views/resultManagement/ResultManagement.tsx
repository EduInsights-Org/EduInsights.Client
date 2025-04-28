import AppTable, { TableColumn } from "@/components/AppTable";
import useChart from "@/hooks/useChart";
import { getGradeDistribution, getResults, Result } from "@/slices/resultSlice";
import { useAppDispatch, useAppSelector } from "@/slices/store";
import { GRADE_LIST } from "@/utils/constant";
import {
  ArrowPathIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Badge } from "@radix-ui/themes";
import { useEffect } from "react";
import { Pie } from "react-chartjs-2";

const ResultManagement = () => {
  const dispatch = useAppDispatch();
  const { getChartOptions, setChartData } = useChart();
  const results = useAppSelector((state) => state.result.results);
  const instituteId = useAppSelector((state) => state.institute.institute.id);
  const gradeDistribution = useAppSelector(
    (state) => state.result.gradeDistribution
  );

  const columns: TableColumn<Result>[] = [
    {
      key: "indexNumber",
      header: "Index Number",
    },
    { key: "semester", header: "Semester" },
    { key: "subjectCode", header: "Subject Code" },
    { key: "subjectName", header: "Subject Name" },
    {
      key: "batch",
      header: "Batch",
    },
    {
      key: "grade",
      header: "Grade",
      render: (result) => {
        const gradeColorMap: Record<
          string,
          | "gray"
          | "gold"
          | "bronze"
          | "brown"
          | "yellow"
          | "amber"
          | "orange"
          | "tomato"
          | "red"
          | "ruby"
          | "crimson"
          | "pink"
          | "plum"
          | "purple"
          | "violet"
          | "iris"
          | "indigo"
          | "blue"
          | "cyan"
          | "teal"
          | "jade"
          | "green"
          | "grass"
          | "lime"
          | "mint"
          | "sky"
        > = {
          "A+": "indigo",
          A: "iris",
          "A-": "violet",
          "B+": "purple",
          B: "plum",
          "B-": "pink",
          "C+": "crimson",
          C: "ruby",
          "C-": "red",
          "D+": "tomato",
          D: "orange",
          "D-": "amber",
          E: "brown",
        };

        return (
          <div className="flex justify-center">
            <Badge size={"1"} color={gradeColorMap[result.grade] || "gray"}>
              {result.grade}
            </Badge>
          </div>
        );
      },
    },
    {
      key: "id",
      header: "Actions",
      render: () => (
        <div className="flex flex-row gap-x-4 w-fit">
          <PencilIcon className="h-3 w-3 text-light-font01 dark:text-font01" />
          <button>
            <TrashIcon className="h-3 w-3 text-light-font01 dark:text-font01" />
          </button>
        </div>
      ),
    },
  ];

  const handleGetResults = async () => {
    dispatch(getResults());
  };

  const handleGetGradeDistribution = async () => {
    await dispatch(getGradeDistribution({ instituteId }));
  };

  useEffect(() => {
    handleGetResults();
    handleGetGradeDistribution();
  }, [instituteId]);

  const pieChartData = setChartData({
    labels: GRADE_LIST,
    datasetLabel: "Grade Distribution",
    dataset: [
      gradeDistribution.aPlus.toString(),
      gradeDistribution.a.toString(),
      gradeDistribution.aMinus.toString(),
      gradeDistribution.bPlus.toString(),
      gradeDistribution.b.toString(),
      gradeDistribution.bMinus.toString(),
      gradeDistribution.cPlus.toString(),
      gradeDistribution.c.toString(),
      gradeDistribution.cMinus.toString(),
      gradeDistribution.dPlus.toString(),
      gradeDistribution.d.toString(),
      gradeDistribution.dMinus.toString(),
      gradeDistribution.e.toString(),
    ],
  });

  return (
    <main>
      <div className="flex justify-between flex-row-reverse gap-x-2">
        <div className="border flex flex-col rounded-lg overflow-hidden border-light-borderGray dark:border-borderGray min-w-[600px] w-[65%] h-[500px]">
          <div className="flex gap-x-3 items-center py-4 px-3 bg-light-subBg dark:bg-subBg">
            <button
              onClick={handleGetResults}
              className="ml-auto text-xs text-light-font02 dark:text-font02 flex justify-center items-center gap-x-1"
            >
              <ArrowPathIcon className="size-3" />
              Refresh
            </button>
          </div>
          {results && (
            <AppTable
              data={results}
              columns={columns}
              // loading={subjectsLoading === RequestState.LOADING}
              checkboxSelection
              // onSelect={handleSelect}
              pagination={{
                handlePagination: () => {},
                pageSize: 10,
                totalRecords: 2,
              }}
            />
          )}
        </div>

        {/* chart */}
        <div className="border rounded-lg overflow-hidden border-light-borderGray dark:border-borderGray min-w-[250px] w-[35%] h-[500px] flex flex-col">
          <div className="flex items-center py-4 px-3 bg-light-subBg dark:bg-subBg">
            <button
              onClick={handleGetGradeDistribution}
              className="ml-auto text-xs text-light-font02 dark:text-font02 flex justify-center items-center gap-x-1"
            >
              <ArrowPathIcon className="size-3" />
              Refresh
            </button>
          </div>
          <Pie
            data={pieChartData}
            options={getChartOptions({
              title: "Grade Distribution",
            })}
          />
        </div>
      </div>
    </main>
  );
};

export default ResultManagement;
