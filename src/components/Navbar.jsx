import React from 'react';
import logo from '../assets/kodnest-logo.png'; // Assuming you have a kodnest logo
import profile from '../assets/avatar.png'; // Assuming you have a default avatar
import { FaHome, FaBook, FaCode, FaTrophy, FaQuestionCircle, FaClock, FaUsers, FaRupeeSign } from 'react-icons/fa'; // Importing icons

function Navbar() {
    return (
        <div className='flex items-center justify-between p-2 bg-gray-50 border-b border-gray-200 pl-40 pr-40 mb-15' >
            <div className='flex items-center space-x-4'>
                <img src={logo} alt="KodNest Logo" className='h-8' />
            </div>
            <div className='flex items-center space-x-8 text-sm'>
                <ul className='flex items-center space-x-6 font-medium'>
                    <li className='flex items-center text-black hover:text-yellow-500 cursor-pointer'>
                        <FaHome className="mr-1" />
                        <span>Home</span>
                    </li>
                    <li className='flex items-center text-black hover:text-yellow-500 cursor-pointer'>
                        <FaBook className="mr-1" />
                        <span>Courses</span>
                    </li>
                    <li className='flex items-center text-black hover:text-yellow-500 cursor-pointer'>
                        <FaCode className="mr-1" />
                        <span>Practice</span>
                    </li>
                    <li className='flex items-center text-black hover:text-yellow-500 cursor-pointer'>
                        <FaTrophy className="mr-1" />
                        <span>Contest</span>
                    </li>
                    <a href='/f2f-interview' className='flex items-center text-black hover:text-yellow-500 cursor-pointer'>
                        <FaUsers className="mr-1" />
                        <span>F2F Interview</span>
                    </a>
                </ul>
                <button className="bg-gradient-to-r from-purple-700 to-pink-500 text-white px-4 py-2 rounded-md flex items-center hover:opacity-90">
                   <FaRupeeSign className="mr-1"/>
                    Help and Earn
                </button>
               <div className='flex items-center text-black hover:text-yellow-500 cursor-pointer font-medium'>
                  <FaQuestionCircle className="mr-1"/>
                   Mentor Connect
               </div>

            </div>
            <div className='flex items-center rounded-full overflow-hidden'>
                <img src={profile} alt="Profile" className='h-10 w-10 object-cover' />
            </div>
        </div>
    );
}

export default Navbar;
