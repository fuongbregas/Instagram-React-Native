import React, { Component, useState, useEffect } from 'react';
import { TextInput, View, Button, Image } from 'react-native-web';
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app'
import "firebase/compat/storage";

const Save = (props) => {
    const [caption, setCaption] = useState("");
    
    const uploadImage = async () => {
        const uri = props.route.params.image;
        const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString()}`;

        const response = await fetch(uri);
        const blob = await response.blob();
        const task = firebase.storage().ref().child(childPath).put(blob);

        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`);
        }

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                console.log(snapshot);
            });
        }

        const taskError = snapshot => {
            console.error(snapshot);
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted);
    }

    return (
        <View style = {{flex: 1}}>
            
            <Image source = {{uri: props.route.params.image}}/>
            <TextInput placeholder = "Insert caption" onChangeText = {(caption) => setCaption(caption)}/>
            <Button title = "Save" onPress = {() => uploadImage()}/>
        </View>        
    );
}

export default Save;