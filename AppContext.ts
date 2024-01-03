import { createContext } from "react";

const AppContext = createContext<{
    audioOn: boolean | undefined,
    setAudioOn: React.Dispatch<React.SetStateAction<boolean | undefined>> | undefined, 
    vibrationOn: boolean | undefined, 
    setVibrationOn: React.Dispatch<React.SetStateAction<boolean | undefined>> | undefined
}>({
    audioOn: undefined,
    setAudioOn: undefined,
    vibrationOn: undefined,
    setVibrationOn: undefined
});

export default AppContext;