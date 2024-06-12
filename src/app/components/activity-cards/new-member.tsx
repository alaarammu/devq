import { FaRegSmile } from "react-icons/fa";

export default function NewMember() {
  return (
    <div className="bg-indigo-100 p-6 rounded-xl">
      <div className=" flex">
        <FaRegSmile className="mr-3 text-indigo-400  text-2xl" />
        <p className="font-semibold text-blue-950">
          New member joined!
        </p>
      </div>
    </div>
  );
}

