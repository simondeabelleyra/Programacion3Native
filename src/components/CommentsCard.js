import {React, Component} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";


class CommentsCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            props: props
        }
    };

    render(){
        return(
            <View style={style.container}>
                <TouchableOpacity onPress={()=> this.props.commentsProps.navigation.navigate('UsersProfile', {email: this.props.data.owner})}>
                    <Text style={style.owner}>{this.props.data.owner}</Text>
                </TouchableOpacity>
                <Text style={style.content}>{this.props.data.content}</Text>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        width: '100vw',
        padding: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderColor: 'rgb(180,180,180)',
        borderStyle: 'solid',
    },
    owner: {
        color: 'rgb(255,255,255)',
        fontWeight: '600',
        fontSize: 16
    },
    content: {
        color: 'rgb(255,255,255)',
        fontSize: 16
    }
})


export default CommentsCard;