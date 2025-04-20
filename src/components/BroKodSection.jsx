import React from 'react';
import brokodImage from '../assets/brokod.png';

function BroKodSection() {
  return (
    <div className="card bg-base-100 border border-gray-500/10 shadow-md hover:shadow-lg transition-shadow p-2 pt-0 pb-0 ml-30 mt-15 mr-35">
      <div className="flex items-center justify-between">
        <div className="w-1/1 ml-9">
          <h2 className="text-l font-bold">BroKod: Your Learning Ally at KodNest</h2>
          <p className="text-black mt-2 text-sm">
            Unlock your potential with BroKod – your mentor, friend, coach, guide, and companion.
            Available 24/7 to support your journey, from learning to career success.
          </p>
          <div className="mt-6">
            <button className="btn bg-yellow-400">Chat with BroKod</button>
          </div>
        </div>
        <div className="w-1/2 flex justify-end">
          <img src={brokodImage} alt="BroKod" className="h-50 rounded-xl mt-3" />
        </div>
      </div>
    </div>
  );
}

export default BroKodSection;
