import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import toast from "react-hot-toast";
import MenuItemTile from "./MenuItemTile";

export default function MenuItem(menuItem) {
  const {
    imageUrl,
    name,
    description,
    basePrice,
    sizes,
    extraIngredientPrices,
  } = menuItem;

  const { addToCart } = useContext(CartContext);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedExtras, setSelectedExtras] = useState([]);

  function handleAddToCartButtonClick() {
    const hasOptions = sizes.length > 0 && extraIngredientPrices.length > 0;
    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return;
    } else {
      addToCart(menuItem, selectedSize, selectedExtras);
      setShowPopup(false);
      toast.success("Added to cart!");
    }
  }

  function handleExtraThingClick(event, extraThing) {
    const checked = event.target.checked;
    if (checked) {
      setSelectedExtras((prev) => [...prev, extraThing]);
    } else {
      setSelectedExtras((prev) => {
        return prev.filter((e) => e.name !== extraThing.name);
      });
    }
  }

  let selectedPrice = basePrice;

  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }

  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra.price;
    }
  }

  return (
    <>
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="bg-white p-2 rounded-lg max-w-md max-h-screen"
          >
            <div
              className="overflow-y-scroll p-2"
              style={{ maxHeight: "calc(100vh - 80px)" }}
            >
              <img
                src={imageUrl}
                alt={name}
                className="mx-auto h-[200px] w-[300px]"
              />
              <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
              <p className="text-center text-sm mb-2">{description}</p>
              {sizes?.length > 0 && (
                <div className="py-2">
                  <h3 className="text-center text-gray-700">Pick your size</h3>
                  {sizes.map((size, i) => (
                    <label
                      key={i}
                      className="flex items-center gap-2 p-4 border rounded-md mb-1"
                    >
                      <input
                        type="radio"
                        onClick={() => setSelectedSize(size)}
                        checked={selectedSize?.name === size.name}
                        name="size"
                      />
                      {size.name} ${basePrice + size.price}
                    </label>
                  ))}
                  {extraIngredientPrices?.length > 0 && (
                    <div className="py-2">
                      <h3 className="text-center text-gray-700 ">
                        Any extras?
                      </h3>
                      {extraIngredientPrices.map((extraThing, index) => (
                        <label
                          key={index}
                          className="flex items-center gap-2 p-4 border rounded-md mb-1"
                        >
                          <input
                            type="checkbox"
                            onClick={() =>
                              handleExtraThingClick(event, extraThing)
                            }
                            name={extraThing.name}
                          />
                          {extraThing.name} + ${extraThing.price}
                        </label>
                      ))}
                    </div>
                  )}
                  <button
                    className="primary sticky bottom-2"
                    onClick={handleAddToCartButtonClick}
                    type="button"
                  >
                    Add to cart ${selectedPrice}
                  </button>
                  <button className="mt-2" onClick={() => setShowPopup(false)}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
    </>
  );
}
