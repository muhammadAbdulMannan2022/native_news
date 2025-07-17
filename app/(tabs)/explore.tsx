import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type NewsItem = {
  article_id: string;
  title: string;
  pubDate?: string;
  image_url?: string;
};

const apiKey = Constants.expoConfig?.extra?.NEWS_API_KEY;

export default function ExploreNewsScreen() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);

  const searchNews = async () => {
    if (!query.trim()) return;
    Keyboard.dismiss();
    setLoading(true);
    try {
      const safeQuery = encodeURIComponent(query.trim());
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${safeQuery}&language=en&sortBy=publishedAt&apiKey=${apiKey}`
      );
      const data = await res.json();

      const mapped = (data.articles || []).map((item: any, index: number) => ({
        article_id: item.url || index.toString(),
        title: item.title,
        pubDate: item.publishedAt,
        image_url: item.urlToImage,
      }));

      setArticles(mapped);
    } catch (e) {
      console.error("Search error:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 px-4 pt-12 bg-black">
      <Text className="text-2xl font-bold mb-4 mt-4 text-center text-gray-200">
        Search News
      </Text>

      <View className="flex-row items-center mb-4 bg-gray-800 rounded-full px-4 py-2">
        <Ionicons name="search" size={20} color="white" />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search something..."
          placeholderTextColor="#aaa"
          onSubmitEditing={searchNews}
          className="flex-1 ml-2 text-white"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery("")}>
            <Ionicons name="close-circle" size={20} color="white" />
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#22d3ee" />
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item) => item.article_id}
          renderItem={({ item }) => (
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
                {item.pubDate?.split("T")[0] || ""}
              </Text>
            </View>
          )}
          ListEmptyComponent={
            query.length > 0 && !loading ? (
              <Text className="text-center text-gray-500 mt-8">No results found.</Text>
            ) : null
          }
        />
      )}
    </View>
  );
}
