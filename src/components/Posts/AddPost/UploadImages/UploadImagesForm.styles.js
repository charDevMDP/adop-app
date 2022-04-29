import { Dimensions, StyleSheet } from "react-native";

const widthScreen = Dimensions.get("window").width;
const heightScreen = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    containerIcon: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 2,
        height: (widthScreen - 20) / 5,
        width: (widthScreen - 20) / 5,
        borderWidth: 2,
        borderColor: "grey",
        backgroundColor: "white",
        borderRadius: 10,
    },
    miniatureStyle: {
        width: (widthScreen - 20) / 5,
        height: (widthScreen - 20) / 5,
        marginRight: 1,
        marginLeft: 1
    },
    viewImages: {
        width: widthScreen - 10,
        maxWidth: widthScreen - 5,
        flexDirection: "row",
        marginRight: 5,
        marginLeft: 5,
        marginTop: 5,
        paddingVertical: 10
    },
    btn: {
        backgroundColor: '#ff8e00',
        borderRadius: 10,
        marginBottom: 5,
        marginHorizontal: 20
    },


    camera: {
        width: widthScreen - 60,
        height: heightScreen / 1.8
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        margin: 15,

        justifyContent: 'space-between'
    },
    button: {
        alignSelf: 'flex-start',
    },
    error: {
        color: '#ff0000',
        marginHorizontal: 10,
        fontSize: 14,
        fontFamily: 'ComfortaaB'
    }
})