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

const { width, height } = Dimensions.get('window');

export default function MovieScreen() {
    const navigation = useNavigation();
    const { params: item } = useRoute();
    const [isFavorite, setIsFavorite] = React.useState(false);
    const movieName = 'The Last of Us';
    const [cast, setCast] = React.useState([1,2,3,4,5]);
    const [similarMovies, setSimilarMovies] = React.useState([1,2,3,4,5]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Add logic here if needed
    }, [item]);

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            style={tw`flex-1 bg-neutral-900`}
        >
            <View style={tw`w-full`}>
                {/* Header */}
                <SafeAreaView style={tw`absolute z-20 w-full flex-row justify-between items-center px-4`}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={[tw`rounded-xl p-1`, styles.background]}
                    >
                        <ChevronLeftIcon size={30} strokeWidth={2.5} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
                        <HeartIcon size={40} color={isFavorite ? theme.background : "white"} />
                    </TouchableOpacity>
                </SafeAreaView>
                {
                    loading ? (
                        <Loading />
                    ): (
                        <View>
                            <Image
                                source={require('../assets/imageMovie/TheLastofUs.jpg')}
                                style={{ width, height: height * 0.55 }}
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

                {/* Movie Poster */}

            </View>

            {/* Movie Details */}
            <View style={[tw`mt-8 space-y-4`, { paddingHorizontal: 16 }]}>
                {/* Movie Name */}
                <Text style={tw`text-white text-center text-3xl font-bold tracking-wider`}>
                    {movieName}
                </Text>

                {/* Status, Release, Runtime */}
                <Text style={tw`text-neutral-400 font-semibold text-base text-center mt-2`}>
                    Released ◦ 2023 ◦ 50min
                </Text>

                {/* Genre */}
                <View style={tw`flex-row justify-center space-x-2 mt-2`}>
                    {['Action', 'Survival', 'Zombie Horror'].map((genre, index) => (
                        <Text key={index} style={tw`text-neutral-400 font-semibold text-base`}>
                            {genre} {index < 2 && '◦'}
                        </Text>
                    ))}
                </View>

                {/* Description */}
                <Text style={tw`text-neutral-400 tracking-wide mt-2`}>
                    20 years after modern civilization has been destroyed, Joel, a hardened survivor, is hired to smuggle Ellie, a 14-year-old girl, out of an oppressive quarantine zone. What starts as a small job soon becomes a brutal, heartbreaking journey as they both must traverse the U.S. and depend on each other for survival.
                </Text>
            </View>
            {/* cast */}
            <Casts navigation={navigation} cast={cast}/>
            {/* similar movies */}
            <MovieList title={"Similar Movies"} hideSeeAll={true} data={similarMovies} />
        </ScrollView>
    );
}