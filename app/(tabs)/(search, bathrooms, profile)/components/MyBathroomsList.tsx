import { useSegments } from "expo-router";
import { useCallback } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Avatar, Card, IconButton } from "react-native-paper";
import { SText } from "../../../../components/SText";
import { Spacer } from "../../../../components/Spacer";

export default function MyTaskList({
  files,
  onItemClick,
}: {
  files: any;
  onItemClick: any;
}) {
  /**
   *
   * @param param0
   * @returns
   */
  const Item = useCallback(
    ({ item }: any) => {
      return (
        <Card onPress={() => onItemClick(item.id)}>
          <Card.Title
            title={<SText>{item.location_name}</SText>}
            subtitle={<SText>{item.address}</SText>}
            left={(props) => <Avatar.Icon {...props} icon="toilet" />}
            right={(props) => (
              <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
            )}
          />
        </Card>
      );
    },
    [onItemClick]
  );

  return (
    <FlatList
      data={files}
      renderItem={({ item }) => <Item item={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <Spacer size="hxs" />}
      showsVerticalScrollIndicator={false}
      initialNumToRender={10}
    />
  );
}

const styles = StyleSheet.create({});
