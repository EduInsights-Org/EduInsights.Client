import { LABEL_COLOR_LIST } from "@/utils/constant";

interface ChartOptionsProps {
  responsive?: boolean;
  position?: "top" | "bottom" | "left" | "right";
  title: string;
}

interface ChartDataProps {
  labels: string[];
  dataset: number[] | string[];
  datasetLabel: string;
}

const useChart = () => {
  const getChartColors = (size: number): string[] => {
    const repeatedColors = [...LABEL_COLOR_LIST];
    while (repeatedColors.length < size) {
      repeatedColors.push(...LABEL_COLOR_LIST);
    }

    return repeatedColors.slice(0, size);
  };

  const getChartOptions = ({
    responsive = true,
    position = "bottom",
    title,
  }: ChartOptionsProps) => {
    return {
      responsive: responsive,
      plugins: {
        legend: {
          position: position,
        },
        title: {
          display: true,
          text: title,
        },
      },
    };
  };

  const setChartData = ({ labels, dataset, datasetLabel }: ChartDataProps) => {
    return {
      labels: labels,
      datasets: [
        {
          label: datasetLabel,
          data: dataset,
          backgroundColor: getChartColors(dataset.length),
          borderWidth: 0,
        },
      ],
    };
  };

  return {
    getChartOptions,
    setChartData,
  };
};

export default useChart;
