"use client";

export default function AddressInputs({ addressProps, setAddressProps }) {
  const { phone, streetAddress, postalCode, city, country } = addressProps;

  return (
    <>
      <label>Phone</label>
      <input
        type="tel"
        placeholder="Phone number"
        value={phone}
        onChange={(event) => setAddressProps("phone", event.target.value)}
      />
      <label>Street address</label>
      <input
        type="text"
        placeholder="Street address"
        value={streetAddress}
        onChange={(event) =>
          setAddressProps("streeAddress", event.target.value)
        }
      />
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label>Postal code</label>
          <input
            type="text"
            placeholder="Postal code"
            value={postalCode}
            onChange={(event) =>
              setAddressProps("postalCode", event.target.value)
            }
          />
        </div>
        <div>
          <label>City</label>
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(event) => setAddressProps("city", event.target.value)}
          />
        </div>
      </div>
      <label>Country</label>
      <input
        type="text"
        placeholder="Country"
        value={country}
        onChange={(event) => setAddressProps("country", event.target.value)}
      />
    </>
  );
}
