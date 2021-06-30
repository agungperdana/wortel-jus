import React from 'react';
import { SafeAreaView, Alert } from 'react-native';
import { Surface, Button, Divider, Avatar, Title, DataTable } from 'react-native-paper';
import NfcManager, {NfcEvents, Ndef, NdefParser} from 'react-native-nfc-manager';

export default function ReadTag({navigation}) {

    async function startListener() {

        try {

            await NfcManager.start();
            NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag)=>{

                Alert.alert("Info", tag?.payload);
                NfcManager.unregisterTagEvent().catch(() => 0);
            });

            await NfcManager.registerTagEvent();

            NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
            NfcManager.unregisterTagEvent();
        }
        catch(e) {
            Alert.alert("Error", "Error "+e.message);
        }    
    }

    return(
        <SafeAreaView style={{flex:1}}>
                <Surface style={{flex:1, padding:10, justifyContent:"flex-start", alignItems:"center"}}>
                    <Title style={{marginBottom:10}}>Scan NFC tag</Title>
                    <Divider style={{marginBottom:10}}/>
                    <Avatar.Icon icon="tag" size={50} style={{marginBottom:20}}/>
                                <DataTable>
                                    <DataTable.Header>
                                        <DataTable.Title>Athlete information</DataTable.Title>
                                    </DataTable.Header>
                                    <DataTable.Row>
                                        <DataTable.Cell style={{flex:2}}>Tag</DataTable.Cell>
                                        <DataTable.Cell style={{flex:5}}>{athlete?.id}</DataTable.Cell>
                                    </DataTable.Row>
                                    <DataTable.Row>
                                        <DataTable.Cell style={{flex:2}}>Name</DataTable.Cell>
                                        <DataTable.Cell style={{flex:5}}>{athlete?.name}</DataTable.Cell>
                                    </DataTable.Row>
                                    <DataTable.Row>
                                        <DataTable.Cell style={{flex:2}}>Sport</DataTable.Cell>
                                        <DataTable.Cell style={{flex:5}}>{athlete?.sport}</DataTable.Cell>
                                    </DataTable.Row>
                                    <DataTable.Row>
                                        <DataTable.Cell style={{flex:2}}>Picture</DataTable.Cell>
                                        <DataTable.Cell style={{flex:5}}></DataTable.Cell>
                                    </DataTable.Row>
                                    <DataTable.Row>
                                        <DataTable.Cell style={{flex:2}}>Vidio</DataTable.Cell>
                                        <DataTable.Cell style={{flex:5}}></DataTable.Cell>
                                    </DataTable.Row>
                    </DataTable>
                    <Divider style={{marginBottom:30}}/>
                    <Button mode="contained" onPress={()=>this.startListener()} style={{width:200, marginBottom:10}}>Start Scan</Button>
                </Surface>
            </SafeAreaView>
    )
}    