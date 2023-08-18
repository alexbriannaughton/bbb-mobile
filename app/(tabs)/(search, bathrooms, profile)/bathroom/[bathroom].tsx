import { Stack, useRouter, useSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { SText } from "../../../../components/SText";
import { ScreenWrapper } from "../../../../components/ScreenWrapper";

import { supabase } from "../../../lib/supabase-service";

export default function ImageDetail() {
  const router = useRouter();
  const { id } = useSearchParams();
  const [bathroomData, setBathroomData] = useState();

//   (tabs)/(bathrooms)/bathrooms/234509872346509872345609873450

  // const { isLoading, isError, data, error, isFetching, isPreviousData } =
  // useQuery(["tasks", id], async () => {
  //   const { data, error } = await supabase
  //     .from("Tasks")
  //     .select("*")
  //     .eq("id", id);

  //     setBathroomData(data as any);
  //   return data;
  // });

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("bathrooms")
        .select("*")
        .eq("id", id);

      setBathroomData(data as any);
      return data;
    })();
  }, []);

  return (
    <ScreenWrapper>
      <Stack.Screen options={{ title: "Bathroom Detail", headerShown: true }} />
      <SText>{JSON.stringify(id)}</SText>
      <SText>{bathroomData && JSON.stringify(bathroomData[0], null, 2)}</SText>
      <SText
        onPress={() => {
          // Go back to the previous screen using the imperative API.
          router.back();
        }}
      >
        GO BACK
      </SText>
    </ScreenWrapper>
  );
}
