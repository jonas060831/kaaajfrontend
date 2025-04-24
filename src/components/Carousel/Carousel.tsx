import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type CarouselProps = {
  slides: React.ReactNode[];
  width?: string;
  height?: string;
  autoPlay?: boolean;
  interval?: number;
};

const Carousel: React.FC<CarouselProps> = ({
  slides,
  width = '100vw',
  height = '65vh',
  autoPlay = true,
  interval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goToIndex = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      goToNext();
    }, interval);
    return () => clearInterval(timer);
  }, [currentIndex, autoPlay, interval]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: {
          type: 'spring',
          stiffness: 280,
          damping: 22,
          mass: 0.9,
        },
        opacity: { duration: 0.2 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: { duration: 0.3 },
    }),
  };

  return (
    <div style={{ position: 'relative', width, height, overflow: 'hidden' }}>
      <AnimatePresence initial={false} custom={direction} mode="wait">
      <motion.div
        key={currentIndex}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(_, info) => {
            if (info.offset.x < -100) {
            goToNext();
            } else if (info.offset.x > 100) {
            goToPrevious();
            }
        }}
        style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // background: '#f0f0f0', default background of the carousel slides
            cursor: 'grab',
        }}
        >
        {slides[currentIndex]}
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      {/* <button onClick={goToPrevious} style={navButtonStyle('left')}>‹</button>
      <button onClick={goToNext} style={navButtonStyle('right')}>›</button> */}

      {/* Dot Indicators */}
      <div style={{
        position: 'absolute',
        bottom: '15px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
      }}>
        {slides.map((_, idx) => (
          <div
            key={idx}
            onClick={() => goToIndex(idx)}
            style={{
              width: currentIndex === idx ? '14px' : '10px',
              height: currentIndex === idx ? '14px' : '10px',
              borderRadius: '50%',
              backgroundColor: currentIndex === idx ? '#333' : '#aaa',
              cursor: 'pointer',
              transition: 'all 0.3s ease-in-out',
            }}
          />
        ))}
      </div>
    </div>
  );
};

// const navButtonStyle = (side: 'left' | 'right'): React.CSSProperties => ({
//   position: 'absolute',
//   top: '50%',
//   [side]: '10px',
//   transform: 'translateY(-50%)',
//   fontSize: '2rem',
//   background: 'rgba(0,0,0,0.3)',
//   color: 'white',
//   border: 'none',
//   cursor: 'pointer',
//   borderRadius: '100vw',
//   height: '30px',
//   width: '30px',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// });

export default Carousel;
