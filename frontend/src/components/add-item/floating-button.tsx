import { Button } from "@headlessui/react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

const FloatingButton = ({ onClick }: FloatingButtonProps) => {
  return (
    <Button
      as={motion.button}
      className="floating-button"
      onClick={onClick}
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
  );
};

interface FloatingButtonProps {
  onClick: () => void;
}

export default FloatingButton;
