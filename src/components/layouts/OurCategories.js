import Image from "next/image";
import SectionHeaders from "./SectionsHeaders";

export default function OurCategories() {
  return (
    <section id="category" className="mt-12 p-10">
      <div className=" text-center underline underline-offset-[20px] mb-12">
        <SectionHeaders mainHeader={"Our Categories"} subHeader={""} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 p-5  gap-10">
        <div className="flex justify-center items-center gap-5">
          <div>
            <img
              className="object-fill h-[320px]"
              src={"/categoryImage3.jpg"}
            />
          </div>
          {/* <div className="grid grid-cols-1 gap-5 grow">
            <Image src={"/categoryImage.jpg"} height={300} width={300} />
            <Image src={"/categoryImage2.jpg"} height={300} width={300} />
          </div> */}
        </div>
        <div className="flex flex-col gap-10">
          <div>
            <h2 className="font-[500] text-[30px] tracking-wider">
              Grab Your Delicious Food
            </h2>
            <p className="text-slate-500 font-medium tracking-wider">
              We prepare delicious food for you
            </p>
          </div>
          <div>
            <h2 className="font-[500] text-[30px] tracking-wider">
              Grab Your Delicious Food
            </h2>
            <p className="text-slate-500 font-medium tracking-wider">
              We prepare delicious food for you
            </p>
          </div>
          <div>
            <h2 className="font-[500] text-[30px] tracking-wider">
              Grab Your Delicious Food
            </h2>
            <p className="text-slate-500 font-medium tracking-wider">
              We prepare delicious food for you
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
