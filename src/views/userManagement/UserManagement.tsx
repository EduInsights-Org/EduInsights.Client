import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
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
import { useAppDispatch, useAppSelector } from "../../slices/store";
import { getRoleDistribution, getUsers } from "../../slices/userSlice";
import { Select, TextField } from "@radix-ui/themes";
import { capitalize } from "../../utils/utils";

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
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(1);
  const [selectBatch, setSelectBatch] = useState<string | null>(null);
  const [usersForDelete, setUsersForDelete] = useState<string[]>([]);

  const instituteId = useAppSelector((state) => state.institute.institute!.id);
  const batches = useAppSelector((state) => state.batch.batches);
  const users = useAppSelector((state) => state.user.paginatedResponse.data);
  const roleDistribution = useAppSelector(
    (state) => state.user.roleDistribution
  );
  const totalRecords = useAppSelector(
    (state) => state.user.paginatedResponse.totalRecords
  );
  const pageSize = useAppSelector(
    (state) => state.user.paginatedResponse.pageSize
  );

  useEffect(() => {
    dispatch(getUsers({ instituteId, batchId: selectBatch, page, pageSize }));
    dispatch(getRoleDistribution({ instituteId }));
  }, [instituteId, selectBatch, page, pageSize]);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const pieChartData = {
    labels: ["Super admin", "Admin", "Data entry", "Student"],
    datasets: [
      {
        label: "Role",
        data: [
          roleDistribution.superAdmin,
          roleDistribution.admin,
          roleDistribution.dataEntry,
          roleDistribution.student,
        ],
        backgroundColor: [
          "#003f5c",
          "#58508d",
          "#bc5090",
          "#ff6361",
          "#ffa600",
        ],
        // borderColor: [
        //   "rgba(30, 92, 199)",
        //   "rgba(56, 118, 225)",
        //   "rgba(100, 148, 232)",
        //   "rgba(144, 179, 238)",
        // ],
        borderWidth: 0,
      },
    ],
  };

  const selectAllForDelete = () => {
    if (usersForDelete.length === users.length) return setUsersForDelete([]);
    setUsersForDelete(users.map((i) => i.id));
  };

  const selectForDelete = (userId: string) => {
    setUsersForDelete((prevUsers) => {
      if (prevUsers.includes(userId)) {
        return prevUsers.filter((id) => id !== userId);
      } else {
        return [...prevUsers, userId];
      }
    });
  };
  return (
    <main>
      <div className="flex justify-between flex-row-reverse gap-x-2">
        <div className="border flex flex-col rounded-lg overflow-hidden border-light-borderGray dark:border-borderGray min-w-[600px] w-[65%]">
          {/* <Bar data={data} options={options} /> */}
          {/* footer */}
          <div className="flex gap-x-3 items-center py-4 px-3 bg-light-subBg dark:bg-subBg">
            <div>
              <TextField.Root
                size="1"
                radius="small"
                placeholder="Search the users..."
              />
            </div>
            <div className="">
              <Select.Root
                size={"1"}
                onValueChange={(batchId) => {
                  setPage(1);
                  if (batchId === "none") return setSelectBatch(null);
                  setSelectBatch(batchId);
                }}
              >
                <Select.Trigger radius="small" placeholder="By Batch" />
                <Select.Content position="popper">
                  <Select.Group>
                    <Select.Item value={"none"}>All</Select.Item>
                    {batches?.map((b) => (
                      <Select.Item key={b.id} value={b.id}>
                        {b.name}
                      </Select.Item>
                    ))}
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </div>
          </div>
          {/* table */}
          <table className="w-full text-xs text-left rtl:text-right rounded-lg">
            <thead className="">
              <tr className="border-b border-light-borderGray dark:border-borderGray text-light-font02 dark:text-font02">
                <th scope="col" className="pl-4 py-3">
                  <div className="flex items-center">
                    <input
                      id="link-checkbox"
                      type="checkbox"
                      value=""
                      className="w-[14px] h-[14px]"
                      onClick={selectAllForDelete}
                      checked={usersForDelete.length === users.length}
                    />
                  </div>
                </th>
                <th scope="col" className="py-2">
                  Id
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
              {users.map((user, index) => (
                <tr
                  key={index}
                  className="border-light-borderGray dark:border-borderGray"
                >
                  <td className="pl-4 py-2">
                    <div className="flex items-center">
                      <input
                        id="link-checkbox"
                        type="checkbox"
                        value=""
                        className="w-[14px] h-[14px]"
                        checked={usersForDelete.some((u) => u === user.id)}
                        onClick={() => selectForDelete(user.id)}
                      />
                    </div>
                  </td>
                  <td className="py-2">{index + (page - 1) * pageSize + 1}</td>
                  <td className="py-2">
                    {user.firstName + " " + user.lastName}
                  </td>
                  <td className="pl-6 py-2">
                    {user.indexNumber === null ? (
                      <>N/A</>
                    ) : (
                      <>{user.indexNumber}</>
                    )}
                  </td>
                  <td className="pr-6 py-2">{user.userName}</td>
                  <td className="pr-6 py-2">{capitalize(user.role)}</td>
                  <td className="pr-6 py-2">Active</td>
                  <td className="pl-0 py-2">
                    <div className="flex flex-row gap-x-4">
                      <PencilIcon className="h-3 w-3 hover:cursor-pointer text-light-font01 dark:text-font01" />
                      <TrashIcon className="h-3 w-3 hover:cursor-pointer text-light-font01 dark:text-font01" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* footer */}
          <div className="flex justify-between items-center py-3 bg-light-subBg dark:bg-subBg mt-auto">
            <span className="text-light-font01 text-xs dark:text-font01 pl-3">
              {usersForDelete.length} rows selected
            </span>
            <span className="text-light-font01 text-xs dark:text-font01 ml-auto mr-4">
              Page {page} of {Math.ceil(totalRecords / pageSize)}
            </span>
            <div className="flex justify-end gap-x-4 flex-row pr-2">
              <button
                className="border border-light-borderGray dark:border-borderGray p-1 rounded-md"
                onClick={handlePreviousPage}
                disabled={page === 1}
              >
                <ChevronLeftIcon className="h-3 w-3 text-light-font01 dark:text-font01" />
              </button>
              <button
                className="border border-light-borderGray dark:border-borderGray p-1 rounded-md"
                onClick={handleNextPage}
                disabled={users.length < pageSize}
              >
                <ChevronRightIcon className="h-3 w-3 text-light-font01 dark:text-font01" />
              </button>
            </div>
          </div>
        </div>
        <div className="border rounded-lg overflow-hidden border-light-borderGray dark:border-borderGray p-3 min-w-[250px] w-[35%] min-h-[470px] flex justify-center">
          <Pie data={pieChartData} options={pieChartOptions} />
        </div>
      </div>
    </main>
  );
};

export default UserManagement;
