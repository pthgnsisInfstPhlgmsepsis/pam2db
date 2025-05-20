import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, View } from 'react-native';
import * as SQLite from 'expo-sqlite'
import { useState } from 'react';
import { Button, Text, TextInput } from 'react-native-paper'
import User from './User';

interface Usuario {
  id?: number,
  nome: string,
  email: string,
  display?: string
}

type Database = SQLite.SQLiteDatabase
type RunResult = SQLite.SQLiteRunResult

const DB = 'banco'

async function openDatabase(name: string): Promise<Database> {
  const db = await SQLite.openDatabaseAsync(name)

  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS usuario (
        id_user integer PRIMARY_KEY,
        nome varchar(50) NOT NULL,
        email varchar(50) NOT NULL,
        display varchar(50)
      ); 
    `)
    console.log('BANCO CRIADO!')
  } catch (e) {
    console.log('ERRO AO CRIAR BANCO: ', e)
  }

  return db
}

async function insertUsuario(dname: string, { nome, email, display }: Usuario) {
  const db = await openDatabase(dname)
  try {
    const row: RunResult = await db.runAsync(
      'INSERT INTO usuario (nome, email, display) VALUES (?, ?, ?)', 
      nome,
      email,
      display ? display : nome
    )
    console.log(`Registro ${row.lastInsertRowId} inserido!`)
  } catch (e) {
    console.log(`ERRO INSERT: ${e}`)
  }
}

async function getUsuario(dname: string): Promise<Usuario[]> {
  const db = await openDatabase(dname)
  try {
    const regs: Usuario[] = await db.getAllAsync('SELECT id_user, nome, email, display FROM usuario')
    return regs
  } catch (e) {
    console.log(`ERRO GET: ${e}`)
    return [{ nome: 'ERROR', email: 'ERRO' }]
  }
}

export default function App() {
  const [curUserName, setCurUserName] = useState('')
  const [curUserEmail, setCurUserEmail] = useState('')
  const [curUserDisplay, setCurUserDisplay] = useState('')
  const [allUsers, setAllUsers] = useState<Usuario[]>([])

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
          await insertUsuario(DB, { nome: curUserName, email: curUserEmail, display: curUserDisplay })
          setCurUserName('')
          setCurUserEmail('')
          setCurUserDisplay('')
        }}
      >
        Registrar
      </Button>
      <Button
        mode='contained'
        icon='account-group'
        onPress={async () => {
          if (allUsers.length == 0) {
            const users: Usuario[] = await getUsuario(DB);
            setAllUsers([...users])
          } else {
            setAllUsers([])
          }
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
