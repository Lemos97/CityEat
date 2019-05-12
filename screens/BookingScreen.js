import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Button,
  Dimensions,
  TextInput
} from "react-native";
import Touchable from "react-native-platform-touchable";
import Colors from "../consts/Colors";

export default class BookingScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ""
    };
  }

  render() {
    const { data } = this.props;

    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.modalVisible}
          transparent={true}
          presentationStyle={"overFullScreen"}
        >
          <View style={styles.modalContainer}>
            <TextInput
              onChangeText={text => this.setState({ text })}
              placeholder={"Digite o seu Nome para marcação"}
              defaultValue={this.state.text}
            />
            <Touchable
              onPress={() => {
                if (this.state.text !== "") {
                  alert(
                    `Reservou, com o número de reserva ${Math.round(
                      Math.random() * 1000
                    )}, com o ${this.state.text} no restaurante ${data.nome}.`
                  );
                  setTimeout(() => this.props.setModalVisibility(false), 2500);
                } else {
                  alert("Necessita preencher o seu nome antes de reservar.");
                }
              }}
            >
              <Text style={styles.button}>Reservar</Text>
            </Touchable>
            <Touchable onPress={() => this.props.setModalVisibility(false)}>
              <Text style={styles.button}>Cancelar</Text>
            </Touchable>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 100,
    maxHeight: 100,
    height: 100,
    alignSelf: "stretch"
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.lightBlue,
    alignItems: "center"
  },
  input: {
    borderBottomColor: Colors.white,
    borderBottomWidth: 4,
    height: 50
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
  },
  button: {
    width: Math.round(Dimensions.get("window").width / 2) - 20,
    height: 50,
    marginTop: 15,
    backgroundColor: Colors.darkBlue,
    borderRadius: 15,
    paddingTop: 15,
    textAlign: "center",
    alignSelf: "stretch",
    color: Colors.white
  }
});
