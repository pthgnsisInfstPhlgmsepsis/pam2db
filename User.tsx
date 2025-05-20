import { useState } from "react";
import { Avatar, Chip, Text } from "react-native-paper";

interface UserInfo {
  display?: string,
  email: string,
}

export default function User({ display, email }: UserInfo) {
  const [chip, setChip] = useState(display)
  const dp: string = display ? display : 'NODISPLAY'
  return (
    <Chip 
      mode='outlined'
      avatar={ <Avatar.Text size={24} label={dp.charAt(0).toUpperCase()} /> }
      onPress={() => {
        chip == `${display} (${email})` ? setChip(display) : setChip(`${display} (${email})`)
      }}
    >
      {chip}
    </Chip>
  )
}