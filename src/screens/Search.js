import { React, Component } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from "react-native";
import CardSearch from "../components/CardSearch";
import { db } from '../firebase/config';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            searchText: '',
            filteredUsers: [],
            filteredMail: [],
            userErr: false,
            mailErr: false,
            emptysearch: ''

        }
    };


    render() {


        return (
            <View style={style.container}>
                {this.state.emptysearch !== '' ?
               
               <Text style={style.error}>{this.state.emptysearch}</Text>
                
                : <></>}
            
                <TextInput style={style.input}
                    keyboardType='search'
                    placeholder='Busca a tus amigos'
                    onChangeText={text => {
                        if (text == '') {
                            this.setState({ emptysearch: 'Ingrese datos de busqueda', searchText: text, userErr: false, mailErr: false });
                        } else {
                            this.setState({ emptysearch: '', searchText: text });
                            this.preventSubmmit()
                            console.log(this.state.filteredUsers)
                            console.log(this.state.filteredMail);
                        }
                    }}

                    value={this.state.searchText}
                />

                <TouchableOpacity onPress={() => this.clear()} style={style.btnSearch}>
                    <Text style={style.btnSearchTxt}> Borrar busqueda </Text>
                </TouchableOpacity>

                {this.state.userErr ?

                    <Text style={style.error}>El usuario {this.state.searchText} no existe</Text>
                    :
                    this.state.searchText != '' ?
                        <View>
                            <Text>Nombres de usuario</Text>
                            <FlatList
                                data={this.state.filteredUsers}
                                keyExtractor={item => item.id.toString()}
                                renderItem={({ item }) => <CardSearch data={item} />}
                            />
                        </View>

                        :
                        <></>
                }

                {this.state.mailErr ?

                    <Text style={style.error}>El mail {this.state.searchText} no existe</Text>
                    :
                    this.state.searchText != '' ?
                        <View>
                            <FlatList
                                data={this.state.filteredMail}
                                keyExtractor={item => item.id.toString()}
                                renderItem={({ item }) => <CardSearch data={item} />}
                            />
                        </View>

                        :
                        <></>
                }





            </View>
        )

    }

    componentDidMount() {
        db.collection('users').onSnapshot(docs => {
            let users = [];
            docs.forEach(doc => {
                users.push({
                    id: doc.id,
                    data: doc.data()
                })
            });
            this.setState({
                users: users
            })
        })
    }

    preventSubmmit() {

        let textTofilter = this.state.searchText.toLowerCase()

        const filteredUsers = this.state.users.filter(users => users.data.userName?.toLowerCase().includes(textTofilter))
        const filteredMail = this.state.users.filter(users => users.data.owner?.toLowerCase().includes(textTofilter))

        if (filteredUsers == '') {
            this.setState({ userErr: true, filteredUsers: '' })
        } else { this.setState({ userErr: false, filteredUsers: filteredUsers }) }


        if (filteredMail == '') {
            this.setState({ mailErr: true, filteredMail: '' })
        } else { this.setState({ mailErr: false, filteredMail: filteredMail }) }


    }

    clear() {
        this.setState({
            results: [],
            searchText: '',
            userErr: false,
            mailErr: false
        })
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