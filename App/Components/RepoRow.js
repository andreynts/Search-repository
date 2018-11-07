import React, { Component } from 'react'
import { View, Text, Image, Animated, TouchableOpacity } from 'react-native'
import styles from './styles'

class RepoRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false
        };
        this._animated = new Animated.Value(0);
    }

    componentDidMount() {
        Animated.timing(this._animated, {
            toValue: 1,
            duration: 500,
        }).start();
    }

    removeHandler = (item) => {
        let isSelected = this.state.selected;
        if (isSelected) {
            let stars = (this.props._parent.state.totalStars - item.stargazers_count) > 0 ? this.props._parent.state.totalStars - item.stargazers_count : 0
            this.props._parent.setState({totalStars: stars})
            this.setState({selected: false});
        }

        this.props._parent.removeHandler(item.id);
    }

    render() {
        let backgroundColor = this.props.selected ? '#FFFBE5' : null

        return (
            <TouchableOpacity onPress={() => this.props._parent.onPressAction(this.props.item.id)}>
                <Animated.View key={this.state.backgroundColor} style={[
                    styles.rowContainer,
                    {backgroundColor: backgroundColor},
                    { opacity: this._animated },
                    {
                        transform: [
                            { scale: this._animated },
                            {
                                rotate: this._animated.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['35deg', '0deg'],
                                    extrapolate: 'clamp',
                                })
                            }
                        ],
                    },
                ]}>
                    <Image source={{ uri: this.props.item.owner.avatar_url}} style={styles.rowPhoto} />
                    <View style={{width: '80%'}}>
                        <View style={styles.rowInfoContainer}>
                            <Text style={styles.rowLabel}>
                                {this.props.item.full_name}
                            </Text>
                            <Text style={styles.rowStarLabel}>
                                Stars: {this.props.item.stargazers_count}
                            </Text>
                        </View>
                        <View style={styles.rowInfoContainer}>
                            <TouchableOpacity onPress={() => this.removeHandler(this.props.item)}>
                                <Text style={styles.rowRemoveLabel}>
                                    Remove
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.View>
            </TouchableOpacity>
        )
    }
}



export default RepoRow;