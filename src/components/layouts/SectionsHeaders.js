export default function SectionsHeaders({ subHeader, mainHeader }) {
  return (
    <>
      <h3 className="uppercase text-gray-600 semibold leading-4">
        {subHeader}
      </h3>
      <h2 className="text-primary font-bold text-2xl md:text-4xl">
        {mainHeader}
      </h2>
    </>
  );
}
