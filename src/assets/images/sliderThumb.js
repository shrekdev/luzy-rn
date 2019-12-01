import React from 'react';
import { StyleSheet, Image } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../helper/responsiveScreen';

class SliderThumb extends React.Component {
    render() {
        return (
            <Image
                style={styles.image}
                source={{uri: 'progress_screen_slider'}}
                resizeMode="contain"
            />
        );
    }
}

const styles = StyleSheet.create({
    image: {
        height: hp('4.5%'),
        width: wp('12%'),
        marginTop: hp('1.5%'),
        marginLeft: wp('1%')
    },
});

export default SliderThumb;