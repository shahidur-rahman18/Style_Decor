import React from 'react';
import Lottie from "lottie-react";
import flowers from "../../assets/login.json";

const LottieAnim = () => {
    return (
        <div className="flex justify-center items-center">
      <Lottie
        animationData={flowers}
        loop={true}
        className="w-[300px] h-full"
        style={{ color:"" }}
      />
    </div>
    );
};

export default LottieAnim;