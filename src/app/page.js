import Header from "@/components/layouts/Header";
import Hero from "@/components/layouts/Hero";
import HomeMenu from "@/components/layouts/HomeMenu";
import SectionsHeaders from "@/components/layouts/SectionsHeaders";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16">
        <SectionsHeaders subHeader={"our story"} mainHeader={"About us"} />
        <div className="text-gray-500 mx-w-2xl mx-auto mt-4 flex flex-col gap-4">
          <p className=" ">hey</p>
        </div>
      </section>
      <section className="text-center my-8">
        <SectionsHeaders
          subHeader={"Don't hesitate"}
          mainHeader={"contact us"}
        />
        <div className="mt-8">
          <a href="54544845" className="text-4xl underline text-gray-500">
            4598789121354
          </a>
        </div>
      </section>
    </>
  );
}
