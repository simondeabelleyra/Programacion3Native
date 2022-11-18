import {React, Component} from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { db, auth } from '../firebase/config';
import firebase from "firebase";
import { TouchableOpacity } from "react-native-web";
import { FontAwesome, AntDesign } from '@expo/vector-icons';


class Card extends Component{
    constructor(props){
        super(props);
        this.state = {
            props: props,
            cantidadDeLikes: this.props.data.data.likes.length,
            miLike: false,
        }
    };


    componentDidMount() {
        if (this.props.data.data.likes.includes(auth.currentUser.email)) {
            this.setState({
                miLike: true
            })
        } 
        
    }


    botonLike(){
        if(this.state.miLike === true){
            this.disLike()
        } else{
            this.likes()
        }
    }

    likes() {
        db.collection('posts')
        .doc(this.props.data.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(()=> 
            this.setState({
                cantidadDeLikes: this.state.cantidadDeLikes + 1,
                miLike: true
            })
           )
        .catch(error=>console.log(error))
    }

    disLike() {
        db.collection('posts')
        .doc(this.props.data.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(()=> 
            this.setState({
                cantidadDeLikes: this.state.cantidadDeLikes -1,
                miLike: false
            })
           )
        .catch(error=>console.log(error))
    }


    render(){
        return(
            <View style={style.cardContainer}>
                <Text style={style.creador}>{this.props.data.data.owner}</Text>
                <Image 
                    style={style.image}
                    source={{uri: this.props.data.data.photo}}
                />
                <Text style={style.contenido}>{this.props.data.data.description}</Text>
                <TouchableOpacity onPress={()=>this.botonLike()}>
                    {this.state.miLike === false?
                    <AntDesign name="hearto" size={24} color="white" />
                    
                    : <AntDesign name="heart" size={24} color="white" />
                }
                    
                </TouchableOpacity>
                <Text style={style.contenido}>likes: {this.state.cantidadDeLikes} </Text>
                <Text style={style.contenido}>{this.props.data.data.comments.length} comentarios</Text>
            </View>
        )
    }
}

const style = StyleSheet.create({
    cardContainer: {
        margin: 10,
        padding: 15,
        borderWidth: 1,
        borderColor: 'rgb(150,150,150)',
        borderStyle: 'solid',
        borderRadius: 8
    },
    creador: {
        fontWeight: 600,
        color: 'rgb(230,230,230)',
        fontSize: 18,
        marginBottom: 3
    },
    contenido: {
        fontSize: 16,
        color: 'rgb(230,230,230)',
        marginTop: 3
    },
    image: {
        width: '100%',
        height: '200px'
    }
})


export default Card;