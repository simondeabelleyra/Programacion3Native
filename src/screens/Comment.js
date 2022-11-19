import {React, Component} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, TextInput } from "react-native";
import { db, auth } from '../firebase/config';
import firebase from "firebase";
import { FontAwesome, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import CommentsCard from "../components/CommentsCard";


class Comment extends Component{
    constructor(props){
        super(props);
        this.state = {
            props: props,
            comentarios: [],
            comentario: ''
        }
    };


    componentDidMount() {
        db.collection('posts').where(firebase.firestore.FieldPath.documentId(), '==', this.props.route.params.id).onSnapshot(
            docs => {
                docs.forEach(doc => {
                    this.setState({
                        comentarios: doc.data().comments
                    })
                });
            }
        )
    }

    comment(){
        db.collection('posts')
        .doc(this.props.route.params.id)
        .update({
            comments: firebase.firestore.FieldValue.arrayUnion({
                owner: auth.currentUser.email,
                content: this.state.comentario
            })
        })
        .then(()=> this.setState({
            comentario: ''
        }))
        .catch((e)=> console.log(e))
    }

    render(){
        return(
            <View style={style.container}>
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('TabNavigation')}>
                    <AntDesign name="back" size={32} color="white" style={style.back}/>
                </TouchableOpacity>
                {this.state.comentarios.length === 0 ?
                 <Text style={style.noComments}>Aún no hay comentarios. Se el primero en comentar!</Text>
                :
                <FlatList
                    data={this.state.comentarios}
                    renderItem={({ item }) => <CommentsCard data={item} />}
                /> 
                }
                <View style={style.flex}>
                    <TextInput
                        style={style.input}
                        keyboardType='default'
                        placeholder='Comentá acá...'
                        onChangeText={text => this.setState({ comentario: text, error: '' })}
                        value={this.state.comentario}
                    />
                    <TouchableOpacity onPress={() => this.comment()}>
                        <MaterialCommunityIcons name="send" size={24} color="#0d9900" style={style.btnSend} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 2,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgb(0,0,0)'
    },
    back:{
        marginBottom: 15,
        marginTop: 10,
        marginLeft: 10
    },
    noComments: {
        color: 'rgb(255,255,255)',
        fontSize: 16,
        margin: 10
    },
    whiteText: {
        color: 'rgb(255,255,255)'
    },
    input: {
        backgroundColor: 'rgb(0,0,0)',
        padding: 10,
        fontSize: 16,
        marginVertical: 10,
        color: 'rgb(255,255,255)',
        height: 50,
        bottom: 0,
        width: '85vw'
    },
    flex: {
        flexDirection: 'row',
        flex: 2,
        position: 'absolute',
        bottom: 0,
        alignItems: 'end',
        justifyContent: 'space-between',
        width: '100%'
    },
    btnSend: {
        width: '10vw',
        height: 50
    }
})


export default Comment;