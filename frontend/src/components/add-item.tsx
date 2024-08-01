import { Button, DialogTitle, Input } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { useForm } from "react-hook-form";
import { z } from "zod";

import useDragAndDrop from "@/hooks/use-drag-and-drop";
import useTimer from "@/hooks/use-timer";
import { useAppDispatch } from "@/redux/hooks";
import { addItem } from "@/redux/itemSlice";

import "@/styles/add-item.css";

import Dialog from "./dialog";
import Field from "./field";

const itemSchema = z.object({
  title: z.string().min(1),
  productUrl: z.union([z.string().trim().url(), z.literal("")]),
  imageUrl: z.union([z.string().trim().url(), z.literal("")]),
  price: z.string().optional(),
});

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
  } = useForm<z.infer<typeof itemSchema>>({
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

  const onSubmit = (values: z.infer<typeof itemSchema>) => {
    dispatch(
      addItem({
        imageUrl: values.imageUrl,
        title: values.title,
        price: values.price,
        productUrl: values.productUrl,
      }),
    );

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
          <Button
            as={motion.button}
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
            transition={{
              duration: 0.1,
            }}
          >
            <Plus size={16} />
            Add item
          </Button>
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

            <form
              className="add-item-form"
              onKeyDown={(e) =>
                e.key === "Enter" && handleSubmit(onSubmit, onError)()
              }
            >
              <Field
                label="Title"
                error={errors.title && "Title is required"}
                required
              >
                <Input
                  data-invalid={shake && errors.title !== undefined}
                  className="form-field__input"
                  type="text"
                  placeholder="A cool product"
                  {...register("title")}
                />
              </Field>
              <Field
                label="Product URL"
                error={errors.productUrl && "Valid URL required"}
              >
                <Input
                  data-invalid={shake && errors.productUrl !== undefined}
                  className="form-field__input"
                  type="text"
                  placeholder="https://example.com/product"
                  {...register("productUrl")}
                />
              </Field>
              <Field
                label="Image URL"
                error={errors.imageUrl && "Valid URL required"}
              >
                <Input
                  data-invalid={shake && errors.imageUrl !== undefined}
                  className="form-field__input"
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  {...register("imageUrl")}
                />
              </Field>
              <Field label="Price">
                <CurrencyInput
                  className="form-field__input currency-input"
                  prefix="€"
                  placeholder="€0.00"
                  {...register("price")}
                />
              </Field>
            </form>

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
