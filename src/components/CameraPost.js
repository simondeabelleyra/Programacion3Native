import { Camera, CameraType } from "expo-camera";
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { FontAwesome, Ionicons, AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons';
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
                            <Ionicons name="radio-button-on-sharp" size={66} color="green" />
                        </TouchableOpacity>
                    </React.Fragment>
                : null}
                {this.state.photo !== '' ?
                    <React.Fragment>
                        <Image
                            style={style.image}
                            source={{ uri: this.state.photo }}
                        />
                        <View style={style.checksDiv}>
                            <TouchableOpacity onPress={() => this.clearPhoto()}>
                                <Ionicons name="md-trash-sharp" size={40} color="red" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.savePhoto()}>
                                <AntDesign name="checkcircle" size={40} color="green" />
                            </TouchableOpacity>
                        </View>
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
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    },
    camera: {
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    },
    btnCapture: {
        position: 'absolute', 
        left: 0, 
        right: 0, 
        bottom: 0,  
        alignItems: 'center'
    },
    btnOff: {
        position: 'absolute',  
        right: 5, 
        top: 5
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    },
    checksDiv:{ 
        position: 'absolute', 
        flexDirection: 'row',
        flex: 2,
        left: 0, 
        right: 0, 
        bottom: 0,  
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})


export default CameraPost;
