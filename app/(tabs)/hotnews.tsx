import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

import { NewsCard } from "@/components/helpers/NewsCard";
import Constants from "expo-constants";

type NewsItem = {
    url: string;           // NewsAPI uses `url` for article link (unique id fallback)
    title: string;
    publishedAt?: string;
    urlToImage?: string;
    [key: string]: any;
};

const apiKey = Constants.expoConfig?.extra?.NEWS_API_KEY;

export default function HotNewsScreen() {
    const [articles, setArticles] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHotNews = async () => {
            try {
                const res = await fetch(
                    `https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=${apiKey}`
                );
                const data = await res.json();

                // NewsAPI returns articles under `articles`
                setArticles(data.articles || []);
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
                    keyExtractor={(item) => item.url} // url is unique, used as key
                    renderItem={({ item }) => <NewsCard item={{
                        ...item,
                        article_id: item.url,
                        pubDate: item.publishedAt,
                        image_url: item.urlToImage,
                    }} />}
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
