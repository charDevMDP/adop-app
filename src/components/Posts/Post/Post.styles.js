import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");


export const styles = StyleSheet.create({
    viewMascota: {
        width: (width - 17),
        backgroundColor: "#fff",
        borderRadius: 10,
        marginBottom: 5,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 5,
        elevation: 2
    },
    viewMascotaImage: {
        marginBottom: 2,
        alignContent: "center",
        alignItems: "center",
    },
    imageMascota: {
        width: (width - 17),
        height: 275,
    },

})