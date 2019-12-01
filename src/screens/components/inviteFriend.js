import React, {Component} from 'react';
import {StyleSheet, Image, TouchableOpacity, Text, View, Dimensions, BackHandler, Modal} from 'react-native';
import Constant from "../../helper/themeHelper";
import {style} from "../common/style";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "../../helper/responsiveScreen";

class InviteFriend extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isInviteModalOpen: false,
            isSuccessModalOpen: false,
            isFailureModalOpen: false
        };
    }

    render () {
        const {safeArea, navigation} = this.props;

        return(
            <View>
                <Text>{'Invite Modal'}</Text>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.isInviteModalOpen}
                >
                    <View style={{
                        ...style.modalView,
                        paddingHorizontal: wp('6.5%'),
                        marginTop: Constant.isIOS ? hp('19.25%') + safeArea.top : hp('18.5%'),
                        marginBottom: Constant.isIOS ? hp('10%') + safeArea.bottom : hp('3%'),
                        minHeight: hp('70%')
                    }}
                    >
                        <Text>{'Invite friend modal'}</Text>
                    </View>
                </Modal>
            </View>
        )
    }
}

export {InviteFriend};
