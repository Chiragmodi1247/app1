import React, { Component } from 'react';
import { View, Animated, Text, PanResponder, Dimensions, LayoutAnimation, UIManager } from 'react-native';
import { Button, Card } from 'react-native-elements';

import { Actions } from 'react-native-router-flux';

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 500;

class Deck extends Component {
    static defaultProps = {
        onSwipeLeft: () => { },
        onSwipeRight: () => { }
    }

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
                    this.forceSwipe('Right');
                }
                else if (gesture.dx < -SWIPE_THRESHOLD) {
                    this.forceSwipe('Left');
                }
                else {
                    this.resetPosition();
                }
            }
        });

        this.state = { panResponder, position, index: 0 };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.data !== this.props.data){
            this.setState({ index:0 });
        }
    }

    componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
    }

    forceSwipe(direction) {
        const x = direction === 'Right' ? SCREEN_WIDTH * 2 : -SCREEN_WIDTH * 2;
        Animated.timing(this.state.position, {
            toValue: { x, y: 0 },
            duration: SWIPE_OUT_DURATION
        }).start(() => this.onSwipeComplete(direction));
    }

    onSwipeComplete(direction) {
        const { onSwipeLeft, onSwipeRight, data } = this.props;
        const item = data[this.state.index];

        direction === 'Right' ? onSwipeRight(item) : onSwipeLeft(item);
        this.state.position.setValue({ x: 0, y: 0 });
        this.setState({ index: this.state.index + 1 });
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

        if (this.state.index >= this.props.data.length) {
            return (
                <Card
                    title="No jobs for you"
                    containerStyle={{ borderRadius: 10 }}
                >
                    <Text style={{ marginBottom: 10 }}>
                        Try in some other area.
                    </Text>
                    <Button
                        backgroundColor="#03A9F4"
                        title="Search again"
                        onPress={() => Actions.Map()}
                    />
                </Card>

            );
        }

        return this.props.data.map((item, i) => {

            if (i < this.state.index) { return null; }

            if (i === this.state.index) {
                return (
                    <View key={item.id} style={styles.cardStyle}>
                    <Animated.View
                        key={item.id}
                        style={this.getCardStyle()} //unable to apply multiple style
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
                </View>
                );
            }
            return (
                <Animated.View
                key={item.id}
                style={[styles.cardStyle, { top: (0.85*SCREEN_WIDTH) + (10 * (i - this.state.index)) }]}
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
        }).reverse() ;
    }
    render() {
        return (
            <View>
                {this.renderCards()}
            </View>
        );
    }
}

const styles = {
    cardStyle: {
        position: 'absolute',
        width: SCREEN_WIDTH,
    }
}

export default Deck;