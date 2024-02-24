import Hero from "@/components/layouts/Hero";
import HomeMenu from "@/components/layouts/HomeMenu";
import OurTopFoods from "@/components/layouts/OurTopFoods";
import FoodDelivery from "../components/layouts/FoodDelivery";
import AboutUs from "../components/layouts/AboutUs";
export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <FoodDelivery />
      <OurTopFoods />
      <AboutUs />
    </>
  );
}
