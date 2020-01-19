import React, { useEffect, useState } from "react";
import { StyleSheet, Image, View, Text } from "react-native";
import {
  requestPermissionsAsync,
  getCurrentPositionAsync
} from "expo-location";

import MapView, { Marker, Callout } from "react-native-maps";

function Main() {
  const [currentRegion, setCurrentRegion] = useState(null);
  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        });
      }
    }

    loadInitialPosition();
  }, []);

  if (!currentRegion) {
    return null;
  }
  return (
    <MapView initialRegion={currentRegion} style={styles.map}>
      <Marker coordinate={{ latitude: -23.7295418, longitude: -46.559246 }}>
        <Image
          style={styles.avatar}
          source={{
            uri: "https://avatars1.githubusercontent.com/u/910377?s=460&v=4"
          }}
        />
        <Callout>
          <View style={styles.callout}>
            <Text style={styles.devName}>Gustavo Martusewicz</Text>
            <Text style={styles.devBio}>CTO em lorem lor, iasd, dasda</Text>
            <Text style={styles.devTechs}>ReactJS, React Native, NodeJS</Text>
          </View>
        </Callout>
      </Marker>
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: "#ffffff"
  },
  callout: {
    width: 260
  },
  devName: {
    fontWeight: "bold",
    fontSize: 16
  },
  devBio: {
    color: "#666666",
    marginTop: 5
  },
  devTechs: {
    marginTop: 5
  }
});

export default Main;
