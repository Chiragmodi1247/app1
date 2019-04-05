import React, { Component } from 'react';
import { View, Animated, Text, PanResponder } from 'react-native';
import { Button, Card } from 'react-native-elements';

class Deck extends Component {

    constructor(props) {
        super(props);

        const position = new Animated.ValueXY();
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                position.setValue({ x: gesture.dx, y: gesture.dy })
            },
            onPanResponderRelease: () => { }
        });

        this.state = { panResponder, position };
    }

    getCardStyle() {
        return {
            ...this.state.position.getLayout(),
            transform: [{ rotate: '45deg' }]
        };
    }

    renderCards() {
        return this.props.data.map((item, index) => {
            if (index === 0) {
                return (
                    <Animated.View
                        key={item.id}
                        style={this.getCardStyle()}
                        {...this.state.panResponder.panHandlers}
                    >
                        <Card
                            key={item.id}
                            title={item.text}
                            image={{ uri: item.uri }}
                            containerStyle={{ borderRadius: 10 }}
                        >
                            <Text style={{ marginBottom: 10 }}>
                                I Can Customize card further.
                    </Text>
                            <Button
                                backgroundColor="#03A9F4"
                                title="View Now!"
                            />
                        </Card>
                    </Animated.View>
                );
            }
            return (
                <Card
                    key={item.id}
                    title={item.text}
                    image={{ uri: item.uri }}
                    containerStyle={{ borderRadius: 10 }}
                >
                    <Text style={{ marginBottom: 10 }}>
                        I Can Customize card further.
                    </Text>
                    <Button
                        backgroundColor="#03A9F4"
                        title="View Now!"
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