import React, {useEffect, useState} from 'react';
import { View, Text, Platform, SafeAreaView, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'twrnc';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/mini';
import { styles } from "../theme/theme";
import TrendingMovies from "../components/trendingMovies";
import MovieList from "../components/movieList";
import {useNavigation} from "@react-navigation/native";
import Loading from "../components/loading";
import {fetchRatedMovies, fetchTrendingMovies, fetchUpcomingMovies} from "../api/moviedb";

const ios = Platform.OS === 'ios';

const App: React.FC = () => {
    const [trending, setTrending] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [topRated, setTopRate] = useState([]);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTrendingMovies()
        getUpComingMovies()
        getTopRatedMovies()
    }, []);

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();
        if (data && data.results) setTrending(data.results);
        setLoading(false);
    }

    const getUpComingMovies = async () => {
        const data = await fetchUpcomingMovies();
        if (data && data.results) setUpcoming(data.results);
    }

    const getTopRatedMovies = async () => {
        const data = await fetchRatedMovies();
        if (data && data.results) setTopRate(data.results);
    }

    return (
        <View style={tw`flex-1 bg-neutral-800`}>
            <SafeAreaView style={tw`${ios ? 'mb-2' : 'mb-3'}`}>
                <StatusBar barStyle="light-content" />
                <View style={tw`flex-row justify-between items-center mx-4`}>
                    <Bars3CenterLeftIcon size={30} strokeWidth={2} color="white" />
                    <Text style={tw`text-white text-3xl font-bold`}>
                        <Text style={styles.text}>M</Text>ovies
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            {
                loading ? (
                    <Loading/>
                ): (
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 5 }}>
                        {trending.length > 0 && <TrendingMovies data={trending} />}
                        <MovieList title="Trending Movies" data={upcoming} />
                        <MovieList title="Top Rated" data={topRated} />
                    </ScrollView>
                )
            }
        </View>
    );
};

export default App;