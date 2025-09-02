
import { useState } from "react";
import { View } from "react-native";
import { Avatar, Button, Card, Chip, Icon, IconButton, Text, TouchableRipple } from "react-native-paper";

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
            <Card mode={"outlined"}>
                <Card.Content style={{flex: 1, flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                    <View>
                        <Icon source={'book'} size={30} />
                    </View>
                    <View>
                        <Text variant={'titleMedium'}>{titulo}</Text>
                        <Text>{editora}</Text>
                    </View>
                </Card.Content>
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