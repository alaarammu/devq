
interface CardProps {
  name: string;
  questionCount: number;
}
// export default function Card() {
const CollectionCard: React.FC<CardProps> = ({ name, questionCount }) => {

  return (
    <div>
      <div className="w-40 h-30 mx-auto my-4 p-4 border border-gray-300 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="my-2 p-2 border bg-indigo-100 rounded-md shadow-sm">
            <div>
              <p className="text-sm">{name}</p>
            </div>
          </div>
          <a href="#">
          </a>
          <h5>Questions {questionCount}</h5>
        </div>
      </div>
    </div>
  )
}


export default CollectionCard;