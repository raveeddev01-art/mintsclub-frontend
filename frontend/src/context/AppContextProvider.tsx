import DarkModeState from './darkmode/DarkModeState';
import LoadingTextState from './loadingText/LoadingTextState';
import ErrorHandlerState from './errorHandler/ErrorHandlerState';
import ConnectModalState from './connectModal/ConnectModalState';
import { combineComponents } from './combineComponents';
const providers: any = [
	DarkModeState,
	LoadingTextState,
	ErrorHandlerState,
	ConnectModalState,
];
export const AppContextProvider = combineComponents(...providers);
