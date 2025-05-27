import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import { Button, Text, TextInput } from 'react-native-paper'
import User, { Usuario } from './components/User';
import { DatabaseDB } from './Database';

const DB = 'banco'

export default function App() {
  const [curUserName, setCurUserName] = useState('')
  const [curUserEmail, setCurUserEmail] = useState('')
  const [curUserDisplay, setCurUserDisplay] = useState('')
  const [allUsers, setAllUsers] = useState<Usuario[]>([])
  const [regs, setRegs] = useState(0)

  useEffect(() => {
    (async () => {
      setRegs(await DatabaseDB.totalUserCount(DB))
    })()
  }, [])

  return (
    <View style={styles.container}>
      <TextInput 
        mode='outlined'
        label={'Nome'}        
        value={curUserName}
        onChangeText={t => {setCurUserName(t)}}
      />
      <TextInput 
        mode='outlined'
        label={'Email'}        
        value={curUserEmail}
        onChangeText={t => setCurUserEmail(t)}
      />
      <TextInput 
        mode='outlined'
        label={'Nome de Exibição'}        
        placeholder={curUserName}
        value={curUserDisplay}
        onChangeText={t => setCurUserDisplay(t)}
      />
      <Button
        mode='contained'
        icon='account-plus'
        onPress={async () => {
          if (curUserDisplay == '') setCurUserDisplay(curUserName)
          await DatabaseDB.insertUsuario(DB, { nome: curUserName, email: curUserEmail, display: curUserDisplay })
          setCurUserName('')
          setCurUserEmail('')
          setCurUserDisplay('')

          setRegs(await DatabaseDB.totalUserCount(DB))
        }}
      >
        Registrar
      </Button>
      <Button
        mode='contained'
        icon='account-group'
        onPress={async () => {
          if (allUsers.length == 0) {
            const users: Usuario[] = await DatabaseDB.getUsuario(DB);
            setAllUsers([...users])
          } else {
            setAllUsers([])
          }
          console.log(await DatabaseDB.totalUserCount(DB))
        }}
      >
        {allUsers.length > 0 ? 'Esconder Registros' : 'Visualizar Registros'}
      </Button>
      <FlatList 
        contentContainerStyle={{ gap: 10 }}
        data={allUsers} 
        renderItem={user => <User display={user.item.display} email={user.item.email} />}
        keyExtractor={user => user.email}
      />
      <Text>Total de {regs} usuários cadastrados</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBlock: 100,
    marginInline: 50,
    gap: 10,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
