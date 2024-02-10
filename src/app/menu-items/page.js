"use client";

import { useProfile } from "@/components/UseProfile";
import UserTabs from "../../components/layouts/UserTabs";

export default function MenuItemsPage() {
  const { loading, data } = useProfile();

  if (loading) {
    return "Loading user info...";
  }

  if (!data.admin) {
    return "Not an admin";
  }
  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <form className="mt-8 max-w-md mx-auto">
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>Menu item name</label>
            <input type="text" />
          </div>
          <div>
            <button type="submit" className="mb-2">
              Create
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
