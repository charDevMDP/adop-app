import { StyleSheet } from 'react-native'


export const styles = StyleSheet.create({
    overlay: {
        height: 100,
        width: 250,
        backgroundColor: "#fff",
        borderColor: "#ff8a00",
        borderWidth: 2,
        borderRadius: 10,
    },
    view: {
        flex: 1,
        borderWidth: 0,
        padding: 0,
        margin: 0,
        backgroundColor: '#fff',
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "#ff8a00",
        textTransform: "uppercase",
        marginTop: 10,
        fontFamily: 'ComfortaaB'
    }
})
