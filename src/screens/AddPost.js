import React,{Component} from 'react';
import {TouchableOpacity,View, Text, StyleSheet, TextInput } from 'react-native';
import {db, auth} from '../firebase/config';
import CameraPost from '../components/CameraPost';


class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            msj: '',
            cameraOpen: false
        }
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
            createdAt: Date.now()
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
                            <Text style={style.mostrarCamaraTxt}>Agregar foto</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.crearPost()} style={style.btnPost}>
                            <Text style={style.textBtn}>Post</Text>
                        </TouchableOpacity>
                    </React.Fragment>
                : 
                    <CameraPost style={style.cameraComponent}/>
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
        justifyContent: 'center',
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
        borderColor: 'rgb(0,0,120)',
        borderRadius: 10,
        padding: 7.5,
        width: '30%',
    },
    textBtn: {
        fontSize: 16,
        textAlign: 'center'
    },
    cameraComponent: {
        position: 'absolute'
    },
    mostrarCamara: {
        backgroundColor: 'rgb(20,150,20)',
        padding: 10,
        marginBottom: 15
    },
    mostrarCamaraTxt: {
        color: 'rgb(240,240,240)'
    }
})

export default AddPost;