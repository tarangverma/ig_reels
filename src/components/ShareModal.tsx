import { useState } from 'react';
import { 
  FaWhatsapp, 
  FaFacebook, 
  FaTwitter, 
  FaTelegram, 
  FaLink,
  FaTimes
} from 'react-icons/fa';

interface Props {
  videoUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

const ShareModal = ({ isOpen, onClose }: Props) => {
  const [copySuccess, setCopySuccess] = useState('');
  
  if (!isOpen) return null;

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = 'Check out this awesome video!';

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
        console.log('Failed to copy!', err);
    }
  };

  const shareButtons = [
    { icon: FaWhatsapp, label: 'WhatsApp', link: shareLinks.whatsapp, color: 'bg-[#25D366]' },
    { icon: FaFacebook, label: 'Facebook', link: shareLinks.facebook, color: 'bg-[#1877F2]' },
    { icon: FaTwitter, label: 'Twitter', link: shareLinks.twitter, color: 'bg-[#1DA1F2]' },
    { icon: FaTelegram, label: 'Telegram', link: shareLinks.telegram, color: 'bg-[#0088cc]' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-[90%] max-w-md p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold dark:text-white">Share to</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <FaTimes className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {shareButtons.map((button) => (
            <a
              key={button.label}
              href={button.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2"
            >
              <div className={`${button.color} p-3 rounded-full hover:opacity-90 transition-opacity`}>
                <button.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-300">
                {button.label}
              </span>
            </a>
          ))}
        </div>

        <div className="relative">
          <div className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 bg-transparent text-sm outline-none"
            />
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              <FaLink className="w-4 h-4" />
              {copySuccess || 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal; 