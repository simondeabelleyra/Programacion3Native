import { Camera, CameraType } from "expo-camera";
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { FontAwesome, Ionicons, AntDesign } from '@expo/vector-icons';
import { storage } from '../firebase/config';

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

    clearPhoto() {
        this.setState({
            photo: '',
            showCamera: true,
        })
    }

    savePhoto(){
        fetch(this.state.photo)
         .then(res=>res.blob())
         .then(image =>{
           const ref=storage.ref(`photos/${Date.now()}.jpg`)
           ref.put(image)
                .then(()=>{
                   ref.getDownloadURL()
                        .then(url => {
                            this.props.onImageUpload(url);
                         })
                 })
         })
         .catch(e=>console.log(e))
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
                    <React.Fragment>
                        <Image
                            style={style.image}
                            source={{ uri: this.state.photo }}
                        />
                        <TouchableOpacity onPress={() => this.savePhoto()} style={style.btnCapture}>
                            <Text>Aceptar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.clearPhoto()} style={style.btnCapture}>
                            <Text>Rechazar</Text>
                        </TouchableOpacity>
                    </React.Fragment>
                    :
                    null
                }
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        
    },
    camera: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh'
    },
    btnCapture: {
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
