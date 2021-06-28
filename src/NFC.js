import React from "react"
import { SafeAreaView } from "react-native";
import { Surface, Title, Divider, DataTable, Avatar } from "react-native-paper";

export default function NFC({navigation}) {

    const [nfcs, setNfcs] = React.useState([]);

    async function getNFCs() {

        try {

            let response = await fetch('https://wortel-jus.herokuapp.com/nfc/list', {
                method: 'GET',
                headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
            });

            let json = await response.json();
            if(json.status) {
    
                setNfcs(json.profesionals);
            }
            else {
                Alert.alert("Error", json.message);
            }
        
        } catch (error) {
            Alert.alert("Error", error?.message)
        }
    }

    React.useEffect(()=>{getNFCs()},[]);

    return(
        <SafeAreaView style={{flex:1}}>
            <Surface style={{flex:1, padding:10, alignItems:"stretch"}}>
                <Title style={{marginBottom:10}}>NFC Device List</Title>
                <Divider style={{marginBottom:10}}/>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>List of registered NFC</DataTable.Title>
                    </DataTable.Header>
                    {
                        nfcs.map((nfc)=>{
                            return(
                                <DataTable.Row>
                                    <DataTable.call style={{flex:1}}>
                                        <Avatar.Icon icon="tag" size={24}/>
                                    </DataTable.call>
                                    <DataTable.Cell style={{flex:5}}>{nfc.name}</DataTable.Cell>
                                    <DataTable.Cell style={{flex:5}}>{nfc.id}</DataTable.Cell>
                                </DataTable.Row>
                            )
                        })
                    }
                </DataTable>
            </Surface>
        </SafeAreaView>
    )
}