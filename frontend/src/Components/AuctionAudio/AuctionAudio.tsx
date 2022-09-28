import React, { FC } from 'react';
import { ReactComponent as AudioIcon } from '../../assets/images/audio-icon.svg';
import { AuctionAudioInt } from '../../interfaces/components';
import './AuctionAudio.scss';

const AuctionAudio: FC<AuctionAudioInt> = ({ src, onLoadCallback, loader }) => {
  return (
    <div
      className="w-100 h-100 auction-audio-container p-4"
      style={{ display: `${!loader ? 'flex' : 'none'}` }}
    >
      <div className="w-100 audio-wrapper">
        <div className="auction-audio-icon">
          <AudioIcon />
        </div>

        <audio
          className="w-100 mt-4 auction-audio-tag"
          onCanPlay={() => {
            onLoadCallback();
          }}
          controls
          controlsList="nodownload noplaybackrate"
        >
          <source src={src} />
        </audio>
      </div>
      <div></div>
    </div>
  );
};
export default AuctionAudio;
