import React, { Component } from 'react';
import { TouchableOpacity, View,  Text, StyleSheet, Image } from 'react-native'
import { auth,db } from '../firebase/config';
import CameraPost from '../components/CameraPost';
import { Entypo, AntDesign } from '@expo/vector-icons';


class RegisterAddPhoto extends Component {
    constructor(props) {
        super(props)
        this.state = {
            props: props,
            cameraOpen: false,
            photo: '',
            error: ''
        }
    }

    onImageUpload(url) {
        this.setState({
            photo: url,
            cameraOpen: false,
        })
    }
        
    mostrarCamara() {
        this.setState({
            cameraOpen: true,
            error: ''
        })
    }

    onSubmit(){
        if (this.state.photo === '') {
            this.setState({
                error: 'Tenés que agregar una foto apretando el botón "Foto de perfil"'
            })
        } else {
            db.collection('users')
                .doc(this.props.route.params.id)
                .update({
                    photo: this.state.photo
                })
                .then(() => {
                    this.setState({
                        photo: ''
                    })
                    this.props.navigation.navigate('Login')
                })
                .catch((e) => console.log(e))
        }
    }



    render() {
        return (
            <View style={style.container} >
                <Text style={style.title}>AGREGAR FOTO DE PERFIL</Text>
                {this.state.error !== '' ? <Text style={style.error}>{this.state.error}</Text> : null}
                {this.state.cameraOpen === false ?
                    <View>
                        <Text style={style.error}></Text>
                        <TouchableOpacity onPress={() => this.mostrarCamara()} style={style.btn}>
                            <Text style={style.textBtn}><AntDesign name="camerao" size={24} color="black" /> Foto de perfil</Text>
                        </TouchableOpacity>
                        {this.state.photo !== '' ? 
                        <Image 
                            style={style.image}
                            source={{uri: this.state.photo}}
                        />: null}
                        <TouchableOpacity onPress={() => this.onSubmit()} style={style.btn}>
                            <Text style={style.btnSend}>Enviar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={style.btn}>
                            <Text style={style.btnContinue}>Dejarlo para después</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={style.camView}>
                        <CameraPost style={style.cameraComponent} onImageUpload={(url) => this.onImageUpload(url)} />
                        <TouchableOpacity onPress={() => this.setState({ cameraOpen: false })} style={style.btnOff}>
                            <Entypo name="circle-with-cross" size={40} color="red" />
                        </TouchableOpacity>
                    </View>
                }
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(0,0,0)',
        color: 'rgb(255,255,255)',
        padding: 15,
        justifyContent: 'center',
    },
    title: {
        fontWeight: 600,
        color: 'rgb(255,255,255)',
        fontSize: 24,
        textAlign: 'center'
    },
    btnOff: {
        position: 'absolute',  
        right: 5, 
        top: 5
    },
    camView: {
        width: '100%',
        height: '100%'
    },
    mostrarCamara: {
        backgroundColor: 'rgb(20,150,20)',
        padding: 10,
        marginBottom: 10,
    },
    btn: {
        color: 'rgb(0,0,0)',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'rgb(0,0,0)',
        backgroundColor: 'rgb(255,255,255)',
        padding: 10,
        margin: 10
    },
    textBtn: {
        color: 'rgb(0,0,0)'
    },
    btnSend: {
        color: '#0d9900'
    },
    btnContinue: {
        color: 'rgb(200, 10, 10)'
    },
    image: {
        width: '90%',
        height: 400
    },
    error: {
        color: 'rgb(255,0,0)',
        fontSize: 10
    }
})

export default RegisterAddPhoto;