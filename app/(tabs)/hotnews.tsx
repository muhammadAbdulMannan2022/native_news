import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

import { NewsCard } from "@/components/helpers/NewsCard";
import Constants from "expo-constants";

type NewsItem = {
  article_id: string;
  title: string;
  pubDate?: string;
  image_url?: string;
  [key: string]: any;
};

export default function HotNewsScreen() {
  const [articles, setArticles] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotNews = async () => {
      try {
        const res = await fetch(
          `https://newsdata.io/api/1/latest?apikey=${Constants.expoConfig.extra.NEWS_API_KEY}&country=bd&language=bn`
        );
        const data = await res.json();
        setArticles(data.results || []);
      } catch (e) {
        console.error("Hot news fetch error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchHotNews();
  }, []);

  return (
    <View className="flex-1 px-4 pt-12 bg-black">
      <Text className="text-2xl font-bold text-center text-red-500 mb-6">
        Hot News
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#ef4444" />
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item) => item.article_id}
          renderItem={({ item }) => <NewsCard item={item} />}
          ListEmptyComponent={
            <Text className="text-center text-gray-500 mt-8">
              No hot news found.
            </Text>
          }
        />
      )}
    </View>
  );
}
