import { useContext } from "react";
import { DragAndDropContext } from "../contexts/drag-and-drop-context";

const useDragAndDrop = () => {
  const context = useContext(DragAndDropContext);

  if (!context) {
    throw new Error("useDragAndDrop must be used within a DragAndDropProvider");
  }

  return context;
};

export default useDragAndDrop;
