import React from "react"
import { SafeAreaView } from "react-native";
import { Surface, Title, Card, Divider, Paragraph} from "react-native-paper";

export default function Home({route, navigation}) {
    return(
        <SafeAreaView style={{flex:1}}>
            <Surface style={{flex:1, margin:10}}>
                <Title style={{marginBottom:10}}>Welcome {route?.params?.account.name}</Title>
                <Divider style={{marginBottom:10}}/>
                <Card style={{marginBottom:10}}>
                    <Card.Title title="News 1" subtitle="news sub note"/>
                    <Card.Content>
                        <Title>Content title</Title>
                        <Paragraph>New body content</Paragraph>
                    </Card.Content>
                </Card>
                <Card style={{marginBottom:10}}>
                    <Card.Title title="News 2" subtitle="news sub note"/>
                    <Card.Content>
                        <Title>Content title</Title>
                        <Paragraph>New body content</Paragraph>
                    </Card.Content>
                </Card>
                <Card style={{marginBottom:10}}>
                    <Card.Title title="News 3" subtitle="news sub note"/>
                    <Card.Content>
                        <Title>Content title</Title>
                        <Paragraph>New body content</Paragraph>
                    </Card.Content>
                </Card>
                <Card style={{marginBottom:10}}>
                    <Card.Title title="News 4" subtitle="news sub note"/>
                    <Card.Content>
                        <Title>Content title</Title>
                        <Paragraph>New body content</Paragraph>
                    </Card.Content>
                </Card>
            </Surface>
        </SafeAreaView>
    )
}