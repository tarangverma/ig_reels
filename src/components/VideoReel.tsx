import { useState, useEffect } from 'react';
import { VideoReel as VideoReelType } from '../types';
import VideoPlayer from './VideoPlayer';
import ProductTag from './ProductTag';
import Controls from './Controls';

interface Props {
  reel: VideoReelType;
  isVisible: boolean;
}

const VideoReel = ({ reel, isVisible }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showTags, setShowTags] = useState(false);
  const [likes, setLikes] = useState(reel.likes);
  
  useEffect(() => {
    setIsPlaying(isVisible);
  }, [isVisible]);

  const handleLikeAction = (isLiking: boolean) => {
    setLikes(prev => isLiking ? prev + 1 : prev - 1);
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Check out this reel!',
        url: window.location.href
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="relative h-screen w-full snap-start flex items-center justify-center bg-black">
      <div className="relative w-full h-full max-w-screen-xl mx-auto">
        <VideoPlayer
          videoUrl={reel.videoUrl}
          isPlaying={isPlaying}
          isMuted={isMuted}
          onPlayPause={() => setIsPlaying(!isPlaying)}
        />
        
        {showTags && reel.products.map((item) => (
          <ProductTag
            key={item.product.id}
            product={item.product}
            position={item.position}
          />
        ))}

        <Controls
          isPlaying={isPlaying}
          isMuted={isMuted}
          likes={likes}
          videoUrl={reel.videoUrl}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onMuteToggle={() => setIsMuted(!isMuted)}
          onShowTags={() => setShowTags(!showTags)}
          onLike={handleLikeAction}
          onShare={handleShare}
        />
      </div>
    </div>
  );
};

export default VideoReel;
