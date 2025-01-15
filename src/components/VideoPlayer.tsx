import { useRef, useEffect, useState } from 'react';

interface Props {
  videoUrl: string;
  isPlaying: boolean;
  isMuted: boolean;
  onPlayPause: () => void;
}

const VideoPlayer = ({ videoUrl, isPlaying, isMuted, onPlayPause }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [aspectRatio, setAspectRatio] = useState<'portrait' | 'landscape'>('portrait');

  useEffect(() => {
    const handleVideoMetadata = () => {
      if (videoRef.current) {
        const { videoWidth, videoHeight } = videoRef.current;
        setAspectRatio(videoWidth > videoHeight ? 'landscape' : 'portrait');
      }
    };

    if (videoRef.current) {
      videoRef.current.addEventListener('loadedmetadata', handleVideoMetadata);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('loadedmetadata', handleVideoMetadata);
      }
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full h-full flex items-center justify-center bg-black
        ${aspectRatio === 'landscape' ? 'landscape-video' : 'portrait-video'}`}
    >
      <video
        ref={videoRef}
        className={`
          max-h-full max-w-full object-contain
          md:max-w-[85vw] md:max-h-[85vh]
          lg:max-w-[75vw] lg:max-h-[75vh]
        `}
        src={videoUrl}
        loop
        playsInline
        onClick={onPlayPause}
      />
    </div>
  );
};

export default VideoPlayer;
