import { useEffect, useState } from "react"
import { DatabaseDB, Livro } from "../Database"

import { FlatList, StyleSheet, Touchable, TouchableOpacity, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper'
import LivroComponent from "./Livro";
import { useNavigation } from "@react-navigation/native";
import { EditLivroNavigationProps, EditNavigationProps } from "../types";

const DB = 'banco'

export function EditModal({ route, navigation }: EditLivroNavigationProps) {
    const id = route.params.id
    console.log(`Got id ${id}`)
    return <></>
}

export default function Edit({ route, navigation }: EditNavigationProps) {
    const renderLivro = ({ id, nome, editora, autor}: Livro) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('EditLivro', { id: id ?? 0 })}>
                <LivroComponent big={true} nome={nome} editora={editora} autor={autor} />
            </TouchableOpacity>
        )
    }
    const [livros, setLivros] = useState<Livro[]>([])
    useEffect(() => {
        (async () => {
            const liv = await DatabaseDB.getLivro(DB) 
            setLivros(liv)
            console.log(livros)
        })()
    }, [])
    return (
        <View style={styles.container}>
            <Text style={{fontSize: 30, fontWeight: `bold`}}>Edição</Text>
            <Text style={{fontSize: 20}}>Clique em algum dos livros para ir até a página de edição. Você também pode excluí-los por lá</Text>
            <FlatList 
                contentContainerStyle={{ gap: 10 }}
                data={livros} 
                renderItem={livro => renderLivro(livro.item) }
                keyExtractor={livro => livro.nome}
            />
            <Button
                mode='contained'
                icon='book-plus'
                onPress={() => navigation.goBack()}
            >
                Adicionar mais livros
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBlock: 100,
    marginInline: 50,
    gap: 10,
    backgroundColor: 'none',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
