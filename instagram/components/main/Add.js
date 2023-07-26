import { Camera, CameraType } from 'expo-camera';
import { useEffect, useState } from 'react';
import { Button, Text, View, StyleSheet, Image } from 'react-native';

const Add = () => {
    const [type, setType] = useState(CameraType.back);
    const [permission, setPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setPermission(status === 'granted');
        })();
    }, []);

    if (permission === null) {
        // Camera permissions are still loading
        return <View />;
    }
    // Camera permissions are not granted yet
    if (permission === false) {
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

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.cameraContainer}>
                <Camera ref={ref => setCamera(ref)} style={styles.fixedRatio} type={type} ratio={'1:1'} />
            </View>

            <Button title='Flip Image' onPress={toggleCameraType} />
            <Button title='Take Photo' onPress={takePhoto} />
            {image && <Image source = {{uri : image}} style={{flex: 1}}/>}
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