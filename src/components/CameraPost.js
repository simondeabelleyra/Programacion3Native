import { Camera, CameraType } from "expo-camera";
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { FontAwesome, Ionicons, AntDesign } from '@expo/vector-icons';

class CameraPost extends Component{
    constructor(props){
        super(props);
        this.state = {
            props: props,
            permission: false,
            photo: '',
            showCamera: false
        }
    };

    componentDidMount() {
        Camera.requestCameraPermissionsAsync()
        .then(() => {
            this.setState({
                permission: true,
                showCamera: true
            })
        })
        .catch(error => console.log(error))
    }

    takePicture() {
        this.metodosDeCamara.takePictureAsync()
            .then(photo => {
                this.setState({
                    photo: photo.uri,
                    showCamera: false
                })
            })
            .catch(error => console.log(error))
        
        
    }

    render(){
        return(
            <View style={style.container}>
                {this.state.showCamera===true ?
                    <React.Fragment>
                        <Camera
                            style={style.camera}
                            type={Camera.Constants.Type.back}
                            ref={metodosDeCamara => this.metodosDeCamara = metodosDeCamara}
                        />
                        <TouchableOpacity onPress={() => this.takePicture()} style={style.btnCapture}>
                            <Ionicons name="ios-radio-button-off" size={24} color="black" />
                        </TouchableOpacity>
                    </React.Fragment>
                : null}
                {this.state.photo !== '' ?
                    <Image 
                        style={style.image}
                        source={{uri: this.state.photo}}
                    /> 
                    :
                    null
                }
                
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        position: 'absolute'
    },
    camera: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh'
    },
    btnCapture: {
        position: 'relative',
        bottom: 0,
        textAlign: 'center'
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh'
    }
})


export default CameraPost;
