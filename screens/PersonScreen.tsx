import React, {useState} from 'react';
import { Dimensions, Text, Platform, SafeAreaView, ScrollView, Image, TouchableOpacity, View } from 'react-native';
import tw from "twrnc";
import { styles } from "../theme/theme";
import { ChevronLeftIcon } from "react-native-heroicons/mini";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import MovieList from "../components/movieList";
import Loading from "../components/loading";

var { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const verticalMargin = ios ? {} : tw`my-3`;

export default function PersonScreen() {
    const navigation = useNavigation();
    const [isFavorite, setIsFavorite] = React.useState(false);
    const [personMovies, setPersonMovies] = React.useState([1,2,3,4]);
    const [loading, setLoading] = useState(true);

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
            {
                loading ? (
                    <Loading/>
                ) : (
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
                                    source={require('../assets/imageMovie/Pedro-Pascal.webp')}
                                    style={{ height: height * 0.43, width: width * 0.74 }}
                                />
                            </View>
                        </View>
                        <View style={[tw`mt-6`]}>
                            <Text style={tw`text-3xl text-white font-bold text-center`}>
                                Pedro Pascal
                            </Text>
                            <Text style={tw`text-base text-neutral-500 text-center`}>
                                Santiago de Chile, Metropolitan Region, Chile
                            </Text>
                        </View>
                        <View style={tw`mx-3 p-4 mt-6 flex-row justify-center items-center bg-neutral-700 rounded-full`}>
                            <View style={[tw`border-r-2 border-r-neutral-400 px-2 items-center`, { flex: 1 }]}>
                                <Text style={tw`text-white font-semibold`}>Gender</Text>
                                <Text style={tw`text-neutral-300 text-sm`}>Male</Text>
                            </View>
                            <View style={[tw`border-r-2 border-r-neutral-400 px-2 items-center`, { flex: 1 }]}>
                                <Text style={tw`text-white font-semibold`}>Birthday</Text>
                                <Text style={tw`text-neutral-300 text-sm`}>1975-04-02</Text>
                            </View>
                            <View style={[tw`border-r-2 border-r-neutral-400 px-2 items-center`, { flex: 1 }]}>
                                <Text style={tw`text-white font-semibold`}>Known for</Text>
                                <Text style={tw`text-neutral-300 text-sm`}>Acting</Text>
                            </View>
                            <View style={[tw`border-r-2 border-r-neutral-400 px-2 items-center`, { flex: 1 }]}>
                                <Text style={tw`text-white font-semibold`}>Popularity</Text>
                                <Text style={tw`text-neutral-300 text-sm`}>15.0</Text>
                            </View>
                        </View>
                        <View style={tw`my-6 mx-4 space-y-2 pt-2`}>
                            <Text style={tw`text-white text-lg`}>Biography</Text>
                            <Text style={tw`text-neutral-400 tracking-wide`}>
                                Pedro Pascal is a Chilean-born actor. He is best known for portraying the roles of Oberyn Martell in the fourth season of the HBO series Game of Thrones (2011), Javier Peña in the Netflix series Narcos (2015), the titular character in the Disney+ series The Mandalorian (2019) and Joel Miller in the HBO series The Last of Us (2023).
                                He's long-time friends with Triple Frontier (2019) co-star Oscar Isaac.
                            </Text>
                        </View>
                        <MovieList data={personMovies} title={'Movies'} hideSeeAll={true} />
                    </View>
                )
            }
        </ScrollView>
    );
}