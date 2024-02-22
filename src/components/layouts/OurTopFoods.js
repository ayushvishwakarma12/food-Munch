"use client";
import Image from "next/image";
import SectionHeaders from "./SectionsHeaders";

export default function OurTopFoods() {
  return (
    <section className="mt-12">
      <div className="text-center">
        <SectionHeaders mainHeader={"TOP FOODS"} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-5 mt-20">
          <div className="scale-100 hover:scale-110 transition-all duration-500 cursor-pointer">
            <div className="h-[180px] md:min-h-[200px]">
              <Image
                src={"/pizzaa.png"}
                alt={"pasta"}
                height={400}
                width={400}
                layout="responsive"
                className="relative top-5 h-5"
              />
            </div>
            <div>
              <h3 className="font-bold text-2xl mt-4 cursor-pointer">Pasta</h3>
              <p className="text-slate-500">food description</p>
            </div>
          </div>
          <div className="scale-100 hover:scale-110 transition-all duration-500 cursor-pointer">
            <div className="h-[180px] md:min-h-[200px]">
              <Image
                src={"/shakes.png"}
                alt={"pasta"}
                height={400}
                width={400}
                layout="responsive"
              />
            </div>
            <div>
              <h3 className="font-bold text-2xl mt-4 cursor-pointer">Pasta</h3>
              <p className="text-slate-500">food description</p>
            </div>
          </div>
          <div className="scale-100 hover:scale-110 transition-all duration-500 cursor-pointer">
            <div className="h-[180px] md:min-h-[200px]">
              <Image
                src={"/iceCream.png"}
                alt={"pasta"}
                height={250}
                width={250}
                className="relative bottom-16 left-2"
              />
            </div>
            <div>
              <h3 className="font-bold text-2xl mt-4 cursor-pointer">Pasta</h3>
              <p className="text-slate-500">food description</p>
            </div>
          </div>
          <div className="scale-100 hover:scale-110 transition-all duration-500 cursor-pointer">
            <div className="h-[180px] md:min-h-[200px]">
              <Image
                src={"/burger.png"}
                alt={"pasta"}
                height={400}
                width={400}
                layout="responsive"
              />
            </div>
            <div>
              <h3 className="font-bold text-2xl mt-4 cursor-pointer">Pasta</h3>
              <p className="text-slate-500">food description</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
