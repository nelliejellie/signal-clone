import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Button } from 'react-native'
import React, {useState} from 'react'
import tw from 'tailwind-react-native-classnames';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const RegisterScreen = () => {

  const [fullName, setFullName] = useState("")
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [imgUrl, setImgUrl] = useState("")

  const Register = async () =>{
    try{
        user = await createUserWithEmailAndPassword(
            auth,
            Email,
            Password
        )
        user.updateProfile({
            displayName: fullName,
            photoUrl: imgUrl.length > 0 ? imgUrl : "https://thumbs.dreamstime.com/b/default-photo-placeholder-half-length-portrait-photo-avatar-gray-color-default-photo-placeholder-116847389.jpg"
        })
        console.log(user)
    }catch(error){
        console.log(error)
    }
  }
  return (
    <KeyboardAvoidingView
        style = {{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <Text style={tw`text-center font-bold text-lg`}>Create a Signal Account</Text>

      <View style={tw`p-4`}>
        <TextInput placeholder='Full Name'
            autoFocus
            value={fullName}
            onChangeText={(text)=>setFullName(text)}
            style={tw`border-b-2 mt-8 text-lg p-2`}
        />
        <TextInput placeholder='Email'
            autoFocus
            value={Email}
            onChangeText={(text)=>setEmail(text)}
            style={tw`border-b-2 mt-8 text-lg p-2`}
        />
        <TextInput placeholder='Password'
            autoFocus
            value={Password}
            secureTextEntry={true}
            onChangeText={(text)=>setPassword(text)}
            style={tw`border-b-2 mt-8 text-lg p-2`}
        />
        <TextInput placeholder='Image (optional)'
            autoFocus
            value={imgUrl} 
            onChangeText={(text)=>setImgUrl(text)}
            style={tw`border-b-2 mt-8 text-lg p-2 mb-8`}
            onSubmitEditing={Register}
        />
        <Button
            onPress={Register}
            title="Register"
        />
      </View>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({})