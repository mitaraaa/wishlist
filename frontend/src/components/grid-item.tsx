import { AnimatePresence, motion } from "framer-motion";
import { Link2, Trash } from "lucide-react";
import { useState } from "react";

import useDragAndDrop from "@/hooks/use-drag-and-drop";
import { useAppDispatch } from "@/redux/hooks";
import { removeItem, updateItem } from "@/redux/itemSlice";
import { Item } from "@/types/item";

import "@/styles/grid-item.css";

import ResizePopover from "./resize-popover";

const GridItem = ({ item }: GridItemProps) => {
  const [hovered, setHovered] = useState(false);

  const dispatch = useAppDispatch();
  const { isDragging } = useDragAndDrop();

  const handleSizeChange = (width: number, height: number) => {
    dispatch(updateItem({ ...item, width, height }));
  };

  const handleDelete = () => {
    dispatch(removeItem(item.id));
  };

  return (
    <motion.div
      className="grid-item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      // open new tab when clicking on the product URL (uncomment when view mode is implemented)
      // onClick={() => item.productUrl && window.open(item.productUrl, "_blank")}
    >
      <div className="grid-item__text">
        {item.productUrl && (
          <div className="grid-item__url z-[1] text-white">
            <Link2 size={16} strokeWidth={1.5} />
            <span>{new URL(item.productUrl).hostname}</span>
          </div>
        )}
        <h2 className="z-[1] w-full overflow-hidden text-ellipsis whitespace-nowrap text-white">
          {item.title}
        </h2>
        {item.price && <p className="z-[1] text-white">{item.price}</p>}
      </div>
      <div
        style={{
          backgroundImage: `url(${item.imageUrl})`,
        }}
        className="grid-item__bg absolute bottom-0 left-0 right-0 top-0 z-0 bg-cover bg-center bg-no-repeat brightness-50 bg-gray-50"
      />
      <AnimatePresence>
        {hovered && !isDragging && (
          <>
            <ResizePopover item={item} onChange={handleSizeChange} />
            <motion.div
              className="grid-item__trash-container"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.1 }}
              onClick={handleDelete}
            >
              <Trash size={16} className="grid-item__trash" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

interface GridItemProps {
  item: Item;
}

export default GridItem;
