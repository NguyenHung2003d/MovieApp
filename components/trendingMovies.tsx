import { View, Text, TouchableWithoutFeedback, Dimensions, Image } from 'react-native';
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import {image500} from "../api/moviedb";

var { width, height } = Dimensions.get('window');

export default function TrendingMovies({ data }) {
    const navigation = useNavigation();

    const handleClick = (item) => {
        navigation.navigate('Movie', item);
    };

    return (
        <View style={tw`mb-8`}>
            <Text style={tw`text-white text-lg mb-4 ml-4`}>Trending</Text>
            <Carousel
                data={data}
                renderItem={({ item }) => <MovieCard item={item} handleClick={handleClick} />}
                firstItem={1}
                inactiveSlideOpacity={0.6}
                sliderWidth={width}
                itemWidth={width * 0.62}
                slideStyle={{ display: 'flex', alignItems: 'center' }}
            />
        </View>
    );
}

const MovieCard = ({ item, handleClick }) => {
    return (

        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            <View style={{ borderRadius: 24, overflow: 'hidden' }}>
                <Image
                    source={{uri: image500(item.poster_path)}}
                    style={{
                        width: width * 0.6,
                        height: height * 0.4,
                    }}
                />
            </View>
        </TouchableWithoutFeedback>
    );
};