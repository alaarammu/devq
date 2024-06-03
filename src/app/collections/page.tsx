"use client";
import { useState } from 'react';
import { HiArrowsUpDown } from 'react-icons/hi2';
import { IoIosArrowDown } from 'react-icons/io';
import Card from '../components/collection-card/page';

const CARDS_PER_PAGE = 20; // Define how many cards to display per page

export default function Collections() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalCards = 20; // Define the total number of cards
  const totalPages = Math.ceil(totalCards / CARDS_PER_PAGE);

  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="m-11">
      <h1 className="text-2xl font-semibold mb-7">All Collections</h1>
      <div className="flex mb-7">
        <h1 className="flex mr-3 text-indigo-400">Questions</h1>
        <HiArrowsUpDown className="text-xl text-indigo-400" />
        <h1 className="flex mr-3 text-indigo-400 ml-5">Today</h1>
        <IoIosArrowDown className="text-xl text-indigo-400" />
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: totalCards }, (_, index) => (
          <Card key={index} />
        )).slice((currentPage - 1) * CARDS_PER_PAGE, currentPage * CARDS_PER_PAGE)}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white text-gray-800 rounded-l hover:bg-indigo-400 disabled:bg-white"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageClick(index + 1)}
              className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-indigo-400 text-white' : 'bg-indigo-400 text-white'} hover:bg-indigo-300`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-white text-indigo-400 rounded-r hover:bg-white disabled:bg-gray-200"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}