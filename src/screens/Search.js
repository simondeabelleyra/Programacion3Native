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
            emptysearch: '',
            filter: 'username'
        }
    };

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

    render() {


        return (
            <View style={style.container}>
                {this.state.emptysearch !== '' ?
               
               <Text style={style.error}>{this.state.emptysearch}</Text>
                
                : null}
            
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

                <View style={style.filterBtns}>
                    <TouchableOpacity onPress={() => this.setState({filter: 'username'})} style={this.state.filter==='username' ? style.btnFilterSelected : style.btnFilter}>
                        <Text style={this.state.filter==='username' ? style.btnSearchSelected : style.btnSearchTxt}> Nombre de usuario</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({filter: 'email'})} style={this.state.filter==='email' ? style.btnFilterSelected : style.btnFilter}>
                        <Text style={this.state.filter==='email' ? style.btnSearchSelected : style.btnSearchTxt}> Email </Text>
                    </TouchableOpacity>
                </View>
                {this.state.filter === 'username' ?
                <View>
                {this.state.userErr ?

                    <Text style={style.error}>El usuario {this.state.searchText} no existe</Text>
                    :
                    this.state.searchText != '' ?

                            <FlatList
                                data={this.state.filteredUsers}
                                keyExtractor={item => item.id.toString()}
                                renderItem={({ item }) => <CardSearch data={item} searchProps={this.props}/>}
                            />
                        :
                        <></>
                }
                </View>
                : null}

                {this.state.filter === 'email' ?
                <View>
                {this.state.mailErr ?

                    <Text style={style.error}>El mail {this.state.searchText} no existe</Text>
                    :
                    this.state.searchText != '' ?
                            <FlatList
                                data={this.state.filteredMail}
                                keyExtractor={item => item.id.toString()}
                                renderItem={({ item }) => <CardSearch data={item} searchProps={this.props}/>}
                            />

                        :
                        <></>
                }
                </View>
                : null }




            </View>
        )

    }

   
}
const style = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(0,0,0)',
        color: 'rgb(255,255,255)',
        padding: 15,
        justifyContent: 'center'
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
    btnFilter: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'rgb(255,255,255)',
        backgroundColor: 'white',
        margin: 10,
        padding: 10,
        textAlign: 'center',
        width: '45%'
    },
    btnFilterSelected: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'rgb(255,255,255)',
        backgroundColor: '#0d9900',
        margin: 10,
        padding: 10,
        textAlign: 'center',
        width: '45%'
    },
    btnSearchSelected: {
        color: 'white'
    },
    filterBtns: {
        flexDirection: 'row',
        flex: 2,
        width: '100%',
        justifyContent: 'space-between'
    },
    btnSearchTxt: {
        color: 'black'
    },
    error: {
        fontSize: 12,
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