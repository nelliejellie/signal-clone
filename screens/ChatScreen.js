import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, Keyboard } from 'react-native'
import React, {useLayoutEffect, useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import { Avatar, Input, Icon } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'
import { auth, db } from '../firebase'
import { collection, getDocs, doc, FieldValue, setDoc, addDoc, serverTimestamp, orderBy } from 'firebase/firestore'


const ChatScreen = ({route}) => {
  const navigation = useNavigation();
  const [input, setInput] = useState("")
  const [senderMessage, setSenderMessage] = useState("")
  const [recieverMessage, setRecieverMessage] = useState("")
  const [display, setDisplay] = useState("hidden")


  const fetchMessage = async () => {
    const chatsCollection = collection(db, `chats/${route.params.chatName}/messages`)
    const chatSnapshot = await getDocs(chatsCollection, orderBy('timestamp'));
    const chatList = chatSnapshot.docs.map(doc => doc.data());
    console.log(chatList)
    setSenderMessage(chatList[0].message)
    setDisplay('block')
  }


  useLayoutEffect(() =>{
    navigation.setOptions({
        title : route.params.chatName,
        headerBackTitle:"Chats",
        headerRight: () =>(
            <View style={{marginRight:10}}>
                <TouchableOpacity>
                  <Avatar rounded source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfsTQFb0kp8I5e3JYPbVszsdPRsHBp3MM0snd7GltdQQ&s"}}/>
                </TouchableOpacity>    
            </View>
        ),
    })
  })

  const sendMessage = async () =>{
    Keyboard.dismiss()
    
    await addDoc(collection(db, `chats/${route.params.chatName}/messages`),{
        timestamp: serverTimestamp(),
        message: input,
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
      }).then(()=>{
        setInput('')
        fetchMessage()
      }).catch(err => console.log(err))
    
  }
  return (
    <View style={tw`flex-1`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
      >
        <View style={tw`flex h-full justify-between`}>
            <ScrollView>
                {
                  auth.currentUser.email === auth.currentUser.email ?
                    <View style={tw`bg-blue-200 ml-auto mr-2 mt-2 rounded-lg text-black p-4 flex flex-row justify-end ${display}`}>
                      <Text>{senderMessage}</Text>
                    </View>
                    :
                    <View style={tw`bg-slate-100 text-black p-4 flex flex-row justify-start`}>
                      <Text>{recieverMessage.messagec}</Text>
                    </View>
                }
            </ScrollView>
            <View style={tw`flex flex-row m-auto`}>
                <Input 
                    placeholder='send chat'
                    onChangeText={(text)=> setInput(text)}
                    onSubmitEditing={sendMessage}
                    value={input}
                    rightIcon={
                        <Icon name='send' type='ionicons' color='blue' onPress={sendMessage}/>
                      }
                />
            </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
    container:{
        flex: 1
    }
})