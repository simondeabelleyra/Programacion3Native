import React, { Component } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./Home";
import { FontAwesome, Ionicons, AntDesign, Entypo } from '@expo/vector-icons';
import Profile from "./Profile";
import AddPost from "./AddPost";
import Search from "./Search";


export default function TabNavigation() {

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator 
      screenOptions={{ tabBarShowLabel: false,
        
          "tabBarActiveBackgroundColor": "#000000",
          "tabBarInactiveBackgroundColor": "#181818",
          "tabBarStyle": [
            {
              "display": "flex"
            },
            null
          ]
      }}>
      <Tab.Screen
        name='Home'
        component={Home}
        options={
          { tabBarIcon: ({focused, color}) => <FontAwesome name="home" size={24} color={focused ? "#0d9900" : "white"}/>, headerShown: false }
        }
      />
      <Tab.Screen
        name='AddPost'
        component={AddPost}
        options={
          { tabBarIcon: ({focused, color}) => <AntDesign name="plus" size={24} color={focused ? "#0d9900" : "white"} />, headerShown: false }
        }
      />
      {<Tab.Screen
        name='Search'
        component={Search}
        options={
          { tabBarIcon: ({focused, color}) => <Entypo name="magnifying-glass" size={24} color={focused ? "#0d9900" : "white"} />, headerShown: false }
        }
      />}
      {<Tab.Screen
        name='Profile'
        component={Profile}
        options={
          { tabBarIcon: ({focused, color}) => <Ionicons name="person-circle-outline" size={24} color={focused ? "#0d9900" : "white"} />, headerShown: false }
        }
      />}
    </Tab.Navigator>
  )
}