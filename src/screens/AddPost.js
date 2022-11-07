import React,{Component} from 'react';
import {TouchableOpacity,View, Text, StyleSheet, TextInput, Image } from 'react-native';
import {db, auth} from '../firebase/config';
import { FontAwesome, Ionicons, AntDesign, Entypo } from '@expo/vector-icons';
import CameraPost from '../components/CameraPost';


class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            msj: '',
            cameraOpen: false,
            photo: '',
        }
    }


    onImageUpload(url) {
        this.setState({
            photo: url,
            cameraOpen: false
        })
    }

    mostrarCamara() {
        this.setState({
            cameraOpen: true
        })
    }

    crearPost() {
        db.collection('posts').add({
            owner: auth.currentUser.email,
            description: this.state.description,
            createdAt: Date.now(),
            likes: [],
            comments: [],
            photo: this.state.photo
        })
        .then(res => {
            console.log(res);
            this.props.navigation.navigate('TabNavigation')
        })
        .catch(error => /* this.setState({
            msj: error.message
        }) */
        console.log(error)
        )
    }


    render() {
        return (
            <View style={style.container}>
                {this.state.cameraOpen === false ?
                    <React.Fragment>
                        {this.state.msj !== '' ? <Text>{this.state.msj}</Text> : null}
                        <Text style={style.title}>Escribí lo que quieras postear</Text>
                        <TextInput 
                        style={style.description} 
                        keyboardType='default'
                        placeholder='Compartí lo que pensás'
                        onChangeText={text => this.setState({ description: text, error: '' })}
                        value={this.state.description}
                        />
                        <TouchableOpacity onPress={() => this.mostrarCamara()} style={style.mostrarCamara}>
                            <Text style={style.mostrarCamaraTxt}><AntDesign name="camerao" size={24} color="white" /> Agregar foto</Text>
                        </TouchableOpacity>
                        {this.state.photo !== '' ? 
                        <Image 
                            style={style.image}
                            source={{uri: this.state.photo}}
                        />: null}
                        <TouchableOpacity onPress={() => this.crearPost()} style={style.btnPost}>
                            <Text style={style.textBtn}>Post</Text>
                        </TouchableOpacity>
                    </React.Fragment>
                : 
                    <CameraPost style={style.cameraComponent} onImageUpload={(url) => this.onImageUpload(url)}/>
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
    btnPost: {
        border: 'solid',
        borderWidth: 1,
        borderColor: 'rgb(150,150,150)',
        borderStyle: 'solid',
        borderRadius: 8,
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
        width: 400,
        height: 400
    }
})

export default AddPost;