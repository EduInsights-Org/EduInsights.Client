import { useEffect, PropsWithChildren } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

export const ChartJSProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    ChartJS.register(
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend,
      ArcElement
    );
  }, []);

  return <>{children}</>;
};
