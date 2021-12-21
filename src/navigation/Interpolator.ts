import { StackCardStyleInterpolator } from "@react-navigation/stack";
import { Animated } from 'react-native';

export const forFade = ({ current, next, inverted, layouts: { screen } }: StackCardStyleInterpolator) => {
    const progress = Animated.add(
        current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        }),
        next
            ? next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                extrapolate: 'clamp',
            })
            : 0
    );

    return ({
        cardStyle: {
            opacity: current.progress,
            transform: [
                {
                    translateY: Animated.multiply(
                        progress.interpolate({
                            inputRange: [0, 1, 2],
                            outputRange: [
                                screen.width,
                                0,
                                screen.width * -0.3,
                            ],
                            extrapolate: 'clamp',
                        }),
                        inverted
                    ),
                },
            ],
        },
    });

};