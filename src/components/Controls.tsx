import { useState } from 'react';
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { IoMdShare } from 'react-icons/io';
import { MdLocalOffer } from 'react-icons/md';
import ShareModal from './ShareModal';

interface Props {
  isPlaying: boolean;
  isMuted: boolean;
  likes: number;
  onPlayPause: () => void;
  onMuteToggle: () => void;
  onShowTags: () => void;
  onLike: (isLiking: boolean) => void;
  onShare: () => void;
  videoUrl: string;
}

const Controls = ({
  isPlaying,
  isMuted,
  likes,
  onPlayPause,
  onMuteToggle,
  onShowTags,
  onLike,
  onShare,
  videoUrl,
}: Props) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleLike = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    onLike(newLikedState);
  };

  return (
    <>
      {/* Playback Controls - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={onPlayPause}
              className="text-white p-2.5 rounded-full hover:bg-white/20 transition-all duration-200 backdrop-blur-sm bg-black/20"
            >
              {isPlaying ? (
                <FaPause className="w-5 h-5" />
              ) : (
                <FaPlay className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={onMuteToggle}
              className="text-white p-2.5 rounded-full hover:bg-white/20 transition-all duration-200 backdrop-blur-sm bg-black/20"
            >
              {isMuted ? (
                <FaVolumeMute className="w-5 h-5" />
              ) : (
                <FaVolumeUp className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons - Right Side */}
      <div className="absolute right-4 bottom-20 flex flex-col items-center gap-6">
        <div className="action-button-container">
          <button
            onClick={handleLike}
            className="action-button group"
          >
            {isLiked ? (
              <AiFillHeart className="w-7 h-7 text-red-500" />
            ) : (
              <AiOutlineHeart className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
            )}
          </button>
          <span className="action-label">{likes.toLocaleString()}</span>
        </div>

        <div className="action-button-container">
          <button
            onClick={() => setShowShareModal(true)}
            className="action-button group"
          >
            <IoMdShare className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
          </button>
          <span className="action-label">Share</span>
        </div>

        <div className="action-button-container">
          <button
            onClick={onShowTags}
            className="action-button group"
          >
            <MdLocalOffer className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
          </button>
          <span className="action-label">Products</span>
        </div>
      </div>

      <ShareModal
        videoUrl={videoUrl}
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
      />
    </>
  );
};

export default Controls;
