import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

type NewsItem = {
  article_id: string;
  title: string;
  pubDate?: string;
  image_url?: string;
  source?: { name?: string };
  description?: string;
  [key: string]: any;
};

export const NewsCard = ({ item }: { item: NewsItem }) => {
  const router = useRouter();

  const handleReadMore = () => {
    router.push({
      pathname: "/details",
      params: { data: JSON.stringify(item) },
    });
  };

  return (
    <View className="mb-4 p-4 rounded-2xl bg-gray-800 shadow-md">
      {item.image_url ? (
        <Image
          source={{ uri: item.image_url }}
          className="w-full h-48 rounded-xl mb-3 bg-gray-700"
          resizeMode="cover"
        />
      ) : (
        <View className="w-full h-48 rounded-xl mb-3 bg-gray-700 justify-center items-center">
          <Text className="text-gray-400 text-sm">No image available</Text>
        </View>
      )}

      <Text className="text-lg font-semibold text-gray-100 mb-1">
        {item.title}
      </Text>

      {item.description && (
        <Text className="text-sm text-gray-300 mb-2" numberOfLines={3}>
          {item.description}
        </Text>
      )}

      <View className="flex-row justify-between items-center">
        <Text className="text-xs text-gray-400">
          {item.pubDate?.split("T")[0] || "Unknown date"}
        </Text>
        {item.source?.name && (
          <Text className="text-xs text-gray-500 italic">{item.source.name}</Text>
        )}
      </View>

      <TouchableOpacity
        onPress={handleReadMore}
        className="mt-4 self-start bg-red-600 px-4 py-2 rounded-full"
      >
        <Text className="text-white text-sm font-semibold">Read More</Text>
      </TouchableOpacity>
    </View>
  );
};
