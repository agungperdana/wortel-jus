import React from 'react';
import { SafeAreaView, Alert } from 'react-native';
import { TextInput, Button, Checkbox, Text, Surface, Title } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {

    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();

    async function signIn() {

        if(email && password) {

            try {

                let response = await fetch('https://wortel-jus.herokuapp.com/login', {
                    method: 'POST',
                    headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        email:email,
                        password: password
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
            Alert.alert("Error", "Email or Passoword cannot be empty!");
        }
    }

    return(
        <SafeAreaView style={{flex:1}}>
            <Surface style={{flex:1, 
                          padding:15, 
                          alignContent:"center", 
                          alignItems:"stretch", 
                          justifyContent:"center"}}>
                
                <Title style={{paddingBottom:30, alignSelf:"center"}}>Enter your login information</Title>

                <TextInput label="Email" 
                            placeholder="Insert your email address" 
                            style={{width:"100%", marginBottom:10}}
                            autoFocus={true}
                            value={email}
                            onChangeText={(txt) => setEmail(txt)}
                            right={<TextInput.Icon name="email"/>}/>              
                <TextInput label="Password"
                            value={password} 
                            secureTextEntry={true} 
                            placeholder="Insert your password" 
                            style={{width:"100%", marginBottom:10}}
                            onChangeText={(txt) => setPassword(txt)}
                            right={<TextInput.Icon name="key"/>}/>
                
                <Surface style={{
                    width:"100%",
                    flexDirection:"row",
                    alignContent:"flex-start",
                    alignItems:"center",
                    justifyContent:"flex-start",
                    marginBottom:10
                }}>
                    <Checkbox label=""/><Text>Remember me</Text>
                </Surface>
                <Button mode="contained" onPress={()=> signIn()}>Continue</Button>
                <Surface>
                    <Text style={{
                                paddingTop:10, 
                                alignSelf:"center", 
                                color:"red"
                    }} onPress={()=>navigation.push("Register")}>No account? Please register first!</Text>
                </Surface>
            </Surface>
        </SafeAreaView>
    )
}