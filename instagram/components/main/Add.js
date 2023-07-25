import { Camera, CameraType } from 'expo-camera';
import { useEffect, useState } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';

const Add = () => {
    const [type, setType] = useState(CameraType.back);
    const [permission, setHasPermission] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
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

    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.cameraContainer}>
                <Camera style={styles.fixedRatio} type={type} ratio={'1:1'} />
            </View>

            <Button title='Flip Image' onPress={toggleCameraType} />
            <Button title='Take Photo' onPress={takePhoto} />
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