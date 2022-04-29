import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Avatar } from '@rneui/base'
import { getAuth, updateProfile } from 'firebase/auth'
import { styles } from './InforUser.styles'
import * as ImagePicker from 'expo-image-picker'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export function InfoUser(props) {

    const { setLoading, setLoadingText } = props;
    const { uid, photoURL, displayName, email } = getAuth().currentUser;

    const [avatar, setavatar] = useState(photoURL)

    const changeAvatar = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        });
        if (!result.cancelled) uploadImg(result.uri)
    }

    const uploadImg = async (uri) => {

        setLoadingText('Actualizando avatar');
        setLoading(true)

        const response = await fetch(uri);
        const blob = await response.blob();
        const storage = getStorage();
        const storageRef = ref(storage, `avatares/${uid}`)

        uploadBytes(storageRef, blob).then(snap => {
            updatePhotoUrl(snap.metadata.fullPath)
        })
    }

    const updatePhotoUrl = async (path) => {
        const storage = getStorage()
        const imgRef = ref(storage, path);
        const imgURL = await getDownloadURL(imgRef);

        const auth = getAuth()
        updateProfile(auth.currentUser, { photoURL: imgURL })

        setavatar(imgURL);
        setLoading(false);

    }

    return (
        <View style={styles.content}>
            <Avatar
                size='large'
                rounded
                icon={{ type: 'material', name: 'person' }}
                containerStyle={styles.avatar}
                source={avatar ? { uri: avatar } : null}
            >
                <Avatar.Accessory size={20} onPress={changeAvatar} />
            </Avatar>
            <View>
                <Text>{displayName || 'Sin nombre'}</Text>
                <Text>{email}</Text>
            </View>
        </View>
    )
}