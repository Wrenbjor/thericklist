import React from 'react';
import Image from 'next/image';

type ImageProps = {
    src: string;
    alt?: string;
    width: number;
    height: number;
    className?: string; // Add this line
  };
  
  const CustomImage: React.FC<ImageProps> = ({ src, alt = 'Character Image', width, height, className }) => {
    return (
      <Image src={src} alt={alt} width={width} height={height} layout="responsive" className={className} />
    );
  };

export default CustomImage;
