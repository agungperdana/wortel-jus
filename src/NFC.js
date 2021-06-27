import React from "react"
import { SafeAreaView } from "react-native";
import { Surface, Text } from "react-native-paper";

export default function NFC({navigation}) {
    return(
        <SafeAreaView>
            <Surface>
                <Text>NFC Device List</Text>
            </Surface>
        </SafeAreaView>
    )
}