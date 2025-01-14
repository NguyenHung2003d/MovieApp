import React, { useEffect, useState } from 'react';
import { Dimensions, Text, Platform, SafeAreaView, ScrollView, Image, TouchableOpacity, View } from 'react-native';
import tw from "twrnc";
import { styles } from "../theme/theme";
import { ChevronLeftIcon } from "react-native-heroicons/mini";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation, useRoute } from "@react-navigation/native";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import { fetchPersonDetails } from "../api/moviedb";

const { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const verticalMargin = ios ? {} : tw`my-3`;

export default function PersonScreen() {
    const { params: item } = useRoute();
    const navigation = useNavigation();
    const [isFavorite, setIsFavorite] = useState(false);
    const [personDetails, setPersonDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [personMovies, setPersonMovies] = useState([]);

    useEffect(() => {
        if (item && item.person && item.person.id) {
            console.log('Valid item and item.person.id:', item, item.person.id); // Log the values to debug
            setLoading(true);
            getPersonDetails(item.person.id);
        } else {
            console.error('Invalid item or item.person.id:', item); // Log the invalid values
        }
    }, [item]);

    const getPersonDetails = async id => {
        if (!id) {
            console.error('Invalid ID provided for fetching person details');
            return;
        }

        try {
            const data = await fetchPersonDetails(id);
            if (data) {
                console.log('getPersonDetails:', data);
                setPersonDetails(data);
                // Assuming data also contains the movies
                if (data.movies) {
                    setPersonMovies(data.movies);
                } else {
                    console.warn('No movies found for this person');
                }
            } else {
                console.error('Failed to fetch person details');
            }
        } catch (error) {
            console.error('Error fetching person details:', error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <ScrollView style={tw`flex-1 bg-neutral-900`} contentContainerStyle={{ paddingBottom: 20 }}>
            <SafeAreaView style={[tw`z-20 w-full flex-row justify-between items-center px-4`, verticalMargin]}>
                <View style={tw`flex-1 flex-row items-center justify-between`}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={[tw`rounded-lg p-1`, styles.background]}>
                        <ChevronLeftIcon size={30} strokeWidth={2.5} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
                        <HeartIcon size={40} color={isFavorite ? "red" : "white"} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {/* Person details */}
            {personDetails && (
                <View>
                    <View style={[
                        tw`flex-row justify-center`,
                        {
                            shadowColor: 'gray',
                            shadowRadius: 40,
                            shadowOffset: { width: 0, height: 5 },
                            shadowOpacity: 1,
                        }
                    ]}>
                        <View style={tw`items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500`}>
                            <Image
                                source={{ uri: `https://image.tmdb.org/t/p/w500/${personDetails.profile_path}` }}
                                style={{ height: height * 0.43, width: width * 0.74 }}
                            />
                        </View>
                    </View>
                    <View style={[tw`mt-6`]}>
                        <Text style={tw`text-3xl text-white font-bold text-center`}>
                            {personDetails.name}
                        </Text>
                        <Text style={tw`text-base text-neutral-500 text-center`}>
                            {personDetails.place_of_birth}
                        </Text>
                    </View>
                    <View style={tw`mx-3 p-4 mt-6 flex-row justify-center items-center bg-neutral-700 rounded-full`}>
                        <View style={[tw`border-r-2 border-r-neutral-400 px-2 items-center`, { flex: 1 }]}>
                            <Text style={tw`text-white font-semibold`}>Gender</Text>
                            <Text style={tw`text-neutral-300 text-sm`}>{personDetails.gender === 2 ? 'Male' : 'Female'}</Text>
                        </View>
                        <View style={[tw`border-r-2 border-r-neutral-400 px-2 items-center`, { flex: 1 }]}>
                            <Text style={tw`text-white font-semibold`}>Birthday</Text>
                            <Text style={tw`text-neutral-300 text-sm`}>{personDetails.birthday}</Text>
                        </View>
                        <View style={[tw`border-r-2 border-r-neutral-400 px-2 items-center`, { flex: 1 }]}>
                            <Text style={tw`text-white font-semibold`}>Known for</Text>
                            <Text style={tw`text-neutral-300 text-sm`}>{personDetails.known_for_department}</Text>
                        </View>
                        <View style={[tw`border-r-2 border-r-neutral-400 px-2 items-center`, { flex: 1 }]}>
                            <Text style={tw`text-white font-semibold`}>Popularity</Text>
                            <Text style={tw`text-neutral-300 text-sm`}>{personDetails.popularity}</Text>
                        </View>
                    </View>
                    <View style={tw`my-6 mx-4 space-y-2 pt-2`}>
                        <Text style={tw`text-white text-lg`}>Biography</Text>
                        <Text style={tw`text-neutral-400 tracking-wide`}>
                            {personDetails.biography}
                        </Text>
                    </View>
                    {/* Check if personMovies is a valid array */}
                    {Array.isArray(personMovies) && personMovies.length > 0 ? (
                        <MovieList data={personMovies} title={'Movies'} hideSeeAll={true} />
                    ) : (
                        <Text style={tw`text-neutral-400 text-center`}>No movies available</Text>
                    )}
                </View>
            )}
        </ScrollView>
    );
}