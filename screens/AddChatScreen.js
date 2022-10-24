import { StyleSheet, Text, View } from 'react-native'
import React, {useLayoutEffect, useState} from 'react'
import { Button, Input } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

const AddChatScreen = () => {
  const [input,setInput] = useState("")
  const navigation = useNavigation();
  useLayoutEffect(()=>{
    navigation.setOptions({
        title:"Add a new  Chat",
        headerBackTitle:"Chats"
    })
  },[navigation])
  return (
    <View>
      <Input
        value={input}
        onChangeText={(text)=>setInput(text)}
        placeholder='enter a chat name'
      />
    </View>
  )
}

export default AddChatScreen

const styles = StyleSheet.create({})