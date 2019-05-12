import React from "react";
import { ImageBackground, StyleSheet, SafeAreaView } from "react-native";

export default class BackgroundImage extends React.Component {
  render() {
    return (
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../imgs/background.png")}
      >
        <SafeAreaView
          style={styles.safeArea}
          forceInset={{ top: "always", bottom: "always" }}
        >
          {this.props.children}
        </SafeAreaView>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%"
  },
  safeArea: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "transparent"
  }
});
