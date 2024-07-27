import "../styles/resize-popover.css";

import { Field, Radio, RadioGroup } from "@headlessui/react";
import { useEffect, useState } from "react";
import { Item } from "../types/item";
import { motion } from "framer-motion";

const sizeMap: {
  type: "square" | "horizontal" | "vertical";
  size: "small" | "medium" | "large";
  width: 1 | 2 | 3;
  height: 1 | 2 | 3;
}[] = [
  { type: "square", size: "small", width: 1, height: 1 },
  { type: "square", size: "medium", width: 2, height: 2 },
  { type: "square", size: "large", width: 3, height: 3 },
  { type: "horizontal", size: "small", width: 2, height: 1 },
  { type: "horizontal", size: "medium", width: 3, height: 1 },
  { type: "horizontal", size: "large", width: 3, height: 2 },
  { type: "vertical", size: "small", width: 1, height: 2 },
  { type: "vertical", size: "medium", width: 1, height: 3 },
  { type: "vertical", size: "large", width: 2, height: 3 },
];

const ResizePopover = ({ item, onChange }: ResizePopoverProps) => {
  const [typeSelected, setTypeSelected] = useState<{
    width: 1 | 2 | 3;
    height: 1 | 2 | 3;
  }>({
    width: item.width as 1 | 2 | 3,
    height: item.height as 1 | 2 | 3,
  });

  useEffect(() => {
    onChange(typeSelected.width, typeSelected.height);
  }, [typeSelected]);

  return (
    <motion.div
      className="resize-popover"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-row">
        <RadioGroup
          className="resize-popover__radio-group"
          value={`${typeSelected.width}x${typeSelected.height}`}
          onChange={(value) =>
            setTypeSelected(
              sizeMap.find(
                (typeSize) => `${typeSize.width}x${typeSize.height}` === value,
              )!,
            )
          }
        >
          {sizeMap.map((typeSize) => (
            <Field key={`${typeSize.width}x${typeSize.height}`}>
              <Radio
                value={`${typeSize.width}x${typeSize.height}`}
                data-checked={
                  typeSize.width === typeSelected.width &&
                  typeSize.height === typeSelected.height
                }
                className="resize-popover__radio"
              >
                <img
                  src={`/${typeSize.width}x${typeSize.height}.svg`}
                  className="size-icon"
                />
              </Radio>
            </Field>
          ))}
        </RadioGroup>
      </div>
    </motion.div>
  );
};

interface ResizePopoverProps {
  item: Item;
  onChange: (width: number, height: number) => void;
}

export default ResizePopover;
