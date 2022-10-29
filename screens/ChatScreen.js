import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, Keyboard } from 'react-native'
import React, {useLayoutEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import { Avatar, Input, Icon } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'
import { auth, db } from '../firebase'
import { collection, getDocs, doc, FieldValue, setDoc, addDoc } from 'firebase/firestore'


const ChatScreen = ({route}) => {
  const navigation = useNavigation();
  const [input, setInput] = useState("")

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
        timestamp: Date.now(),
        message: input,
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
      }).then(()=>{
        setInput('')
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
                <Text>hey</Text>
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