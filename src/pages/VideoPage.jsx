import React, { useState } from 'react';
import background from '../assets/background.jpg';
import { Link } from 'react-router-dom';

export const VideoPage = () => {
    const [video, setVideo] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null); // Video preview từ máy
    const [serverVideoUrl, setServerVideoUrl] = useState(null); // Video trả về từ backend

    const handleVideoChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setVideo(file);
        setPreviewUrl(URL.createObjectURL(file)); // Tạo URL preview video

        const formData = new FormData();
        formData.append("file", file);
        console.log("FormData:", formData);

        try {
            const response = await fetch("http://localhost:8000/detect-video", {
                method: "POST",
                body: formData
            });

            // Kiểm tra response có phải video không
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("video")) {
                const blob = await response.blob();
                const videoUrl = URL.createObjectURL(blob);
                setServerVideoUrl(videoUrl); // Cập nhật video từ server
                console.log(videoUrl)
            } else {
                const data = await response.json();
                console.error("Server response:", data);
            }
        } catch (error) {
            console.error("Error uploading video:", error);
        }
    };

    const handleVideoRemove = () => {
        setVideo(null);
        setPreviewUrl(null);
        setServerVideoUrl(null);
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
                    <h1 className="text-3xl font-bold mb-6">Chọn Video của Bạn</h1>
                    <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoChange}
                        className="mb-6 text-lg cursor-pointer text-center"
                    />

                    {/* Hiển thị video theo hàng ngang */}
                    <div className="flex flex-row items-center justify-center gap-8 mt-6">
                        {/* Preview video trước khi upload */}
                        {previewUrl && (
                            <div>
                                <h2 className="text-xl font-semibold mb-2">Video Gốc</h2>
                                <video controls className="w-[500px] h-auto rounded-lg border border-gray-400 shadow-lg">
                                    <source src={previewUrl} type="video/mp4" />
                                    Trình duyệt của bạn không hỗ trợ video.
                                </video>
                            </div>
                        )}

                        {/* Hiển thị video nhận từ server */}
                        {serverVideoUrl && (
                            <div>
                                <h2 className="text-xl font-semibold mb-2">Video Xử Lý</h2>
                                <video controls className="w-[500px] h-auto rounded-lg border border-gray-400 shadow-lg">
                                    <source src={serverVideoUrl} type="video/mp4" />
                                    Trình duyệt của bạn không hỗ trợ video.
                                </video>
                            </div>
                        )}
                    </div>

                    {/* Nút xóa video */}
                    {previewUrl && (
                        <button
                            onClick={handleVideoRemove}
                            className="mt-6 bg-red-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-red-400 cursor-pointer"
                        >
                            Xóa video
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};
