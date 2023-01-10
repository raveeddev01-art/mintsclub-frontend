import React, { useState } from 'react';
import LoadingTextContext from './LoadingTextContext';

const LoadingTextState = (props) => {
	const [loadingText, setLoadingText] = useState('');

	return (
		<LoadingTextContext.Provider value={{ loadingText, setLoadingText }}>
			{props.children}
		</LoadingTextContext.Provider>
	);
};

export default LoadingTextState;
