import { View, Text } from 'react-native';
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import { styles } from '../theme/theme';

interface TrendingMoviesProps {
    data: number[];
}

export default function TrendingMovies({ data }: TrendingMoviesProps) {
    return (
        <View>
            <Text style={styles.text}>Trending Movies</Text>
            <Carousel
                data={data}
                renderItem={({ item }: { item: number }) => <MovieCard item={item} />}
                firstItem={1}
                inactiveSlideOpacity={0.6}
                sliderWidth={600}
                itemWidth={400}
                slideStyle={{ display: 'flex', alignItems: 'center' }}
            />
        </View>
    );
}

const MovieCard = ({ item }: { item: number }) => {
    return (
        <View >
            <Text>Movie {item}</Text>
        </View>
    );
}