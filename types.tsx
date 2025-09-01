import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Home: undefined;
    Edit: undefined;
}

export type HomeNavigationProps = NativeStackScreenProps<RootStackParamList, 'Home'>
export type EditNavigationProps = NativeStackScreenProps<RootStackParamList, 'Edit'>