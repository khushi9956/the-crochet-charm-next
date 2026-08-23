"use client";

import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import Link from "next/link";

interface Address {
  id: number;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  is_default: boolean;
}

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();

  const [editing, setEditing] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [saving, setSaving] = useState(false);

  // Address
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressFormOpen, setAddressFormOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<number | null>(
    null
  );
  const [addressSaving, setAddressSaving] = useState(false);

  const [addressName, setAddressName] = useState("");
  const [addressPhone, setAddressPhone] = useState("");
  const [addressText, setAddressText] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  // -----------------------------
  // Load addresses
  // -----------------------------

  const loadAddresses = async () => {
    try {
      setAddressLoading(true);

      const token = await getToken();

      if (!token) {
        console.error("No Clerk token available");
        return;
      }

      const res = await fetch(`${API_URL}/api/address/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Address API error:", data);
        return;
      }

      setAddresses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Unable to load addresses:", error);
    } finally {
      setAddressLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && user) {
      loadAddresses();
    }
  }, [isLoaded, user]);

  // -----------------------------
  // Profile
  // -----------------------------

  const fullName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    "User";

  const startEditing = () => {
    setFirstName(user?.firstName || "");
    setLastName(user?.lastName || "");
    setEditing(true);
  };

  const saveProfile = async () => {
    if (!firstName.trim()) {
      alert("Please enter your first name.");
      return;
    }

    try {
      setSaving(true);

      await user?.update({
        firstName: firstName.trim(),
        lastName: lastName.trim() || undefined,
      });

      await user?.reload();

      setEditing(false);
    } catch (error) {
      console.error(error);
      alert("Unable to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // -----------------------------
  // Address form
  // -----------------------------

  const resetAddressForm = () => {
    setAddressName("");
    setAddressPhone("");
    setAddressText("");
    setCity("");
    setState("");
    setPincode("");
    setEditingAddressId(null);
    setAddressFormOpen(false);
  };

  const openAddAddress = () => {
    setEditingAddressId(null);

    setAddressName(
      [user?.firstName, user?.lastName].filter(Boolean).join(" ")
    );

    setAddressPhone(user?.primaryPhoneNumber?.phoneNumber || "");

    setAddressText("");
    setCity("");
    setState("");
    setPincode("");

    setAddressFormOpen(true);
  };

  const openEditAddress = (address: Address) => {
    setEditingAddressId(address.id);

    setAddressName(address.name);
    setAddressPhone(address.phone);
    setAddressText(address.address);
    setCity(address.city);
    setState(address.state);
    setPincode(address.pincode);

    setAddressFormOpen(true);
  };

  const saveAddress = async () => {
    if (
      !addressName.trim() ||
      !addressPhone.trim() ||
      !addressText.trim() ||
      !city.trim() ||
      !state.trim() ||
      !pincode.trim()
    ) {
      alert("Please fill all address details.");
      return;
    }

    if (!/^\d{6}$/.test(pincode.trim())) {
      alert("Please enter a valid 6-digit pincode.");
      return;
    }

    try {
      setAddressSaving(true);

      const token = await getToken();

      if (!token) {
        alert("Authentication expired. Please login again.");
        return;
      }

      const url = editingAddressId
        ? `${API_URL}/api/address/${editingAddressId}/`
        : `${API_URL}/api/address/`;

      const method = editingAddressId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: addressName.trim(),
          phone: addressPhone.trim(),
          address: addressText.trim(),
          city: city.trim(),
          state: state.trim(),
          pincode: pincode.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data);
        alert(data.error || "Unable to save address.");
        return;
      }

      alert(
        editingAddressId
          ? "Address updated successfully."
          : "Address saved successfully."
      );

      resetAddressForm();

      await loadAddresses();
    } catch (error) {
      console.error("Save address error:", error);
      alert("Something went wrong while saving the address.");
    } finally {
      setAddressSaving(false);
    }
  };

  const deleteAddress = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this address?"
    );

    if (!confirmed) return;

    try {
      const token = await getToken();

      if (!token) {
        alert("Authentication expired. Please login again.");
        return;
      }

      const res = await fetch(`${API_URL}/api/address/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Unable to delete address.");
        return;
      }

      await loadAddresses();
    } catch (error) {
      console.error("Delete address error:", error);
      alert("Something went wrong.");
    }
  };

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-[#FFF9F3] flex items-center justify-center">
        <p className="text-[#A84F40] font-semibold">
          Loading profile...
        </p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#FFF9F3] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-lg p-10 text-center">
          <h1 className="text-2xl font-bold text-[#A84F40]">
            Please Sign In
          </h1>

          <Link
            href="/login"
            className="inline-block mt-5 bg-[#A84F40] text-white px-6 py-3 rounded-xl"
          >
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFF9F3] py-12 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#A84F40]">
            My Profile
          </h1>

          <p className="text-[#5F4A40] mt-2">
            Manage your Crochet Charm account
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-[#EED2BD] overflow-hidden">

          {/* Profile Header */}
          <div className="bg-[#FFF5F7] p-8 flex flex-col items-center">

            <img
              src={user.imageUrl}
              alt={fullName}
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
            />

            <h2 className="text-2xl font-bold text-[#4A3024] mt-4">
              {fullName}
            </h2>

            <p className="text-[#5F4A40] mt-1">
              {user.primaryEmailAddress?.emailAddress ||
                "No email added"}
            </p>
          </div>

          {/* Profile Information */}
          <div className="p-8">

            {!editing ? (
              <>
                <div className="mb-6">
                  <p className="text-sm text-[#A84F40] font-semibold">
                    Full Name
                  </p>

                  <p className="text-[#4A3024] mt-1 text-lg">
                    {fullName}
                  </p>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-[#A84F40] font-semibold">
                    Email Address
                  </p>

                  <p className="text-[#4A3024] mt-1">
                    {user.primaryEmailAddress?.emailAddress ||
                      "Not provided"}
                  </p>
                </div>

                <div className="mb-8">
                  <p className="text-sm text-[#A84F40] font-semibold">
                    Phone Number
                  </p>

                  <p className="text-[#4A3024] mt-1">
                    {user.primaryPhoneNumber?.phoneNumber ||
                      "Not provided"}
                  </p>
                </div>

                <button
                  onClick={startEditing}
                  className="w-full sm:w-auto bg-[#A84F40] hover:bg-[#923F31] text-white px-8 py-3 rounded-xl font-semibold transition"
                >
                  ✏️ Edit Profile
                </button>
              </>
            ) : (
              <div className="space-y-5">

                <div>
                  <label className="block text-sm font-semibold text-[#4A3024] mb-2">
                    First Name
                  </label>

                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) =>
                      setFirstName(e.target.value)
                    }
                    placeholder="Enter your first name"
                    className="w-full px-4 py-3 rounded-xl border border-[#EED2BD] bg-[#FFF9F3] text-[#4A3024] outline-none focus:ring-2 focus:ring-[#A84F40]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#4A3024] mb-2">
                    Last Name
                  </label>

                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) =>
                      setLastName(e.target.value)
                    }
                    placeholder="Enter your last name"
                    className="w-full px-4 py-3 rounded-xl border border-[#EED2BD] bg-[#FFF9F3] text-[#4A3024] outline-none focus:ring-2 focus:ring-[#A84F40]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#4A3024] mb-2">
                    Email Address
                  </label>

                  <input
                    type="text"
                    value={
                      user.primaryEmailAddress?.emailAddress ||
                      ""
                    }
                    disabled
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#4A3024] mb-2">
                    Phone Number
                  </label>

                  <input
                    type="text"
                    value={
                      user.primaryPhoneNumber?.phoneNumber ||
                      ""
                    }
                    disabled
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-3">

                  <button
                    onClick={saveProfile}
                    disabled={saving}
                    className="flex-1 bg-[#A84F40] hover:bg-[#923F31] disabled:opacity-60 text-white px-6 py-3 rounded-xl font-semibold transition"
                  >
                    {saving
                      ? "Saving..."
                      : "Save Changes"}
                  </button>

                  <button
                    onClick={() => setEditing(false)}
                    disabled={saving}
                    className="flex-1 border border-[#EED2BD] text-[#A84F40] hover:bg-[#FFF5F7] px-6 py-3 rounded-xl font-semibold transition"
                  >
                    Cancel
                  </button>

                </div>
              </div>
            )}

          </div>
        </div>

        {/* Saved Addresses */}
        <div className="bg-white rounded-3xl shadow-lg border border-[#EED2BD] mt-8 p-8">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">

            <div>
              <h2 className="text-2xl font-bold text-[#A84F40]">
                Saved Addresses
              </h2>

              <p className="text-[#5F4A40] text-sm mt-1">
                Manage your delivery addresses
              </p>
            </div>

            {!addressFormOpen && (
              <button
                onClick={openAddAddress}
                className="bg-[#A84F40] hover:bg-[#923F31] text-white px-5 py-3 rounded-xl font-semibold transition"
              >
                + Add Address
              </button>
            )}

          </div>

          {/* Address Form */}
          {addressFormOpen && (
            <div className="bg-[#FFF9F3] border border-[#EED2BD] rounded-2xl p-6 mb-6">

              <h3 className="text-xl font-bold text-[#4A3024] mb-5">
                {editingAddressId
                  ? "Edit Address"
                  : "Add New Address"}
              </h3>

              <div className="space-y-4">

                <div>
                  <label className="block text-sm font-semibold text-[#4A3024] mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={addressName}
                    onChange={(e) =>
                      setAddressName(e.target.value)
                    }
                    placeholder="Enter full name"
                    className="w-full px-4 py-3 rounded-xl border border-[#EED2BD] bg-white outline-none focus:ring-2 focus:ring-[#A84F40]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#4A3024] mb-2">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    value={addressPhone}
                    onChange={(e) =>
                      setAddressPhone(e.target.value)
                    }
                    placeholder="Enter phone number"
                    className="w-full px-4 py-3 rounded-xl border border-[#EED2BD] bg-white outline-none focus:ring-2 focus:ring-[#A84F40]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#4A3024] mb-2">
                    House / Flat / Building / Street
                  </label>

                  <textarea
                    value={addressText}
                    onChange={(e) =>
                      setAddressText(e.target.value)
                    }
                    placeholder="Enter complete address"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-[#EED2BD] bg-white outline-none focus:ring-2 focus:ring-[#A84F40] resize-none"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">

                  <div>
                    <label className="block text-sm font-semibold text-[#4A3024] mb-2">
                      City
                    </label>

                    <input
                      type="text"
                      value={city}
                      onChange={(e) =>
                        setCity(e.target.value)
                      }
                      placeholder="City"
                      className="w-full px-4 py-3 rounded-xl border border-[#EED2BD] bg-white outline-none focus:ring-2 focus:ring-[#A84F40]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#4A3024] mb-2">
                      State
                    </label>

                    <input
                      type="text"
                      value={state}
                      onChange={(e) =>
                        setState(e.target.value)
                      }
                      placeholder="State"
                      className="w-full px-4 py-3 rounded-xl border border-[#EED2BD] bg-white outline-none focus:ring-2 focus:ring-[#A84F40]"
                    />
                  </div>

                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#4A3024] mb-2">
                    Pincode
                  </label>

                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) =>
                      setPincode(
                        e.target.value.replace(/\D/g, "")
                      )
                    }
                    placeholder="6-digit pincode"
                    className="w-full px-4 py-3 rounded-xl border border-[#EED2BD] bg-white outline-none focus:ring-2 focus:ring-[#A84F40]"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-3">

                  <button
                    onClick={saveAddress}
                    disabled={addressSaving}
                    className="flex-1 bg-[#A84F40] hover:bg-[#923F31] disabled:opacity-60 text-white px-6 py-3 rounded-xl font-semibold transition"
                  >
                    {addressSaving
                      ? "Saving..."
                      : editingAddressId
                      ? "Update Address"
                      : "Save Address"}
                  </button>

                  <button
                    onClick={resetAddressForm}
                    disabled={addressSaving}
                    className="flex-1 border border-[#EED2BD] text-[#A84F40] hover:bg-white px-6 py-3 rounded-xl font-semibold transition"
                  >
                    Cancel
                  </button>

                </div>

              </div>
            </div>
          )}

          {/* Address List */}
          {addressLoading ? (
            <div className="py-8 text-center text-[#5F4A40]">
              Loading addresses...
            </div>
          ) : addresses.length === 0 ? (
            <div className="border border-dashed border-[#EED2BD] rounded-2xl p-8 text-center">

              <div className="text-4xl mb-3">
                📍
              </div>

              <h3 className="font-bold text-[#4A3024] text-lg">
                No saved address
              </h3>

              <p className="text-[#5F4A40] text-sm mt-1">
                Add an address to make checkout faster.
              </p>

            </div>
          ) : (
            <div className="space-y-4">

              {addresses.map((address) => (
                <div
                  key={address.id}
                  className="border border-[#EED2BD] rounded-2xl p-5"
                >

                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">

                    <div>

                      <div className="flex items-center gap-2">

                        <h3 className="font-bold text-[#4A3024]">
                          {address.name}
                        </h3>

                        {address.is_default && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            Default
                          </span>
                        )}

                      </div>

                      <p className="text-[#5F4A40] mt-2">
                        {address.phone}
                      </p>

                      <p className="text-[#5F4A40] mt-1 leading-6">
                        {address.address}
                        <br />
                        {address.city}, {address.state} -{" "}
                        {address.pincode}
                      </p>

                    </div>

                    <div className="flex gap-2">

                      <button
                        onClick={() =>
                          openEditAddress(address)
                        }
                        className="px-4 py-2 rounded-lg border border-[#EED2BD] text-[#A84F40] hover:bg-[#FFF5F7] text-sm font-semibold"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteAddress(address.id)
                        }
                        className="px-4 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-sm font-semibold"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

        {/* Bottom Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">

          <Link
            href="/my-orders"
            className="flex-1 text-center bg-[#A84F40] hover:bg-[#923F31] text-white px-6 py-3 rounded-xl transition"
          >
            My Orders
          </Link>

          <Link
            href="/"
            className="flex-1 text-center border border-[#EED2BD] text-[#A84F40] hover:bg-[#FFF5F7] px-6 py-3 rounded-xl transition"
          >
            Continue Shopping
          </Link>

        </div>

      </div>
    </main>
  );
}