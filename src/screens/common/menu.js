import React, {Component} from 'react';
import {StyleSheet, Image, TouchableOpacity, Text, View, Dimensions, BackHandler, Modal} from 'react-native';
import {menuItems} from '../../helper/appConstant';
import Constant from '../../helper/themeHelper';
import RNExitApp from 'react-native-exit-app';

const {color, fontSize, font} = Constant;


class Menu extends Component {

    menuItemAction = (title) => {
        const {navigation, onItemAction} = this.props;
        onItemAction && onItemAction();

        switch (title) {
            case 'Home' :
                navigation.navigate('Home');
                break;
            case 'User' :
                alert('User');
                break;
            case 'Progress' :
                navigation.navigate('Progress');
                break;
            case 'Settings' :
                alert('Settings');
                break;
            case 'Balance' :
                alert('Balance');
                break;
            case 'About' :
                navigation.navigate('AboutUs');
                break;
            case 'Contact' :
                alert('Contact');
                break;
            case 'Invite a friend' :
                alert('Invite a friend');
                break;
            case 'Logout' :
                alert('Logout');
                break;
            case 'Exit' :
                // BackHandler.exitApp();
                RNExitApp.exitApp();
                break;
        }
    };

    renderMenuItems = (item, index) => {
        const {itemText, itemView} = styles;
        let mn = 'onExit';
        return(
            <TouchableOpacity key={index} style={itemView} activeOpacity={0.7} onPress={() => this.menuItemAction(item.title)}>
                <View style={{height: '100%', width: '20%'}}>
                    <Image source={{uri: item.image}} style={{height: '100%', width: '100%', backgroundColor: '#fff'}} resizeMode='contain'/>
                </View>
                <Text style={itemText}>{item.title}</Text>
            </TouchableOpacity>
        )
    };

    render() {
        return (
            <View style={styles.menu}>
                {menuItems.map((data, index) => this.renderMenuItems(data, index))}
            </View>
        );
    }

}

export {Menu}
const styles = StyleSheet.create({
    menu: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: '12%',
    },
    itemText: {
        fontSize: fontSize.small,
        fontWeight: 'bold',
        color: color.lightGray,
        marginLeft: '2%',
        marginTop: '2.5%',
    },
    itemView: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        margin: 10,
        height:'5.5%',
        marginLeft: '15%',
    }
});