import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image, Dimensions } from "react-native";
import React from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";

var { width, height } = Dimensions.get('window');

export default function MovieList({ title, data }) {
    let movieName = 'Joker '
    const navigation = useNavigation();

    return (
        <View style={tw`mb-8 space-y-4`}>
            <View style={tw`mx-4 flex-row justify-between items-center`}>
                <Text style={tw`text-white text-xl`}>{title}</Text>
                <TouchableOpacity>
                    <Text style={tw`text-lg`} style={{ color: '#eab308' }}>See All</Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >
                {
                    data.map((item, index) => (
                        <TouchableWithoutFeedback key={index} onPress={() =>
                            navigation.navigate('Movie', item)}
                        >
                            <View style={tw`space-y-1 mr-4`}>
                                <Image
                                    source={require('../assets/imageMovie/imagePoster2.jpg')}
                                    style={{ width: width * 0.33, height: height * 0.22 }}
                                />
                                <Text style={tw`text-neutral-300 ml-1`}>
                                    {
                                        movieName.length > 14 ? movieName.slice(0,14) + '...' : movieName
                                    }
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ))
                }
            </ScrollView>
        </View>
    );
}