import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import * as SQLite from 'expo-sqlite'
import { useState } from 'react';
import { Button, Text, TextInput } from 'react-native-paper'

interface Usuario {
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

async function getUsuario(dname: string) {
  const db = await openDatabase(dname)
  try {
    const regs: Usuario[] = await db.getAllAsync('SELECT nome, email, display FROM usuario')
    return regs
  } catch (e) {
    console.log(`ERRO GET: ${e}`)
  }
}

export default function App() {
  const [curUserName, setCurUserName] = useState('')
  const [curUserEmail, setCurUserEmail] = useState('')
  const [curUserDisplay, setCurUserDisplay] = useState('')

  return (
    <View style={styles.container}>
      <TextInput 
        mode='outlined'
        label={'Nome'}        
        onChangeText={t => {setCurUserName(t); setCurUserDisplay(t)}}
      />
      <TextInput 
        mode='outlined'
        label={'Email'}        
        onChangeText={t => setCurUserEmail(t)}
      />
      <TextInput 
        mode='outlined'
        label={'Nome de Exibição'}        
        placeholder={curUserName}
        onChangeText={t => setCurUserDisplay(t)}
      />
      <Button
        mode='contained'
        onPress={async () => {
          await insertUsuario(DB, { nome: curUserName, email: curUserEmail, display: curUserDisplay })
          const users = await getUsuario(DB)
          console.log(users)
          setCurUserName('')
          setCurUserEmail('')
          setCurUserDisplay('')
        }}
      >
        Registrar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBlock: 100,
    gap: 10,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
