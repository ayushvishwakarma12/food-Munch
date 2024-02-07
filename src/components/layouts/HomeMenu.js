import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionsHeaders from "./SectionsHeaders";

export default function HomeMenu() {
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
        <SectionsHeaders subHeader={"check out"} mainHeader={"Menu"} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </div>
    </section>
  );
}
