import * as React from "react";
import {ScrollView, StyleSheet, View, Animated , FlatList} from "react-native";
import {observable} from "mobx";
import {observer} from "mobx-react/native";
import {NavigationBar , withTheme , StyleGuide , Text} from "./index";
import moment from 'moment';


@observer
class EmptyShell extends React.Component {
    @observable scrollAnimation = new Animated.Value(0);
    render() {
        const { scrollAnimation} = this;
        const {data, title, navigation, theme, back, header, body, style , expanded , rightAction} = this.props;
        const translateY = scrollAnimation.interpolate({
            inputRange: [55, 56, 57],
            outputRange: [55, 0, 0]
        });
        const onScroll = Animated.event(
            [{
                nativeEvent: {
                    contentOffset: {
                        y: scrollAnimation
                    }
                }
            }],
            { useNativeDriver: true }
        );
        const titleStyle = back ? {} : { transform: [{ translateY }] };
        const top = theme.palette.primary;
        const bottom = theme.palette.primary;
        return (
            <View style={styles.flex}>
                <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: bottom }}>
                    {  !back && ( <View style={[styles.halfFlex, { backgroundColor: top}]} /> )   }
                </View>
                <NavigationBar {...{ navigation,back , rightAction,titleStyle}}  />
                <AnimatedScrollView   contentContainerStyle={[styles.container, style]}  
                     onScroll={onScroll}  showsVerticalScrollIndicator={false}  
                     scrollEventThrottle={16} >
                  { !back && ( <Animated.View style={{ backgroundColor: theme.palette.primary }}>
                        <View style={styles.header}>
                            <View>{header}</View>
                            <Text type="title1" style={styles.headerText}>{title}</Text>
                        </View>
                    </Animated.View>)
                }
                    <View style={{flex : 1}}>{this.props.children} </View>
                </AnimatedScrollView>
            </View>
        );
    }
}

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    halfFlex: {
        flex: 0.5
    },
    container: {
        flexGrow: 1,
        paddingBottom: StyleGuide.spacing.small,
        backgroundColor: StyleGuide.palette.primary
    },
    header: {
        padding: StyleGuide.spacing.small
    },
    headerText: {
        color: StyleGuide.palette.secondary
    },
    extraHeader: {
        backgroundColor: StyleGuide.palette.primary,
        ...StyleGuide.styles.shadow
    },
    columnWrapperStyle: {
        marginRight: StyleGuide.spacing.small,
        marginTop: StyleGuide.spacing.small
    }
});

export default withTheme(EmptyShell);
