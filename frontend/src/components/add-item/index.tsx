import { Button, DialogTitle } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import useDragAndDrop from "@/hooks/use-drag-and-drop";
import useTimer from "@/hooks/use-timer";
import { useAppDispatch } from "@/redux/hooks";
import { addItem } from "@/redux/itemSlice";

import "@/styles/add-item.css";

import Dialog from "../ui/dialog";
import FloatingButton from "./floating-button";
import AddItemForm from "./form";
import { AddItem, itemSchema } from "./types";

const AddItemDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [shake, setShake] = useState(false);
  const shakeTimer = useTimer();

  const dispatch = useAppDispatch();
  const { isDragging } = useDragAndDrop();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddItem>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      imageUrl: "",
      title: "",
      price: "",
      productUrl: "",
    },
  });

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = (values: AddItem) => {
    dispatch(addItem(values));
    setIsOpen(false);
  };

  const onError = () => {
    setShake(true);
    shakeTimer.start(() => setShake(false), 500);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && !isDragging && (
          <FloatingButton onClick={() => setIsOpen(true)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            shake={shake}
            key="add-item-dialog"
          >
            <DialogTitle className="dialog__title">Add item</DialogTitle>
            <AddItemForm
              onSubmit={handleSubmit(onSubmit, onError)}
              register={register}
              errors={errors}
              shake={shake}
            />
            <div className="dialog__actions">
              <Button
                className="btn secondary"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="btn primary"
                onClick={handleSubmit(onSubmit, onError)}
              >
                Add
              </Button>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};

export default AddItemDialog;
