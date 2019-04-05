import React, { Component } from 'react';
import { View, Animated, Text } from 'react-native';
import { Button, Card } from 'react-native-elements';

class Deck extends Component {
    renderCards() {
        return this.props.data.map(item => {
            return (
                <Card
                    key={item.id}
                    title={item.text}
                    image={{ uri: item.uri }}
                >
                    <Text style={{marginBottom: 10}}>
                        I Can Customize card further.
                    </Text>
                    <Button
                    backgroundColor = "#03A9F4"
                    title = "View Now!"
                    />
                </Card>
            );
        });
    }
    render() {
        return (
            <View>
                {this.renderCards()}
            </View>
        );
    }
}

export default Deck;