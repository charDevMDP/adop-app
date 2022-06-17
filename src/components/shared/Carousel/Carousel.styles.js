import { Dimensions, StyleSheet } from 'react-native'

const screenWidth = Dimensions.get('window').width;


export const styles = StyleSheet.create({
    item: {
        width: screenWidth - 60,
        height: screenWidth - 160,
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
})