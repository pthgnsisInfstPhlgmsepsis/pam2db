import * as SQLite from 'expo-sqlite'
import { Usuario } from './components/User'

type Database = SQLite.SQLiteDatabase
type RunResult = SQLite.SQLiteRunResult


export class DatabaseDB {
  private static async openDatabase(name: string): Promise<Database> {
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
      console.log('BANCO ABERTO')
    } catch (e) {
      console.log('ERRO AO CRIAR BANCO: ', e)
    }

    return db
  }

  public static async insertUsuario(dname: string, { nome, email, display }: Usuario) {
    const db = await DatabaseDB.openDatabase(dname)
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

  public static async getUsuario(dname: string): Promise<Usuario[]> {
    const db = await DatabaseDB.openDatabase(dname)
    try {
      const regs: Usuario[] = await db.getAllAsync('SELECT id_user, nome, email, display FROM usuario')
      return regs
    } catch (e) {
      console.log(`ERRO GET: ${e}`)
      return [{ nome: 'ERROR', email: 'ERRO' }]
    }
  }

  public static async totalUserCount(dname: string): Promise<number> {
    const db = await DatabaseDB.openDatabase(dname)
    try {
      const regs: { 'cnt': number }[] = await db.getAllAsync('SELECT COUNT() AS cnt FROM usuario')
      return regs[0].cnt
    } catch (e) {
      console.log(`ERRO COUNT: ${e}`)
      return -1
    }
  }
}