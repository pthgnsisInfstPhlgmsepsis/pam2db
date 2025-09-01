
import { useState } from "react";
import { Avatar, Card, Chip, IconButton, Text } from "react-native-paper";

interface LivroInfo {
    nome: string,
    autor: string,
    editora: string,
    big?: boolean,
}

export default function LivroComponent({ nome, autor, editora, big }: LivroInfo) {
    const titulo = `${nome} - ${autor}`
    const [chip, setChip] = useState(titulo)

    if (big) {
        return (
            <Card mode="contained" style={{padding: 15}}>
                <Card.Title
                    title={titulo}
                    subtitle={`Editora ${editora}`}
                    left={() => <Avatar.Icon icon="book" />}
                    leftStyle={{marginRight: 40}}
                />
            </Card>
        )
    } else {
        return (
            <Chip
                mode='outlined'
                avatar={<Avatar.Icon size={24} icon={'book'} />}
                onPress={() => {
                    chip == `${nome} - ${autor}, Editora ${editora}` ? setChip(titulo) : setChip(`${titulo}, Editora ${editora}`)
                }}
            >
                {chip}
            </Chip>
        )
    }
}