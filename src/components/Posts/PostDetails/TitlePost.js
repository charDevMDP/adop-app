import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Icon } from '@rneui/base'


export function TitlePost(props) {
    const { title, isFavorite, addFavorite, removeFavorite, email, user } = props

    const ViewFav = () => {
        if (user) {
            if (user.email && email) {
                if (user.email !== email || user === null) {
                    return (

                        <Icon name={isFavorite ? "heart" : "heart-outline"}
                            type="material-community"
                            color={isFavorite ? "#ff8a00" : "#ccc"}
                            raised
                            reverse
                            size={20}
                            onPress={isFavorite ? removeFavorite : addFavorite}
                        />
                    )
                }
            }
        }
    }

    return (
        <View style={styles.titleandfav}>
            <View style={{ flex: 3 }}>
                <Text style={styles.txt}>{title}</Text>
            </View>
            {isFavorite !== null && (
                <View style={{ flex: 1 }}>
                    {ViewFav()}
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    titleandfav: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 20,
        marginTop: 15,
    },
    txt: {
        fontSize: 18,
        fontFamily: 'ComfortaaB'
    }
})
