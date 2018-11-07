import React, {Component} from 'react'
import {View, Text, FlatList, Linking, ActivityIndicator, AsyncStorage} from 'react-native'
import {connect} from 'react-redux'
import RepoRow from '../../../Components/RepoRow'
import styles from './styles'

type Props = {
    data: Object,
    repositories: Object,
    selected: Object,
};
class Results extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            repositories: {},
            totalStars: 0,
            selected: (new Map(): Map<string, boolean>)
        };
    }

    componentDidMount(){

        const {repositories} = this.props.repositories

        AsyncStorage.getItem('selected')
            .then((selected) => {
                if (selected) {
                    try {
                        selected = JSON.parse(selected);
                        let items = []
                        repositories.forEach(function(item) {
                            if (selected.indexOf(item.id) != -1)
                                items.push(item)
                        });
                        this.setState({
                            data: items,
                            selected: (new Map(): Map<string, boolean>),
                        })

                    } catch (e) {
                        console.error('AsyncStorage#getItem error deserializing JSON for key: ' + key, e.message);
                    }
                }
                return selected;
            });
    }

    removeHandler = (id) => {
        this.setState({data: this.state.data.filter(item => item.id !== id)})
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.repositories.repositories !== nextProps.repositories.repositories) {
            this.setState({
                data: nextProps.repositories.repositories,
                nextPage: false
            })
        }
    }

    onPressAction = (key: string) => {
        let item = this.state.data.filter(item => item.id === key)[0]
        console.log(item)
        Linking.canOpenURL(item.html_url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + item.html_url);
            } else {
                return Linking.openURL(item.html_url);
            }
        }).catch(err => console.error('An error occurred', err));
    }

    renderRow = (item) => {
        return (
            <RepoRow item={item} _parent={this} selected={!!this.state.selected.get(item.id)} />
        )
    }

    render() {
        const IS_LOADING = this.props.repositories && this.props.repositories.fetching === true
        const HAS_ERROR = this.props.repositories && this.props.repositories.error === true
        return (
            <View style={styles.container}>
                {HAS_ERROR && <View style={styles.indicator}><Text>Error fetching data</Text></View>}
                {IS_LOADING && <View style={styles.indicator}><ActivityIndicator size="small" color="#0000ff" /></View>}
                {!IS_LOADING && !HAS_ERROR &&
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (this.renderRow(item))}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={true}
                    extraData={this.state}
                />
                }
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        repositories: state.search
    }
}

export default connect(mapStateToProps, {})(Results)


