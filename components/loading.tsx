import {View, Text, Dimensions} from "react-native";
import * as Progress from 'react-native-progress';
import {theme} from "../theme/theme";
import React from "react";

const {height, width} = Dimensions.get('window');

export default function Loading(){
    return (
        <View style={[{height, width,
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row"}]}>
            <Progress.CircleSnail thickness={12} size={160} color={theme.background} />
        </View>
    )
}