"use client";

import { CartContext, cartProductPrice } from "@/components/AppContext";
import Trash from "@/components/icons/Trash";
import SectionsHeaders from "@/components/layouts/SectionsHeaders";
import { useContext, useEffect, useState } from "react";
import AddressInput from "../../components/layouts/AddressInput";
import { useProfile } from "../../components/UseProfile";

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({
    phone: "",
    streetAddress: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const { data: profileData } = useProfile();

  useEffect(() => {
    if (profileData) {
      const { phone, streetAddress, city, postalCode, country } = profileData;
      const addressFromProfile = {
        phone,
        streetAddress,
        city,
        postalCode,
        country,
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);

  let total = 0;

  for (const p of cartProducts) {
    total += cartProductPrice(p);
  }

  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionsHeaders mainHeader="Cart" />
      </div>
      <div className="mt-8 grid grid-cols-2 gap-8">
        <div>
          {cartProducts?.length === 0 && (
            <div>No Products in your shopping cart</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <div key={index} className="flex gap-4 mb-2 border-b py-2">
                <div className="w-24">
                  <img src={product.imageUrl} alt={product.name} />
                </div>
                <div className="grow">
                  <h3 className="font-semibold">{product.name}</h3>
                  {product.size && (
                    <div className="text-sm">
                      Size: <span>{product.size.name}</span>
                    </div>
                  )}
                  {product.extraIngredientPrices?.length > 0 && (
                    <div className="text-sm text-gray-500">
                      {product.extraIngredientPrices.map((extra, i) => (
                        <div key={i}>
                          {extra.name} + ${extra.price}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-lg font-semibold">
                  ${cartProductPrice(product)}
                </div>
                <div className="ml-2">
                  <button
                    className="p-2"
                    type="button"
                    onClick={() => removeCartProduct(index)}
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            ))}
          <div className="py-4 text-right pr-16">
            <span className="text-gray-500">Subtotal:</span>{" "}
            <span className="text-lg font-semibold pl-2">${total}</span>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form>
            <label>Address</label>
            <AddressInput
              addressProps={address}
              setAddressProps={handleAddressChange}
            />
            <button type="submit">Pay ${total}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
