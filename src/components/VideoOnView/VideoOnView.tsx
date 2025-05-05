import { useRef, useEffect, useState, FC } from 'react';

type VideoOnViewProps = {
    src: string;
}


const VideoOnView:FC<VideoOnViewProps> = ({ src, ...props }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [_, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            videoRef.current?.play();
          } else {
            setIsVisible(false);
            videoRef.current?.pause();
          }
        });
      },
      { threshold: 0.5 } // Adjust threshold as needed
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <video ref={videoRef} controls={false} muted loop {...props} >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    
</video>
  );
}

export default VideoOnView;
