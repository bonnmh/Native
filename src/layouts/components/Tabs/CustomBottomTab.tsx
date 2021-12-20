import React from 'react';
import { StyleSheet } from 'react-native';
import { BottomTabBarProps, } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import { Block, Button, Icon } from "@components/index";
import { APP_SCREEN } from '@navigation/screenTypes';
import { IconTypes } from '@assets/index';
import { scale } from '@common/index';
import { useTheme } from '@themes/index';
import { Spacing } from '@themes/type';

const useStyle = ({ spacing }: { spacing: Spacing }) => {
    return StyleSheet.create({
        linear: {
            alignItems: 'center',
            backgroundColor: 'pink',
            marginTop: spacing.tiny,
            borderRadius: spacing.huge
        },
        btnTab: {
            flex: 1,
            backgroundColor: '',
            alignItems: 'center',
            paddingTop: spacing.normal
        },
        btnPost: {
            paddingVertical: spacing.small,
            width: '100%',
            alignItems: 'center'
        }
    })
}

interface tabProps {
    [key: string]: {
        icon: IconTypes,
        labelKey: string
    }
}
const TAB_ICONS: tabProps = {
    [APP_SCREEN.DISCOVER]: { icon: 'tab_home', labelKey: 'main:discoverTab:tvTabLabel' },
    [APP_SCREEN.SEARCH]: { icon: 'tab_search', labelKey: 'main:searchTab:tvTabLabel' },
    [APP_SCREEN.POST]: { icon: 'tab_post', labelKey: 'main:postTab:tvTabLabel' },
    [APP_SCREEN.CHAT_TAB]: { icon: 'tab_chat', labelKey: 'main:chatTab:tvTabLabel' },
    [APP_SCREEN.PROFILE]: { icon: 'tab_profile', labelKey: 'main:profileTab:tvTabLabel' },
}


const CustomBottomTab = ({ state, descriptors, navigation }: BottomTabBarProps): JSX.Element => {
    const insets = useSafeAreaInsets();
    const { spacing } = useTheme();

    const styles = useStyle({ spacing })
    return (
        <Block
            color={'white'}
            borderTopWidth={StyleSheet.hairlineWidth}
            borderTopColor='gray'
            direction="row"
            paddingTop={spacing.tiny}
            height={scale(50) + insets.bottom} >
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];

                // tabs focused state
                const isFocused = state.index === index;

                const onPress = (_index: number) => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                if (route.name === APP_SCREEN.POST) {
                    return (
                        <Block
                            flex={1.1}
                            key={`tab_bar_${index}`}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID} >
                            <LinearGradient
                                colors={['#FF4D00', '#FF00D6']}
                                style={styles.linear}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 0 }}>
                                <Button
                                    onPress={() => onPress(index)}
                                    onLongPress={onLongPress}
                                    activeOpacity={1}
                                    style={styles.btnPost}>
                                    <Icon
                                        size={scale(16)}
                                        icon={TAB_ICONS[route.name].icon}
                                        color={'white'} />
                                </Button>
                            </LinearGradient>
                        </Block>
                    );
                }

                return (
                    <Button
                        key={`tab_bar_${index}`}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        activeOpacity={1}
                        onPress={() => onPress(index)}
                        onLongPress={onLongPress}
                        style={styles.btnTab}
                    >
                        <Icon icon={TAB_ICONS[route.name].icon} color={isFocused ? 'purple' : 'black'} />
                    </Button>
                );
            })}
        </Block >
    );
}

export default CustomBottomTab;