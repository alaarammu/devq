"use client";
import { useState, useEffect } from 'react';
import { HiOutlineAdjustments } from "react-icons/hi";
import Card from '../components/question-card/questionCard';
import { getAllQuestionByUserId } from '../../../services/questionServices/questionService';
import useAuthStore from '../../../services/utils/authStore';

export default function Home() {
  const [activeButton, setActiveButton] = useState('new');
  const [questionDetails, setQuestionDetails] = useState<any>([]);

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
  };

  const getButtonClasses = (button: string) => (
    `border border-indigo-400 font-semibold py-3 px-3 
    ${activeButton === button ? 'bg-indigo-400 text-white' : 'bg-white text-indigo-400 hover:bg-indigo-400 hover:text-white focus:bg-indigo-400 focus:text-white'}
    flex-shrink-0 rounded-md`
  );

  const getActiveText = () => {
    switch (activeButton) {
      case 'new':
        return 'New Questions';
      case 'today':
        return 'Today\'s Top Selected';
      case 'thisWeek':
        return 'This Week\'s Questions';
      case 'thisMonth':
        return 'This Month\'s Questions';
      default:
        return '';
    }
  };

  useEffect(() => {
    const getCompanyQuestion = async () => {
      let companyId = useAuthStore.getState().user.company?.id
      const result = await getAllQuestionByUserId(companyId);
      setQuestionDetails(result.data)
      console.log("data", result.data)
    }
    getCompanyQuestion()
  }, [])

  return (
    <div className="w-full overflow-x-auto"> {/* Allow horizontal scroll on small screens */}
      <div className="mt-9 px-3 ml-9">
        <div className="text-2xl font-semibold mb-3">
          {getActiveText()}
        </div>
        <div className="flex justify-between items-center pt-5">
          <div className="bg-white p-3 flex space-x-3 border border-indigo-400 rounded-md flex-shrink-0 mr-9">
            <button onClick={() => handleButtonClick('new')} className={getButtonClasses('new')}>
              New
            </button>

            <button onClick={() => handleButtonClick('today')} className={getButtonClasses('today')}>
              Today
            </button>

            <button onClick={() => handleButtonClick('thisWeek')} className={getButtonClasses('thisWeek')}>
              This week
            </button>

            <button onClick={() => handleButtonClick('thisMonth')} className={getButtonClasses('thisMonth')}>
              This month
            </button>

            <button onClick={() => handleButtonClick('adjustments')} className="flex-shrink-0">
              <HiOutlineAdjustments className={`text-5xl p-2 rounded ${activeButton === 'adjustments' ? 'bg-indigo-400 text-white' : 'bg-white text-indigo-400 '}flex-shrink-0`} />
            </button>
          </div>
          <div className="mr-9 font-semibold flex-shrink-0">
            <a className="bg-red-400 text-white py-3 px-5 rounded-md hover:bg-red-300" href="/questions/ask-question">
              Ask Question
            </a>
          </div>
        </div>
      </div>
      <div className='mt-8 px-8'>
        {questionDetails.length >= 0 && questionDetails.map((detail: any, index: number) => (
          <Card key={index} questionTitle={detail.title} tags={detail.tags} user={detail.user} />
        ))}
      </div>
    </div>
  );
}
