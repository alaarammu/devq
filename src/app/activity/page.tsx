"use client";
import { useState } from "react";

export default function Activity() {

  const [activeButton, setActiveButton] = useState('new');

  const handleButtonClick = (button: string) => { // Specify the type of 'button' as string
    setActiveButton(button);
  };

  const getButtonClasses = (button: string) => (
    `border border-indigo-400 font-semibold py-3 px-3 
    ${activeButton === button ? 'bg-indigo-400 text-white' : 'bg-white text-indigo-400 hover:bg-indigo-400 hover:text-white focus:bg-indigo-400 focus:text-white'}
    flex-shrink-0 rounded-md`
  );


  return (
    <div>
      <div className="mt-9 px-3 ml-9">
        <div className="text-2xl font-semibold mb-3 ">
          Your Activity
        </div>
        <div className="flex justify-between items-center pt-5">
          <div className="bg-white p-3 flex space-x-3 border border-indigo-400 rounded-md ">
            <button onClick={() => handleButtonClick('new')} className={getButtonClasses('new')}>
              New
            </button>

            <button onClick={() => handleButtonClick('today')} className={getButtonClasses('today')}>
              All
            </button>

            <button onClick={() => handleButtonClick('thisWeek')} className={getButtonClasses('thisWeek')}>
              My Questions
            </button>

          </div>
          
        </div>
      </div>
    </div>
  )
}