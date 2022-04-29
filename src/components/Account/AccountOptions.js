import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { ListItem, Icon } from '@rneui/themed'
import { map } from 'lodash'
import { Modal } from '../../components'
import { ChangeName } from './ChangeName'
import { ChangePass } from './ChangePass'

export function AccountOptions(props) {

    const { onReload } = props
    const [showModal, setShowModal] = useState(false)
    const [renderComponent, setRenderComponent] = useState(null)

    const onCloseOpenModal = () => setShowModal((prevState) => !prevState)

    const selectedComponent = (key) => {
        if (key === 'displayName') {
            setRenderComponent(<ChangeName onClose={onCloseOpenModal} onReload={onReload} />)
        }
        if (key === 'password') {
            setRenderComponent(<ChangePass onClose={onCloseOpenModal} onReload={onReload} />)
        }
        onCloseOpenModal()
    }

    const menuOptions = getMenuOptions(selectedComponent)
    return (
        <View>
            {map(menuOptions, (menu, i) => (
                <ListItem key={i} bottomDivider onPress={menu.onPress}>
                    <Icon type={menu.iconType} name={menu.iconNameLeft} color={menu.iconColorLeft} />
                    <ListItem.Content>
                        <ListItem.Title>{menu.title}</ListItem.Title>
                    </ListItem.Content>
                    <Icon type={menu.iconType} name={menu.iconNameRight} color={menu.iconColorRight} />
                </ListItem>
            ))}

            <Modal open={showModal} close={onCloseOpenModal} >
                {renderComponent}
            </Modal>
        </View>
    )
}

function getMenuOptions(selectedComponent) {
    return [
        {
            title: 'Cambia nombre',
            iconType: 'material-community',
            iconNameLeft: 'account-circle',
            iconColorLeft: '#ff8e00',
            iconNameRight: 'chevron-right',
            iconColorRight: '#ff8e00',
            onPress: () => selectedComponent('displayName')
        },
        /* POR AHORA NO PERMITIMOS CAMBIAR EL EMAIL
        {
            title: 'Cambia email',
            iconType: 'material-community',
            iconNameLeft: 'at',
            iconColorLeft: '#ff8e00',
            iconNameRight: 'chevron-right',
            iconColorRight: '#ff8e00',
            onPress: () => selectedComponent('email')
        },
        */
        {
            title: 'Cambia contraseña',
            iconType: 'material-community',
            iconNameLeft: 'lock-reset',
            iconColorLeft: '#ff8e00',
            iconNameRight: 'chevron-right',
            iconColorRight: '#ff8e00',
            onPress: () => selectedComponent('password')
        },

    ]
}