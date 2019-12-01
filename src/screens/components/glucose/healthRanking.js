import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import Constant from '../../../helper/themeHelper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../../helper/responsiveScreen';

class HealthRanking extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
    }

    render() {
        const {} = styles;
        const {} = this.props;

        return (

            <View style={{
                flexDirection: 'row', marginTop: hp('2%'),
                paddingHorizontal: wp('2%'), justifyContent: 'space-between'
            }}>
                <View>
                    <Text style={{
                        fontFamily: Constant.font.robotoBold,
                        fontSize: Constant.fontSize.xmini
                    }}>{'HEALTH RANKING'}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity>
                            <Image source={{uri: 'monitoring_glucose_red_heart'}}
                                   style={{
                                       height: hp('4%'), width: wp('10%'),
                                       marginTop: hp('0.5%')
                                   }}
                                   resizeMode={'contain'}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={{uri: 'monitoring_glucose_yellow_heart'}}
                                   style={{
                                       height: hp('4%'), width: wp('10%'),
                                       marginTop: hp('0.5%')
                                   }}
                                   resizeMode={'contain'}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={{uri: 'monitoring_glucose_green_heart'}}
                                   style={{
                                       height: hp('4%'), width: wp('10%'),
                                       marginTop: hp('0.5%')
                                   }}
                                   resizeMode={'contain'}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{marginHorizontal: wp('0.5%')}}>
                        <Image source={{uri: 'monitoring_glucose_bad_rating'}}
                               style={{
                                   height: hp('4%'), width: wp('10%'),
                                   marginVertical: hp('0.5%')
                               }}
                               resizeMode={'contain'}
                        />
                        <Text style={{
                            fontFamily: Constant.font.robotoRegular, textAlign: 'center',
                            color: Constant.color.red,
                            fontSize: Constant.fontSize.xxmini
                        }}>{'Bad'}</Text>
                    </View>
                    <View style={{marginHorizontal: wp('0.5%')}}>
                        <Image source={{uri: 'monitoring_glucose_regular_rating'}}
                               style={{
                                   height: hp('4%'), width: wp('10%'),
                                   marginVertical: hp('0.5%')
                               }}
                               resizeMode={'contain'}
                        />
                        <Text style={{
                            fontFamily: Constant.font.robotoRegular, textAlign: 'center',
                            color: Constant.color.yellow,
                            fontSize: Constant.fontSize.xxmini
                        }}>{'Regular'}</Text>
                    </View>
                    <View style={{marginHorizontal: wp('0.5%')}}>
                        <Image source={{uri: 'monitoring_glucose_good_rating'}}
                               style={{
                                   height: hp('4%'), width: wp('10%'),
                                   marginVertical: hp('0.5%')
                               }}
                               resizeMode={'contain'}
                        />
                        <Text style={{
                            fontFamily: Constant.font.robotoRegular, textAlign: 'center',
                            color: Constant.color.green,
                            fontSize: Constant.fontSize.xxmini
                        }}>{'Good'}</Text>
                    </View>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({

});

export {HealthRanking};
