// @flow
import * as React from "react";
import {StyleSheet, View} from "react-native";
import {Text, StyleGuide, Avatar} from "./index";
import {observer} from 'mobx-react/native'
import {observable , runInAction} from 'mobx'

@observer
export default class Comments extends React.Component {
    @observable images=[]
    static defaultProps = {
        showLabel: true
    }
    // shouldComponentUpdate = (nextProp) =>{
       
    //     return   this.images.length > 0
    // }
    constructor(props) {
        super(props)
        console.log(`props constructor ${this.props.comments}`)
    }
    componentWillReceiveProps = () => {
        console.log(`props are ${this.props.comments}`)
            let lt = this.props.comments.length
            this.images = []
            this.props.comments.map(post =>
            {
               
                global.dsc.record.snapshot(post , (error ,record) =>
                {
                    let recordId = record.user_id
                    global.dsc.record.snapshot(recordId , (error, user )=>{
                        console.log(user.picture.thumbnail)
                        let uri = user.picture.thumbnail
                        //this.images.includes(uri) ? null :
                        this.images.push(uri)
                    })
                    
                   
                })
            }
            
        )
       
    }
    componentDidUpdate =(prevProps)=>{
        // console.log(`updating`)
       
        
        
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
