import { Input } from "@headlessui/react";
import CurrencyInput from "react-currency-input-field";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import Field from "../ui/field";
import { AddItem } from "./types";

const AddItemForm = ({
  onSubmit,
  register,
  errors,
  shake,
}: AddItemFormProps) => {
  return (
    <form
      className="add-item-form"
      onKeyDown={(e) => e.key === "Enter" && onSubmit()}
      autoComplete="off"
      autoFocus
    >
      <Field label="Title" error={errors.title && "Title is required"} required>
        <Input
          data-invalid={shake && errors.title !== undefined}
          className="form-field__input"
          autoFocus
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
          type="url"
          placeholder="https://example.com/product"
          {...register("productUrl")}
        />
      </Field>
      <Field label="Image URL" error={errors.imageUrl && "Valid URL required"}>
        <Input
          data-invalid={shake && errors.imageUrl !== undefined}
          className="form-field__input"
          type="url"
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
  );
};

interface AddItemFormProps {
  onSubmit: () => void;
  register: UseFormRegister<AddItem>;
  errors: FieldErrors<AddItem>;

  shake: boolean;
}

export default AddItemForm;
