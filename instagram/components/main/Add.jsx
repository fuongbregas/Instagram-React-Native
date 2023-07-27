import { Camera, CameraType } from 'expo-camera';
import { useEffect, useState } from 'react';
import { Button, Text, View, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const Add = () => {
    const [type, setType] = useState(CameraType.back);
    const [cameraPermission, setCameraPermission] = useState(null);
    const [galleryPermission, setGalleryPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setCameraPermission(cameraStatus.status === 'granted');

            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setGalleryPermission(galleryStatus.status === 'granted');
        })();
    }, []);

    if (cameraPermission === null || galleryPermission === null) {
        // Camera permissions are still loading
        return <View />;
    }
    // Camera permissions are not granted yet
    if (cameraPermission === false || galleryPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const toggleCameraType = () => {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const takePhoto = async () => {
        if (camera) {
            const data = await camera.takePictureAsync(null);
            setImage(data.uri);
        }
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.cameraContainer}>
                <Camera ref={ref => setCamera(ref)} style={styles.fixedRatio} type={type} ratio={'1:1'} />
            </View>

            <Button title='Flip Image' onPress={toggleCameraType} />
            <Button title='Take Photo' onPress={takePhoto} />
            <Button title='Pick Photo from Gallery' onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
            <Button title='Pick Photo from Gallery' onPress={navigation.navigate("Save")} />
        </View>
    );
}

export default Add;

const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 1,
    }
});