import React from "react";
import { StyleSheet, Image, View } from "react-native";
import BackgroundImage from "../components/BackgroundImage";
import Colors from "../consts/Colors";

class SplashScreen extends React.Component {
  state = {
    isLoading: true
  };

  performTimeConsumingTask = () => {
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 5000);
  };

  async componentDidMount() {
    this.performTimeConsumingTask();
  }

  componentDidUpdate(_, prevState) {
    if (
      prevState.isLoading !== this.state.isLoading &&
      this.state.isLoading === false
    ) {
      this.props.navigation.navigate("Restaurants");
    }
  }

  render() {
    return (
      <BackgroundImage>
        <View style={styles.container}>
          <Image
            style={styles.welcome}
            source={require("../imgs/welcome.png")}
          />
        </View>
      </BackgroundImage>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center"
  },

  welcome: {
    // textAlign: "center",
    // textAlignVertical: "center",

    marginTop: 250,
    width: 200,
    height: 50,
    resizeMode: "stretch"
  },

  button: {
    borderColor: Colors.lightBlue,
    borderWidth: 1,
    borderRadius: 1
  },

  buttonText: {
    color: Colors.white,
    padding: 15
  }
});

export default SplashScreen;
