import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Button } from 'react-native'
import React, {useState} from 'react'
import tw from 'tailwind-react-native-classnames';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';

const RegisterScreen = () => {

  const [fullName, setFullName] = useState("")
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [imgUrl, setImgUrl] = useState("")

  const Register = async () =>{
    try{
        const {user} = await createUserWithEmailAndPassword(auth,Email,Password)
        console.log(`User ${user.uid} created`)
        await updateProfile(user, {
          displayName: fullName,
          photoUrl: imgUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfsTQFb0kp8I5e3JYPbVszsdPRsHBp3MM0snd7GltdQQ&s"
        });
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