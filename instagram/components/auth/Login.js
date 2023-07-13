import React, { useState, Component } from 'react';
import { TextInput, View, Button } from 'react-native-web';
import 'firebase/compat/auth';    
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSignIn = async () => {
        try {
            const result = firebase.auth().signInWithEmailAndPassword(email, password);
            console.log(result);
        }
        catch{
            console.error(error);
        }
    }
    
    return (
        <View>
            <TextInput placeholder = 'email' onChangeText = {(email) => setEmail(email)}/>
            <TextInput placeholder = 'password' secureTextEntry = {true} onChangeText = {(password) => setPassword(password)}/>
            <Button title = 'Sign In' onPress={() => onSignIn()}/>
        </View>
    );    
}

export default Login;