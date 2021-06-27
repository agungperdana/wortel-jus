import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { IconButton } from 'react-native-paper';
import Home from './Home';
import NFC from './NFC';
import Profesional from './Profesional';
import Profile from './Profile';

const Tab = createMaterialBottomTabNavigator();

export default function MainScreen() {

    return(
        <Tab.Navigator initialRouteName="Home" labeled={true} shifting={true}>
            <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon:({color})=><IconButton icon="home" color={color} style={{paddingBottom:15}}/>
            }}/>
            <Tab.Screen name="Profesional" component={Profesional} options={{
                tabBarIcon:({color})=><IconButton icon="briefcase" color={color} style={{paddingBottom:15}}/>
            }}/>
            <Tab.Screen name="nfc" component={NFC} options={{
                tabBarIcon:({color})=><IconButton icon="cloud-search" color={color} style={{paddingBottom:15}}/>
            }}/>
            <Tab.Screen name="Profile" component={Profile} options={{
                tabBarIcon:({color})=><IconButton icon="account-settings" color={color} style={{paddingBottom:15}}/>
            }}/>
        </Tab.Navigator>
    )
}