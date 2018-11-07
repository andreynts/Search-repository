import React, {Component} from 'react'
import {View, Text, TextInput} from 'react-native'
import validate from './Validators/SearchValidation'
import styles from '../styles'

class SearchForm extends Component{

    constructor(props) {
        super(props);
        this.state = {
            key: '',
            query: '',
            searchError: ''
        }
    }

    changeHandler = (query) => {
        this.setState({query: query}, () => {
            if (this.validateForm() && query.length > 3) {
                setTimeout(() => {
                    this.props.callBack(query)
                }, 200)
            }
        })
    }

    validateForm() {
        const searchError = validate('search', this.state.query);
        let errors = {search: searchError};
        this.displayErrors(errors);
        return (!searchError);
    }

    displayErrors(errors) {
        if (errors) {
            if (errors.search) {
                this.setState({searchError :errors.search[0]});
            } else {
                this.setState({searchError : ''});
            }
        }
    }

    render() {
        return (
            <View style={styles.searchFormContainer}>
                <TextInput
                    style={styles.searchField}
                    underlineColorAndroid='transparent'
                    maxLength={50}
                    placeholder='Find a repository...'
                    onChangeText={(query) => this.changeHandler(query)}
                />
                <Text
                    style={styles.searchFieldError}>
                    {this.state.searchError}
                </Text>
            </View>
        );
    }
}

export default SearchForm