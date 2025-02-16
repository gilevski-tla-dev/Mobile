import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

const icons = {
  Home: require("@/shared/assets/icons/home.png"),
  Diagnostic: require("@/shared/assets/icons/diagnostic.png"),
  Camera: require("@/shared/assets/icons/camera.png"),
  MyPlants: require("@/shared/assets/icons/my-plants.png"),
  Profile: require("@/shared/assets/icons/profile.png"),
};

export function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const iconSource = icons[route.name];
        const isCamera = route.name === "Camera";

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={[styles.tabButton, isCamera && styles.cameraButton]}
          >
            <Image
              source={iconSource}
              style={[styles.tabIcon, isCamera && styles.cameraIcon]}
            />
            {!isCamera && (
              <Text
                style={[
                  styles.tabLabel,
                  { color: isFocused ? "#FFFFFF" : "#A0A0A0" },
                ]}
              >
                {label}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    height: 65,
    backgroundColor: "#343434",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 0,
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: "400",
    marginTop: 4,
  },
  cameraButton: {
    maxWidth: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#8B8B8B",
    top: "-50%",
  },
  cameraIcon: {
    width: 24,
    height: 24,
    tintColor: "#343434",
  },
});
