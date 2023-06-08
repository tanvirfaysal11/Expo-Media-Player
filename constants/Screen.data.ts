import { ImageSourcePropType } from "react-native";



export const ScreenNames = {
    SPLASH: "Splash",
    HOME: "Home",
}

export const ScreenNavigators = {
    ROOT_NAV: "ROOT",
    HOME_NAV: "Home",
}

export interface IUserScreen {
    name: string;
    to: string;
    icon: ImageSourcePropType;
}

export type ScreenNameType = {}