import { StyleSheet, Text, View } from 'react-native'
import React, {useLayoutEffect, useState} from 'react'
import { Button, Input, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { db } from '../firebase'
import { collection, getDocs, addDoc, setDoc, doc } from 'firebase/firestore'
import { Firestore } from 'firebase/firestore'


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

    // const users = collection(db, 'users');
    // const citySnapshot = await getDocs(users);
    // const cityList = citySnapshot.docs.map(doc => doc.data());
    // console.log(cityList)

    await setDoc(doc(db, "chats", input),{
      chatName: "user1"
    }).then(()=>{
      navigation.goBack()
    }).catch(err => console.log(err))

  }

  return (
    <View>
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