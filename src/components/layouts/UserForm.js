"use client";

import { useEffect, useState } from "react";
import { useProfile } from "../UseProfile";

export default function UserForm({ user, onSave, handleFileChange, imageUrl }) {
  const [userName, setUserName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "");
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");
  const [city, setCity] = useState(user?.city || "");
  const [country, setCountry] = useState(user?.country || "");
  const [admin, setAdmin] = useState(user?.admin || "");
  const { data: loggedInUserData } = useProfile();

  return (
    <div className="flex gap-2">
      <div className="p-2 rounded-lg">
        <img
          src={imageUrl}
          alt="avtar"
          className="h-[100px] w-[100px] bg-white"
        />
        <label>
          <input type="file" className="hidden" onChange={handleFileChange} />
          <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer mt-2  hover:bg-red-500 hover:text-white transition-all ease-in-out duration-500">
            Edit
          </span>
        </label>
      </div>
      <form
        className="grow"
        onSubmit={(event) =>
          onSave(event, {
            name: userName,
            imageUrl,
            phone,
            streetAddress,
            postalCode,
            city,
            country,
            admin,
          })
        }
      >
        <label>First and Last name</label>
        <input
          type="text"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
          placeholder="First and last name"
        />
        <label>Email</label>
        <input type="email" value={user?.email} disabled={true} />
        <label>Phone Number</label>
        <input
          type="tel"
          placeholder="Phone number"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
        <label>Street Address</label>
        <input
          type="text"
          placeholder="Street address"
          value={streetAddress}
          onChange={(event) => setStreetAddress(event.target.value)}
        />
        <div className="flex gap-2">
          <div className="grow">
            <label>City</label>
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
          </div>
          <div className="grow">
            <label>Postal Code</label>
            <input
              type="text"
              placeholder="Postal code"
              value={postalCode}
              onChange={(event) => setPostalCode(event.target.value)}
            />
          </div>
        </div>
        <label>Country</label>
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(event) => setCountry(event.target.value)}
        />
        {loggedInUserData.admin && (
          <div>
            <label
              htmlFor="adminCb"
              className="p-2 inline-flex items-center gap-2"
            >
              <input
                id="adminCb"
                type="checkbox"
                className=""
                value={1}
                checked={admin}
                onChange={(event) => setAdmin(event.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
