import { NewsCard } from '@/components/helpers/NewsCard';
import Constants from 'expo-constants';
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
type NewsItem = {
  article_id: string;
  title: string;
  pubDate?: string;
  image_url?: string;
  [key: string]: any;
};
const apiKey = Constants.expoConfig?.extra?.NEWS_API_KEY;

export default function AllNewsScreen() {
  const [articles, setArticles] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://newsdata.io/api/1/latest?apikey=${apiKey}&country=bd&language=bn`
    )
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.results || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);


  return (
    <View className={`flex-1 px-4 pt-12 bg-black`}>
      <Text className={`text-2xl font-bold mb-4 mt-4 text-center text-gray-200`}>
        News BD
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#22d3ee" />
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item) => item.article_id}
          renderItem={({ item }) => <NewsCard item={item}/>}
        />
      )}
    </View>
  );
}
