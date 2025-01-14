import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';

export default function Casts({ cast, navigation }) { // Destructure 'cast' from props
    let personName = 'Pedro Pascal';
    let characterName = 'Joel Miller';
    return (
        <View style={tw`my-6`}>
            <Text style={tw`text-white text-lg mx-4 mb-5`}>Top cast</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >
                {
                    cast && cast.map((person, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => navigation.navigate('Person', { person })}
                            style={tw`item-center mr-4`}
                        >
                            <View style={tw`overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500`}>

                                <Image
                                    style={tw`rounded-2xl w-20 h-24`}
                                    source={require('../assets/imageMovie/pedro pascal.png')}
                                />
                            </View>
                            <Text style={tw`text-white text-xs mt-1`}>
                                {
                                    characterName.length > 15 ? characterName.slice(0,10) + '...' : characterName
                                }
                            </Text>
                            <Text style={tw`text-neutral-400 text-xs mt-1`}>
                                {
                                    personName.length > 15 ? personName.slice(0,10) + '...' : personName
                                }
                            </Text>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </View>
    );
}