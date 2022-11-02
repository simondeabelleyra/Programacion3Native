import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';


class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            posteos: []
        }
    }

    /* componentDidMount(){
        db.collection('posts').onSnapshot(docs => {
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
        })
    }; */

    render(){
        return(
            <View style={style.container}>
                <Text style={style.title}>Home</Text>
            </View>
        )
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
    }
})

export default Home;