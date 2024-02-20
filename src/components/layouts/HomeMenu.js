"use client";

import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionsHeaders from "./SectionsHeaders";
import { useEffect, useState } from "react";

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
        <div className="absolute left-0 -top-[70px] text-left -z-10">
          <Image
            src={"/salad.png"}
            objectFit={"contain"}
            alt={"salad"}
            height={189}
            width={109}
          />
        </div>
        <div className="absolute -top-[100px] right-0 -z-10">
          <Image
            src={"/salad.png"}
            objectFit={"contain"}
            alt={"salad"}
            height={189}
            width={107}
          />
        </div>
      </div>
      <div className="text-center mb-4">
        <SectionsHeaders
          subHeader={"check out"}
          mainHeader={"Our Best Sellers"}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {bestSellers?.length > 0 &&
          bestSellers.map((item, i) => <MenuItem key={i} {...item} />)}
      </div>
    </section>
  );
}
