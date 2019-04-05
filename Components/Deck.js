import React, { Component } from 'react';
import { View, Animated, Text, PanResponder, Dimensions } from 'react-native';
import { Button, Card } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get("window").width;

class Deck extends Component {

    constructor(props) {
        super(props);

        const position = new Animated.ValueXY();
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                position.setValue({ x: gesture.dx, y: gesture.dy })
            },
            onPanResponderRelease: () => {
                this.resetPosition();
            }
        });

        this.state = { panResponder, position };
    }

    resetPosition() {
        Animated.spring( this.state.position , {
            toValue: { x: 0, y: 0}
        }).start();
    }

    getCardStyle() {

        const { position } = this.state;
        const rotate = position.x.interpolate({
            inputRange: [ -SCREEN_WIDTH*2, 0, SCREEN_WIDTH*2],
            outputRange: ['-120deg' , '0deg' , '120deg']
        });
        return {
            ...this.state.position.getLayout(),
            transform: [{ rotate }]
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