import React from "react"
import { SafeAreaView } from "react-native";
import { Surface, Text, Title } from "react-native-paper";

export default function Home({route, navigation}) {
    return(
        <SafeAreaView style={{flex:1}}>
            <Surface style={{margin:10}}>
                <Title>Welcome {route?.params?.account.name}</Title>
                <Text>Home</Text>
            </Surface>
        </SafeAreaView>
    )
}