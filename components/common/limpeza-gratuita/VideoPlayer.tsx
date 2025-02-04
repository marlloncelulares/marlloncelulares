import React, { useEffect, useState } from 'react';

const VideoPlayer: React.FC = () => {
  const [viewerCount, setViewerCount] = useState<number>(0);
  const [videoError, setVideoError] = useState<boolean>(false);

  useEffect(() => {
    const initialCount = Math.floor(Math.random() * (120 - 80 + 1)) + 80;
    setViewerCount(initialCount);

    const updateViewerCount = () => {
      setViewerCount((prevCount) => {
        const change = Math.random() < 0.6 ? 1 : -1;
        const variation = Math.random() < 0.9 ? 1 : 2;
        const newCount = prevCount + change * variation;
        return Math.max(50, Math.min(newCount, 190));
      });
    };

    const interval = setInterval(updateViewerCount, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleVideoError = () => {
    setVideoError(true);
  };

  return (
    <div className="flex flex-col items-center my-4">
      <div className="w-full max-w-2xl mb-4 aspect-video">
        {videoError ? (
          <div className="flex items-center justify-center w-full h-full bg-gray-800 text-white text-center">
            <p>O vídeo não pode ser carregado. Por favor, tente novamente mais tarde.</p>
          </div>
        ) : (
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/TXgCKXD46g4"
            title="Vídeo de apresentação"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onError={handleVideoError}
          ></iframe>
        )}
      </div>
      <p className="text-white text-sm">
        {viewerCount} pessoas estão assistindo agora
      </p>
    </div>
  );
};

export default VideoPlayer;
