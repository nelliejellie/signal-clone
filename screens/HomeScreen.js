import { View, Text,SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, {useLayoutEffect} from 'react'
import CustomListItem from '../components/CustomListItem'
import { useNavigation } from '@react-navigation/native'
import { auth,db } from '../firebase'
import { Avatar } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'

const HomeScreen = () => {
  const navigation = useNavigation();
  const signOut = () =>{
    auth.signOut().then(()=>{
      navigation.replace("Login")
    })
  }
  useLayoutEffect(()=>{
    navigation.setOptions({
        title:auth?.currentUser?.displayName,
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
  return (
    <SafeAreaView>
      <ScrollView>
        <CustomListItem/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen