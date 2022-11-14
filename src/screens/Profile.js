import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { auth, db } from '../firebase/config';




class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: [],
            props: props

        }
    }


    componentDidMount() {
        db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(
            docs => {
                let data = [];
                docs.forEach(doc => {
                    data.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        userData: data,
                        loading: false
                    })

                })
            })

    }






    render() {
        console.log(auth.currentUser.email)
        return (
            <View>
                <Text>{JSON.stringify(this.state.userData)}</Text>

            </View>

        )
    }







}
const style = StyleSheet.create({
    container: {

        textAlign: 'center',
        padding: '10px',
        width: '100%',
        height: '100%',
        padding: '4px',
        backgroundColor: 'light-blue',


    },
    zona: {

        borderColor: 'white'
    }
})

export default Profile;