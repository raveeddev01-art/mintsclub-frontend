import DarkModeState from "./darkmode/DarkModeState";
import ErrorHandlerState from "./errorHandler/ErrorHandlerState";
import { combineComponents } from "./combineComponents";
const providers: any = [DarkModeState, ErrorHandlerState];
export const AppContextProvider = combineComponents(...providers);
