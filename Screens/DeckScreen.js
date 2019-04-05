import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import { Actions } from 'react-native-router-flux';

class DeckScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text
                    onPress={() => Actions.Map()}
                >
                DeckScreen
                </Text>
            </View>
        );
    }
}
export default DeckScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});