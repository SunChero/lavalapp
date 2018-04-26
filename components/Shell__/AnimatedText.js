import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import {withSelfMeasure} from './selfMeasureBehavior';
import {compose} from 'recompose';
import buildTransform from './buildTransform';


const AnimatedText = ({
    title,
    animationRange,
    onLayoutSetMeasurements,
    elementX,
    elementY,
    elementHeight,
    elementWidth,}) => {

        const animateText = buildTransform(animationRange, elementX, elementY, elementHeight, elementWidth, 20, 70, 0.7);
        const animateOpacity = {
            opacity: animationRange.interpolate({
                inputRange: [0, 0.9, 1],
                outputRange: [1, 0, 1],
            }),
        };

        return (
            <Animated.Text 
                style={[styles.text, animateText, animateOpacity]}
                onLayout={event => onLayoutSetMeasurements(event)} >
                {title}
            </Animated.Text>
        )        
}

const styles = StyleSheet.create({
    text: {        
        fontSize: 20,
        color: '#696969',
        fontWeight: 'bold'
    }
});

const enhance = compose(withSelfMeasure);

export default enhance(AnimatedText);