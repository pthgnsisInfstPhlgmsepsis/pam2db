import { useEffect, useState } from "react"
import { DatabaseDB, Livro } from "../Database"

import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper'
import LivroComponent from "./Livro";

const DB = 'banco'

export default function Edit() {
    const [livros, setLivros] = useState<Livro[]>([])
    useEffect(() => {
        (async () => {
            const liv = await DatabaseDB.getLivro(DB) 
            setLivros(liv)
        })()
    }, [])
    return (
        <View style={styles.container}>
            <Text style={{fontSize: 30, fontWeight: `bold`}}>Edição</Text>
            <Text style={{fontSize: 20}}>Clique em algum dos livros para ir até a página de edição. Você também pode excluí-los por lá</Text>
            <FlatList 
                contentContainerStyle={{ gap: 10 }}
                data={livros} 
                renderItem={livro => <LivroComponent big={true} nome={livro.item.nome} editora={livro.item.editora} autor={livro.item.autor} />}
                keyExtractor={livro => livro.nome}
            />
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
