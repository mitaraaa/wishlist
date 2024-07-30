import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Button as HeadlessButton,
  DialogBackdrop as HeadlessDialogBackdrop,
  Input,
  Label,
} from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { useForm } from "react-hook-form";
import { z } from "zod";

import useDragAndDrop from "@/hooks/use-drag-and-drop";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addItem } from "@/redux/itemSlice";
import findFirstFreeSpot from "@/utils/free-grid-spot";

import "@/styles/add-item.css";

const Button = motion(HeadlessButton);
const DialogBackdrop = motion(HeadlessDialogBackdrop);

const itemSchema = z.object({
  imageUrl: z.string().optional(),
  title: z.string(),
  price: z.string().optional(),
  productUrl: z.string().url().optional(),
});

const AddItemDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.item.items);

  const { register, handleSubmit } = useForm<z.infer<typeof itemSchema>>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      imageUrl: "",
      title: "",
      price: "",
      productUrl: "",
    },
  });

  const { isDragging } = useDragAndDrop();

  const onSubmit = (values: z.infer<typeof itemSchema>) => {
    const spot = findFirstFreeSpot(items, 1, 1, 5);

    dispatch(
      addItem({
        imageUrl: values.imageUrl,
        title: values.title,
        price: values.price,
        productUrl: values.productUrl,
        row: spot.row,
        column: spot.col,
        width: 1,
        height: 1,
        id: Math.random().toString(36).slice(2, 9),
      }),
    );

    setIsOpen(false);
  };

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
            transition={{
              duration: 0.1,
              type: "tween",
              ease: [0.16, 1, 0.3, 1],
            }}
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

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="add-item-form"
                >
                  <Field className="form-field">
                    <Label className="form-field__label">Product URL</Label>
                    <Input
                      className="form-field__input"
                      type="text"
                      placeholder="https://example.com/product"
                      {...register("productUrl", { required: false })}
                    />
                  </Field>
                  <Field className="form-field">
                    <Label className="form-field__label">Image URL</Label>
                    <Input
                      className="form-field__input"
                      type="text"
                      placeholder="https://example.com/image.jpg"
                      {...register("imageUrl", { required: false })}
                    />
                  </Field>
                  <Field className="form-field">
                    <Label className="form-field__label flex gap-[2px]">
                      Title
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      className="form-field__input"
                      type="text"
                      placeholder="A cool product"
                      {...register("title", { required: true })}
                    />
                  </Field>
                  <Field className="form-field">
                    <Label className="form-field__label">Price</Label>
                    <CurrencyInput
                      className="form-field__input currency-input"
                      // euro
                      prefix="€"
                      placeholder="€0.00"
                      {...register("price", { required: false })}
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
                    onClick={() => handleSubmit(onSubmit)()}
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
