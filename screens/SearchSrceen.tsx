import React, { useCallback, useState } from "react";
import {
    View,
    Text,
    Dimensions,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    ScrollView,
    TouchableWithoutFeedback,
    Image
} from "react-native";
import tw from "twrnc";
import { XMarkIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import { debounce } from "lodash";
import {image185, searchMovies} from "../api/moviedb";

const { width, height } = Dimensions.get('window');

export default function SearchScreen() {
    const navigation = useNavigation();
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = value => {
        if (value && value.length > 2) {
            setLoading(true);
            searchMovies({
                query: value,
                include_adult: 'false',
                language: 'en-US',
                page: '1'
            }).then(data => {
                setLoading(false);
                if (data && data.results) {
                    setResult(data.results);
                    console.log('got movies: ', data.results);
                } else {
                    console.error('Invalid data format:', data);
                    setResult([]);
                }
            }).catch(error => {
                setLoading(false);
                console.error('Error fetching movies:', error);
                setResult([]);
            });
        } else {
            setLoading(false);
            setResult([]);
        }
    };

    const handleText = useCallback(debounce(handleSearch, 200), []);

    return (
        <SafeAreaView style={tw`bg-neutral-800 flex-1`}>
            <View style={tw`mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full`}>
                <TextInput
                    onChangeText={handleText}
                    placeholder={'Search film...'}
                    placeholderTextColor={'lightgray'}
                    style={tw`pb-2 pl-6 text-base font-semibold tracking-wider text-white`}
                />
                <TouchableOpacity onPress={() => {
                    // Clear the input and results
                    setResult([]);
                }}
                                  style={tw`p-2 m-1 bg-neutral-500 rounded-full`}>
                    <XMarkIcon size="25" color="white" />
                </TouchableOpacity>
            </View>
            {/* Result */}
            {
                loading ? (
                    <Loading />
                ) : (
                    result.length > 0 ? (
                        <ScrollView showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{ paddingHorizontal: 15 }}
                                    style={tw`space-y-3`}>
                            <Text style={tw`text-white font-semibold ml-1`}>Result: ({result.length})</Text>
                            <View style={tw`flex-row justify-between flex-wrap`}>
                                {result.map((item, index) => (
                                    <TouchableWithoutFeedback
                                        key={index}
                                        onPress={() => {
                                            navigation.push('Movie', item);
                                        }}
                                    >
                                        <View style={tw`space-y-2 mb-4 pt-4`}>
                                            <Image style={[tw`rounded-3xl`, { width: width * 0.44, height: height * 0.3 }]}
                                                   source={{ uri: image185(item?.poster_path) }}
                                            />
                                            <Text style={tw`text-neutral-300 ml-1`}>
                                                {item.title.length > 22 ? item.title.slice(0, 22) + '...' : item.title}
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                ))}
                            </View>
                        </ScrollView>
                    ) : (
                        <View style={tw`flex-row justify-center`}>
                            <Image source={require('../assets/imageMovie/no result found.jpg')}
                                   style={tw`h-96 w-96`}
                            />
                        </View>
                    )
                )
            }
        </SafeAreaView>
    );
}