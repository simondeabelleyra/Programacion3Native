import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, FlatList, ActivityIndicator, Image } from 'react-native';
import logo from '../../assets/logo.png';
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
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(docs => {
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
                <Image
                    style={style.image}
                    source={logo}
                />
                {this.state.posteos.length === 0 ?
                    <ActivityIndicator size='large' color='green' />
                    :
                    <FlatList
                        style={style.flatList}
                        data={this.state.posteos}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => <Card data={item} homeProps={this.props} />}
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
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        textAlign: 'center',
        width: '40%',
        height: undefined,
        aspectRatio: 20 / 10,
        margin: 10
    },
    title: {
        fontWeight: 600,
        color: 'rgb(255,255,255)',
        fontSize: 24,
        textAlign: 'center'
    },
    flatList: {
        width: '100%'
    }
})

export default Home;