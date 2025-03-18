import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

import AppButton from "@components/AppButton";

interface ConfirmationOptions {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}
const DeleteConfirmationForm = ({
  message,
  onConfirm,
  onCancel,
}: ConfirmationOptions) => {
  return (
    <Dialog open={true} onClose={onCancel} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/70">
        <DialogPanel className="max-w-lg space-y-4 border-[1px] border-light-borderGray dark:border-borderGray bg-light-mainBg dark:bg-mainBg p-8 rounded-sm min-w-[32rem] shadow-lg">
          <DialogTitle className="font-bold text-light-font01 dark:text-font01">
            {message}
          </DialogTitle>

          <div className="flex justify-end gap-x-4">
            <AppButton
              title="No"
              variant="outline"
              onClick={onConfirm}
              color="error"
            />

            <AppButton
              title="Yes"
              variant="fill"
              onClick={onCancel}
              color="error"
            />
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default DeleteConfirmationForm;
