import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Sales",
      data: [50, 60, 70, 180, 190, 200],
      backgroundColor: "rgba(30, 92, 199, 0.6)",
      borderColor: "rgba(30, 92, 199)",
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Monthly Sales Data",
    },
  },
};

const pieChartData = {
  labels: ["Super admin", "Admin", "Lecture", "Data entry", "Student"],
  datasets: [
    {
      label: "Role",
      data: [12, 19, 3, 5, 2],
      backgroundColor: [
        "rgba(30, 92, 199)",
        "rgba(56, 118, 225)",
        "rgba(100, 148, 232)",
        "rgba(144, 179, 238)",
        "rgba(189, 209, 245)",
      ],
      borderColor: [
        "rgba(30, 92, 199)",
        "rgba(56, 118, 225)",
        "rgba(100, 148, 232)",
        "rgba(144, 179, 238)",
        "rgba(189, 209, 245)",
      ],

      borderWidth: 1,
    },
  ],
};

const pieChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    title: {
      display: true,
      text: "User Role Distribution",
    },
  },
};

const UserManagement = () => {
  const [enabled, setEnabled] = useState(true);

  return (
    <main>
      <div className="flex justify-between flex-row-reverse gap-x-2">
        <div className="border rounded-lg overflow-hidden border-light-borderGray dark:border-borderGray min-w-[600px] w-[65%]">
          {/* <Bar data={data} options={options} /> */}
          <table className="w-full text-xs text-left rtl:text-right rounded-lg">
            <thead className="">
              <tr className="border-b border-light-borderGray dark:border-borderGray text-light-font02 dark:text-font02 bg-light-subBg dark:bg-subBg">
                <th scope="col" className="pl-4 py-3">
                  <div className="flex items-center">
                    <input
                      id="link-checkbox"
                      type="checkbox"
                      value=""
                      className="w-[14px] h-[14px]"
                    />
                  </div>
                </th>
                <th scope="col" className="py-2">
                  Name
                </th>
                <th scope="col" className="pl-6 py-2">
                  Index Number
                </th>
                <th scope="col" className="pr-6 py-2">
                  Username
                </th>
                <th scope="col" className="pr-6 py-2">
                  Role
                </th>
                <th scope="col" className="pr-6 py-2">
                  Status
                </th>
                <th scope="col" className="px-0 py-2">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1].map((_) => (
                <tr className="border-light-borderGray dark:border-borderGray">
                  <td className="pl-4 py-2">
                    <div className="flex items-center">
                      <input
                        id="link-checkbox"
                        type="checkbox"
                        value=""
                        className="w-[14px] h-[14px]"
                      />
                    </div>
                  </td>
                  <td className="py-2">Arun deshan</td>
                  <td className="pl-6 py-2">18APC3535</td>
                  <td className="pr-6 py-2">arun68</td>
                  <td className="pr-6 py-2">Student</td>
                  <td className="pr-6 py-2">Active</td>
                  <td className="pl-0 py-2">
                    <div className="flex flex-row gap-x-4">
                      <PencilIcon className="h-3 w-3 hover:cursor-pointer text-light-font01 dark:text-font01" />
                      <TrashIcon className="h-3 w-3 hover:cursor-pointer text-light-font01 dark:text-font01" />
                    </div>
                  </td>
                </tr>
              ))}
              <tr className="bg-light-subBg dark:bg-subBg">
                <td colSpan={7} className="py-3">
                  <div className="flex justify-between items-center">
                    <span className="text-font01 pl-3">2 rows selected</span>

                    <div className="flex justify-end gap-x-4 flex-row pr-4">
                      <button className="border border-light-borderGray dark:border-borderGray p-1 rounded-md">
                        <ChevronLeftIcon className="h-3 w-3 text-light-font01 dark:text-font01" />
                      </button>
                      <button className="border border-light-borderGray dark:border-borderGray p-1 rounded-md">
                        <ChevronRightIcon className="h-3 w-3 text-light-font01 dark:text-font01" />
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="border rounded-lg overflow-hidden border-light-borderGray dark:border-borderGray p-3 min-w-[250px] w-[35%] h-fit flex justify-center">
          <Pie data={pieChartData} options={pieChartOptions} />
        </div>
      </div>
    </main>
  );
};

export default UserManagement;
