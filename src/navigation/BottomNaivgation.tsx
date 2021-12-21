import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { APP_SCREEN, BottomStackParamList, ChatStackParamList, DiscoverStackParamList } from './screenTypes';
import { Discover } from '@layouts/discover';
import { Search } from '@layouts/search';
import { Chat, ChatDetail } from '@layouts/chat';
import { Profile } from '@layouts/profile';
import { Post } from '@layouts/post';
import { CustomBottomTab } from '@layouts/components/index';
import { Photo } from '@layouts/photo';

const BottomStack = createBottomTabNavigator<BottomStackParamList>();

const ChatStack = createStackNavigator<ChatStackParamList>();

const DiscoverStack = createSharedElementStackNavigator<DiscoverStackParamList>();

export const ChatNavigation = () => (
    <ChatStack.Navigator
        initialRouteName={APP_SCREEN.CHAT}
        screenOptions={{ headerShown: false }}>
        <ChatStack.Screen name={APP_SCREEN.CHAT} component={Chat} />
        <ChatStack.Screen name={APP_SCREEN.CHAT_DETAIL} component={ChatDetail} />
    </ChatStack.Navigator>
);

export const DiscoverNavigation = () => (
    <DiscoverStack.Navigator
        initialRouteName={APP_SCREEN.DISCOVER}
        screenOptions={{
            gestureEnabled: false,
            headerShown: false,
            cardOverlayEnabled: true,
            cardStyle: { backgroundColor: "transparent" },
            presentation: 'transparentModal'
        }}
    >
        <DiscoverStack.Screen name={APP_SCREEN.DISCOVER} component={Discover} />
        <DiscoverStack.Screen name={APP_SCREEN.PHOTO} component={Photo}
            sharedElements={(route) => {
                const { id } = route.params.item;
                return [id];
            }} />
    </DiscoverStack.Navigator>
);


export const BottomNavigation = () => {
    // render
    return (
        <BottomStack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={APP_SCREEN.DISCOVER}
            tabBar={(props: BottomTabBarProps) => <CustomBottomTab {...props} />}
        >

            <BottomStack.Screen
                name={APP_SCREEN.DISCOVER_TAB}
                component={DiscoverNavigation}
            />
            <BottomStack.Screen
                name={APP_SCREEN.SEARCH}
                component={Search}
            />
            <BottomStack.Screen
                name={APP_SCREEN.POST}
                component={Post}
            />
            <BottomStack.Screen
                name={APP_SCREEN.CHAT_TAB}
                component={ChatNavigation}
            />
            <BottomStack.Screen
                name={APP_SCREEN.PROFILE}
                component={Profile}
            />
        </BottomStack.Navigator>
    );
};
