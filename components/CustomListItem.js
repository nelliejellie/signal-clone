import { View, Text } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import React from 'react'
import tw from 'tailwind-react-native-classnames'

const CustomListItem = ({id,chatName, enterChat}) => {
  return (
    <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)}>
        <Avatar
            rounded
            source={{
                uri:"https://t3.ftcdn.net/jpg/02/33/46/24/360_F_233462402_Fx1yke4ng4GA8TJikJZoiATrkncvW6Ib.jpg"
            }}
        />
        <ListItem.Content>
            <ListItem.Title style={tw`font-bold`}>
                {chatName}
            </ListItem.Title>
            <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                this is the subtitle
            </ListItem.Subtitle>
        </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem