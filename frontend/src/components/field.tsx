import { Field as HeadlessField, Label } from "@headlessui/react";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";

import "@/styles/form.css";

const Field = ({ children, className, label, required, error }: FieldProps) => {
  return (
    <HeadlessField className={classNames("form-field", className)}>
      {label && (
        <Label
          className={classNames(
            "form-field__label flex gap-[2px]",
            error ? "text-red-500" : "text-gray-500",
          )}
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            layout="position"
            className="form-field__error"
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -4 }}
            transition={{ duration: 0.1 }}
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </HeadlessField>
  );
};

interface FieldProps {
  error?: string;
  label?: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}

export default Field;
