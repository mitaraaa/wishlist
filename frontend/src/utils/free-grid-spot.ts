import { Item } from "@/types/item";

const findFirstFreeSpot = (
  mockData: Item[],
  width: number,
  height: number,
  gridWidth: number,
): { row: number; column: number } => {
  let row = 1;
  let column = 1;

  while (true) {
    if (isSpotAvailable(mockData, row, column, width, height, gridWidth)) {
      return { row, column };
    }
    column++;
    if (column > gridWidth) {
      column = 1;
      row++;
    }
  }
};

const isSpotAvailable = (
  data: Item[],
  startRow: number,
  startCol: number,
  width: number,
  height: number,
  gridWidth: number,
): boolean => {
  if (startCol + width - 1 > gridWidth) {
    return false; // Check if the item would overflow the grid width
  }
  for (let item of data) {
    if (
      startRow < item.row + item.height &&
      startRow + height > item.row &&
      startCol < item.column + item.width &&
      startCol + width > item.column
    ) {
      return false;
    }
  }
  return true;
};

export default findFirstFreeSpot;
