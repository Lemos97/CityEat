import React from "react";
import {
  StyleSheet,
  Text,
  View,
  CheckBox,
  Button,
  Dimensions,
  Image,
  WebView,
  Linking
} from "react-native";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import * as data from "../data.json";
import Colors from "../consts/Colors";
import Touchable from "react-native-platform-touchable";

export default class RestaurantScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: Colors.white,
        height: 80
      },
      headerLeft: (
        <Touchable onPress={() => navigation.goBack()}>
          <Image
            source={require("../imgs/back.png")}
            style={{
              width: 40,
              height: 40,
              marginLeft: 15,
              resizeMode: "contain"
            }}
          />
        </Touchable>
      ),
      headerTitle: (
        <Image
          style={{
            width: Dimensions.get("window").width - 110,
            padding: 5,
            height: 50
          }}
          source={require("../imgs/banner.png")}
        />
      )
      //   headerRight: (
      //     <Touchable onPress={() => navigation.navigate("settings")}>
      //       <Image
      //         source={require("../imgs/options.png")}
      //         style={{
      //           width: 50,
      //           marginRight: 5,
      //           height: 50
      //         }}
      //       />
      //     </Touchable>
      //   )
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      show: null
    };
  }

  geoLocalization = morada => {
    const uri = `https://www.google.pt/maps/place/${morada.replace(" ", "+")}`;

    return (
      <WebView
        source={uri}
        ref={ref => {
          this.webview = ref;
        }}
        onNavigationStateChange={event => {
          if (event.url !== uri) {
            this.webview.stopLoading();
            Linking.openURL(event.url);
          }
        }}
      />
    );
  };

  flatListHeader = () => {
    return <Text style={styles.flatListHeader}>Pratos</Text>;
  };

  fullLotacao = (lotacao, livre) => {
    if (lotacao === livre) {
      return {
        color: Colors.errorText
      };
    } else if (livre < Math.round(lotacao * (1 / 4))) {
      return {
        color: Colors.warningText
      };
    } else {
      return {
        color: Colors.darkBlue
      };
    }
  };

  render() {
    const { navigation } = this.props;

    const restaurant = navigation.getParam("restaurantData");

    return (
      <ScrollView nestedScrollEnabled={true}>
        <View style={styles.container}>
          <View style={styles.row}>
            <View style={styles.col}>
              <Image
                source={{ uri: restaurant.foto }}
                style={{
                  width: "100%",
                  height: 70,
                  resizeMode: "center"
                }}
              />
            </View>

            <View style={styles.col}>
              <Text>{restaurant.nome}</Text>
              <Text>{restaurant.morada}</Text>
              <Text>{restaurant.contacto}</Text>
            </View>
          </View>

          <>
            <ScrollView>
              <View style={styles.row}>
                <View style={styles.col}>
                  <Text>Lotação do espaço</Text>
                  <Text
                    style={() =>
                      this.fullLotacao(
                        restaurant.lotacao,
                        restaurant.espacoLivre
                      )
                    }
                  >
                    {restaurant.lotacao}/{restaurant.espacoLivre}
                  </Text>
                </View>
                <View style={styles.col}>
                  <View style={styles.row}>
                    <Text>Acesso Mobilidade Reduzida </Text>
                    <CheckBox
                      value={restaurant.acessoMobilReduz}
                      style={{
                        color: restaurant.acessoMobilReduz ? "#006338" : "grey"
                      }}
                      disabled={true}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.col}>
                  <Text>Ambiente Friendly </Text>
                  <CheckBox value={restaurant.reutMat} disabled={true} />
                </View>
                <View style={styles.col}>
                  <View style={styles.row}>
                    <Text>Multibanco </Text>
                    <CheckBox value={restaurant.multibanco} disabled={true} />
                  </View>
                </View>
              </View>

              <FlatList
                data={restaurant.pratos}
                renderItem={({ item }) => (
                  <>
                    <Image
                      source={require("../imgs/dots.png")}
                      style={styles.dots}
                    />
                    <Text style={[styles.listElements]}>{item.nome}</Text>
                  </>
                )}
                keyExtractor={p => p.nome}
                numColumns={2}
                ListHeaderComponent={() => this.flatListHeader()}
                stickyHeaderIndices={[0]}
              />

              <View style={styles.footerGroup}>
                <Touchable
                  onPress={() => this.props.navigation.navigate("Modal")}
                >
                  <View>
                    <Image
                      source={require("../imgs/booking.png")}
                      style={{ width: 50, height: 50 }}
                    />
                    <Text>Reserva</Text>
                  </View>
                </Touchable>

                <Touchable
                  onPress={() => this.geoLocalization(restaurant.morada)}
                >
                  <View>
                    <Image
                      source={require("../imgs/nearby.png")}
                      style={{ width: 50, height: 50 }}
                    />
                    <Text>Geo-Localização</Text>
                  </View>
                </Touchable>
              </View>
            </ScrollView>
          </>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  dots: {
    width: 20,
    height: 20
  },
  listElements: {
    width: Math.round(Dimensions.get("window").width / 2) - 40,
    alignItems: "flex-start",
    padding: 5
  },
  flatListHeader: {
    fontWeight: "bold",
    padding: 5
  },
  flatListFooter: {
    fontWeight: "bold",
    padding: 15,
    marginTop: 5,
    alignSelf: "center",
    textAlign: "center",
    width: Math.round(Dimensions.get("window").width / 2),
    borderBottomColor: Colors.darkBlue,
    borderBottomWidth: 1
  },
  footerGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: Dimensions.get("window").width
  },
  footerButton: {
    flexDirection: "column",
    alignSelf: "center"
  }
});
