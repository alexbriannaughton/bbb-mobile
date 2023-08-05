import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Login: undefined;
    'All Bathrooms': undefined;
};

export type LandingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
export type AllBathroomsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'All Bathrooms'>;
