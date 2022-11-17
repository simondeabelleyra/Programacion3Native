import { React, Component } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from "react-native";
import CardSearch from "../components/CardSearch";
import { db } from '../firebase/config';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            props: props,
            valorBusqueda: '',
            usersFiltrados:{}
        }
    };

    
    render() {
        
        console.log(this.state.usersFiltrados)
        console.log(this.state.valorBusqueda);
        return (
            <View style={style.container}>
                <TextInput style={style.input}
                    keyboardType='search'
                    placeholder='Busca a tus amigos'
                    onChangeText={text => this.setState({ valorBusqueda: text })}
                    value={this.state.valorBusqueda} />
                <TouchableOpacity onPress={() => this.filtrarUsers()} style={style.btnSearch}>
                    <Text style={style.btnSearchTxt}> Search </Text>
                </TouchableOpacity>
                
                
                    <FlatList
                        data={this.state.usersFiltrados}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => <CardSearch data={item} />}
                    />
                    
                
                
                
            </View>
        )
                
    }

    filtrarUsers(){
        db.collection('posts').where('owner','==', this.state.valorBusqueda).onSnapshot(docs => {
            let usersFiltrados = [];
            docs.forEach(doc => {
                usersFiltrados.push({
                    id: doc.id,
                    data: doc.data()
                })
            });
            this.setState({
                usersFiltrados: usersFiltrados
            })
        })
    }}
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
    btnSearch: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'rgb(255,255,255)',
        backgroundColor: 'white',
        margin: 10,
        padding: 10,
        textAlign: 'right'
    },
    btnSearchTxt: {
        color: 'black'
    },
    error: {
        fontSize: 10,
        color: 'rgb(255,0,0)'
    },
    input: {
        color: 'rgb(0,0,0)',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'grey',
        backgroundColor: 'white',
        padding: 10,
        margin: 10
    }
})



export default Search;