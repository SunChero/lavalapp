// @flow
import * as React from "react";
import {StyleSheet, ScrollView} from "react-native";
import Story from "./Story";
import AddStory from "./AddStory";

export default class Stories extends React.PureComponent<NavigationProps<>> {
    render() {
        const {navigation } = this.props;
       const stories = [
        {
            "id": "db18e45b-6ce1-40fa-b0f8-45808ff25012",
            "user": "alexandergarcia",
            "picture": {
                "uri": "https://firebasestorage.googleapis.com/v0/b/react-native-e.appspot.com/o/3e65bbd48387de22140814a7f948536e66dcb4c1.png?alt=media&token=90249d8f-7eaa-4aec-948e-fe9cec9a0432",
                "preview": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAWCAYAAAD5Jg1dAAAAAXNSR0IArs4c6QAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAAAsTAAALEwEAmpwYAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMwidZAAAC30lEQVQoFQ2TTW8bZRSFn3lnPGNPxrHHruOPuonbpEmbtmoWKCVUFFTxsUOwQfQfVKzYsOendM8vQEKAIqQWNaItpSKycWWcZGwnjRPHHnu+PMO7uLuje66ec67y3WdPkr5pczQTTHJFastlRM7iwbUMH64aeHrC+JKCFmVd4oGCYS7h+THD/ozEttjTFNQgYqWgsqhLYeL4fPMqjfOpzovVNF4pjbKikasorBUUNrKCYxW0zPMRxXt1Sg+Wiao5ngZzAi3i/aLB7VqKnBSdRSD8GxGt9/J4Zsiw6zA5fEd4HBArgsMkYSBAlaOZjQYFW+PZH01aQvDRzhpOIYMuhWM/IYoSEkVBuLFJq9lj90mH2lgjqJfZupfniqXSnyV0vJi0tFdr+uc/KMOQ+pUQ9W3A+uUFqtkFdlvnWBkVQ6qO3QRNFHJU1YALN8Ztd8nuLXPw9BR9MmT78cc0Kyl+6bqIV/fv8OK3/3BHI6zaIq4zJnpzzFd3V6mOVAa/OzT+PEEk2ytMvtzgsPmaSEzx2g6lCjRqZabtAec/v6R45CC+v53hky92kMT4tbdHb+BxZ62Kabi8/aeNGI0pEyNuWXPqjSKlhztszhNKayHzsMdff+/j/DsmSY151+8gmvOI50WV8v1bfLvyAY8e1oiCKc9+7JKxBWYcst9tyawl9VkmobhR56LWYG//hMEgT2XToBe0sWR8W4UK4qou2NQk0JLJ66zNT7sj4rJFo3GJJVPF9g22MzfQ8inB3WxCS9o3vl4ndS3F6laF2WDIzMlj2CrT6SlaX3Zwx05BKSJ/tcr1RQv8UxxlTto2WbiY443PEIcyz7Mg5vplnQPP5aJ7jgjlLdJSJWE28shL8GLdELwcRpzGMdZNg5PpTBbQZzJxGR9NCccRfjhHLJvyV0J4MwhRVIOkqEsMso/+CLczInF9RFr20ZYbLRSCkYJ74GF1pkxx0S8Clm56VA2LqJnmfy88P0qmJyZ6AAAAAElFTkSuQmCC"
            },
            "comments": [
                {
                    "user": "monicaa",
                    "comment": "😍 Great shot Alex!",
                    "timestamp": 1514967242
                },
                {
                    "user": "jmitch",
                    "comment": "Dude, where did you get those sunglasses?",
                    "timestamp": 1514968622
                },
                {
                    "user": "andrea.schmidt",
                    "comment": "😎",
                    "timestamp": 1514972222
                }
            ],
            "read": false
        },
        {
            "id": "0fb1616d-d14d-4e59-be6d-0a1c72a58cc7",
            "user": "monicaa",
            "picture": {
                "uri": "https://firebasestorage.googleapis.com/v0/b/react-native-e.appspot.com/o/occulus.jpg?alt=media&token=36fd8522-b1e3-4204-b60d-3b53446b91da",
                "preview": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QCYRXhpZgAATU0AKgAAAAgABgEGAAMAAAABAAIAAAESAAMAAAABAAEAAAEaAAUAAAABAAAAVgEbAAUAAAABAAAAXgEoAAMAAAABAAIAAIdpAAQAAAABAAAAZgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAAqgAwAEAAAAAQAAABYAAAAA/+0AOFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAAOEJJTQQlAAAAAAAQ1B2M2Y8AsgTpgAmY7PhCfv/AABEIABYACgMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2wBDAAICAgICAgMCAgMEAwMDBAUEBAQEBQcFBQUFBQcIBwcHBwcHCAgICAgICAgKCgoKCgoLCwsLCw0NDQ0NDQ0NDQ3/2wBDAQICAgMDAwYDAwYNCQcJDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ3/3QAEAAH/2gAMAwEAAhEDEQA/AP0day1KKSFDNNhTd5+c/wAUShc+uD09DVpNF1LYv76boP4jXqlz/wAIvd3qBL2FGmBby1dXxnAOCDyOOP1qs/xE+GFq7Wsus6MjwkxssmpQq4K8EMM8EY5HY1tchn//0P1EX4TfD63lje20S1iKMWUopXB46YPHTmvF779jj9nS/vbi+u/APh+We5leaWR9Pgd3d2LMzMVySScknk19XP8AfFUj1P1rQvlR/9k="
            },
            "comments": [],
            "read": true
        },
        {
            "id": "ffb7b2b1-e7d5-4565-9d79-60ca1f7ded58",
            "user": "andrea.schmidt",
            "picture": {
                "uri": "https://firebasestorage.googleapis.com/v0/b/react-native-e.appspot.com/o/clouds.jpg?alt=media&token=e3e31ab8-2d98-4196-8600-25d583fb407c",
                "preview": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QCYRXhpZgAATU0AKgAAAAgABgEGAAMAAAABAAIAAAESAAMAAAABAAEAAAEaAAUAAAABAAAAVgEbAAUAAAABAAAAXgEoAAMAAAABAAIAAIdpAAQAAAABAAAAZgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAAqgAwAEAAAAAQAAABYAAAAA/+0AOFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAAOEJJTQQlAAAAAAAQ1B2M2Y8AsgTpgAmY7PhCfv/AABEIABYACgMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2wBDAAICAgICAgMCAgMEAwMDBAUEBAQEBQcFBQUFBQcIBwcHBwcHCAgICAgICAgKCgoKCgoLCwsLCw0NDQ0NDQ0NDQ3/2wBDAQICAgMDAwYDAwYNCQcJDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ3/3QAEAAH/2gAMAwEAAhEDEQA/AND4jJ8IvA3xC0X4X+KNQS28Qa+0aWtuIy6xmdikPnuOIvOcFY933iOK7N/2cLcOwNuBye1fit8Tfjnd+MfjtF8W30s29xYarp979iuL6a9Vn02XfsaaRFba7ZBAQbBwBX3Q3/BVjxU7F28C6aCxyQNRkxz/ANsK998V4neUW79uXT72vwPn4cJ4bWMZrTvza/cvzP/Q/BO8uZb27nvJiPMnleV8dNzsWP6mqvPrTz1P1NJQZn//2Q=="
            },
            "comments": [],
            "read": false
        },
        {
            "id": "14849d67-6560-483d-a8c3-74859ee7987d",
            "user": "jmitch",
            "picture": {
                "uri": "https://firebasestorage.googleapis.com/v0/b/react-native-e.appspot.com/o/place.jpg?alt=media&token=8eb3f25c-674e-41b6-a0d3-119fa0f6e6de",
                "preview": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QCYRXhpZgAATU0AKgAAAAgABgEGAAMAAAABAAIAAAESAAMAAAABAAEAAAEaAAUAAAABAAAAVgEbAAUAAAABAAAAXgEoAAMAAAABAAIAAIdpAAQAAAABAAAAZgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAAqgAwAEAAAAAQAAABYAAAAA/+0AOFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAAOEJJTQQlAAAAAAAQ1B2M2Y8AsgTpgAmY7PhCfv/AABEIABYACgMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2wBDAAICAgICAgMCAgMEAwMDBAUEBAQEBQcFBQUFBQcIBwcHBwcHCAgICAgICAgKCgoKCgoLCwsLCw0NDQ0NDQ0NDQ3/2wBDAQICAgMDAwYDAwYNCQcJDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ3/3QAEAAH/2gAMAwEAAhEDEQA/AP1w+JnhnQ/Hmq6L4JsZorbUEvLTXby9ijikktbGwmDBSJFdCbtx5ABGShkYHK12LfC74fMxY6VpXJz/AKlB/Wvh/wCDfxc0lNOvtf8AErLda3r0xvr+MszCCNBtt7SMKT8kEQC9gzl3wCxr6Lg+Jd/cwR3FtomkCGVFeMSXyq4RhkbhtOGx1GTg1506uH5r1rcz6b29bf19x0UKs6keXC3cU2r7JvrZ31/ruf/Q+Wh8b7j4e+GrefTLLzrq6AihMhyFmfcfOc5JcpGhwuMFyM4Arl3/AGlPGzuzG8mGSTyoJ599wz+VeVeP/wDkXNH/AOvhP/RU1cEep+tfK4fB0ZUfaSjdtyu/R2Pop1HTxDow0jGMbLotG9Ef/9k="
            },
            "comments": [],
            "read": true
        },
        {
            "id": "aede229f-30f3-4cb0-a976-aa24e6a7ff80",
            "user": "mjcole",
            "picture": {
                "uri": "https://firebasestorage.googleapis.com/v0/b/react-native-e.appspot.com/o/william-topa-447603.jpg?alt=media&token=7fd7766e-06be-4e01-ac86-2e94e81c6e80",
                "preview": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QCMRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAAqgAwAEAAAAAQAAABYAAAAA/+0AOFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAAOEJJTQQlAAAAAAAQ1B2M2Y8AsgTpgAmY7PhCfv/AABEIABYACgMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2wBDAAICAgMDAwMEBAMFBQUFBQcGBgYGBwoHCAcIBwoPCgsKCgsKDw4RDg0OEQ4YExERExgcGBcYHCIfHyIrKSs4OEv/2wBDAQICAgMDAwMEBAMFBQUFBQcGBgYGBwoHCAcIBwoPCgsKCgsKDw4RDg0OEQ4YExERExgcGBcYHCIfHyIrKSs4OEv/3QAEAAH/2gAMAwEAAhEDEQA/AP06lludVs4Elslt4tz/ALjl2V8ld0h/iOecjjmuKtvA+nJDEv8AZDHagGfPcZwKw/h9+0v4a1Xw3rN3qq3NtcxaXAfLMZdpZSrb/LK8buM47CvCb39oGf7RP5Fy6ReY3lqbUkqueASH7CvBjjcNVXNKtBt95JWPdlha9LRQkl5K9z//0Pie0+O9+lisYjcFVxwRjkYPTHWvPX+KNyWYi3ABPA44rgof9S34fzrGrjpZbhoudqMVqdNfM8U1TvWex//Z"
            },
            "comments": [],
            "read": true
        }
    ]
        return (
            <ScrollView contentContainerStyle={styles.stories} horizontal>
              <AddStory />
                {
                    stories.map(story => {
                        const user = story.user;
                        console.log(story)
                        return (
                            <Story  key={story.id}  uri={story.picture.uri}    read={story.read}   id={story.id}   {...{navigation}}  />
                        );
                    })
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    stories: {
        backgroundColor: '#283355',
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        height: 80
    }
});
