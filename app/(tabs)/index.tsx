import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

type NewsItem = {
  article_id: string;
  title: string;
  pubDate?: string;
  image_url?: string;
};
const NEWS_API_KEY = "your api"
export default function AllNewsScreen() {
  const [articles, setArticles] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://newsdata.io/api/1/latest?apikey=${NEWS_API_KEY}&country=bd&language=en`
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
          renderItem={({ item }) => (
            <View className={`mb-4 p-4 rounded-2xl shadow text-gray-200 bg-gray-800`}>
              {item.image_url && (
                <Image
                  source={{ uri: item.image_url }}
                  className="w-full h-48 rounded-xl mb-3"
                  resizeMode="cover"
                />
              )}
              <Text className={`text-lg font-semibold mb-1 text-gray-200`}>
                {item.title}
              </Text>
              <Text className={`text-sm text-gray-200`}>
                {item.pubDate?.split(" ")[0] || ""}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
