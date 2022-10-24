import { StyleSheet, Text, View, Image, TextInput , Keyboard, TouchableWithoutFeedback, Button, Pressable, KeyboardAvoidingView, Alert} from 'react-native'
import React, {useState, useEffect} from 'react'
import { StatusBar } from 'expo-status-bar'
import tw from 'tailwind-react-native-classnames'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth'

const LoginScreen = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigation = useNavigation();

  useEffect(() =>{
    auth.onAuthStateChanged((authUser)=>{
        if(authUser){
            navigation.replace("Home")
        }
    })
  })
  const signIn = async() => {
    const {user} = await signInWithEmailAndPassword(auth, email, password)
    console.log(user)
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
            <StatusBar style='light'/>
            <Image
                source={{
                    uri:"https://upload.wikimedia.org/wikipedia/commons/5/56/Logo_Signal..png",
                }}
                style={{
                    width: 200,
                    height: 200
                }}
            />
            <View style={tw`p-4`}>
                <TextInput placeholder='Email' keyboardType='Email'
                    onChangeText={(text)=>setEmail(text)}
                    value={email}
                    style={tw`border-b-2 text-lg p-2`}
                />
                <TextInput placeholder='Password' secureTextEntry={true}
                    onChangeText={(text)=>setPassword(text)}
                    value={password}
                    style={tw`border-b-2 mt-8 text-lg p-2 mb-8`}
                />
                <Button
                    title="Login"
                    onPress={signIn}
                />
                <Pressable style={tw`bg-white mt-8`} onPress={()=>navigation.navigate("Register")}>
                    <Text style={tw`text-blue-300 text-center m-2 font-bold uppercase`}>Register</Text>
                </Pressable>
            </View>
        </View>
    </TouchableWithoutFeedback>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    
})