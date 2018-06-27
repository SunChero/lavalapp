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
   
    componentDidUpdate =(prevProps)=>{
        if(prevProps.comments  !== this.props.comments  && this.images.length === 0){
            let lt = this.props.comments.length
            this.images = []
            this.props.comments.slice(Math.max(lt - 4, 1)).map(post =>
            {
                console.log(post)
                global.dsc.record.snapshot(post , (error ,record) =>
                {
                 global.dsc.record.snapshot(record.user_id , (error , user) =>  this.images.push(user.picture.thumbnail))
                })
            }
        )
        }
        
    }
    render(){
        const {comments, showLabel} = this.props;
        const left = comments.length === 0 ? 0 : ((-5 * (comments.length - 1)) + StyleGuide.spacing.tiny);
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
