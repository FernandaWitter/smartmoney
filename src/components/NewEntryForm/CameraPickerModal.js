import React, { useEffect, useState } from 'react';
import { Text, Alert, Modal, View, Image, StyleSheet } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import Icon from '@react-native-vector-icons/material-icons';

import Colors from '../../styles/colors';

const CameraPickerModal = ({photo, showModal, onSave, onClose}) => {
    const device = useCameraDevice('back');

    const [cameraPermission, setCameraPermission] = useState(null);
    const camera = useCameraDevice('back');
    const [capturedPhoto, setCapturedPhoto] = useState(photo);
    const [showPreview, setShowPreview] = useState(false);

    const checkCameraPermission = async () => {
        const status = await Camera.getCameraPermissionStatus();
        
        if (status === 'granted') {
          setCameraPermission(true);
        } else if (status === 'notDetermined') {
          const permission = await Camera.requestCameraPermission();
          setCameraPermission(permission === 'authorized');
        } else {
          setCameraPermission(false);
        }

        if(photo){setShowPreview(true);}
    };
    
    useEffect(() => {
        checkCameraPermission();
    }, []);
    
    if (cameraPermission === null) {
        return <Text>Checking camera permission...</Text>;
    } else if (!cameraPermission) {
        return <Text>Camera permission not granted</Text>;
    }

    if (!device) {
        return <Text>No camera device available</Text>;
    }

    const takePhoto = async () => {
        try {
            if (!camera.current) {
                Alert.alert('Camera not available.');
                return;
            }

            const photo = await camera.current.takePhoto();
                 
            if (photo) {
                setCapturedPhoto(`file://${photo.path}`);
                setShowPreview(true);
            } else {
                Alert.alert('Photo captured is undefined or empty.');
            }
        } catch (error) {
            console.error('Error capturing photo:', error);
        }
    };

    const confirmPhoto = () => {
        setShowPreview(false);
        onSave(capturedPhoto);
    };

    const retakePhoto = () => {
        setCapturedPhoto(null);
        setShowPreview(false);
    };

    const onCameraReady = (ref) => {
        camera.current = ref;
    };
    
    return(
        <Modal
            animationType='slide'
            transparent={false}
            visible={showModal}>
            {!showPreview && !capturedPhoto &&
                <Camera
                    style={styles.camera}
                    device={device}
                    isActive={true}
                    ref={(ref) => onCameraReady(ref)} 
                    photo={true}
                    video={false}
                    photoQualityBalance="quality"
                />
            }
            {showPreview || capturedPhoto ? (      
                <View style={styles.previewContainer}>
                    <Image
                        source={{ uri: capturedPhoto }}
                        style={styles.previewImage} resizeMode='contain'/>
                    <View style={styles.previewActionsContainer}>
                        <Icon name='close' size={40} color={Colors.red} onPress={retakePhoto}
                            style={styles.previewActionsButton} id='retakePhotoBtn'/>
                        <Icon name='check' size={40} color={Colors.green} onPress={confirmPhoto}
                            style={styles.previewActionsButton} id='confirmPhotoBtn'/>
                    </View>          
                </View>
            ) : (
                <Icon name='photo-camera' size={40} color={Colors.green} onPress={takePhoto}
                    style={styles.previewActionsButton} id='takePhotoBtn'/>
            )}
            <Icon name='close' size={30} color={Colors.white} onPress={onClose}
                style={styles.buttonClose} id='closeCameraBtn'/>
        </Modal>
    );
};

const styles = StyleSheet.create({
    camera: {
        flex: 1,
    },
    buttonTakePicture: {
        alignSelf: 'center',
        bottom: 20,
        flex: 0,
        marginTop: 10,
        position: 'absolute',
    },
    buttonClose: {
        backgroundColor: Colors.background,
        borderRadius: 150,
        flex: 0,
        left: 20,
        padding: 10,
        position: 'absolute',
        top: 20,
    },
    previewContainer:{
        alignItems: 'center',
        backgroundColor: Colors.background,
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    previewImage:{ 
        flex:1,
        height: "80%",
        marginBottom: 20, 
        width: "80%",
    },
    previewActionsContainer:{ 
        backgroundColor: Colors.background,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    previewActionsButton: {
        alignContent: 'center',
        alignSelf: 'center',
        marginHorizontal: 20,
        marginVertical: 10,
        paddingHorizontal: 30,
        paddingVertical:10,
    },
});

export default CameraPickerModal;