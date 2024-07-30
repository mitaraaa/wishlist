import { useEffect } from "react";
import GridLayout from "react-grid-layout";
import GridItem from "./components/grid-item";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { updateItems } from "./redux/itemSlice";
import { Item } from "./types/item";
import AddItemDialog from "./components/add-item";
import useDragAndDrop from "./hooks/use-drag-and-drop";

const mockData = [
  {
    id: "1",
    width: 2,
    height: 2,
    row: 1,
    column: 1,

    imageUrl:
      "https://ae04.alicdn.com/kf/S71ea680d5c8b4bb59c07c801c0f4d16aR.jpg_640x640.jpg_.webp",
    title:
      "TRAF GAL 2024 Spring Woman Fashion Suit Jacket Casual Slim Double Breasted Notch Neck Office Lady Solid Blazers Y2K Tops",
    price: "€ 21.10",
  },
  {
    id: "2",
    width: 2,
    height: 1,
    row: 3,
    column: 1,

    imageUrl:
      "https://ae04.alicdn.com/kf/S214f180ba36b4113abc668a280f7b9d4d.jpg_.webp",
    title:
      "Metal Zirconia Mansard Open Geometric Ring Women's Exaggerated Glamour Ring Banquet Jewelry Accessories",
    price: "€ 0.91",
  },
  {
    id: "3",
    width: 1,
    height: 3,
    row: 1,
    column: 3,

    imageUrl:
      "https://ae04.alicdn.com/kf/Hef254f2650d14199a63211bdee32c0d6i.jpg_640x640.jpg_.webp",
    title: "tied woman pullover",
    price: "€ 7.88",
  },
  {
    id: "4",
    width: 2,
    height: 3,
    row: 1,
    column: 4,

    imageUrl:
      "https://ae04.alicdn.com/kf/Sc285ea03a70644b6a3e62663093b3169e.jpg_640x640.jpg_.webp",
    title:
      "Shirring Casual Wide Leg Pants Women High Waist Street Basic Loose Sweat Trousers Korean Retro Gray Office Y2K Lady Pants",
    price: "€ 7.16",
  },
];

const App = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.item.items);

  const { onDragStart, onDragStop } = useDragAndDrop();

  useEffect(() => {
    dispatch(updateItems(mockData as Item[]));
  }, []);

  return (
    <>
      <main className="flex w-[864px] flex-col gap-8">
        <header className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold">my wishlist</h1>
          <span className="text-gray-400">
            drag and drop items to rearrange
          </span>
        </header>
        <GridLayout
          cols={5}
          width={864}
          containerPadding={[0, 0]}
          rowHeight={160}
          isResizable={false}
          useCSSTransforms={true}
          margin={[16, 16]}
          layout={items.map((item) => ({
            i: item.id,
            x: item.column - 1,
            y: item.row - 1,
            w: item.width,
            h: item.height,
          }))}
          onDragStart={onDragStart}
          onDragStop={onDragStop}
        >
          {items.map((item) => (
            <div
              className="grid-item-wrapper"
              key={item.id}
              data-grid={{
                w: item.width,
                h: item.height,
                x: item.column - 1,
                y: item.row - 1,
              }}
            >
              <GridItem item={item} />
            </div>
          ))}
        </GridLayout>
      </main>
      <AddItemDialog />
    </>
  );
};

export default App;
