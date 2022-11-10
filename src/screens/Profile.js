import React, { Component } from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { db } from '../firebase/config';


const Stack = createNativeStackNavigator();

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posteos: [],
            props: props,
            username:''
            
        }
    }


    async componentDidMount() {
        const username = await this.getRememberedUser();
        this.setState({
            username: username || '',
            rememberMe: username ? true : false
        });
        
    }
    getRememberedUser = async () => {
        try {
            const username = await AsyncStorage.getItem('10');
            if (username !== null) {

                 db.FindBy(username)
    
                
            }
            
        } catch (error) {

        }
    }

   




    render() {
        return (
            <View>
        <Text>{}</Text>

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