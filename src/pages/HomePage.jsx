import React, { useState } from 'react';
import background from '../assets/background.jpg';
import { Link } from 'react-router-dom';
export const HomePage = () => {
    return (
        <div
            className="flex items-center justify-center h-screen"
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="text-center z-10">
                <h1 className="text-4xl font-bold mb-4 text-white">
                    Website Phát Hiện Ổ Gà
                </h1>
                <p className="text-lg mb-6 px-2 text-white">
                    Bạn có thể gửi ảnh hoặc video đoạn đường có ổ gà để chúng tôi phân tích và tìm ra chúng
                </p>
                
                <div className="flex justify-center space-x-4">
                    <Link 
                        to="/upload-image"
                        className="bg-orange-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-orange-400 transition"
                    >
                        Tìm ổ gà bằng ảnh
                    </Link>
                    <Link
                        to="/upload-video" 
                        className="bg-gray-700 text-white font-semibold py-2 px-4 rounded shadow hover:bg-gray-600 transition"
                    >
                        Tìm ổ gà bằng video
                    </Link>
                </div>
            </div>
        </div>
    );
};