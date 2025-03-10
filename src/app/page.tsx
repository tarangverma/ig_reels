"use client"

import { useInView } from 'react-intersection-observer';
import { VideoReel as VideoReelType } from '../types/index';
import VideoReel from '../components/VideoReel';
// Mock data
const mockReels = [
  {
    id: '1',
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    products: [
      {
        product: {
          id: 'p1',
          name: 'Cool T-Shirt',
          price: 29.99,
          url: '/products/t-shirt',
          image: 'https://picsum.photos/200/300'
        },
        position: { x: 50, y: 50 }
      }
    ],
    likes: 1234
  },
  {
    id: '2',
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    products: [
      {
        product: {
          id: 'p1',
          name: 'Cool T-Shirt',
          price: 29.99,
          url: '/products/t-shirt',
          image: 'https://picsum.photos/200/300'        },
        position: { x: 50, y: 50 }
      }
    ],
    likes: 1234
  },
  {
    id: '3',
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    products: [
      {
        product: {
          id: 'p1',
          name: 'Cool T-Shirt',
          price: 29.99,
          url: '/products/t-shirt',
          image: 'https://picsum.photos/200/300'        },
        position: { x: 50, y: 50 }
      }
    ],
    likes: 1234
  },
  {
    id: '4',
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    products: [
      {
        product: {
          id: 'p1',
          name: 'Cool T-Shirt',
          price: 29.99,
          url: '/products/t-shirt',
          image: 'https://picsum.photos/200/300'        },
        position: { x: 50, y: 50 }
      }
    ],
    likes: 1234
  },
  // Add more mock reels...
];

export default function Home() {
  return (
    <div className="h-screen w-full snap-y snap-mandatory overflow-y-scroll">
      {mockReels.map((reel) => (
        <ReelWrapper key={reel.id} reel={reel} />
      ))}
    </div>
  );
}

const ReelWrapper = ({ reel }: { reel: VideoReelType }) => {
  const { ref, inView } = useInView({
    threshold: 0.5
  });

  return (
    <div ref={ref}>
      <VideoReel reel={reel} isVisible={inView} />
    </div>
  );
};