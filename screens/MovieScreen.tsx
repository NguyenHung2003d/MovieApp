import {Dimensions, Platform, SafeAreaView, ScrollView, TouchableOpacity, View} from "react-native";
import React, {useEffect} from "react";
import {useRoute} from "@react-navigation/native";
import tw from "twrnc";
import {ChevronLeftIcon} from "react-native-heroicons/mini";
import {styles} from "../theme/theme";

var { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const topMargin = ios ? '' : 'mt-3';
export default function MovieApp()  {
    const {params: item} = useRoute();
    useEffect(() => {

    }, [item]);
    return (
        <ScrollView
            contentContainerStyle={{paddingBottom: 20}}
            style={tw`flex-1 bg-neutral-900`}
        >
            <View style={tw`w-full`}>
                <SafeAreaView style={tw`absolute z-20 w-full flex-row justify-between item-center px-4`}>
                    <TouchableOpacity style={tw`rounded-xl p-1`} style={styles.background}>
                        <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
        </ScrollView>
    )
}