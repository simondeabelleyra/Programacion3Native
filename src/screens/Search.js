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
            users: {},
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
                <TextInput style={style.input}
                    keyboardType='search'
                    placeholder='Busca a tus amigos'
                    onChangeText={text => {
                        if (text == '') {
                            this.setState({ emptysearch: 'Ingrese datos de busqueda', valorBusqueda: text, userErr: false, mailErr: false });
                        } else {
                            this.setState({ emptysearch: '', valorBusqueda: text });
                            this.preventSubmmit()
                        }
                    }}

                    value={this.state.valorBusqueda}
                />

                <TouchableOpacity onPress={() => this.clear()} style={style.btnSearch}>
                    <Text style={style.btnSearchTxt}> Borrar busqueda </Text>
                </TouchableOpacity>

                {this.state.userErr ?

                    <Text>El usuario{this.state.valorBusqueda} no existe</Text>
                    :
                    this.state.valorBusqueda != '' ?
                        <View>
                            <FlatList
                                data={this.state.filteredUsers}
                                keyExtractor={item => item.id.toString()}
                                renderItem={({ item }) => <CardSearch data={item} />}
                            />
                        </View>

                        :
                        <>/</>
                }

                {this.state.mailErr ?

                    <Text>El mailErr{this.state.valorBusqueda} no existe</Text>
                    :
                    this.state.valorBusqueda != '' ?
                        <View>
                            <FlatList
                                data={this.state.filteredMail}
                                keyExtractor={item => item.id.toString()}
                                renderItem={({ item }) => <CardSearch data={item} />}
                            />
                        </View>

                        :
                        <>/</>
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

        let textTofilter = this.state.valorBusqueda.toLowerCase()

        const filteredUsers = this.state.users.filter(users => users.data.name?.toLowerCase().includes(textTofilter))
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
            valorBusqueda: '',
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