import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { APP_SCREEN, BottomStackParamList, ChatStackParamList } from './screenTypes';
import { Discover } from '@layouts/discover';
import { Search } from '@layouts/search';
import { Chat } from '@layouts/chat';
import { Profile } from '@layouts/profile';
import { Post } from '@layouts/post';
import { CustomBottomTab } from '@layouts/components/index';
import ChatDetail from '@layouts/chat/ChatDetail';

const BottomStack = createBottomTabNavigator<BottomStackParamList>();

const ChatStack = createStackNavigator<ChatStackParamList>();

export const ChatNavigation = () => (
    <ChatStack.Navigator
        initialRouteName={APP_SCREEN.CHAT}
        screenOptions={{ headerShown: false }}>
        <ChatStack.Screen name={APP_SCREEN.CHAT} component={Chat} />
        <ChatStack.Screen name={APP_SCREEN.CHAT_DETAIL} component={ChatDetail} />
    </ChatStack.Navigator>
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
                name={APP_SCREEN.DISCOVER}
                component={Discover}
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
