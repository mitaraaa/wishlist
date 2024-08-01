import {
  DialogBackdrop,
  DialogPanel,
  Dialog as HeadlessDialog,
} from "@headlessui/react";
import classNames from "classnames";
import { motion } from "framer-motion";

import "@/styles/add-item.css";

const shakeAnimation = {
  x: [0, -10, 10, -10, 10, 0],
  transition: { duration: 0.5 },
};

const Dialog = ({ open, onClose, children, className, shake }: DialogProps) => {
  return (
    <HeadlessDialog
      static
      open={open}
      onClose={onClose}
      className="relative z-50"
    >
      <DialogBackdrop
        as={motion.div}
        className="fixed inset-0 bg-black/40 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel
          as={motion.div}
          className={classNames(
            "min-w-96 max-w-lg space-y-4 rounded-xl bg-white p-4",
            className,
          )}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{
            opacity: 1,
            scale: 1,
            ...(shake ? shakeAnimation : {}),
          }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          {children}
        </DialogPanel>
      </div>
    </HeadlessDialog>
  );
};

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  shake?: boolean;
}

export default Dialog;
