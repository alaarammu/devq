import { LuMessagesSquare } from "react-icons/lu";


export default function MemberQuestion() {
  return (
    <div className="bg-indigo-100 p-6 rounded-xl">
      <div className=" flex">
        <LuMessagesSquare className="mr-3 text-indigo-400  text-2xl" />
        <p className="font-semibold text-blue-950">
          Someone added a new question in ----
        </p>
      </div>
    </div>
  );
}
