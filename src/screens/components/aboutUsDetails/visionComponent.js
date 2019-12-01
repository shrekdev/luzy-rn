import React, {Component} from "react";
import {
    StyleSheet,
    View,
    ScrollView, Text
} from "react-native";
import {AboutUsCardComponent} from './index'
import Constant from '../../../helper/themeHelper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../../helper/responsiveScreen';


class VisionComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    ourValuesData = (data) => {
        return (
            <Text style={{
                fontSize: Constant.fontSize.medium,
                fontWeight: 'bold',
                color: Constant.color.blue,
                textAlign: 'center'
            }}
                  numberOfLines={1}>
                {data}
            </Text>
        )
    }

    render() {
        const {data, ourValuesList, safeArea} = this.props;
        const {container, bottomView, scrollView, titleText, listData} = styles;
        return (
            <ScrollView style={container} showsVerticalScrollIndicator={false}>
                <AboutUsCardComponent
                    data={data}
                />
                <View style={bottomView}>
                    <View style={scrollView}>
                        <View>
                            <Text style={titleText} numberOfLines={1}>
                                {'OUR VALUES'}
                            </Text>
                            {ourValuesList.map((value, index, array) => {
                                return (
                                    <Text style={listData} numberOfLines={1} key={index}>
                                        {value}
                                    </Text>
                                )
                            })}
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomView: {
        backgroundColor: Constant.color.lightblue,
        marginTop: hp('3%'),
        height: hp('30%')
    },
    scrollView: {
        paddingTop: hp('2%'),
        paddingHorizontal: wp('5%')
    },
    titleText: {
        fontSize: Constant.fontSize.xlarge,
        fontWeight: 'bold',
        color: Constant.color.white,
        fontFamily: Constant.font.linateBold,
        textAlign: 'center'
    },
    listData: {
        fontSize: Constant.fontSize.mini,
        fontFamily: Constant.font.linateBold,
        color: Constant.color.white,
        textAlign: 'center',
        lineHeight: Constant.fontSize.mini + 5
    }
});

export {VisionComponent};