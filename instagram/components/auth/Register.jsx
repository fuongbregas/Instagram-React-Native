import React, { useState, Component } from 'react';
import { TextInput, View, Button } from 'react-native-web';
import 'firebase/compat/auth';    
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app'

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const onSignUp = async () => {
        try {
            const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
            firebase.firestore().collection("users")
            .doc(firebase.auth().currentUser.uid)
            .set({name, email});
            console.log(result);
        }
        catch (error) {
            console.error(error);
        }
    }
    
    return (
        <View>
            <TextInput placeholder = 'name' onChangeText = {(name) => setName(name)}/>
            <TextInput placeholder = 'email' onChangeText = {(email) => setEmail(email)}/>
            <TextInput placeholder = 'password' secureTextEntry = {true} onChangeText = {(password) => setPassword(password)}/>
            <Button title = 'Sign Up' onPress={() => onSignUp()}/>
        </View>
    );    
}

export default Register;