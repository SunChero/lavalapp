import * as React from "react";
import {ScrollView, StyleSheet, View, Animated} from "react-native";
import {observable} from "mobx";
import {observer} from "mobx-react/native";
import {NavigationBar , IconButton} from "./index";
import Text from "./Text";
import {withTheme, StyleGuide} from "./theme";

@observer
class Shell extends React.Component {
    
    @observable scrollAnimation = new Animated.Value(0);
    render() {
        const { scrollAnimation} = this;
        const {data, title, navigation, theme, back, rightAction, header, body, style , vues , likes} = this.props;
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
        const bottom = theme.palette.lightGray;
        
        return (
            <View style={styles.flex}>
                <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: bottom }}>
                    {  !back && ( <View style={[styles.halfFlex, { backgroundColor: top}]} /> )
                    }
                </View>
                <NavigationBar {...{ navigation, title, back, titleStyle, rightAction}}  />
                <AnimatedScrollView   contentContainerStyle={[styles.container, style]}  
                     onScroll={onScroll}  showsVerticalScrollIndicator={false}  
                     scrollEventThrottle={16} >
                    <Animated.View style={{ backgroundColor: theme.palette.primary }}>
                        <View style={styles.header}>
                            <View>{header}</View>
                            <Text type="title1" style={styles.headerText}>{title}</Text>
                            <View style={{ padding: 10 , flexDirection:'row' }}>
                                <IconButton name="ios-eye-outline" type="ionicons" size="40" >
                                    <Text type="title2" style={{fontSize: 20,marginLeft:5, color:"white"}}>{vues}</Text>
                                </IconButton> 
                                <IconButton name="ios-heart-outline" type="ionicons" size="32" >
                                    <Text type="title2" style={{fontSize: 20, marginLeft:5 , color:"white"}}>{likes}</Text>
                                </IconButton>
                                <IconButton name="ios-chatbubbles-outline" type="ionicons" size="32" >
                                    <Text type="title2" style={{fontSize: 20, marginLeft:5 , color:"white"}}>{likes}</Text>
                                </IconButton>
                            </View>
                        </View>
                        
                    </Animated.View>
                    <View style={{flex : 1}}>{body}</View>
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
        backgroundColor: StyleGuide.palette.white
    },
    header: {
        padding: StyleGuide.spacing.small
    },
    headerText: {
        color: StyleGuide.palette.white
    },
    extraHeader: {
        backgroundColor: StyleGuide.palette.transparent,
        ...StyleGuide.styles.shadow
    },
    columnWrapperStyle: {
        marginRight: StyleGuide.spacing.small,
        marginTop: StyleGuide.spacing.small
    }
});

export default withTheme(Shell);
