import React,{Component} from 'react';
import {TouchableOpacity,View, Text, StyleSheet, TextInput, Image } from 'react-native';
import {db, auth, storage} from '../firebase/config';
import { FontAwesome, Ionicons, AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons';
import CameraPost from '../components/CameraPost';
import * as ImagePicker from 'expo-image-picker';



class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            msj: '',
            cameraOpen: false,
            photo: '',
            enableBtn: true
        }
    }


    onImageUpload(url) {
        this.setState({
            photo: url,
            cameraOpen: false,
            msj: ''
        })
    }

    mostrarCamara() {
        this.setState({
            cameraOpen: true
        })
    }

    crearPost() {
        this.setState({
            enableBtn: false
        })
        if(this.state.description === '') {
            this.setState({
                msj: 'No hay descripcion'
            }) 
        } else if(this.state.photo === ''){
            this.setState({
                msj: 'No hay foto'
            }) 
        } else if (this.state.enableBtn === false ) {
            this.setState({
                msj: 'La carga del posteo ya se esta procesando'
            })
        } else{
        db.collection('posts').add({
            owner: auth.currentUser.email,
            description: this.state.description,
            createdAt: Date.now(),
            likes: [],
            comments: [],
            photo: this.state.photo
        })
        .then(res => {
            this.props.navigation.navigate('TabNavigation')
            this.setState({
                description: '',
                photo: '',
                msj: ''
            })
        })
        .catch(error => this.setState({
            msj: error.message
        })
        )
        }
    }

    pickImage = async () => {
        let results = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [2/1],
        })
        this.handleImagePicked(results);
       }

    handleImagePicked = async (results) => {
        try {
          if (!results.cancelled) {
            this.savePhoto(results.uri);
          }
        } catch (e) {
          console.log(e);
          alert("Image upload failed");
        }
    };

    savePhoto(uploadUrl){
        fetch(uploadUrl)
         .then(res=>res.blob())
         .then(image =>{
           const ref=storage.ref(`photos/${Date.now()}.jpg`)
           ref.put(image)
                .then(()=>{
                   ref.getDownloadURL()
                        .then(url => {
                            this.onImageUpload(url);
                         })
                 })
         })
         .catch(e=>console.log(e))
       }

    render() {
        return (
            <View style={style.container}>
                {this.state.cameraOpen === false ?
                    <React.Fragment>
                        {this.state.msj !== '' ? <Text style={style.error}>{this.state.msj}</Text> : null}
                        <View style={style.inputsYBtns}>
                            <Text style={style.title}>Escribí lo que quieras postear</Text>
                            <TextInput
                                style={style.description}
                                keyboardType='default'
                                placeholder='Compartí lo que pensás'
                                onChangeText={text =>
                                    this.setState({ description: text, error: '', msj: '' })
                                }
                                value={this.state.description}
                            />
                            <TouchableOpacity onPress={() => this.mostrarCamara()} style={style.mostrarCamara}>
                                <Text style={style.mostrarCamaraTxt}><AntDesign name="camerao" size={24} color="white" /> Agregar foto</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.pickImage()} style={style.mostrarCamara}>
                                <Text style={style.mostrarCamaraTxt}><MaterialIcons name="add-photo-alternate" size={24} color="white" /> Agregar foto de la galeria</Text>
                            </TouchableOpacity>
                        </View>
                        {this.state.photo !== '' ?
                            <View style={style.imagenYDelete}>
                                <Image
                                    style={style.image}
                                    source={{ uri: this.state.photo }}
                                />
                                <TouchableOpacity onPress={() => this.setState({ photo: '' })} style={style.btnDelete}><Text style={style.delete}>Borrar imagen</Text></TouchableOpacity>
                            </View>
                            : null}
                        <TouchableOpacity onPress={() => this.crearPost()} style={style.btnPost}>
                            <Text style={style.textBtn}>Compartir</Text>
                        </TouchableOpacity>
                    </React.Fragment>
                : 
                    <View style={style.camView}>
                        <CameraPost style={style.cameraComponent} onImageUpload={(url) => this.onImageUpload(url)} />
                        <TouchableOpacity onPress={() => this.setState({ cameraOpen: false })} style={style.btnOff}>
                            <Entypo name="circle-with-cross" size={40} color="red" />
                        </TouchableOpacity>
                    </View>
                }
            </View>
        )
    }


};

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(0,0,0)',
        color: 'rgb(255,255,255)',
        padding: 15,
        justifyContent: 'center'
    },
    error: {
        color: 'rgb(255, 0, 0)',
    },
    inputsYBtns: {
        flex: 1
    },
    imagenYDelete: {
        flex: 1
    },
    btnDelete:{
            border: 'solid',
            borderWidth: 1,
            borderColor: 'rgb(255, 0, 0)',
            borderLeftColor: 'red',
            borderTopColor: 'red',
            borderRightColor: 'red',
            borderBottomColor: 'red',
            borderTopRightRadius: 8,
            borderBottomLeftRadius: 8,
            borderStyle: 'solid',
            padding: 7.5,
            width: '30%',
            marginVertical: 10,
        },
    delete: {
        color: 'rgb(255, 0, 0)',
        fontSize: 14,
    },
    description: {
        backgroundColor: 'rgb(255,255,255)',
        padding: 20,
        fontSize: 16,
        marginVertical: 15
    },
    title: {
        fontSize: 22,
        fontWeight: '600'
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
    btnPost: {
        border: 'solid',
        borderWidth: 1,
        borderColor: 'rgb(150,150,150)',
        borderLeftColor: 'white',
        borderTopColor: 'white',
        borderRightColor: 'white',
        borderBottomColor: 'white',
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderStyle: 'solid',
        padding: 7.5,
        width: '30%',
    },
    textBtn: {
        fontSize: 16,
        textAlign: 'center',
        color: 'rgb(230, 230, 230)'
    },
    mostrarCamara: {
        backgroundColor: 'rgb(20,150,20)',
        padding: 10,
        marginBottom: 15,
    },
    mostrarCamaraTxt: {
        color: 'rgb(240,240,240)'
    },
    image: {
        height: '50%',
        aspectRatio: 20 / 10
    }
})

export default AddPost;