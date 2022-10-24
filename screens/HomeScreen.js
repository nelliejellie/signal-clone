import { View, Text,SafeAreaView, ScrollView } from 'react-native'
import React, {useLayoutEffect} from 'react'
import CustomListItem from '../components/CustomListItem'
import { useNavigation } from '@react-navigation/native'
import { auth,db } from '../firebase'
import { Avatar } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'

const HomeScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(()=>{
    navigation.setOptions({
        title:"Signal",
        headerStyle: {backgroundColor: "white"},
        headerTitleStyle: {color:"black"},
        headerTintColor:"black",
        headerTitleAlign: 'center',
        headerLeft: () =>{
            <View style={{marginLeft:20}}>
                <Avatar rounded source={{uri: auth?.currentUser?.photoURL}}/>
            </View>
        }
    })
  })
  return (
    <SafeAreaView>
      <ScrollView>
        <CustomListItem/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen