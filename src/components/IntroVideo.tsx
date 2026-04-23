import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroVideoProps {
  onVideoEnd: () => void;
}

export function IntroVideo({ onVideoEnd }: IntroVideoProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleVideoEnd = () => {
    setIsVisible(false);
    setTimeout(onVideoEnd, 300);
  };

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!videoLoaded) {
        handleVideoEnd();
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [videoLoaded]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
        >
          <video
            autoPlay
            muted
            playsInline
            preload="auto"
            onLoadedData={handleVideoLoad}
            onCanPlay={handleVideoLoad}
            onEnded={handleVideoEnd}
            className={`w-full h-full object-cover transition-opacity duration-300 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
          >
            <source src="/uploads/in.mp4" type="video/mp4" />
          </video>

          {!videoLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4" />
              <p className="text-sm text-white/70">Loading intro...</p>
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
