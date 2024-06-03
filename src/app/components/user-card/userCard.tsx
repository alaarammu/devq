interface CardProps {
    name: string;
    email: string;
    role: string;
  }
  
  const Card: React.FC<CardProps> = ({ name, email, role }) => (
    <div className="border border-gray-300 rounded-lg p-5 shadow-md  flex flex-col justify-between">
      <div className="flex items-center mb-2">
        <div className="bg-[#211951] text-white rounded-full h-8 w-8 flex items-center justify-center font-bold mr-2">
          {name.split(' ').map((n) => n[0]).join('')}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[#211951]">{name}</h3>
          <p className="text-xs text-[#211951]">{email}</p>
        </div>
      </div>
      <p className="text-sm font-bold text-gray-800">{role}</p>
    </div>
  );
  
  export default Card;
  
  