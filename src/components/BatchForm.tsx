import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
  Label,
} from "@headlessui/react";
import { clsx } from "clsx";
import { BatchCreatePayload, createBatch } from "@slices/batchSlice";
import { useAppDispatch, useAppSelector } from "@slices/store";
import { useState } from "react";

import { RequestState } from "@utils/enums";
import AppButton from "@components/AppButton";

interface ConfirmationOptions {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}
const BatchForm = ({ message, onConfirm, onCancel }: ConfirmationOptions) => {
  const dispatch = useAppDispatch();
  const instituteId = useAppSelector((state) => state.institute.institute!.id);
  const batchCreateStatus = useAppSelector((state) => state.batch.createStatus);

  const [batchName, setBatchName] = useState("");

  const handleCreateBatch = async () => {
    if (!instituteId || !batchName) return;
    const batch: BatchCreatePayload = {
      name: batchName,
      instituteId: instituteId,
    };
    await dispatch(
      createBatch({ name: batch.name, instituteId: batch.instituteId })
    ).then(() => {
      onConfirm();
    });
  };
  return (
    <Dialog open={true} onClose={onCancel} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/70">
        <DialogPanel className="max-w-lg space-y-4 border-[1px] border-light-borderGray dark:border-borderGray bg-light-mainBg dark:bg-mainBg p-8 rounded-sm min-w-[32rem] shadow-lg">
          <DialogTitle className="font-bold text-light-font01 dark:text-font01">
            {message}
          </DialogTitle>
          <Description>
            <Field>
              <Label className="text-sm text-light-font01 dark:text-font01">
                Batch Name
              </Label>
              <Input
                value={batchName}
                onChange={(e) => setBatchName(e.target.value)}
                className={clsx(
                  "ring-1 ring-inset mt-1 mb-4 block w-full rounded-md bg-light-subBg dark:bg-subBg dark:ring-borderGray ring-light-borderGray py-2.5 px-3 text-sm text-light-font01 dark:text-font01",
                  "focus:outline-none data-[focus]:outline-1 data-[focus]:-outline-offset-1 data-[focus]:outline-light-font01 dark:data-[focus]:outline-font01"
                )}
              />
            </Field>
          </Description>

          <div className="flex justify-end gap-x-4">
            <AppButton
              title="Cancel"
              variant="outline"
              onClick={onCancel}
              color="transparent"
            />

            <AppButton
              title="Create"
              variant="fill"
              onClick={onCancel}
              color="primary"
              isLoading={batchCreateStatus === RequestState.LOADING}
            />
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default BatchForm;
