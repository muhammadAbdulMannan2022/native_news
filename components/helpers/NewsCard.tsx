// components/NewsCard.tsx
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

type NewsItem = {
  article_id: string;
  title: string;
  pubDate?: string;
  image_url?: string;
  [key: string]: any; // to support passing full object
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
    <View className="mb-4 p-4 rounded-2xl shadow bg-gray-800">
      {item.image_url && (
        <Image
          source={{ uri: item.image_url }}
          className="w-full h-48 rounded-xl mb-3"
          resizeMode="cover"
        />
      )}
      <Text className="text-lg font-semibold mb-1 text-gray-200">
        {item.title}
      </Text>
      <Text className="text-sm text-gray-400">
        {item.pubDate?.split(" ")[0] || ""}
      </Text>

      <TouchableOpacity
        onPress={handleReadMore}
        className="mt-3 self-start bg-red-600 px-4 py-2 rounded-full"
      >
        <Text className="text-white text-sm font-semibold">Read More</Text>
      </TouchableOpacity>
    </View>
  );
};
