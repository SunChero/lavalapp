import React from 'react';
import { StyleSheet, Text, View, ScrollView, Animated } from 'react-native';
import {compose, withState, withProps} from 'recompose';
import AnimatedHeader from './AnimatedHeader';
export const scrollRangeForAnimation = 100;
const HeaderPlaceholder = <View style={{flex: 0, height: null, width: null}} />;

const Shell = ({scrollY, animationRange, data, title, image , navigation, header, body}) => {  
   

    let _scrollView = null;
    const onScrollEndSnapToEdge = event => {
        const y = event.nativeEvent.contentOffset.y;
        if (0 < y && y < scrollRangeForAnimation / 2) {
            if (_scrollView) {
                _scrollView.scrollTo({y: 0});
            }
        } else if (scrollRangeForAnimation / 2 <= y && y < scrollRangeForAnimation) {
            if (_scrollView) {
                _scrollView.scrollTo({y: scrollRangeForAnimation});
            }
        }
    };
      return (
        <View style={styles.container}>                              
            <Animated.ScrollView   
                scrollEventThrottle={16}         
                style={styles.scrollView}
                ref={scrollView => {
                    _scrollView = scrollView ? scrollView._component : null;
                }}
                onScrollEndDrag={onScrollEndSnapToEdge}
                onMomentumScrollEnd={onScrollEndSnapToEdge}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {contentOffset: {y: scrollY}},
                        },
                    ],
                    {
                        useNativeDriver: true,
                    }
                )}
                >
              
                {body}
            </Animated.ScrollView>         
            <AnimatedHeader animationRange={animationRange}  {...{title }}/>        
        </View>    
      );
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    flex:1, 
    zIndex: 1
  }
});
const enhance = compose(
    withState('scrollY', 'setScrollY', () => new Animated.Value(0)),
    withProps(({scrollY}) => ({
        animationRange: scrollY.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 150],
            extrapolate: 'clamp',
        }),
    }))
);
export default enhance(Shell);
