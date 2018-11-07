// @flow

import React, {Component} from 'react'
import {View, Text, FlatList, TouchableOpacity, Linking, ActivityIndicator, AsyncStorage} from 'react-native'
import {connect} from 'react-redux'
import SearchActions from '../../../Redux/SearchRedux'
import RepoRow from '../../../Components/RepoRow'
import SearchForm from '../../../Components/Forms/SearchForm'
import styles from './styles'

type Props = {
    page: number,
    totalStars: number,
    query?: string,
    data: Object,
    repositories: Object,
    selected: Object,
    navigation: Object,
    getAllRepositories: any
};

type State = {
    page: number,
    totalStars: number,
    query?: string,
    data: Object,
    cache: boolean,
    repositories: Object,
    selected: Object,
}
class Home extends Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            repositories: {},
            totalStars: 0,
            query: 'macos',
            data: {},
            cache: true,
            page: 1,
            selected: (new Map(): Map<string, boolean>)

        };
    }

    componentDidMount(){
        if (this.props.repositories.fetching) {
            const {repositories} = this.props.repositories
            this.setState({data: repositories})
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.repositories.repositories !== nextProps.repositories.repositories) {
            this.setState({data: nextProps.repositories.repositories})
        }
    }

    onPressAction = (key: string) => {
        this.setState((state) => {
            const selected: Object = new Map(state.selected);
            this.state.selected.has(key) ? selected.delete(key, !selected.get(key)) : selected.set(key, !selected.get(key));
            return {selected};
        }, () => {this.recalculateStars()});
    }

    getRepositories = (query) => {
        this.setState({query: query, cache: false});
        this.props.getAllRepositories(query, this.state.page)
    }

    recalculateStars() {
        let selected = this.state.selected
        let stars = 0
        this.state.data.map(function(item) {
            if (selected.get(item.id) && item.stargazers_count)
                stars += item.stargazers_count
        });
        this.setState({totalStars: stars})
    }

    nextPage = async () => {
        if (this.state.selected.size) {
            await AsyncStorage.setItem('selected', JSON.stringify([...this.state.selected.keys()]), () => {
                this.props.navigation.navigate('Results')
            })
        }
    }

    removeHandler = (id) => {
        this.setState({data: this.state.data.filter(item => item.id !== id)}, () => {
            this.recalculateStars()
            let selected = this.state.selected
            if (selected.get(id)) {
                selected.delete(id)
            }
        })
    }

    renderRow = (item) => {
        return (
            <RepoRow item={item} _parent={this} selected={!!this.state.selected.get(item.id)} />
        )
    }

    render() {
        const IS_LOADING = (!this.state.cache && this.props.repositories && this.props.repositories.fetching === true)
        const HAS_ERROR = this.props.repositories && this.props.repositories.error === true
        return (
            <View style={styles.container}>
                <SearchForm callBack={this.getRepositories} />
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
                <View style={{width: '100%', padding: 20, left: 0, right: 0, bottom: 0}}>
                    <Text>Total stars: {this.state.totalStars}</Text>
                    <TouchableOpacity style={styles.nextPageBtn} onPress={() => this.nextPage()}><Text>Next page</Text></TouchableOpacity>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        repositories: state.search
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllRepositories: (q, page) => dispatch(SearchActions.getSearchRequest(q, page)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)


