import Image from "next/image";
import SectionsHeaders from "./SectionsHeaders";

export default function FoodDelivery() {
  return (
    <>
      <div className="text-center mt-8 mb-12 ">
        <SectionsHeaders mainHeader={"Fastest Delivery & Easy Pickup"} />
      </div>
      <section className="p-5 md:p-10 bg-amber-900 px-20">
        <div className="flex gap-5">
          <div className="bg-white rounded-full md:p-5 flex justify-center items-center mx-auto">
            <Image
              src={"/foodDelivery.png"}
              height={300}
              width={300}
              className="p-2 md:p-10"
            />
            <div className="relative">
              <div className=" bg-primary p-2 md:p-5 absolute text-white font-bold text-sm md:text-lg rounded-full rounded-bl-none bottom-[50px] -right-[20px]">
                Home Delivery
              </div>
            </div>
          </div>
          <div className="mx-auto">
            <h2 className="text-white font-black text-base md:text-4xl tracking-wider mb-10">
              Fastest Food <br />
              Delivery In Town
            </h2>
            <div className="flex items-center gap-5">
              <span className=" h-8 w-8 bg-red-100 rounded-full"></span>
              <span>
                <h3 className="text-amber-200 font-bold text-2xl tracking-tight">
                  Air Delivery
                </h3>
                <p className="text-slate-200 font-normal tracking-tight">
                  Faster then ever at minimum low charge
                </p>
              </span>
            </div>
            <div className="flex items-center gap-5 mt-8">
              <span className=" h-8 w-8 bg-red-100 rounded-full"></span>
              <span>
                <h3 className="text-amber-200 font-bold text-2xl tracking-tight">
                  Our Best Delivered Categories
                </h3>
                <p className="text-slate-200 font-normal tracking-tight max-w-md">
                  It's not just about bringing you good food from restaurents,
                  we deliver you experience
                </p>
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
