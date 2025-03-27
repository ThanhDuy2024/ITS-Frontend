import React, { useState } from 'react';
import background from '../assets/background.jpg';
import { Link } from 'react-router-dom';

export const ImagePage = () => {
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null); // Ảnh preview từ máy
    const [serverImageUrl, setServerImageUrl] = useState(null); // Ảnh trả về từ backend

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImage(file);
        setPreviewUrl(URL.createObjectURL(file)); // Tạo URL preview ảnh

        const formData = new FormData();
        formData.append("file", file);
        console.log("FormData:", formData);

        try {
            const response = await fetch("http://localhost:8000/detect", {
                method: "POST",
                body: formData
            });

            // Kiểm tra response có phải ảnh không
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("image")) {
                const blob = await response.blob();
                const imageUrl = URL.createObjectURL(blob);
                setServerImageUrl(imageUrl); // Cập nhật ảnh từ server
            } else {
                const data = await response.json();
                console.error("Server response:", data);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const handleImageRemove = () => {
        setImage(null);
        setPreviewUrl(null);
        setServerImageUrl(null);
        window.location.reload();
    };

    return (
        <>
            <Link
                to="/"
                className="bg-orange-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-orange-400 transition fixed top-4 left-[10px]"
            >
                Về trang chủ
            </Link>

            <div
                className="flex flex-col items-center justify-center h-screen"
                style={{
                    backgroundImage: `url(${background})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="bg-white p-8 rounded-lg shadow-lg text-center ">
                    <h1 className="text-3xl font-bold mb-6">Chọn Hình Ảnh của Bạn</h1>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mb-6 text-lg cursor-pointer text-center"
                    />

                    {/* Hiển thị ảnh theo hàng ngang */}
                    <div className="flex flex-row items-center justify-center gap-8 mt-6">
                        {/* Preview ảnh trước khi upload */}
                        {previewUrl && (
                            <div>
                                <h2 className="text-xl font-semibold mb-2">Ảnh Gốc</h2>
                                <img
                                    src={previewUrl}
                                    alt="Ảnh gốc"
                                    className="w-[500px] h-auto rounded-lg border border-gray-400 shadow-lg"
                                />
                            </div>
                        )}

                        {/* Hiển thị ảnh nhận từ server */}
                        {serverImageUrl && (
                            <div>
                                <h2 className="text-xl font-semibold mb-2">Ảnh Xử Lý</h2>
                                <img
                                    src={serverImageUrl}
                                    alt="Ảnh từ server"
                                    className="w-[500px] h-auto rounded-lg border border-gray-400 shadow-lg"
                                />
                            </div>
                        )}
                    </div>

                    {/* Nút xóa ảnh */}
                    {previewUrl && (
                        <button
                            onClick={handleImageRemove}
                            className="mt-6 bg-red-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-red-400 cursor-pointer"
                        >
                            Xóa ảnh
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};
