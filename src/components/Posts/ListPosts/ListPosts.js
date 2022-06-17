import React, { useState } from 'react'
import { View, Text, FlatList, Platform } from 'react-native'
import { Post } from '../Post/Post'
import { styles } from './ListPosts.styles'

export function ListPosts(props) {
    const { posts } = props

    return (
        <View>
            <FlatList
                data={posts}
                ItemSeparatorComponent={
                    Platform.OS !== 'android' &&
                    (({ highlighted }) => (
                        <View
                            style={[styles.separator, highlighted && { marginLeft: 0 }]}
                        />
                    ))
                }
                // los item se pasa por data
                contentContainerStyle={styles.containerList}
                renderItem={p => <Post post={p.item.data()} />}
                keyExtractor={(item, index) => index.toString()}
                //onEndReached={morePets}
                onEndReachedThreshold={0.2}
            //ListFooterComponent={<RenderFooter isLoading={loadingPost} />}

            //refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />

        </View>
    )
}


