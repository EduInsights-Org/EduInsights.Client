interface ChartOptionsProps {
  responsive?: boolean;
  position?: "top" | "bottom" | "left" | "right";
  title: string;
}

interface ChartDataProps {
  labels: string[];
  dataset: number[];
  datasetLabel: string;
}

const colors = [
  "#003f5c",
  "#58508d",
  "#bc5090",
  "#ff6361",
  "#ffa600",
  "#2f4b7c",
  "#a05195",
  "#d45087",
  "#f95d6a",
  "#ff7c43",
];

const useChart = () => {
  const getChartColors = (size: number): string[] => {
    const repeatedColors = [...colors];
    while (repeatedColors.length < size) {
      repeatedColors.push(...colors);
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
