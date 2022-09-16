import DarkModeState from "./darkmode/DarkModeState";
import ErrorHandlerState from "./errorHandler/ErrorHandlerState";
import ConnectModalState from "./connectModal/ConnectModalState";
import { combineComponents } from "./combineComponents";
const providers: any = [DarkModeState, ErrorHandlerState, ConnectModalState];
export const AppContextProvider = combineComponents(...providers);
