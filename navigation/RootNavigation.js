import React from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";

import SplashScreen from "../screens/SplashScreen";
import RestaurantsScreen from "../screens/RestaurantsScreen";
import RestaurantScreen from "../screens/RestaurantScreen";
import BookingScreen from "../screens/BookingScreen";

const RootStackNavigator = createStackNavigator(
  {
    Restaurants: { screen: RestaurantsScreen },
    Restaurant: { screen: RestaurantScreen }
  },
  {
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0]
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1]
        });

        return { opacity, transform: [{ translateY }] };
      }
    })
  }
);

const InitialNavigator = createSwitchNavigator(
  {
    SplashScreen: { screen: SplashScreen },
    App: {
      screen: RootStackNavigator
    },
    Modal: {
      screen: BookingScreen
    }
  },
  {
    mode: "modal"
  },
  {
    transitionConfig: () => ({
      transitionSpec: {
        duration: 2000,
        easing: Easing.out(Easing.ease)
      },
      screenInterpolator: sceneProps => {
        const { position, scene } = sceneProps;
        const { index } = scene;

        const sceneRange = [index - 1, index];
        const outputOpacity = [0, 1];

        const transition = position.interpolate({
          inputRange: sceneRange,
          outputRange: outputOpacity
        });

        return { opacity: transition };
      }
    })
  }
);

export default (RootNavigator = createAppContainer(InitialNavigator));
