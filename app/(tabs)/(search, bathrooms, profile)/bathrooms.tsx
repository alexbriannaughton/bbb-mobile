import { Stack, useRouter } from "expo-router";
import { ScreenWrapper, Spacer } from "../../../components";
import { useAuth } from "../../context/auth-supabase";
import { supabase } from "../../lib/supabase-service";
// @ts-ignore
import { useQuery } from "@tanstack/react-query";
import MyBathroomsList from "./components/MyBathroomsList";

type Group<T extends string> = `(${T})`;

type SharedSegment = Group<"bathrooms"> | Group<"search"> | Group<"profile">;

export default function BathroomScreen() {
  const { user, segments } = useAuth();
  const router = useRouter();

  const bathroomFetcher = async () => {
    const { data, error } = await supabase.from("bathrooms").select("*");
    if (error) throw error;
    return data;
  };

  const { isLoading, isError, data, error, isFetching, isPreviousData } =
    useQuery(["bathrooms"], () => bathroomFetcher(), {
      keepPreviousData: true,
    });

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "My Bathrooms",
        }}
      />
      <ScreenWrapper>
        <Spacer size="hs" />
        <MyBathroomsList
          files={data}
          onItemClick={(id: string) =>
            router.push(`(tabs)/${segments[1]}/bathroom/${id}`)
          }
        />
      </ScreenWrapper>
    </>
  );
}
