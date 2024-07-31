import { createContext, useEffect, useRef, useState } from "react";
import { Layout } from "react-grid-layout";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateItems } from "@/redux/itemSlice";

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
  const dragTimer = useRef<NodeJS.Timeout | null>(null);

  const DRAG_DELAY = 200;

  const onDragStart: DragEventHandler = () => {
    dragTimer.current = setTimeout(() => {
      setIsDragging(true);
    }, DRAG_DELAY);
  };

  const onDragStop: DragEventHandler = (layout) => {
    if (dragTimer.current) {
      clearTimeout(dragTimer.current);
      dragTimer.current = null;
    }

    setIsDragging(false);

    dispatch(
      updateItems(
        items.map((item) => {
          const { x, y } = layout.find((l) => l.i === item.id)!;
          return { ...item, row: y + 1, column: x + 1 };
        }),
      ),
    );
  };

  useEffect(() => {
    return () => {
      if (dragTimer.current) {
        clearTimeout(dragTimer.current);
      }
    };
  }, []);

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
