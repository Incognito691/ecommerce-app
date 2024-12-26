import React from "react";

// interface ProductFlipCardProps {
// }

const ProductFlipCard = () => {
  return (
    <div className="bg-transparent w-[190px] h-[254px] perspective-1000 font-sans group">
      <div className="relative w-full h-full text-center transition-transform duration-800 transform-style-3d group-hover:rotate-y-180">
        {/* Front of the Card */}
        <div
          className="absolute w-full h-full flex flex-col justify-center backface-hidden border border-coral rounded-2xl 
          bg-gradient-to-tr from-bisque via-[rgb(255,231,222)] to-[rgba(255,127,80,0.603)] 
          text-coral"
        >
          <h3 className="text-2xl font-black text-center m-0">FLIP CARD</h3>
          <p className="text-center">Hover Me</p>
        </div>

        {/* Back of the Card */}
        <div
          className="absolute w-full h-full flex flex-col justify-center backface-hidden border border-coral rounded-2xl 
          bg-gradient-to-tr from-[rgb(255,174,145)] via-coral to-[rgb(255,185,160)] 
          text-white rotate-y-180"
        >
          <h3 className="text-2xl font-black text-center m-0">BACK</h3>
          <p className="text-center">Leave Me</p>
        </div>
      </div>
    </div>
  );
};

export default ProductFlipCard;
