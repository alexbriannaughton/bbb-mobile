import { Stack, useRouter, useSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { SText } from "../../../../components/SText";
import { ScreenWrapper } from "../../../../components/ScreenWrapper";

import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../lib/supabase-service";

export default function ImageDetail() {
  const router = useRouter();
  const { bathroom } = useSearchParams();
  const [bathroomData, setBathroomData] = useState();

  //   (tabs)/(bathrooms)/bathrooms/234509872346509872345609873450

  // const { isLoading, isError, data, error, isFetching, isPreviousData } =
  //   useQuery(["bathrooms", id], async () => {
  //     const { data, error } = await supabase
  //       .from("bathrooms")
  //       .select("*")
  //       .eq("id", id);

  //     setBathroomData(data as any);
  //     return data;
  //   });

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("bathrooms")
        .select("*")
        .eq("id", bathroom);

      setBathroomData(data as any);
      return data;
    })();
  }, []);

  console.log("id", bathroom);

  return (
    <ScreenWrapper>
      <Stack.Screen
        options={{
          headerShown: true,
          headerBackTitleStyle: {
            fontFamily: "SpaceMono",
          },
          headerTitle: "",
        }}
      />
      <SText variant="body">{JSON.stringify(bathroom)}</SText>
      <SText variant="body">{bathroomData && JSON.stringify(bathroomData[0], null, 2)}</SText>
    
    </ScreenWrapper>
  );
}
