"use client";

import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionsHeaders from "./SectionsHeaders";
import { useEffect, useState } from "react";
import Loading from "../Loading";

export default function HomeMenu() {
  const [bestSellers, setBestSellers] = useState([]);
  useEffect(() => {
    fetch("/api/menu-items/").then((res) => {
      res.json().then((menuItems) => {
        const bestSellers = menuItems.slice(-3);
        setBestSellers(bestSellers);
      });
    });
  }, []);

  return (
    <section>
      <div className="absolute left-0 right-0 w-full justify-start">
        <div className="absolute left-0 top-0 text-left -z-10">
          <Image
            src={"/sideImage.png"}
            alt={"salad"}
            height={200}
            width={200}
          />
        </div>
        <div className="absolute right-0 -z-10 top-0 transform rotate-180">
          <Image
            src={"/sideImage.png"}
            alt={"salad"}
            height={189}
            width={200}
          />
        </div>
      </div>
      <div className="text-center mb-4 mt-8">
        <SectionsHeaders
          subHeader={"check out"}
          mainHeader={"Our Best Sellers"}
        />
      </div>
      {bestSellers?.length < 1 ? (
        <Loading className="h-[200px]" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-12 rounded-2xl">
          {bestSellers?.length > 0 &&
            bestSellers.map((item, i) => <MenuItem key={i} {...item} />)}
        </div>
      )}
    </section>
  );
}
