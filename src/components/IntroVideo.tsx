import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroVideoProps {
  onVideoEnd: () => void;
}

export function IntroVideo({ onVideoEnd }: IntroVideoProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const handleVideoEnd = () => {
    setIsVisible(false);
    setTimeout(onVideoEnd, 500);
  };

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  const handleVideoError = () => {
    setVideoError(true);
    setTimeout(handleVideoEnd, 3000);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
        >
          {!videoLoaded && !videoError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}

          <video
            autoPlay
            muted
            playsInline
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
            onEnded={handleVideoEnd}
            className={`w-full h-full object-cover transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
          >
            <source src="/uploads/in.mp4" type="video/mp4" />
            <source src="/uploads/in.mp4" type="video/quicktime" />
          </video>

          {videoError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/70">
              <p className="text-lg mb-4">Loading...</p>
              <p className="text-sm opacity-50">Skipping in 3 seconds</p>
            </div>
          )}

          <button
            onClick={handleVideoEnd}
            className="absolute bottom-8 right-8 text-white/50 hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm backdrop-blur-sm"
          >
            Skip Intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
