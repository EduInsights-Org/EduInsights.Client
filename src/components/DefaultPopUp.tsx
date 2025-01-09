import {
  Button,
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
  Label,
} from "@headlessui/react";
import clsx from "clsx";

interface ConfirmationOptions {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DefaultPopUp = ({
  message,
  onConfirm,
  onCancel,
}: ConfirmationOptions) => {
  return (
    <Dialog open={true} onClose={onCancel} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 ring-1 ring-inset dark:ring-lightbluestroke ring-light-blueStroke bg-light-white dark:bg-darkblue p-8 rounded-md min-w-[32rem] shadow-lg">
          <DialogTitle className="font-bold dark:text-white text-light-black ">
            {message}
          </DialogTitle>
          <Description>
            <Field>
              <Label className="text-sm text-grayfont">Batch Name</Label>
              <Input
                className={clsx(
                  "ring-1 ring-inset mt-1 mb-6 block w-full rounded-md bg-light-lightblack dark:bg-lightbluestroke dark:ring-lightbluestroke ring-light-blueStroke py-2.5 px-3 text-sm text-light-black dark:text-white",
                  "focus:outline-none data-[focus]:outline-1 data-[focus]:-outline-offset-1 data-[focus]:outline-light-darkgrayfont"
                )}
              />
            </Field>
          </Description>
          <div className="flex justify-end gap-x-4">
            <Button
              className="rounded-md ring-1 ring-inset ring-lightbluestroke py-2 px-4 text-xs font-semibold text-light-black dark:text-white shadow-inner focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="gap-2 rounded-md dark:bg-light-white bg-darkblack py-2 px-4 text-xs font-semibold text-light-white dark:text-black"
            >
              Create Batch
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default DefaultPopUp;
