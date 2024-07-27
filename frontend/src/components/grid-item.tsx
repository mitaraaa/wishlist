import { useState } from "react";
import "../styles/grid-item.css";
import { Item } from "../types/item";
import ResizePopover from "./resize-popover";
import { AnimatePresence } from "framer-motion";
import { useAppDispatch } from "../redux/hooks";
import { updateItem } from "../redux/itemSlice";

const GridItem = ({ item }: GridItemProps) => {
  const [hovered, setHovered] = useState(false);

  const dispatch = useAppDispatch();

  const handleSizeChange = (width: number, height: number) => {
    dispatch(updateItem({ ...item, width, height }));
  };

  return (
    <div
      className="grid-item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="grid-item__text">
        <h2 className="z-[1] w-full overflow-hidden text-ellipsis whitespace-nowrap text-white">
          {item.title}
        </h2>
        <p className="z-[1] text-white">{item.price}</p>
      </div>
      <div
        style={{
          backgroundImage: `url(${item.imageUrl})`,
        }}
        className="grid-item__bg absolute bottom-0 left-0 right-0 top-0 z-0 bg-cover bg-center bg-no-repeat brightness-50"
      />
      <AnimatePresence>
        {hovered && <ResizePopover item={item} onChange={handleSizeChange} />}
      </AnimatePresence>
    </div>
  );
};

interface GridItemProps {
  item: Item;
}

export default GridItem;
