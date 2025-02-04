import React from 'react';

import fatcow from '../assests/fatcow.jpg'

const BigBox = () => {
    return (
      <div className="flex flex-col md:flex-row border-2 border-gray-600 p-5 w-4/5 mx-auto bg-gray-200 mt-40 overflow-auto rounded-xl ">
        {/* Left Side: Medium Box */}
        <div className="w-auto md:w-1/2 md:mr-5 mt-5 md:mt-0 border border-gray-300 p-5 bg-white order-1  transition-all hover:bg-green-700 duration-500 ease-in-out shadow-xl rounded-xl">
          <img src={fatcow} alt="fatass cow" className="w-72 max-w-[400px] mx-auto mb-5 object-cover transition-all hover:scale-110 duration-600 ease-in"/>
          <p className="text-center"> A picture of a cow. A really fat one as well yappa yappa yappa likr  a ratA picture of a cow. A really fat one as well yappa yappa yappa likr  a ratA picture of a cow. A really fat one as well yappa yappa yappa likr  a ratA picture of a cow. A really fat one as well yappa yappa yappa likr  a rat.</p>
        </div>
  
        {/* Right Side: Three Small Boxes */}
        <div className="flex flex-col w-full md:w-1/2 space-y-4 order-2">
          <div className="flex border border-gray-300 p-3 bg-white items-center transition-all hover:bg-green-700 hover:-translate-y-1 duration-500 ease-in-out delay-350 shadow-xl rounded-xl">
            <img src={fatcow} alt="fatass cow" className="w-[200px] h-[150px] object-cover mr-3"/>
            <p className="text-left"> A picture of a cow. A fat one as well. yappa yappa yappa yappa yappa yappa yappa yappa yappa yappa yappa yappa</p>
          </div>
          <div className="flex border border-gray-300 p-3 bg-white items-center transition-all hover:bg-green-700 duration-500 ease-in-out shadow-xl rounded-xl">
            <img src={fatcow} alt="fatass cow" className="w-[200px] h-[150px] object-cover mr-3"/>
            <p className="text-left"> A picture of a cow. A fat one as well. yappa yappa yappa yappa yappa yappa yappa yappa yappa yappa yappa yappa yappa yappa yappa</p>
          </div>
          <div className="flex border border-gray-300 p-3 bg-white items-center transition-all hover:bg-green-700 duration-500 ease-in-out shadow-xl rounded-xl">
            <img src={fatcow} alt="fatass cow" className="w-[200px] h-[150px] object-cover mr-3"/>
            <p className="text-start"> A picture of a cow. A fat one as well.  yappa yappa yappa  yappa yappa yappa  yappa yappa yappa yappa yappa yappa</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default BigBox;