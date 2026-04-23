import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroVideoProps {
  onVideoEnd: () => void;
}

export function IntroVideo({ onVideoEnd }: IntroVideoProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleVideoEnd = () => {
    setIsVisible(false);
    setTimeout(onVideoEnd, 500); // Allow time for exit animation
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
          <video
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            className="w-full h-full object-cover"
          >
            <source src="/uploads/in.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Skip button for better UX */}
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
