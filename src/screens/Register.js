import React, { Component } from 'react';
import { TouchableOpacity, View, TextInput, Text, StyleSheet } from 'react-native'
import { auth,db } from '../firebase/config';


class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            props: props,
            email: '',
            user: '',
            password: '',
            bio: '',
            error: ''
        }
    }

    onSubmit() {
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(res => {
                db.collection('users').add({
                    owner: this.state.email,
                    userName: this.state.user,
                    bio: this.state.bio,
                    createdAt: Date.now()
                })
            .then(() => {
                this.setState({
                    email: '',
                    user: '',
                    password: '',
                    bio: '',
                    error: ''
                })
                this.state.navigation.navigate('Login')})
            })
                
            .catch(error => this.setState({
                error: error.message
            }))
    }

    render() {
        return (
            <View style={style.container} >
                <Text style={style.title}>REGISTER</Text>
                {this.state.error !== '' ? <Text style={style.error}>{this.state.error}</Text> : null}
                <TextInput style={style.input}
                    keyboardType='email-address'
                    placeholder='email'
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email} />
                <TextInput style={style.input}
                    keyboardType='default'
                    placeholder='usuario'
                    onChangeText={text => this.setState({ user: text })}
                    value={this.state.user} />
                <TextInput style={style.input}
                    keyboardType='default'
                    placeholder='contraseña'
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password} />
                <TextInput style={style.input}
                    keyboardType='default'
                    placeholder='bio'
                    onChangeText={text => this.setState({ bio: text })}
                    value={this.state.bio} />
                <TouchableOpacity onPress={() => this.onSubmit()} style={style.btnLogin}>
                    <Text style={style.btnLoginTxt}>Registrar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={style.btnLogin}>
                    <Text style={style.btnLoginTxt}>Si ya tenés un usuario, logueate acá</Text>
                </TouchableOpacity>
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
    btnLogin: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'rgb(255,255,255)',
        backgroundColor: 'rgb(0,0,0)',
        margin: 10,
        padding: 10,
        textAlign: 'right'
    },
    btnLoginTxt: {
        color: 'rgb(255,255,255)'
    },
    error: {
        fontSize: 10,
        color: 'rgb(255,0,0)'
    },
    input: {
        color: 'rgb(0,0,0)',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'rgb(0,0,0)',
        backgroundColor: 'rgb(255,255,255)',
        padding: 10,
        margin: 10
    }
})

export default Register