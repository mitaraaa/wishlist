import { createContext, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { updateItems } from "../redux/itemSlice";
import { Layout } from "react-grid-layout";

type DragEventHandler = (
  layout: Layout[],
  oldItem: Layout,
  newItem: Layout,
  placeholder: Layout,
  e: MouseEvent,
  element: HTMLElement,
) => void;

const DragAndDropContext = createContext<{
  isDragging: boolean;
  onDragStart: DragEventHandler;
  onDragStop: DragEventHandler;
}>({
  isDragging: false,
  onDragStart: () => {},
  onDragStop: () => {},
});

const DragAndDropProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.item.items);

  const [isDragging, setIsDragging] = useState(false);

  const onDragStart: DragEventHandler = () => {
    setIsDragging(true);
  };

  const onDragStop: DragEventHandler = (layout) => {
    dispatch(
      updateItems(
        items.map((item) => {
          const { x, y } = layout.find((l) => l.i === item.id)!;
          return { ...item, row: y + 1, column: x + 1 };
        }),
      ),
    );

    setIsDragging(false);
  };

  return (
    <DragAndDropContext.Provider
      value={{ isDragging, onDragStart, onDragStop }}
    >
      {children}
    </DragAndDropContext.Provider>
  );
};

export { DragAndDropContext };
export default DragAndDropProvider;
