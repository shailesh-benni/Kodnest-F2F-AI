import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';

function LiveClassCards() {
  const cardsData = [
    {
      icon: 'J',
      class: 'Java - 2025',
      mentor: 'Punith Kumar',
      progress: 97.03,
      time: '09:00 AM - 10:15 AM',
    },
    {
      icon: 'S',
      class: 'SQL - 2025',
      mentor: 'Punith Kumar',
      progress: 89.17,
      time: '10:15 AM - 11:00 AM',
    },
    {
      icon: 'T',
      class: 'TCS Preparation 2025',
      mentor: 'Ayush B',
      progress: 97.3,
      time: '02:30 PM - 04:00 PM',
    },
  ];

  return (
    <div className="p-4 pl-40 pr-40">
      <div className="flex items-center mb-4">
        <h2 className="text-2xl font-semibold">Live Classes</h2>
        <FaInfoCircle className="ml-2 text-gray-500" />
      </div>
      <div className="flex space-x-4">
        {cardsData.map((card, index) => (
          <div key={index} className="w-80 p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${index === 0 ? 'bg-yellow-600' : index===1 ? 'bg-blue-600' : 'bg-purple-600'}`}>
                {card.icon}
              </div>
              <div className="flex justify-end w-full">
                  <p className='bg-orange-200 text-orange-600 p-1 rounded-sm text-sm'>Upcoming</p>
              </div>
            </div>
            <h3 className="font-bold mb-1">{card.class}</h3>
            <p className="text-xs mb-2">Mentor: {card.mentor}</p>
            <div className="bg-gray-300 h-2 rounded-full mb-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${card.progress}%` }}></div>
            </div>
            <p className="text-xs mb-4">Class Time: {card.time}</p>
            <div className="flex space-x-2">
              <button className="bg-gray-500 text-white px-3 py-1 rounded-md text-xs">Help Desk</button>
              <button className="bg-green-500 text-white px-3 py-1 rounded-md text-xs">Join Class</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LiveClassCards;