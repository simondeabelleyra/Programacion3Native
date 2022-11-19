import { React, Component } from 'react';
import { TouchableOpacity, View, TextInput, Text, StyleSheet } from 'react-native';
import { auth } from '../firebase/config';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            props: props,
            email: '',
            password: '',
            error: '',
            success: '',
            login: false,
            rememberMe:false,
            username:'',
            completed: false,
        }  
    }
     
    componentDidMount(){
        auth.onAuthStateChanged(
            user => {
                if(user) {
                    this.props.navigation.navigate('TabNavigation')
                }
            }
        )
    }

    onSubmit() {
        if(this.state.completed === true){
            auth.signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(res => {
                this.setState({ login: true })
                this.props.navigation.navigate('TabNavigation')
            })
            .catch(error => this.setState({
                error: error.message,
            }))
        } else {
            this.setState({
                error: 'Tenés que completar los campos para iniciar sesión'
            })
        }
            
    }

    onChangeMail(text){
        this.setState({
            email: text,
            error: ''
        })
        if(text.length >= 4 && this.state.password.length >= 4){
            this.setState({
                completed: true
            })
        } else {
            this.setState({
                completed: false
            })
        }   
    }

    onChangePassword(text){
        this.setState({
            password: text,
            error: ''
        })
        if(this.state.email.length >= 4 && text.length >= 4){
            this.setState({
                completed: true
            })
        } else {
            this.setState({
                completed: false
            })
        }
    }

    


    render() {
        return (
            <View style={style.container}>
                <Text style={style.title}>LOG IN</Text>
                {this.state.error !== '' ? <Text style={style.error}>{this.state.error}</Text> : null}
                {this.state.success !== '' ? <Text style={style.success}>{this.state.success}</Text> : null}
                <TextInput style={style.input} keyboardType='email-address' placeholder='email' onChangeText={text => this.onChangeMail(text)}  value={this.state.email} />
                <TextInput style={style.input} keyboardType='default' secureTextEntry={true} placeholder='password' onChangeText={text => this.onChangePassword(text)}  value={this.state.password} />
                {this.state.completed === false ?
                    <TouchableOpacity onPress={() => this.onSubmit()} style={style.btnLoginDisabled}>
                        <Text style={style.btnLoginTxtDisabled}>Ingresar</Text>
                    </TouchableOpacity>
                : 
                    <TouchableOpacity onPress={() => this.onSubmit()} style={style.btnLogin}>
                        <Text style={style.btnLoginTxt}>Ingresar</Text>
                    </TouchableOpacity>
                }

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} style={style.btnLogin}>
                    <Text style={style.btnLoginTxt}>Registrate acá</Text>
                </TouchableOpacity>

            </View>
        );
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
    btnLoginDisabled: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'rgb(130,130,130)',
        backgroundColor: 'rgb(0,0,0)',
        margin: 10,
        padding: 10,
        textAlign: 'right'
    },
    btnLoginTxtDisabled: {
        color: 'rgb(130,130,130)'
    },
    error: {
        fontSize: '10px',
        color: 'rgb(255,0,0)'
    },
    success: {
        fontSize: '10px',
        color: 'rgb(0,255,0)'
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
});

export default Login;