import React from "react";
import {
  StyleSheet,
  Text,
  View,
  CheckBox,
  Button,
  Dimensions,
  TextInput
} from "react-native";
import Touchable from "react-native-platform-touchable";
import Colors from "../consts/Colors";

export default class BookingScreen extends React.Component {
  constructor(props) {
    super(props);

    this.setState({
      text: ""
    });
  }

  render() {
    const { navigation } = this.props;

    const data = navigation.getParam("data");

    return (
      <View style={styles.container}>
        <View>
          <TextInput
            onChangeText={text => this.setState({ text })}
            defaultValue={this.state.text}
          />
          <Touchable
            onPress={() =>
              alert(
                `Reservou, com o número de reserva ${Math.random() *
                  1000}, com o ${this.state.text} no restaurante ${data.nome}.`
              )
            }
          >
            <Text>Reservar</Text>
          </Touchable>
        </View>
        <Button onPress={() => navigation.goBack()} title="Dismiss" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  col: {
    width: Math.round(Dimensions.get("window").width / 2) - 20,
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 5,
    marginTop: 10
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start"
  }
});
