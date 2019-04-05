import React, { Component } from 'react';
import { View, Animated, Text, PanResponder, Dimensions } from 'react-native';
import { Button, Card } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Deck extends Component {

    constructor(props) {
        super(props);

        const position = new Animated.ValueXY();
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                position.setValue({ x: gesture.dx, y: gesture.dy })
            },
            onPanResponderRelease: (event, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD) {
                    this.forceSwipeRight();
                }
                else if (gesture.dx < -SWIPE_THRESHOLD) {

                }
                else {
                    this.resetPosition();
                }
            }
        });

        this.state = { panResponder, position };
    }

    forceSwipeRight() {
        Animated.timing(this.state.position, {
            toValue: { x: SCREEN_WIDTH*2 , y: 0 },
            duration: SWIPE_OUT_DURATION
        }).start();
    }

    resetPosition() {
        Animated.spring(this.state.position, {
            toValue: { x: 0, y: 0 }
        }).start();
    }

    getCardStyle() {

        const { position } = this.state;
        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 2, 0, SCREEN_WIDTH * 2],
            outputRange: ['-120deg', '0deg', '120deg']
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