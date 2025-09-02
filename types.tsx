import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Home: undefined,
    Edit: undefined,
    EditLivro: { id: number }
}

export type HomeNavigationProps = NativeStackScreenProps<RootStackParamList, 'Home'>
export type EditNavigationProps = NativeStackScreenProps<RootStackParamList, 'Edit'>
export type EditLivroNavigationProps = NativeStackScreenProps<RootStackParamList, 'EditLivro'>