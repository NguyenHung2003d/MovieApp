import {
    Image,
    Dimensions,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    View,
    Text
} from "react-native";
import React, {useEffect, useState} from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import tw from "twrnc";
import { ChevronLeftIcon } from "react-native-heroicons/mini";
import { styles, theme } from "../theme/theme";
import { HeartIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";
import Casts from "../components/casts";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import {fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500} from "../api/moviedb";

const { width, height } = Dimensions.get('window');

export default function MovieScreen() {
    const navigation = useNavigation();
    const { params: item } = useRoute();
    const [isFavorite, setIsFavorite] = React.useState(false);
    const [cast, setCast] = React.useState([]);
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState({})
    const [similarMovies, setSimilarMovies] = useState([]);

    useEffect(() => {
        setLoading(true);
        getMovieDetails(item.id);
        getMovieCredits(item.id);
        getSimilarMovies(item.id);
    }, [item]);

    const getMovieDetails = async id => {
        const data = await fetchMovieDetails(id);
        // console.log("Get Movie details:", data);
        setLoading(false);
        if (data) setMovie(data)
        // console.error("Error fetching movie details:", error);
    }

    const getMovieCredits = async id => {
        const data = await fetchMovieCredits(id);
        // console.log('got credit', data)
        if (data && data.cast) setCast(data.cast)
    }

    const getSimilarMovies = async id => {
        const data = await fetchSimilarMovies( id);
        // console.log('got similar: ', data)
        if (data && data.results) setSimilarMovies(data.results)
    }

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            style={tw`flex-1 bg-neutral-900`}
        >
            <View style={tw`w-full`}>
                {/* Header */}
                <SafeAreaView style={tw`absolute z-20 w-full flex-row justify-between items-center px-4`}>
                    <TouchableOpacity
                        onPress={() => {
                            console.log("Back button pressed");
                            navigation.goBack();
                        }}
                        style={[tw`rounded-xl p-1`, styles.background]}
                    >
                        <ChevronLeftIcon size={30} strokeWidth={2.5} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setIsFavorite(!isFavorite);
                        console.log("Favorite status toggled:", !isFavorite);
                    }}>
                        <HeartIcon size={40} color={isFavorite ? theme.background : "white"} />
                    </TouchableOpacity>
                </SafeAreaView>
                {
                    loading ? (
                        <Loading />
                    ): (
                        <View>
                            <Image
                                source={{uri: image500(movie?.poster_path)}}
                                style={{ width, height: height * 0.55 }}
                                onLoad={() => console.log("Image loaded successfully")}
                                onError={(error) => console.error("Image load error:", error)}
                            />
                            <LinearGradient
                                colors={['transparent', 'rgba(23,23,23,0.7)', 'rgba(23,23,23,1)']}
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    width: width,
                                    height: height * 0.4
                                }}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 0.5, y: 1 }}
                            />
                        </View>
                    )
                }
            </View>

            {/* Movie Details */}
            <View style={[tw`mt-8 space-y-4`, { paddingHorizontal: 16 }]}>
                {/* Movie Name */}
                <Text style={tw`text-white text-center text-3xl font-bold tracking-wider`}>
                    {movie?.title}
                </Text>

                {/* Status, Release, Runtime */}
                {
                    movie?.id?(
                        <Text style={tw`text-neutral-400 font-semibold text-base text-center mt-2`}>
                            {movie?.status} ◦ {movie?.release_date?.split('-')[0]} ◦ {movie?.runtime} min
                        </Text>
                    ):null
                }

                {/* Genre */}
                <View style={tw`flex-row justify-center space-x-2 mt-2`}>
                    {
                        movie?.genres?.map((genre, index) => {
                            let showDot = index + 1 != movie.genres.length
                            return (
                                <Text key={index} style={tw`text-neutral-400 font-semibold text-base text-center`}>
                                    {genre.name} {showDot? "•" : null}
                                </Text>
                            )
                        })
                    }
                </View>

                {/* Description */}
                <Text style={tw`text-neutral-400 tracking-wide mt-2`}>
                    {
                        movie?.overview
                    }
                </Text>
            </View>
            {/* cast */}
            <Casts navigation={navigation} cast={cast}/>
            {/* similar movies */}
            <MovieList title={"Similar Movies"} hideSeeAll={true} data={similarMovies} />
        </ScrollView>
    );
}