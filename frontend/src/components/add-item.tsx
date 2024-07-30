import {
  Button as HeadlessButton,
  Dialog,
  DialogBackdrop as HeadlessDialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import "../styles/add-item.css";
import useDragAndDrop from "../hooks/use-drag-and-drop";

const Button = motion(HeadlessButton);
const DialogBackdrop = motion(HeadlessDialogBackdrop);

const AddItemDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { isDragging } = useDragAndDrop();

  return (
    <>
      <AnimatePresence>
        {!isOpen && !isDragging && (
          <Button
            className="add-item"
            onClick={() => setIsOpen(true)}
            initial={{
              y: 32,
              opacity: 0,
              scale: 0.95,
              x: "-50%",
            }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{
              y: 32,
              opacity: 0,
              scale: 0.95,
              x: "-50%",
            }}
            transition={{ duration: 0.1 }}
          >
            <Plus size={16} />
            Add Item
          </Button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <Dialog
            static
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="relative z-50"
          >
            <DialogBackdrop
              className="fixed inset-0 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div className="fixed inset-0 flex w-screen items-center justify-center p-4">
              <DialogPanel
                className="dialog"
                as={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <DialogTitle className="dialog__title">Add item</DialogTitle>
                ...
                <div className="dialog__actions">
                  <Button
                    className="btn secondary"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="btn primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Add
                  </Button>
                </div>
              </DialogPanel>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};

export default AddItemDialog;
