import { Ionicons } from "@expo/vector-icons"; // or any other icon library
import { ResizeMode, Video } from "expo-av";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function NewsDetailsScreen() {
  const { data } = useLocalSearchParams();
  const navigation = useNavigation();

  if (!data) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Text className="text-white">No data found.</Text>
      </View>
    );
  }

  let newsItem;
  try {
    newsItem = JSON.parse(data as string);
  } catch (e) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Text className="text-white">Failed to load data.</Text>
      </View>
    );
  }

  const screenWidth = Dimensions.get("window").width;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: {
        backgroundColor: "black",
      },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ paddingLeft: 16 }}
          className="flex flex-row items-center justify-center gap-2"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
          <Text className="text-white">Back</Text>
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <View style={{ flex: 1, alignItems: "flex-end", paddingRight: 16 }}>
          <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
            News Details
          </Text>
        </View>
      ),
    });
  }, [navigation]);


  return (
    <ScrollView className="flex-1 px-4 py-6 bg-black">
      {newsItem.video_url ? (
        <Video
          source={{ uri: newsItem.video_url }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          style={{
            width: screenWidth - 32,
            height: 200,
            borderRadius: 12,
            marginBottom: 16,
          }}
        />
      ) : newsItem.image_url ? (
        <Image
          source={{ uri: newsItem.image_url }}
          className="w-full h-60 rounded-xl mb-4"
          style={{ width: screenWidth - 32, height: 200 }}
        />
      ) : null}

      <Text className="text-2xl font-bold text-white mb-2">
        {newsItem.title}
      </Text>
      <Text className="text-sm text-gray-400 mb-4">{newsItem.pubDate}</Text>
      <Text className="text-base text-gray-300 leading-6 mb-4">
        {newsItem.description || "No description available."}
      </Text>
      <Text className="text-base text-gray-400 italic">
        Source: {newsItem.source_url || "Unknown"}
      </Text>
    </ScrollView>
  );
}
