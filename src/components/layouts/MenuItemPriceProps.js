import Trash from "@/components/icons/Trash";
import Plus from "@/components/icons/Plus";
import ChevronDown from "@/components/icons/ChevronDown";
import ChevronUp from "@/components/icons/ChevronUp";
import { useState } from "react";

export default function MenuItemPriceProps({
  name,
  addLabel,
  props,
  setProps,
}) {
  const [isOpen, setIsOpen] = useState(false);

  function addSize() {
    setProps((oldProps) => {
      return [...oldProps, { name: "", price: 0 }];
    });
  }

  function editProp(event, index, prop) {
    const newValue = event.target.value;
    setProps((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  }

  function removeProp(indexToRemove) {
    setProps((prev) => prev.filter((v, index) => index !== indexToRemove));
  }

  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2">
      <button
        className="inline-flex p-1 border-0 justify-start"
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen && <ChevronUp />}
        {!isOpen && <ChevronDown />}
        <span>{name}</span>
        <span>({props?.length})</span>
      </button>
      <div className={isOpen ? "block" : "hidden"}>
        {props?.length > 0 &&
          props.map((size, index) => (
            <div key={index} className="flex gap-2 items-end">
              <div>
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Size name"
                  value={size.name}
                  onChange={(event) => editProp(event, index, "name")}
                />
              </div>
              <div>
                <label>Extra price</label>
                <input
                  type="text"
                  placeholder="Extra price"
                  value={size.price}
                  onChange={(event) => editProp(event, index, "price")}
                />
              </div>
              <div className="mb-2">
                <button
                  className="bg-white px-2"
                  onClick={() => removeProp(index)}
                >
                  <Trash className={"h-6 w-6"} />
                </button>
              </div>
            </div>
          ))}
        <button
          type="button"
          onClick={addSize}
          className="bg-white items-center"
        >
          <Plus className={"w-4 h-4"} />
          <span>{addLabel}</span>
        </button>
      </div>
    </div>
  );
}
