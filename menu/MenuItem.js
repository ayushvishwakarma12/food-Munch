export default function MenuItem() {
  return (
    <div className="bg-gray-200 p-4 hover:bg-white transition-all hover:shadow-md group hover:shadow-black/25 rounded-lg text-center">
      <div className="text-center">
        <img
          className="max-h-auto max-h-24 block mx-auto"
          src="/pizza.png"
          alt="pizza"
        />
      </div>
      <h4 className="font-semibold text-xl my-3">Pepperoni Pizza</h4>
      <p className="text-gray-400 text-sm">Lorem porem</p>
      <button className="mt-4 bg-primary text-white rounded-full px-8">
        Add to cart
      </button>
    </div>
  );
}
