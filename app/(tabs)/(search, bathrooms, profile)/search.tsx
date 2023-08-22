import * as Location from "expo-location";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { SView } from "../../../components/SView";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { useAuth } from "../../context/auth-supabase";

export default function SearchScreen() {
  const { user } = useAuth();
  const [currentLocation, setCurrentLocation] =
    useState<Location.LocationObjectCoords | null>(null);
  const [initialRegion, setInitialRegion] = useState<Region | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);

      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
    };

    getLocation();
  }, []);

  const markers = [
    {
      coordinate: {
        latitude: -34.603851,
        longitude: -58.381775,
      },
      title: "Obelisco",
      description:
        "The Obelisco is an iconic monument located in Buenos Aires, Argentina. Standing tall at the intersection of Avenida 9 de Julio and Avenida Corrientes, it serves as a symbol of the city and a tribute to its historical and cultural significance.",
    },
    {
      coordinate: {
        latitude: -34.6011,
        longitude: -58.3835,
      },
      title: "Teatro Colón",
      description:
        "Teatro Colón, also known as the Colon Theatre, is a world-renowned opera house situated in Buenos Aires, Argentina. With its stunning architecture and rich history, it is considered one of the finest opera houses globally, hosting exceptional performances and captivating audiences with its grandeur.",
    },
    // Add more markers as needed
  ];

  const renderMarkers = () => {
    return markers.map((marker, index) => (
      <Marker
        key={index}
        coordinate={marker.coordinate}
        title={marker.title}
        description={marker.description}
      />
    ));
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Search",
        }}
      />
      <ScreenWrapper>
        <Stack.Screen />
        <SView flex={1}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{ width: "100%", height: "100%" }}
            initialRegion={initialRegion}
            showsUserLocation={true}
          >
            {renderMarkers()}
          </MapView>
        </SView>
      </ScreenWrapper>
    </>
  );
}
