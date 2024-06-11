import Link from "next/link";
import { FaRegComment } from "react-icons/fa";
import { SlLike } from "react-icons/sl";

interface User {
    email: string;
    id: number;
    name: string;
    role: number;
}
interface CardProps {
    questionTitle: string;
    tags: string[];
    user: User;
}

const QuestionCard: React.FC<CardProps> = ({ questionTitle, tags, user }) => {

    return (
        <div className="w-full max-w-full p-4 bg-white border border-gray-200 rounded-lg shadow-md">
            <div className="mb-2 text-lg font-medium text-blue-950">
                <Link href="./questions/answer-question">
                    {questionTitle}
                </Link>
            </div>
            <div className="flex items-center mb-4">
                {tags.length > 0 && tags.map((tag: any, index: number) => (
                   <span className="px-2 py-1 mr-2 text-xs font-semibold text-blue-800 bg-blue-100 rounded">{tag.name}</span>
                ))}
                <span className="px-2 py-1 mr-2 text-xs font-semibold text-indigo-500 bg-blue-100 rounded">Python</span>
                <span className="px-2 py-1 text-xs font-semibold text-indigo-500 bg-blue-100 rounded">Linked list</span>
            </div>
            <div className="flex justify-between items-center text-gray-500">
                <div className="flex flex-row">
                    <div className="flex items-center">
                        <FaRegComment className="mr-1" />
                        21
                    </div>
                    <div className="flex items-center ml-2">
                        <SlLike className="mr-1" />
                        2
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 mr-2"></div>
                    <span className="text-sm font-medium text-blue-950">Damon Salvatore</span>
                </div>
            </div>
        </div>
    );
}
export default QuestionCard;