import React from "react";
import {
  StyleSheet,
  Text,
  View,
  CheckBox,
  Button,
  Dimensions,
  Image
} from "react-native";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import * as data from "../data.json";
import Colors from "../consts/Colors";
import Touchable from "react-native-platform-touchable";

export default class RestaurantsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: Colors.white,
        height: 80
      },
      headerTitle: (
        <Image
          style={{
            width: Dimensions.get("window").width - 110,
            padding: 5,
            height: 50,
            marginLeft: 55
          }}
          source={require("../imgs/banner.png")}
        />
      )
      // ,
      // headerRight: (
      //   <Touchable onPress={() => navigation.navigate("settings")}>
      //     <Image
      //       source={require("../imgs/options.png")}
      //       style={{
      //         width: 50,
      //         marginRight: 5,
      //         height: 50
      //       }}
      //     />
      //   </Touchable>
      // )
    };
  };

  state = {
    show: null
  };

  flatListHeader = () => {
    return <Text style={styles.flatListHeader}>Pratos Recomendados</Text>;
  };

  flatListFooter = r => {
    return (
      <Touchable onPress={() => this.goToRestaurant(r)} style={{ height: 50 }}>
        <Text style={styles.flatListFooter}>Saiba mais...</Text>
      </Touchable>
    );
  };

  componentDidUpdate(_, prevState) {
    if (prevState.show === this.state.show) {
      this.setState({
        show: null
      });
    }
  }

  goToRestaurant = r => {
    console.log(r);
    this.props.navigation.navigate("Restaurant", { restaurantData: r });
  };

  open = i => {
    this.setState({
      show: i
    });
  };

  render() {
    const { show } = this.state;
    console.log(this.props.navigation.state);
    return (
      // <BackgroundImage>
      <ScrollView nestedScrollEnabled={true}>
        {data.restaurantes.map((r, i) => {
          return (
            <Touchable key={i} onPress={() => this.open(i)}>
              <View style={styles.container}>
                <View style={styles.row}>
                  <View style={styles.col}>
                    <Image
                      source={{ uri: r.foto }}
                      style={{
                        width: "100%",
                        height: 70,
                        resizeMode: "center"
                      }}
                    />
                  </View>

                  <View style={styles.col}>
                    <Text>{r.nome}</Text>
                    <Text>{r.morada}</Text>
                    <Text>{r.contacto}</Text>
                  </View>
                </View>

                {show == i ? (
                  <>
                    <Image
                      source={require("../imgs/collapse.png")}
                      style={{
                        width: 50,
                        height: 50,
                        resizeMode: "contain",
                        alignSelf: "flex-end"
                      }}
                    />
                    <ScrollView>
                      <View style={styles.row}>
                        <View style={styles.col}>
                          <Text>
                            Lotação do espaço {r.lotacao}/{r.espacoLivre}
                          </Text>
                        </View>
                        <View style={styles.col}>
                          <View style={styles.row}>
                            <Text>Acesso Mobilidade Reduzida </Text>
                            <CheckBox
                              value={r.acessoMobilReduz}
                              disabled={true}
                            />
                          </View>
                        </View>
                      </View>
                      <View style={styles.row}>
                        <View style={styles.col}>
                          <Text>Ambiente Friendly </Text>
                          <CheckBox value={r.reutMat} disabled={true} />
                        </View>
                        <View style={styles.col}>
                          <View style={styles.row}>
                            <Text>Multibanco </Text>
                            <CheckBox value={r.multibanco} disabled={true} />
                          </View>
                        </View>
                      </View>

                      <FlatList
                        data={r.pratos.filter(p => p.recomendados === true)}
                        renderItem={({ item }) => (
                          <>
                            <Image
                              source={require("../imgs/dots.png")}
                              style={styles.dots}
                            />
                            <Text style={[styles.listElements]}>
                              {item.nome}
                            </Text>
                          </>
                        )}
                        keyExtractor={p => p.nome}
                        numColumns={2}
                        ListHeaderComponent={() => this.flatListHeader()}
                        ListFooterComponent={() => this.flatListFooter(r)}
                        stickyHeaderIndices={[0]}
                      />
                      {/* // {r.pratos.map((p, j) => {
                      //   return p.recomendados ? (


                      //     <View
                      //       key={j}
                      //       style={{
                      //         alignSelf: j % 2 === 0 ? "flex-start" : "flex-end"
                      //       }}
                      //     >
                      //       <Text>{p.nome}</Text>
                      //     </View>
                      //   ) : null;
                      // })}*/}
                    </ScrollView>
                  </>
                ) : (
                  <Image
                    source={require("../imgs/expand.png")}
                    style={{
                      width: 50,
                      height: 50,
                      resizeMode: "contain",
                      alignSelf: "flex-end"
                    }}
                  />
                )}
              </View>
            </Touchable>
          );
        })}
      </ScrollView>
      // </BackgroundImage>
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
  }
});
