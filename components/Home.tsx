import { FlatList, StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import { Button, Text, TextInput } from 'react-native-paper'
import { DatabaseDB, Livro } from '../Database';
import LivroComponent from './Livro';
import { useNavigation } from '@react-navigation/native';
import { HomeNavigationProps } from '../types';


const DB = 'banco'

export default function Home({ route, navigation }: HomeNavigationProps) {
  const [curUserName, setCurUserName] = useState('')
  const [curUserAutor, setCurUserAutor] = useState('')
  const [curUserEditora, setCurUserEditora] = useState('')
  const [allLivros, setAllLivros] = useState<Livro[]>([])

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 30, fontWeight: `bold`}}>Página Inicial</Text>
      <Text style={{fontSize: 20}}>Adicione novos livros ou visualize os que já estão cadastrados</Text>
      <TextInput 
        mode={'outlined'}
        label={'Nome'}        
        value={curUserName}
        onChangeText={t => {setCurUserName(t)}}
      />
      <TextInput 
        mode='outlined'
        label={'Autor'}        
        value={curUserAutor}
        onChangeText={t => setCurUserAutor(t)}
      />
      <TextInput 
        mode='outlined'
        label={'Editora'}        
        value={curUserEditora}
        onChangeText={t => setCurUserEditora(t)}
      />
      <Button
        mode='contained'
        icon='book-plus'
        onPress={async () => {
          if (curUserName != '' && curUserEditora != '' && curUserAutor != '')
            await DatabaseDB.insertLivro(DB, { nome: curUserName, editora: curUserEditora, autor: curUserAutor })
          setCurUserName('')
          setCurUserAutor('')
          setCurUserEditora('')
        }}
      >
        Registrar Livro
      </Button>
      <Button
        mode='contained'
        icon='book-open-variant'
        onPress={() => navigation.navigate('Edit')}
      >
        Editar Livros
      </Button>
      <Button
        mode='contained'
        icon='book-multiple'
        onPress={async () => {
          if (allLivros.length == 0) {
            const livros: Livro[] = await DatabaseDB.getLivro(DB);
            console.log(livros)
            setAllLivros([...livros])
          } else {
            setAllLivros([])
          }
        }}
      >
        {allLivros.length > 0 ? 'Esconder Livros' : 'Visualizar Livros'}
      </Button>
      <FlatList 
        contentContainerStyle={{ gap: 10 }}
        data={allLivros} 
        renderItem={livro => <LivroComponent nome={livro.item.nome} editora={livro.item.editora} autor={livro.item.autor} />}
        keyExtractor={livro => livro.nome}
      />
    </View>
  );
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
