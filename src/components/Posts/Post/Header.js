import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Avatar } from '@rneui/base';
import { styles } from './Post.styles'

export default function Header(props) {

    const { userCreate, type } = props

    console.log(props)

    const [photoAvatar, setPhotoAvatar] = useState(null)

    const viewType = type => {
        if (type == "adop") {
            return (
                <View style={GlobalStyle.btnAdop}>
                    <Text style={styles.textTypeAdop} weight="ComfortaaBold">adopción</Text>
                </View>
            );
        } else {
            if (type == 'trans') {
                return (
                    <View style={GlobalStyle.btnTrans}>
                        <Text style={styles.textTypeTrans} weight="ComfortaaBold">tránsito</Text>
                    </View>
                );
            } else {
                return (
                    <View style={GlobalStyle.btnLost}>
                        <Text style={styles.textTypeLost} weight="ComfortaaBold">perdido</Text>
                    </View>
                );
            }

        }
    };

    useEffect(() => {
        let url = null;
        if (userCreate.photoURL) {
            console.log('userCreate')
            if (userCreate.providerId === 'facebook.com') {
                url = userCreate.photoURL + '?height=500'
            } else {
                url = userCreate.photoURL
            }
        }
        url && setPhotoAvatar(url)
    }, [])

    return (
        <View style={styles.header}>

            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Avatar
                    rounded
                    size="medium"
                    showEditButton={false}
                    source={photoAvatar ? { uri: photoAvatar } : require('../../../../assets/icons/avatarAdop.png')}
                    containerStyle={{
                        width: 40, height: 40, borderWidth: 2,
                        borderColor: "#fff",
                    }}
                />

                <View style={{ justifyContent: 'center', marginLeft: 5, marginTop: -5 }}>
                    <Text weight='ComfortaaBold' sizeText={12} >{userCreate.displayName}</Text>
                    <Text sizeText={8} color='#ccc'>{userCreate.email}</Text>
                </View>
            </View>

            <View style={{ justifyContent: 'center' }}>
                {viewType(type)}
            </View>

        </View>


    )
}
