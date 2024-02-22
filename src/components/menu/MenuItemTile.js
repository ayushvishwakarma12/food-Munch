export default function MenuItemTile({ onAddToCart, ...item }) {
  const {
    imageUrl,
    description,
    name,
    basePrice,
    sizes,
    extraIncgredientPrices,
  } = item;
  const hasSizesOrExtras =
    sizes?.length > 0 || extraIncgredientPrices?.length > 0;

  return (
    <div className="bg-white  text-center  hover:shadow-md hover:shadow-black/25 transition-all rounded-3xl">
      <div className="text-center p-5">
        <img
          src={imageUrl}
          alt="pizza"
          className="max-h-auto max-h-[220px] block mx-auto w-full object-cover rounded-3xl"
        />
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-xl">{name}</h4>
        <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
        <button
          type="button"
          onClick={onAddToCart}
          className="mt-4 bg-primary text-white rounded-full px-8 py-2"
        >
          {hasSizesOrExtras ? (
            <span>Add to cart (from ${basePrice})</span>
          ) : (
            <span> Add to cart ${basePrice}</span>
          )}
        </button>
      </div>
    </div>
  );
}
