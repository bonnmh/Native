/* eslint-disable react-hooks/exhaustive-deps */
import {scaleSize} from 'features/utils';
import useCountDown from 'hooks/useCountDown';
import React, {LegacyRef, useCallback, useContext, useMemo, useRef, useState} from 'react';
import {Animated, Easing, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ThemeContext} from 'react-native-elements';
import FImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import {Transition, Transitioning, TransitioningView} from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import {styleText} from './globStyles';
import colors from './globStyles/colors';
import {PrimaryButton} from './v2/PrimaryButton';
import {SecondaryButton} from './v2/SecondaryButton';

const DURATION = 300;

const transition = (
    <Transition.Together>
        <Transition.In type="fade" durationMs={DURATION} />
        <Transition.Change />
    </Transition.Together>
);

type dataType = {
    title: string;
    label: string;
};

interface ConfirmAnimModalProps {
    isVisible: boolean;
    onBackdropPress: () => void;
    data: dataType[]
}

const ConfirmAnimModal = ({
    isVisible,
    onBackdropPress,
    data
}: ConfirmAnimModalProps) => {
    const {theme} = useContext(ThemeContext);
    const styles = getStyles(theme);

    const ref = React.useRef<LegacyRef<TransitioningView> | any>(null);
    const animatedValue = useRef(new Animated.Value(0)).current;
    const [isShow, setIsShow] = useState(false);
    const [countdown, setCountdown] = useCountDown(60);


    const _onBackDropPress = useCallback(() => {
        typeof onBackDropPress === 'function' && onBackDropPress();
    }, [onBackDropPress]);


    const animate = (check: boolean) => {
        return Animated.parallel([
            Animated.timing(animatedValue, {
                toValue: check ? 0 : 1,
                duration: DURATION,
                useNativeDriver: false,
                easing: Easing.linear,
            }),
        ]).start();
    };

    const opacity = animatedValue.interpolate({
        inputRange: [0, 0.8, 0.95, 1],
        outputRange: [0, 0, 0.95, 1],
    });


    const translateY = animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [-100, -50, 0],
    });

    const _renderItemContent = useMemo(() => (item: dataType, index: number) => {
        return (
            <View key={index} style={styles.listItem}>
                <Text style={styles.txtListItemLabel}>{item.title}</Text>
                <Text style={styles.txtListItemValue}>{item.label}</Text>
            </View>
        );
    }, []);

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={_onBackDropPress}
            backdropOpacity={0.7}
            backdropColor={colors.darkBlue}
            animationIn={'fadeIn'}
            useNativeDriver>
            <Transitioning.View
                ref={ref}
                transition={transition}
                style={styles.modal} >
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={onBackdropPress}
                    style={styles.btnClose}>
                    <Feather name={'x'} size={20} color={colors.grey1} />
                </TouchableOpacity>
                <View style={{paddingHorizontal: scaleSize(8)}}>
                    {isShow &&
                        <FImage source={require('assets/images/coins-pana.png')} style={styles.img} />
                    }
                    <View style={{backgroundColor: colors.white, paddingBottom: 30}}>
                        <Text style={styles.txtTitle}>{isShow ? 'Quy đổi thành công' : 'Xác nhận quy đổi'}</Text>
                        {data.map(_renderItemContent)}
                    </View>
                    <PrimaryButton
                        title={`Xác nhận giao dịch (${countdown}s)`}
                        buttonStyle={styles.btnConfirm}
                        activeOpacity={0.78}
                        onPress={() => {
                            animatedValue.setValue(0);
                            animate(isShow);
                            ref.current?.animateNextTransition();
                            setIsShow(prev => !prev);
                        }}
                    />
                    {isShow &&
                        <Animated.View style={{opacity, transform: [{translateY}]}}>
                            <SecondaryButton
                                title={'Đóng'}
                                onPress={_onBackDropPress}
                                buttonStyle={styles.btnCancel} />
                        </Animated.View>
                    }
                </View>

            </Transitioning.View>
        </Modal>
    );
};

export default ConfirmAnimModal;

const getStyles = (theme: any) => {
    return StyleSheet.create({
        modal: {
            backgroundColor: colors.white,
            borderRadius: 12,
            padding: 12,
            paddingBottom: 30,
        },
        txtTitle: {
            textAlign: 'center',
            marginVertical: 12,
            ...styleText('semibold'),
            fontSize: 18,
            backgroundColor: 'white',
        },
        btnClose: {
            alignSelf: 'flex-end',
        },
        listItem: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 16,
            backgroundColor: colors.white
        },
        txtListItemLabel: {
            ...styleText('500'),
            fontSize: 12,
            color: colors.grey1,
        },
        txtListItemValue: {
            ...styleText('600'),
            fontSize: 12,
        },
        btnConfirm: {
            backgroundColor: theme.colors?.bgBtnPrimary,
        },
        btnCancel: {
            marginTop: 8,
        },
        img: {
            width: 150,
            aspectRatio: 1,
            alignSelf: 'center',
        },
    });
};
