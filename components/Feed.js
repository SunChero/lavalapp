import * as React from "react";
import {FlatList, StyleSheet, View, Animated} from "react-native";
import {observable} from "mobx";
import {observer} from "mobx-react/native";
import NavigationBar from "./NavigationBar";
import Text from "./Text";
import {withTheme, StyleGuide, type StyleProps, type ThemeProps} from "./theme";



type FeedProps<T> = ThemeProps & StyleProps & NavigationProps<*> & {
    data: T[],
    renderItem: T => React.Node,
    title: string,
    header?: React.Node,
    back?: string,
    rightAction?: Action,
    numColumns?: number
};

const keyExtractor = (item) => item.id;

@observer
class Feed extends React.Component {
    constructor(props){
        super(props)
        this.renderItem = this.renderItem.bind(this)
    }
    @observable scrollAnimation = new Animated.Value(0);
    renderItem(item){
        const {renderItem} = this.props;
        return renderItem(item);
    }
    render(): React.Node {
        const {renderItem, scrollAnimation , keyExtractor} = this;
        const {data, title, navigation, theme, back, rightAction, header, numColumns, style , extraData} = this.props;
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
                    {
                        !back && (
                            <View style={[styles.halfFlex, { backgroundColor: top }]} />
                        )
                    }
                </View>
                <NavigationBar  {...{ navigation, title, back, titleStyle, rightAction}}
                />
                <AnimatedFlatList
                    contentContainerStyle={[styles.container, style]}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={(
                        !back && (
                            <Animated.View style={{ backgroundColor: theme.palette.primary }}>
                                <View style={styles.header}>
                                    <Text type="title1" style={styles.headerText}>{title}</Text>
                                </View>
                                <View style={styles.extraHeader}>{header}</View>
                            </Animated.View>
                        )
                    )}
                    scrollEventThrottle={16}
                    columnWrapperStyle={(numColumns && numColumns > 0) ? styles.columnWrapperStyle : undefined}
                    {...{data, keyExtractor, renderItem, onScroll, numColumns , extraData} }
                />
            </View>
        );
    }
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
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
        backgroundColor: StyleGuide.palette.secondary,
        ...StyleGuide.styles.shadow
    },
    columnWrapperStyle: {
        marginRight: StyleGuide.spacing.small,
        marginTop: StyleGuide.spacing.small
    }
});

export default withTheme(Feed);
