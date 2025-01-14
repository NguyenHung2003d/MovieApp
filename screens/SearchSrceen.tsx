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
import {XMarkIcon} from "react-native-heroicons/solid";
import {useNavigation} from "@react-navigation/native";
import React, {useState} from "react";
import Loading from "../components/loading";

const {width, height} = Dimensions.get('window');

export default function SearchScreen(){
    const navigation = useNavigation();
    const [result, setResult] = useState([1]);
    const [loading, setLoading] = useState(false);

    let movieName = 'Black Adam'
    return (
        <SafeAreaView style={tw`bg-neutral-800 flex-1`}>
            <View style={tw`mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full`}>
                <TextInput
                    placeholder={'Search film...'}
                    placeholderTextColor={'lightgray'}
                    style={tw`pb-2 pl-6 text-base font-semibold tracking-wider text-white`}
                />
                <TouchableOpacity onPress={() => {

                }}
                                  style={tw`p-2 m-1 bg-neutral-500 rounded-full`}>
                    <XMarkIcon size="25" color="white"/>
                </TouchableOpacity>
            </View>
            {/* Result */}
            {
                loading ? (
                    <Loading/>
                ) : (
                    result.length > 0 ?(
                        <ScrollView showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{paddingHorizontal: 15}}
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
                                            <Image style={[tw`rounded-3xl`, {width: width * 0.44, height: height * 0.3}]}
                                                   source={require('../assets/imageMovie/Poster_phim_Black_Adam.jpg')}
                                            />
                                            <Text style={tw`text-neutral-300 ml-1`}>
                                                {
                                                    movieName.length > 22 ? movieName.slice(0,22) + '...' : movieName
                                                }
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
    )
}