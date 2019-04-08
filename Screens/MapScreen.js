import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import { Actions } from 'react-native-router-flux';
import { MapView } from 'expo';

class MapScreen extends Component {

    // state = {
    //     region: {
    //         longitude: 72.6369,
    //         latitude: 23.2156,
    //         longitudeDelta: 0.04,
    //         latitudeDelta: 0.09,
    //     }
    // }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {/* <MapView
                    region={this.state.region}
                    style={{ flex: 1 }}
                /> */}
                <View style={Styles.container}>
                    <Button
                        large
                        title="Search This Area"
                        backgroundColor="#009688"
                        icon={{ name: 'search' }}
                        onPress={() => Actions.Deck()}
                    />
                </View>

            </View>
        );
    }
}
export default MapScreen;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        left:0,
        right:0,
    }
});