import {Animated} from 'react-native';

const transitionConfig = (duration = 0) => {
    return {
        transitionSpec: {
            duration,
            timing: Animated.timing,
            useNativeDriver: true,
        },
        screenInterpolator: ({position, scene}) => {
            const {index} = scene;
            const opacity = position.interpolate({
                inputRange: [index - 1, index],
                outputRange: [0, 1],
            });

            return {opacity};
        },
    };
};

export {transitionConfig}