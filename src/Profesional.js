import React from "react"
import { SafeAreaView, Alert } from "react-native";
import { 
    Surface, 
    Searchbar, 
    Divider, 
    Button, 
    DataTable, 
    Avatar, 
    IconButton, 
    Dialog,
    Paragraph
 } from "react-native-paper";

export default function Profesional({navigation}) {

    const [athletes, setAthletes] = React.useState([]);
    const [delDialog, setDelDialog] = React.useState(false);
    const [athId, setAthId] = React.useState('');

    async function getProfesionals() {

        try {

            let response = await fetch('https://wortel-jus.herokuapp.com/profesional/list', {
                method: 'GET',
                headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
            });

            let json = await response.json();
            if(json.status) {
    
                setAthletes(json.profesionals);
            }
            else {
                Alert.alert("Error", json.message);
            }
        
        } catch (error) {
            Alert.alert("Error", error?.message)
        }
    }

    async function remove() {

        try {

            if(athId) {
                
                let response = await fetch('https://wortel-jus.herokuapp.com/profesional/remove', {
                    method: 'POST',
                    headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        id:athId,
                    })
                });

                let json = await response.json();
                if(json.status) {
                    
                    getProfesionals();
                }
                else {
                    Alert.alert("Error", json.message);
                }
            }
        
        } catch (error) {
            Alert.alert("Error", error?.message)
        }
    }

    React.useEffect(()=>{getProfesionals()}, []);

    return(
        <SafeAreaView style={{flex:1}}>
            <Surface style={{flex:1, padding:10}}>
                <Surface style={{flexDirection:"row", 
                         padding:10, 
                         justifyContent:"flex-start", 
                         alignItems:"center"}}>
                    <Button icon="plus-circle" style={{alignItems:"center"}} mode="contained"
                        onPress={()=>navigation.push("Athlete")}>Add</Button>
                    <Searchbar style={{marginLeft:5, flex:1, height:37}} placeholder="Search athlete"/>
                </Surface>
                <Divider/>
                
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>List of athlete</DataTable.Title>
                    </DataTable.Header>
                    
                        {
                            athletes.map((ath)=>{
                                return(
                                    <DataTable.Row key={"rowId-"+ath?.id}>
                                        <DataTable.Cell style={{flex:1, alignContent:"center"}}>
                                            <Avatar.Icon size={24} icon="account-box" style={{marginRight:10}}/>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{flex:4, justifyContent:"flex-start"}}>{ath?.name}</DataTable.Cell>
                                        <DataTable.Cell style={{flex:4, justifyContent:"flex-end"}}>
                                            <IconButton icon="camera-plus"/>
                                            <IconButton icon="camcorder"/>
                                            <IconButton icon="tag" onPress={()=>
                                                navigation.push("WriteTag", {name:ath?.name, id:ath?.id})
                                            }/>
                                            <IconButton icon="close" onPress={(e)=>{
                                                setAthId(ath?.id);
                                                setDelDialog(true);
                                            }}/>
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                )
                            })
                        }
                    
                </DataTable>
            </Surface>
            <Dialog visible={delDialog} onDismiss={()=>setDelDialog(false)}>
                <Dialog.Title>Warning</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>Delete Athlete data?</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={()=>setDelDialog(false)}>Done</Button>
                    <Button onPress={()=>{
                        setDelDialog(false);
                        remove();
                    }}>Done</Button>
                </Dialog.Actions>
            </Dialog>
        </SafeAreaView>
    )
}