import React from 'react';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { APP_SCREEN, BottomStackParamList } from './screenTypes';
import Home from '@layouts/Home';
import Splash from '@layouts/Splash';
import { Welcome } from '@layouts/welcome';
import { Login } from '@layouts/login';
import { Register, RegisterStepTwo } from '@layouts/register';
import { Discover } from '@layouts/discover';
import { Search } from '@layouts/search';
import { Chat } from '@layouts/chat';
import { Profile } from '@layouts/profile';
import { Post } from '@layouts/post';
import { CustomBottomTab } from '@layouts/components/index';

const BottomStack = createBottomTabNavigator<BottomStackParamList>();


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
                name={APP_SCREEN.CHAT}
                component={Chat}
            />
            <BottomStack.Screen
                name={APP_SCREEN.PROFILE}
                component={Profile}
            />
        </BottomStack.Navigator>
    );
};
