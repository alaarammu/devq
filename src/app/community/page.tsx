"use client";
import { useState, useRef } from 'react';
import { FaExchangeAlt } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import Card from '../components/user-card/userCard';
import Modal from '../components/modals/inviteUserModal';

function Community() {
    
    const [searchTerm, setSearchTerm] = useState("");
    const [sorted, setSorted] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            console.log("Search triggered");
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleInviteClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const cardsData = [
        { name: 'Tabi Bell', email: 'tabibell244@gmail.com', role: 'Senior developer' },
        { name: 'Damon Salvatore', email: 'damon12@gmail.com', role: 'Web developer' },
        { name: 'Robert Pattinson', email: 'rpattinson00@gmail.com', role: 'Junior web developer' },
        { name: 'Stefan Salvatore', email: 'stef@gmail.com', role: 'Web developer' },
        { name: 'Tony Moly', email: 'tonymoly@gmail.com', role: 'QA Lead' },
        { name: 'Tabi Bell', email: 'tabibell244@gmail.com', role: 'Senior developer' },
        { name: 'Damon Salvatore', email: 'damon12@gmail.com', role: 'Web developer' },
        { name: 'Robert Pattinson', email: 'rpattinson00@gmail.com', role: 'Junior web developer' },
        { name: 'Stefan Salvatore', email: 'stef@gmail.com', role: 'Web developer' },
        { name: 'Tony Moly', email: 'tonymoly@gmail.com', role: 'QA Lead' }
    ];

    const handleSort = () => {
        setSorted(!sorted);
    };


    const filteredCards = cardsData
        .filter(card => card.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => sorted ? a.name.localeCompare(b.name) : 0
        );

    return (
        <div className="mt-9 ml-11 mr-11">
            <p className="text-2xl font-semibold">
                All members
            </p>
            <div className='mt-3 flex flex-row justify-between w-full'>
                <div className='flex flex-row gap-2 items-center'>
                    <p className="w-fit text-purple-600">Name</p>
                    <FaExchangeAlt className="text-purple-600 transform rotate-90"
                        onClick={handleSort}
                    />

                    <div className="relative flex-grow max-w-sm">
                        <input
                            type="text"
                            placeholder="Search members"
                            className="border border-gray-600 rounded-full py-2 px-4 outline-none bg-white text-blue-950 pr-10 pl-10 w-full"
                            onKeyPress={handleKeyPress}
                            onChange={handleChange}
                        />
                        <CiSearch
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-950 text-2xl cursor-pointer" />
                    </div>
                </div>
                <div className="mr-9 font-semibold flex-shrink-0">
                    <button
                        className="bg-red-400 text-white py-2 px-4 rounded-md hover:bg-red-300"
                        onClick={handleInviteClick}
                    >
                        Invite
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pr-7 mt-4">
                {filteredCards.map((card, index) => (
                    <Card key={index} name={card.name} email={card.email} role={card.role} />
                ))}
            </div>
            <Modal show={showModal} onClose={handleCloseModal} />
        </div>
    )
}

export default Community;
