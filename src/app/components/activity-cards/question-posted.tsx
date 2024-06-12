import Link from "next/link";
import { FaRegMessage } from "react-icons/fa6";

export default function QuestionPosted() {
  return (
    <div className="bg-indigo-100 p-6 rounded-xl">
      <div className=" flex">
        <FaRegMessage className="mr-3 text-indigo-400 mb-2 text-2xl" />
        <p className="font-semibold text-blue-950 mb-6">
          You posted a new question!
        </p>
      </div>
      <Link
        className="text-red-400 border p-3 rounded-xl border-red-400 hover:bg-white"
        href="/"
      >
        View Question
      </Link>
    </div>
  );
}
