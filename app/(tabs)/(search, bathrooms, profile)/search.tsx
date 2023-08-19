import { Stack } from "expo-router";
import React from "react";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { SView } from "../../../components/SView";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { useAuth } from "../../context/auth-supabase";

export default function SearchScreen() {
  const { user } = useAuth();

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
            initialRegion={{
              latitude: -34.603738,
              longitude: -58.38157,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            {renderMarkers()}
          </MapView>
        </SView>
      </ScreenWrapper>
    </>
  );
}
