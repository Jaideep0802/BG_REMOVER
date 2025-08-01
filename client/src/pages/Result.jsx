import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ConfettiWrapper from "../components/ConfettiWrapper";

const Result = () => {
  const { resultImage, image } = useContext(AppContext);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(!!resultImage);
  }, [resultImage]);

  const navigate = useNavigate();

  return (
    <div>
      {showConfetti && <ConfettiWrapper />}
      <Navbar>
        <div className="mx-4 my-3 lg:mx-44 mt-14 min-h-[75vh]">
          <div className="bg-white rounded-lg px-8 py-6 drop-shadow-sm">
            {/* image container */}
            <div className="flex flex-col sm:grid grid-cols-2 gap-8">
              {/* left side */}
              <div>
                <p className="font-semibold text-gray-600 mb-2">Original</p>
                <img
                  className="rounded-md border"
                  src={image ? URL.createObjectURL(image) : ""}
                  alt=""
                />
              </div>
              {/* right side */}
              <div className="flex flex-col">
                <p className="font-semibold text-gray-600 mb-2">
                  Background Removed
                </p>
                <div className="rounded-md border border-gray-300 h-full relative bg-layer overflow-hidden">
                  <img src={resultImage || ""} alt="" />
                  {!resultImage && image && (
                    <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
                      <div className="border-4 border-violet-600 rounded-full h-12 w-12 border-t-transparent animate-spin"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* buttons */}
            {resultImage && (
              <div className="flex justify-center sm:justify-end items-center flex-wrap gap-4 mt-6">
                <button
                  onClick={() => navigate("/")}
                  className="px-8 py-2.5 text-violet-600 text-sm border border-violet-600 rounded-full hover:scale-105 transition-all duration-700 cursor-pointer"
                >
                  Try another Image
                </button>
                <a
                  href={resultImage}
                  download
                  className="px-8 py-2.5 text-white text-sm bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-full hover:scale-105 transition-all duration-700"
                >
                  Download Image
                </a>
              </div>
            )}
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default Result;
