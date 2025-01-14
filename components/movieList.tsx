import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    TouchableWithoutFeedback,
    Image,
    Dimensions
} from "react-native";
import React from "react";
import tw from "twrnc";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import {image185} from "../api/moviedb";

// Define your RootParamList type
type RootParamList = {
    Movie: { id: number; name: string; posterUrl: string; }; // Add other routes if necessary
};

const { width, height } = Dimensions.get('window');

interface MovieListProps {
    title: string;
    data: Array<{ id: number; name: string; posterUrl: string; }>;
    hideSeeAll?: boolean;
}

export default function MovieList({ title, data, hideSeeAll }: MovieListProps) {
    const navigation = useNavigation<NavigationProp<RootParamList>>();

    return (
        <View style={tw`mb-8 space-y-4`}>
            <View style={tw`mx-4 flex-row justify-between items-center`}>
                <Text style={tw`text-white text-xl mb-2`}>{title}</Text>
                {
                    !hideSeeAll && (
                        <TouchableOpacity>
                            <Text style={{ color: '#eab308' }}>See All</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
            <ScrollView
                horizontal
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >
                {data.map((item, index) => (
                    <TouchableWithoutFeedback
                        key={index}
                        onPress={() => navigation.push('Movie', item)}
                    >
                        <View style={tw`space-y-1 mr-4`}>
                            <Image
                                source={{uri: image185(item.poster_path)}}
                                style={{ width: width * 0.33, height: height * 0.22 }}
                            />
                            <Text style={tw`text-neutral-300 ml-1`}>
                                {item.title.length > 20 ? item.title.slice(0, 20) + '...' : item.title}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                ))}
            </ScrollView>
        </View>
    );
}