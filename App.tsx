import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite'

interface Teste {
  nome: string,
}

type Database = SQLite.SQLiteDatabase
type RunResult = SQLite.SQLiteRunResult

async function openDatabase(name: string): Promise<Database> {
  const db = await SQLite.openDatabaseAsync(name)

  db.execAsync(`
    CREATE TABLE IF NOT EXISTS Teste (
      id int PRIMARY KEY AUTO_INCREMENT,
      nome varchar(50) NOT NULL
    )   
  `) 

  return db
}

async function insertTeste(dname: string, { nome }: Teste) {
  const db = await openDatabase(dname)
  try {
    const row: RunResult = await db.runAsync(
      'INSERT INTO Teste (nome) VALUES (?)', 
      nome
    )
    console.log(`Registro ${row.lastInsertRowId} inserido!`)
  } catch (e) {
    console.log(`ERRO: ${e}`)
  }
}

export default function App() {
  insertTeste('teste', { nome: 'X' })
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
