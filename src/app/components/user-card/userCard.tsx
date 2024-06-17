// interface CardProps {
//   name: string;
//   email: string;
//   role: string;
// }

// const Card: React.FC<CardProps> = ({ name, email, role }) => (
//   <div className="border border-gray-300 rounded-lg p-5 shadow-md  flex flex-col justify-between">
//     <div className="flex items-center mb-2">
//       <div className="bg-[#211951] text-white rounded-full h-8 w-8 flex items-center justify-center font-bold mr-2">
//         {name.split(' ').map((n) => n[0]).join('')}
//       </div>
//       <div>
//         <h3 className="text-sm font-semibold text-[#211951]">{name}</h3>
//         <p className="text-xs text-[#211951]">{email}</p>
//       </div>
//     </div>
//     <p className="text-sm font-bold text-gray-800">{role}</p>
//   </div>
// );

// export default Card;

import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import useAuthStore from '../../../../services/utils/authStore';

interface CardProps {
  name: string;
  email: string;
  position: string;
  userID: number;
}

const Card: React.FC<CardProps> = ({ name, email, position, userID }) => {
  const { user } = useAuthStore();
  const user_id: any= user?.id;

  return (<div className="border border-gray-300 rounded-lg p-5 shadow-md relative">
    <div className="flex items-center mb-2">
      <div className="bg-[#211951] text-white rounded-full h-8 w-8 flex items-center justify-center font-bold mr-2">
        {name.split(' ').map((n) => n[0]).join('')}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-[#211951]">{name}</h3>
        <p className="text-xs text-[#211951]">{email}</p>
      </div>
    </div>
    <p className="text-sm font-bold text-gray-800">{position}</p>
    {/* Delete icon */}
    {user_id != userID && (
      <button className="absolute top-1 right-1 text-gray-500 hover:text-red-500 mr-2 mt-2">
        <AiOutlineDelete />
      </button>
    )}
  </div>)

};

export default Card;


