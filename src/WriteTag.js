import React from 'react';
import { SafeAreaView } from 'react-native';
import { TextInput, Surface, Title, Divider, Button } from 'react-native-paper';

export default function WriteTag({route, navigation}) {

    return(
        <SafeAreaView style={{flex:1}}>
            <Surface style={{flex:1, padding:10, alignItems:"stretch", justifyContent:"flex-start"}}>
                <Title style={{marginBottom:10}}>Write to NFC tag for athlete {route?.params?.name}</Title>
                <Divider  style={{marginBottom:10}}/>
                <TextInput style={{marginBottom:10}} disabled={true} value={route?.params?.id}/>
                <Button style={{marginBottom:10}} mode="contained">Write to nfc card</Button>
            </Surface>
        </SafeAreaView>
    )
}