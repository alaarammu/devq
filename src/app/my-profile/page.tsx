"use client";
import { useState } from "react";
import { CiCamera } from "react-icons/ci";
import Image from "next/image";

export default function MyProfile() {
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>("");
  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [role, setRole] = useState("User");
  const [isEditable, setIsEditable] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setImageSrc(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  return (
    <div className="">
      <div className="ml-9 mt-9 mb-9 mr-9">
        <h1 className="text-3xl mb-9">My Profile</h1>
        <div className="flex items-center justify-between">
          <div className="relative w-32 h-32">
            <div className="relative rounded-full overflow-hidden w-full h-full">
              {imageSrc ? (
                <Image
                  src={imageSrc as string}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  layout="fill"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-700"></span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
                id="imageUpload"
              />
            </div>
            <label
              htmlFor="imageUpload"
              className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 bg-white border-2 border-purple-400 text-purple-400 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer mb-6"
            >
              <CiCamera className="w-6 h-10" />
            </label>
          </div>
          <button
            onClick={toggleEdit}
            className="text-red-400 font-semibold py-2 px-4 rounded-md"
          >
            Edit My Details
          </button>
        </div>
        <div className="mt-12">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            className={`mt-1 p-2 border border-gray-400 bg-indigo-100 rounded-md w-full ${
              isEditable ? "" : "cursor-not-allowed bg-gray-100"
            }`}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={!isEditable}
          />
        </div>
        <div className="mt-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className={`mt-1 p-2 border border-gray-400 bg-indigo-100 rounded-md w-full ${
              isEditable ? "" : "cursor-not-allowed bg-gray-100"
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!isEditable}
          />
        </div>
        <div className="mt-6">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Role
          </label>
          <input
            type="text"
            id="role"
            className={`bg-indigo-100 mt-1 p-2 border border-gray-400 rounded-md w-full ${
              isEditable ? "" : "cursor-not-allowed bg-gray-100"
            }`}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled={!isEditable}
          />
        </div>
        <div className="mt-9">
          <button
            className={`bg-red-400 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-300 ${
              isEditable ? "" : "cursor-not-allowed"
            }`}
            disabled={!isEditable}
          >
            Update Profile
          </button>
          <button className="pl-5 text-sm text-red-400 font-semibold">
            Change Password?
          </button>
        </div>
      </div>
    </div>
  );
}
