import {
  ArrowPathIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { useAppDispatch, useAppSelector } from "@slices/store";
import {
  getRoleDistribution,
  getUsers,
  resetPagination,
  User,
} from "@slices/userSlice";
import { Badge, Select, TextField } from "@radix-ui/themes";
import { capitalize } from "@utils/utils";
import { RequestState, Role } from "@utils/enums";
import AppTable, { TableColumn } from "@components/AppTable";
import { usePopUp } from "@/context/PopUpContext";
import DeleteConfirmationForm from "@/components/DeleteConfirmationForm";
import useChart from "@/hooks/useChart";

const UserManagement = () => {
  const dispatch = useAppDispatch();
  const { showPopUp, hidePopUp } = usePopUp();
  const { getChartOptions, setChartData } = useChart();

  const [page, setPage] = useState(1);
  const [selectBatch, setSelectBatch] = useState<string | null>(null);

  const user = useAppSelector((state) => state.auth.userInfo);
  const instituteId = useAppSelector((state) => state.institute.institute!.id);
  const batches = useAppSelector((state) => state.batch.batches);
  const users = useAppSelector((state) => state.user.paginatedResponse.data);
  const usersLoading = useAppSelector((state) => state.user.status);
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
    initialLoad();
  }, [instituteId, selectBatch, page, pageSize]);

  const initialLoad = async () => {
    const result = await dispatch(
      getUsers({ instituteId, batchId: selectBatch, page, pageSize })
    );
    if (!getUsers.fulfilled.match(result)) dispatch(resetPagination());

    handleGetRoleDistribution();
  };

  const reloadTableData = () => {
    initialLoad();
  };

  const handleGetRoleDistribution = async () => {
    await dispatch(getRoleDistribution({ instituteId }));
  };

  const pieChartData = setChartData({
    labels: Object.keys(Role) as Array<keyof typeof Role>,
    datasetLabel: "Role",
    dataset: [
      roleDistribution.superAdmin,
      roleDistribution.admin,
      roleDistribution.dataEntry,
      roleDistribution.student,
    ],
  });

  const columns: TableColumn<User>[] = [
    {
      key: "name",
      header: "Name",
      render: (item: User) => {
        const isMe: boolean = item.email === user.email;
        const fullName = item.firstName + " " + item.lastName;
        const displayName = isMe ? fullName + " - me" : fullName;
        return <> {displayName}</>;
      },
    },
    {
      key: "indexNumber",
      header: "Index Number",
      render: (item: User) => (
        <>{item.indexNumber === null ? <>N/A</> : <>{item.indexNumber}</>}</>
      ),
    },
    { key: "email", header: "Email" },
    {
      key: "role",
      header: "Role",
      render: (item: User) => (
        <Badge
          size={"1"}
          color={
            item.role === Role.SuperAdmin
              ? "blue"
              : item.role === Role.Admin
              ? "grass"
              : item.role === Role.dataEntry
              ? "violet"
              : "orange"
          }
        >
          {capitalize(item.role)}
        </Badge>
      ),
    },
    {
      key: "id",
      header: "Actions",
      render: (item: User) => (
        <div className="flex flex-row gap-x-4 w-fit">
          <PencilIcon
            onClick={() => handleDeleteUser()}
            className="h-3 w-3 text-light-font01 dark:text-font01"
          />
          <button
            disabled={item.email === user.email}
            onClick={() => showCustomPopup(item.id)}
          >
            <TrashIcon className="h-3 w-3 text-light-font01 dark:text-font01" />
          </button>
        </div>
      ),
    },
  ];

  const handleSelect = (selectedItems: User[]) => {
    console.log("Selected Items:", selectedItems);
  };

  const handlePagination = (_page: number) => {
    dispatch(
      getUsers({ instituteId, batchId: selectBatch, page: _page, pageSize })
    );
  };

  const showCustomPopup = (userId: string) => {
    showPopUp({
      message: "Are you sure you want to delete this user?",
      onConfirm: handleDeleteUser,
      onCancel: handleDeleteUser,
      render: (message, onConfirm, onCancel) => (
        <DeleteConfirmationForm
          message={message}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      ),
    });
  };

  const handleDeleteUser = () => {
    // alert(`Delete user with id: ${userId}`);
  };

  return (
    <main>
      <div className="flex justify-between flex-row-reverse gap-x-2">
        <div className="border flex flex-col rounded-lg overflow-hidden border-light-borderGray dark:border-borderGray min-w-[600px] w-[65%] h-[500px]">
          {/* table header */}
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

            <button
              onClick={reloadTableData}
              className="ml-auto text-xs text-light-font02 dark:text-font02 flex justify-center items-center gap-x-1"
            >
              <ArrowPathIcon className="size-3" />
              Refresh
            </button>
          </div>

          {/* table content */}
          <AppTable
            data={users}
            columns={columns}
            loading={usersLoading === RequestState.LOADING}
            checkboxSelection
            onSelect={handleSelect}
            pagination={{
              handlePagination,
              pageSize,
              totalRecords,
            }}
          />
        </div>

        {/* chart */}
        <div className="border rounded-lg overflow-hidden border-light-borderGray dark:border-borderGray min-w-[250px] w-[35%] h-[500px] flex flex-col">
          <div className="flex items-center py-4 px-3 bg-light-subBg dark:bg-subBg">
            <button
              onClick={handleGetRoleDistribution}
              className="ml-auto text-xs text-light-font02 dark:text-font02 flex justify-center items-center gap-x-1"
            >
              <ArrowPathIcon className="size-3" />
              Refresh
            </button>
          </div>
          <Pie
            data={pieChartData}
            options={getChartOptions({
              title: "User Role Distribution",
            })}
          />
        </div>
      </div>
    </main>
  );
};

export default UserManagement;
