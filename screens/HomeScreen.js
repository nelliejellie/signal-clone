import { View, Text,SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, {useLayoutEffect, useState, useEffect} from 'react'
import CustomListItem from '../components/CustomListItem'
import { useNavigation } from '@react-navigation/native'
import { auth,db } from '../firebase'
import { Avatar } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { collection, getDocs } from 'firebase/firestore'


const HomeScreen = () => {
  const [chats, setChat] = useState([]);

  const navigation = useNavigation();

  const signOut = () =>{
    auth.signOut().then(()=>{
      navigation.replace("Login")
    })
  }

  useEffect(()=>{
    setChat([])
    const fetchChat = async () => {
      const chatsCollection = collection(db, 'chats');
      const chatSnapshot = await getDocs(chatsCollection);
      const chatList = chatSnapshot.docs.map(doc => doc.data());
      console.log(chatList)
      setChat(chatList)
    }
    fetchChat()
  }, [])
  
  useLayoutEffect(()=>{
    navigation.setOptions({
        title:"Signal ",
        headerStyle: {backgroundColor: "white"},
        headerTitleStyle: {color:"black"},
        headerTintColor:"black",
        headerTitleAlign: 'center',
        headerLeft: () =>(
            <View style={{marginLeft:20}}>
                <TouchableOpacity onPress={signOut}>
                  <Avatar rounded source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfsTQFb0kp8I5e3JYPbVszsdPRsHBp3MM0snd7GltdQQ&s"}}/>
                </TouchableOpacity>    
            </View>
        ),
        headerRight: () =>(
          <View style={tw`flex flex-row justify-around w-20 pr-2`}>
            <Icon
              type='font-awesome'
              name='pencil'
              onPress={()=> navigation.navigate("AddChat")}
            />
            <Icon
              type='font-awesome'
              name='camera'
            />
          </View>
        )
    })
  },[navigation])

  const enterChat = (id, chatName) =>{
    navigation.navigate('ChatScreen',{
      id: id,
      chatName: chatName
    })
  }
   
  return (
    <SafeAreaView>
      <ScrollView>
        {
          chats.map((val)=>(
            <CustomListItem key={val.id} id={val.id} chatName={val.chatName}
              enterChat={enterChat}
            />
          ))
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen