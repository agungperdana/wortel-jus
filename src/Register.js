import React from 'react';
import { SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, Button, Surface, Title } from 'react-native-paper';

export default function Register({navigation}) {

    const [name, setName] = React.useState();
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [rePassword, setRePassword] = React.useState();

    async function submit() {

        if(name && email && password && rePassword && (password === rePassword)) {

            try {

                let response = await fetch('http://192.168.1.104:8080/account/create', {
                    method: 'POST',
                    headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        name: name, 
                        email:email,
                        password: password,
                        re_password:rePassword
                    })
                });
    
                let json = await response.json();
                if(json.status && json.account) {

                    await AsyncStorage.setItem("name", json.account.name);
                    await AsyncStorage.setItem("email", json.account.email);

                    navigation.push("MainScreen", {screen:"Home", params:{account:json.account}})
                }
                else {
                    Alert.alert("Error", json.message);
                }
            
            } catch (error) {
                Alert.alert("Error", error?.message)
            }
        }
        else {
            Alert.alert("Error", "All form field cannot be empty & password and re-password mast be equal.");
        }
    }

    return(
        <SafeAreaView style={{flex:1}}>
            <Surface style={{flex:1, 
                          padding:15, 
                          alignContent:"center", 
                          alignItems:"stretch", 
                          justifyContent:"flex-start"}}>
                
                <Title style={{paddingBottom:30, alignSelf:"center"}}>Register new user account</Title>

                <TextInput label="Name" 
                            placeholder="Insert your username (mandatory)" 
                            style={{width:"100%", marginBottom:10}}
                            autoFocus={true}
                            onChangeText={(txt)=>setName(txt)}/>
                <TextInput label="Email" 
                            placeholder="Insert your email address (mandatory)" 
                            style={{width:"100%", marginBottom:10}}
                            onChangeText={(txt)=>setEmail(txt)}/>              
                <TextInput label="Password" 
                            secureTextEntry={true} 
                            placeholder="Insert your password (mandatory)" 
                            style={{width:"100%", marginBottom:10}}
                            onChangeText={(txt)=>setPassword(txt)}/>
                <TextInput label="Re-Password" 
                            secureTextEntry={true} 
                            placeholder="Re-Insert your password (mandatory)" 
                            style={{width:"100%", marginBottom:10}}
                            onChangeText={(txt)=>setRePassword(txt)}/>

                <Button mode="contained" onPress={()=>submit()}>Continue</Button>
            </Surface>
        </SafeAreaView>
    )
}