// @flow
import * as React from "react";
import {StyleSheet, View} from "react-native";
import {Text, StyleGuide, Avatar} from "./index";
import {observer} from 'mobx-react/native'
import {observable} from 'mobx'

@observer
export default class Comments extends React.Component {
    @observable images=[]
    static defaultProps = {
        showLabel: true
    }
   
    componentDidMount =()=>{
        let lt = this.props.posts.length
        this.props.posts.slice(lt > 5 ? lt -5 : 0  , lt).map(post =>
            {
                console.log(post)
                global.dsc.record.snapshot(post , (error , data) =>
                {
                 global.dsc.record.snapshot(data.user_id , (error , user) =>  this.images.push(user.picture.thumbnail))
                })
            }
        )
    }
    render(){
        const {posts, showLabel} = this.props;
        const left = posts.length === 0 ? 0 : ((-5 * (posts.length - 1)) + StyleGuide.spacing.tiny);
        return (
            <View style={styles.comments}>
                {
                    this.images.map((image, index) => (
                        <Avatar
                            key={index}
                            uri={image}
                            stacked={!!index}
                            style={this.computedStyle(index, this.images.length)}
                        />
                    ))
                }
                {
                    showLabel && <Text type="footnote" style={{ left }}>{`${this.images.length} comments`}</Text>
                }
            </View>
        );
    }

    computedStyle(index: number, length: number): { left: number} {
        const {showLabel} = this.props;
        if (showLabel) {
            return { left: -5 * index };
        }
        return { left: 5 * (length - index - 1) };
    }
}

const styles = StyleSheet.create({
    comments: {
        flexDirection: "row",
        alignItems: "center"
    }
});
