import React, {Component} from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity, ScrollView, ImageBackground, Modal} from 'react-native';


class SocialChat extends Component {

    render() {
        const {safeArea, navigation} = this.props;

        return (
            <View style={{flex:1, justifyContent: 'center', alignSelf: 'center'}}>
                <Text>{'Chat UI'}</Text>
            </View>
        )
    }
}

export {SocialChat};
