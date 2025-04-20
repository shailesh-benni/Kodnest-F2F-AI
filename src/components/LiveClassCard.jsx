import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { GoQuestion } from "react-icons/go";
import { FaRegClock } from "react-icons/fa6";
import { BsBoxArrowInRight } from "react-icons/bs";


function LiveClassCards() {
  const cardsData = [
    {
      icon: 'J',
      class: 'Java - 2025',
      mentor: 'Punith Kumar',
      progress: 97.03,
      time: '09:00 AM - 10:15 AM',
      topBorder: 'bg-gradient-to-r from-blue-500 to-purple-500',

    },
    {
      icon: 'S',
      class: 'SQL - 2025',
      mentor: 'Punith Kumar',
      progress: 89.17,
      time: '10:15 AM - 11:00 AM',
      topBorder: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    },
    {
      icon: 'T',
      class: 'DSA 2025',
      mentor: 'Ayush B',
      progress: 97.3,
      time: '02:30 PM - 04:00 PM',
      topBorder: 'bg-gradient-to-r from-green-400 to-green-600',
    },
  ];

  return (
    <div className="pt-4 ml-30 mt-5 mr-25">
      <div className="flex items-center mb-4">
        <h2 className="text-lg font-semibold">Live Classes</h2>
        <FaInfoCircle className="ml-2 text-gray-500" />
      </div>
      <div className="flex flex-wrap gap-6">
        {cardsData.map((card, index) => (
          <div
          key={index}
          className="w-[360px]  rounded-lg shadow-md hover:shadow-lg transition-shadow relative"
          >
            {/* Top color border */}
            <div className={`rounded-t-lg h-1 ${card.topBorder}`}></div>
            <div> 
            <div className="p-4">
              {/* Logo + Class title + Mentor */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
                    style={{
                      backgroundColor:
                        index === 0 ? '#B91C1C' : index === 1 ? '#2563EB' : '#7C3AED',
                    }}
                    >
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-s font-medium leading-5">{card.class}</h3>
                    <p className="text-xs text-gray-600">Mentor: {card.mentor}</p>
                  </div>
                </div>
                <p className="flex items-center gap-1 p-2 bg-blue-300/20 text-blue-600 text-xs py-0.5 border border-blue-200 rounded-md font-medium">
  <FaRegClock />
  Upcoming
</p>
              </div>

              {/* Progress */}
              <div className="flex justify-between text-xs mt-5 mb-1">
                <span >Progress</span>
                <span>{card.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 h-1 rounded-full mb-3">
                <div
                  className="bg-black h-1 rounded-full"
                  style={{ width: `${card.progress}%` }}
                ></div>
              </div>

              {/* Class Time */}
              <div className="flex justify-between text-xs text-gray-700">
                <span>Class Time</span>
                <span>{card.time}</span>
              </div>

              {/* Footer Buttons */}
              </div>
              <div className="flex justify-between bg-gray-100 p-3">
              
              <button className="flex items-center gap-1 text-gray-400 text-xs px-1.5 py-1.5 rounded-md">
  <GoQuestion />
  Help Desk
</button>
                <button className="text-gray-400 text-xs px-3 py-1.5 rounded-md ">
                  <BsBoxArrowInRight/>
                  Join Class
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LiveClassCards;
