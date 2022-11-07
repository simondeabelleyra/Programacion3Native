import React, { Component } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./Home";
import { FontAwesome, Ionicons, AntDesign } from '@expo/vector-icons';
/* import Profile from "./Profile"; */
import AddPost from "./AddPost";

export default function TabNavigation(){

    const Tab = createBottomTabNavigator();

    return(
          <Tab.Navigator screenOptions={ { tabBarShowLabel: false } }>
            <Tab.Screen 
            name='Home' 
            component={ Home }
            options={
              {tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />}
            }
            />
            <Tab.Screen 
            name='AddPost'
            component={AddPost}
            options={
              {tabBarIcon: () => <AntDesign name="plus" size={24} color="black" />}
            }
            />
            {/* <Tab.Screen 
            name='Profile' 
            component={ Profile }
            options={
              {tabBarIcon: () => <Ionicons name="man-sharp" size={24} color="black" />}
            }
            /> */}
          </Tab.Navigator>
      )
}