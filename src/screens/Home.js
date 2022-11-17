import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-web';

import Card from '../components/Card';
import { db } from '../firebase/config';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posteos: []
        }
    }

    

    componentDidMount() {
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
    };

    render() {
        return (
            <View style={style.container}>
                
                <Text style={style.title}>Home</Text>
                {this.state.posteos.length === 0 ?
                    <ActivityIndicator size='large' color='green' />
                    :
                    <FlatList
                        data={this.state.posteos}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => <Card data={item} />}
                    />
                    
                }
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