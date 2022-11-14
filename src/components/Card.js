import {React, Component} from "react";
import { View, Text, StyleSheet, Image } from "react-native";

class Card extends Component{
    constructor(props){
        super(props);
        this.state = {
            props: props
        }
    };

    render(){
        return(
            <View style={style.cardContainer}>
                <Text style={style.creador}>{this.props.data.data.owner}</Text>
                <Image 
                    style={style.image}
                    source={{uri: this.props.data.data.photo}}
                />
                <Text style={style.contenido}>{this.props.data.data.description}</Text>
                <Text style={style.contenido}>{this.props.data.data.likes.length} likes</Text>
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
        borderRadius: 8,
        backgroundColor: 'rgb(0,0,0)'
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