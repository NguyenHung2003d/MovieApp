import React, {useState} from 'react';
import {View, Text, Platform, SafeAreaView, StatusBar, TouchableOpacity, ScrollView} from 'react-native';
import tw from 'twrnc';
import {Bars3CenterLeftIcon, MagnifyingGlassIcon} from "react-native-heroicons/mini";
import {styles} from "../theme/theme";
import TrendingMovies from "../components/trendingMovies";

const ios = Platform.OS === 'ios';

const App = () => {
    const [trendingMovies, setTrendingMovies] = useState([1,2,3]);
    return (
        <View style={tw`flex-1 bg-neutral-800`}>
            <SafeAreaView style={tw`${ios ? 'mb-2' : 'mb-3'}`}>
                <StatusBar barStyle="light-content" />
                <View style={tw`flex-row justify-between items-center mx-4`}>
                    <Bars3CenterLeftIcon size={30} strokeWidth={2} color="white" />
                    <Text style={tw`text-white text-3xl font-bold`}>
                        <Text style={styles.text}>M</Text>ovies
                    </Text>
                    <TouchableOpacity>
                        <MagnifyingGlassIcon size="30" strokeWidth={2} color="white"></MagnifyingGlassIcon>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingTop: 10}}
            >
                <TrendingMovies data={trendingMovies} />
            </ScrollView>
        </View>
    );
};

export default App;
