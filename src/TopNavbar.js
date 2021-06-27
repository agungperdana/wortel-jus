import React from 'react';
import { Appbar } from 'react-native-paper';

export default function TopNavbar({route, navigation, previous}) {

    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return(
        <Appbar.Header>
            {previous?<Appbar.BackAction onPress={()=>navigation.pop()}/>:null}
            <Appbar.Content title="WortelJUS" subtitle={"demo application"}/>
            <Appbar.Action icon="account-cog" title={route?.params?.account?.name}/>
        </Appbar.Header>
    )
}