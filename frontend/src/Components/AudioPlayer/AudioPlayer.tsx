import React from 'react';
import './AudioPlayer.scss';
import ReactAudioPlayer from 'react-audio-player';

const AudioPlayer = ({ audioSrc }: any) => {
	return (
		<ReactAudioPlayer
			src={audioSrc}
			controlsList="nodownload"
			preload="auto"
			controls
		/>
	);
};
export default AudioPlayer;
