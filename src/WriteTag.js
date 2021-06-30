import React from 'react';
import { Alert, SafeAreaView } from 'react-native';
import { TextInput, Surface, Title, Divider, Button } from 'react-native-paper';
import NfcManager, { Ndef, NfcTech} from 'react-native-nfc-manager';

export default function WriteTag({route, navigation}) {

    const [tag, setTag] = React.useState(route?.params?.id);
    const [nfc, setNfc] = React.useState(false);

    async function write() {

        try {

            await NfcManager.registerTagEvent()
                            .then(out=>setNfc(true))
                            .catch(e=>{});

            if(tag && nfc) {

                await NfcManager.requestTechnology(NfcTech.Ndef, {
                    alertMessage: 'Ready to write some NDEF',
                });
            
                const bytes = Ndef.encodeMessage([Ndef.textRecord(tag)]);
            
                if (bytes) {

                    await NfcManager.ndefHandler
                                    .writeNdefMessage(bytes)
                                    .then((out)=>Alert.alert("Info", "Write successul"))
                                    .catch((e)=>Alert.alert("Error", "Write failed"));
            
                }
            }
            else {
                Alert.alert("Error", "NFC not supported");
            }

            NfcManager.cancelTechnologyRequest().catch(() => 0);
        }
        catch(e) {
            Alert.alert("Error", "Error "+e.message);
        }
    }

    return(
        <SafeAreaView style={{flex:1}}>
            <Surface style={{flex:1, padding:10, alignItems:"stretch", justifyContent:"flex-start"}}>
                <Title style={{marginBottom:10}}>Write to NFC tag for athlete {route?.params?.name}</Title>
                <Divider  style={{marginBottom:10}}/>
                <TextInput style={{marginBottom:10}} disabled={true} value={route?.params?.id}/>
                <Button style={{marginBottom:10}} onPress={()=>write()} mode="contained">Write to nfc card</Button>
            </Surface>
        </SafeAreaView>
    )
}