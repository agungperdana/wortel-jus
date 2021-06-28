import React from 'react';
import { SafeAreaView, Alert } from 'react-native';
import { Surface, TextInput, Button, Title } from 'react-native-paper';

export default function Athlete({navigation}) {

    const [name, setName] = React.useState();
    const [sport, setSport] = React.useState();

    async function submit() {

        if(name && sport) {

            try {

                let response = await fetch('https://wortel-jus.herokuapp.com/profesional/create', {
                    method: 'POST',
                    headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        name:name,
                        sport: sport
                    })
                });
    
                let json = await response.json();
                if(json.status) {
        
                    navigation.push("MainScreen", {screen:"Profesional"})
                }
                else {
                    Alert.alert("Error", json.message);
                }
            
            } catch (error) {
                Alert.alert("Error", error?.message)
            }
        }
        else {
            Alert.alert("Error", "Name or Sport cannot be empty!");
        }
    }

    return(
        <SafeAreaView style={{flex:1}}>
            <Surface style={{flex:1, padding:10, justifyContent:"flex-start", alignItems:"stretch"}}>
                <Title style={{marginBottom:10}}>Enter athlete information</Title>
                <TextInput onChangeText={(txt)=>setName(txt)} style={{marginBottom:10}} label="Name" placeholder="Athlete name"/>
                <TextInput onChangeText={(txt)=>setSport(txt)} style={{marginBottom:10}} label="Sport" placeholder="Sport name"/>
                <Button style={{marginBottom:10}} onPress={()=>submit()} mode="contained">Save data</Button>
            </Surface>
        </SafeAreaView>
    )
}