import React from "react"
import { SafeAreaView } from "react-native";
import { Surface, Text } from "react-native-paper";

export default function Profile({navigation}) {
    return(
        <SafeAreaView style={{flex:1}}>
            <Surface style={{flex:1, padding:10}}>
                <Text onPress={()=>navigation.push("Login")}>Logout</Text>
            </Surface>
        </SafeAreaView>
    )
}