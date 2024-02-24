import Image from "next/legacy/image";
import Right from "../icons/Right";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero mt-4">
      <div className="py-5 md:py-24 max-w-[350px] mx-auto banner-description">
        <h1 className="text-lg md:text-4xl font-semibold">
          Discover Simple, <br />
          Delicious, And <br />
          Fast Recipes
          <span className="text-primary">Pizza</span>
        </h1>
        <p className="my-6 text-gray-500 text-sm">
          A recipe is soulless, The essence of the recipe must come from you,
          the cook
        </p>
        <div className="flex flex-col md:flex-row gap-2 md:gap-4">
          <button className="bg-primary uppercase flex items-center text-sm gap-2 text-white px-4 py-2 rounded-full scale-100 hover:scale-110 transition-all duration-500 ease-in-out">
            <Link
              href={"/menu"}
              className=" flex items-center gap-1 md:gap-2 m-0"
            >
              Order&nbsp;Now
              <Right />
            </Link>
          </button>
          <button className="flex gap-2 py-2 text-sm text-gray-600 font-semibold scale-100 hover:scale-110 transition-all duration-500 ease-in-out">
            Learn More
            <Right />
          </button>
        </div>
      </div>
      <div className=" md:block md:relative banner-image relative">
        <Image
          src={"/food.png"}
          layout={"fill"}
          alt={"pizza"}
          priority
          className="z-10 object-contain"
        />
        <div className="hidden object-contain md:block absolute bottom-10 left-10 z-0 transform -rotate-12">
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
