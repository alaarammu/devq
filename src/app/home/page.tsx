"use client";
import { useState } from 'react';
import { HiOutlineAdjustments } from "react-icons/hi";

export default function Home() {
  const [activeButton, setActiveButton] = useState('new');

  const handleButtonClick = (button: string) => { // Specify the type of 'button' as string
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
        return 'Today’s Top Selected';
      case 'thisWeek':
        return 'This Week’s Questions';
      case 'thisMonth':
        return 'This Month’s Questions';
      default:
        return '';
    }
  };

  return (
    <div>
      <div className="mt-9 px-3 ml-9">
        <div className="text-2xl font-semibold mb-3 ">
          {getActiveText()}
        </div>
        <div className="flex justify-between items-center pt-5">
          <div className="bg-white p-3 flex space-x-3 border border-indigo-400 rounded-md ">
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
              <HiOutlineAdjustments className={`text-5xl p-2 rounded ${activeButton === 'adjustments' ? 'bg-indigo-400 text-white' : 'bg-white text-indigo-400 hover:bg-indigo-400 hover:text-white'}`} />
            </button>
          </div>
          <div className="mr-9 font-semibold flex-shrink-0">
            <a className="bg-red-400 text-white pt-5 pb-5 pl-5 pr-5 rounded-md hover:bg-red-300" href="./ask-question">
              Ask Question
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 px-3 ml-9">
        {activeButton === 'new' && <div>New Content</div>}
        {activeButton === 'today' && <div>Today's Content</div>}
        {activeButton === 'thisWeek' && <div>This Week's Content</div>}
        {activeButton === 'thisMonth' && <div>This Month's Content</div>}
        {activeButton === 'adjustments' && <div>Adjustments Content</div>}
      </div>
    </div>
  );
}
