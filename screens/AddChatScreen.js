import { StyleSheet, Text, View } from 'react-native'
import React, {useLayoutEffect, useState} from 'react'
import { Button, Input, Icon } from 'react-native-elements'
import { useLinkBuilder, useNavigation } from '@react-navigation/native'
import { db } from '../firebase'
import { collection, getDocs, addDoc, setDoc, doc } from 'firebase/firestore'
import { Firestore } from 'firebase/firestore';
import tw from 'tailwind-react-native-classnames'
import uuid from 'react-native-uuid';


const AddChatScreen = () => {
  const [input,setInput] = useState("")
  const navigation = useNavigation();

  // used for setting header styles
  useLayoutEffect(()=>{
    navigation.setOptions({
        title:"Add a new  Chat",
        headerBackTitle:"Chats"
    })
  },[navigation])

  const createChat = async () =>{

    await setDoc(doc(db, "chats", input),{
      chatName: input,
      id: uuid.v4()
    }).then(()=>{
      navigation.goBack()
    }).catch(err => console.log(err))

  }

  return (
    <View style={tw`p-2`}>
      <Input
        value={input}
        onChangeText={(text)=>setInput(text)}
        placeholder='enter a chat name'
        leftIcon={
          <Icon name='wechat' type='antdesign' color='black'/>
        }
      />
      <Button onPress={createChat} title='Create new chat'/>
    </View>
  )
}

export default AddChatScreen

const styles = StyleSheet.create({})