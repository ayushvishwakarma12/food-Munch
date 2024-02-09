"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const session = useSession();
  const [userName, setUserName] = useState("");
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { status } = session;
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setPhone(data.phone);
          setStreetAddress(data.streetAddress);
          setPostalCode(data.postalCode);
          setCity(data.city);
          setCountry(data.country);
          setUserName(data.name);
        });
      });
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(event) {
    event.preventDefault();
    setSaved(false);
    setIsSaving(true);
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: userName,
        streetAddress,
        phone,
        postalCode,
        city,
        country,
      }),
    });
    setIsSaving(false);
    if (response.ok) {
      setSaved(true);
    }
  }

  async function handleFileChange(event) {
    const files = event.files;

    if (files?.length > 0) {
      const data = new FormData();
      data.set("files", files);
      await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
    }
  }

  if (status === "loading") {
    return "loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }
  return (
    <section className="mt-8">
      <h1 className="text-center mb-4 text-primary text-4xl">Profile</h1>
      <div className="max-w-md mx-auto">
        {saved && (
          <h2 className="text-center bg-green-100 p-4 rounded-lg border border-1 border-green-300">
            Profile Saved!
          </h2>
        )}
        {isSaving && (
          <h2 className="text-center bg-blue-100 p-4 rounded-lg border border-1 border-blue-300">
            Saving...
          </h2>
        )}
      </div>
      <div className="max-w-md mx-auto">
        <div className="flex gap-2">
          <div className="p-2 rounded-lg">
            <Image src={"/"} width={80} height={80} alt="avtar" />
            <label>
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">
                Edit
              </span>
            </label>
          </div>
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <label>First and Last name</label>
            <input
              type="text"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
              placeholder="First and last name"
            />
            <label>Email</label>
            <input
              type="email"
              value={session?.data?.user?.email}
              disabled={true}
            />
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
              <div>
                <label>City</label>
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                />
              </div>
              <div>
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
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </section>
  );
}
