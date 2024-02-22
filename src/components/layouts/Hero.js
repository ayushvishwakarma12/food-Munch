import Image from "next/legacy/image";
import Right from "../icons/Right";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero mt-4">
      <div className="py-24 max-w-[350px]">
        <h1 className="text-4xl font-semibold">
          Discover Simple, <br />
          Delicious, And <br />
          Fast Recipes
          <span className="text-primary">Pizza</span>
        </h1>
        <p className="my-6 text-gray-500 text-sm">
          A recipe is soulless, The essence of the recipe must come from you,
          the cook
        </p>
        <div className="flex gap-4">
          <button className="bg-primary uppercase flex items-center text-sm gap-2 text-white px-4 py-2 rounded-full scale-100 hover:scale-110 transition-all duration-500 ease-in-out">
            <Link href={"/menu"} className=" flex items-center gap-2">
              Order Now
              <Right />
            </Link>
          </button>
          <button className="flex gap-2 py-2 text-sm text-gray-600 font-semibold scale-100 hover:scale-110 transition-all duration-500 ease-in-out">
            Learn More
            <Right />
          </button>
        </div>
      </div>
      <div className="relative">
        <Image
          src={"/food.png"}
          layout={"fill"}
          objectFit={"contain"}
          alt={"pizza"}
          priority
          className="z-10"
        />
        <div className="absolute bottom-10 left-10 z-0 transform -rotate-12">
          <Image
            src={"/salad2.png"}
            height={400}
            width={250}
            alt={"pizza"}
            priority
          />
        </div>
      </div>
    </section>
  );
}
