import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
import { auth, db } from '../firebase/config';
import avatar from '../../assets/avatar.jpeg';
import Card from '../components/Card';


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {},
            props: props,
            posteos: []
        }
    }


    componentDidMount() {
        db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(
            docs => {
                docs.forEach(doc => {
                    this.setState({
                        userData: doc.data()
                    })
                })
            })

        db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                });
                this.setState({
                    posteos: posts
                })
            }
        )

    }


    logout(){
        auth.signOut()
        .then(()=> this.props.navigation.navigate('Login'))
    }



    render() {
        return (
            <View style={style.container}>
                <View style={style.containerPic}>
                    <Image
                        style={style.image}
                        source={this.state.userData.photo === '' ? avatar : this.state.userData.photo}
                    />
                    <View style={style.containerText}>
                        <Text style={style.username}>{this.state.userData.userName}</Text>
                        {this.state.userData.bio != '' ? 
                                <Text style={style.bio}>{this.state.userData.bio}</Text>
                            : null}
                        <Text style={style.bio}>Cantidad de posteos: {this.state.posteos.length}</Text>
                        <TouchableOpacity onPress={() => this.logout()}>
                            <Text style={style.logout}>Cerrar sesión</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                
                <FlatList 
                        style={style.posteos}
                        data={this.state.posteos}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({item}) => <Card data={item}/>}
                />
            </View>

        )
    }







}
const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: 'rgb(0,0,0)'
    },
    image: {
        width: 100,
        height: 100
    },
    containerPic: {
        flex: 2,
        flexDirection: 'row'
    },
    containerText: {
        margin: 15,
        width: '70vw',
        flexGrow: 1,
        flex: 1
    },
    username: {
        fontSize: 20,
        fontWeight: '600',
        color: 'rgb(255,255,255)'
    },
    bio: {
        fontSize: 16,
        color: 'rgb(255,255,255)'
    },
    posteos: {
        marginTop: 120
    },
    logout: {
        color: '#0d9900'
    }
})

export default Profile;