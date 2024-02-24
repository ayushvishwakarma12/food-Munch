import Image from "next/image";
import SectionsHeaders from "./SectionsHeaders";

export default function AboutUs() {
  return (
    <>
      <div id="about" className="text-center mt-20 mb-5">
        <SectionsHeaders mainHeader={"Our Story & Services"} />
      </div>
      <section className="mt-10 bg-amber-900 p-5 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 ">
          <div className="font-normal text-base md:text-lg text-center max-w-md mx-auto leading-8  shadow-2xl p-10 rounded-lg bg-white flex flex-col justify-center items-center">
            <Image src={"/salad.png"} height={200} width={200} alt="salad" />
            <span className="text-2xl font-semibold text-amber-900 tracking-tight mb-5">
              Rooted in passion,
            </span>
            we curate unforgettable dining experience and offer exceptional
            services, blending culinary artistry with warm hospitality
          </div>
          <div className="grid grid-cols-1 gap-2 md:gap-10 mt-4 md:mt-0">
            <div className="flex gap-2 md:gap-5">
              <div className="p-5 md:p-10  shadow-lg rounded-2xl bg-white flex  flex-col justify-center items-center text-center">
                <Image
                  src={"/burger4.png"}
                  height={50}
                  width={50}
                  alt="burger"
                />
                <h3 className="text-amber-900 font-bold text-lg uppercase">
                  Catering
                </h3>
                <p className=" text-sm">
                  Delight your guests with our flavors and presentation
                </p>
              </div>
              <div className="p-5 md:p-10  shadow-lg rounded-2xl bg-white flex  flex-col justify-center items-center text-center">
                <Image
                  src={"/delivery2.png"}
                  height={50}
                  width={50}
                  alt="foodDelivery"
                />
                <h3 className="text-amber-900 font-bold text-lg uppercase">
                  Fast Delivery
                </h3>
                <p className=" text-sm">
                  We deliver your order promptly to your door
                </p>
              </div>
            </div>
            <div className="flex gap-2 md:gap-5 ">
              <div className="p-5 md:p-10  shadow-lg rounded-2xl bg-white flex  flex-col justify-center items-center text-center">
                <Image src={"/cart.png"} height={50} width={50} alt="cart" />
                <h3 className="text-amber-900 font-bold text-lg uppercase">
                  Online Ordering
                </h3>
                <p className=" text-sm">
                  Explore menu & order with ease using our online ordering
                </p>
              </div>
              <div className="p-5 md:p-10  shadow-lg rounded-2xl bg-white flex  flex-col justify-center items-center text-center">
                <Image src={"/gift.png"} height={50} width={50} alt="gift" />
                <h3 className="text-amber-900 font-bold text-lg uppercase">
                  Gift Cards
                </h3>
                <p className=" text-sm">
                  Give the gift of exceptional dining with Food Gift Cards
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
