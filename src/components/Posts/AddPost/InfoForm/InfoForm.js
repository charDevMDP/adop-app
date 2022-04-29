import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { styles } from './InfoForm.styles'
import { Picker } from '@react-native-picker/picker'
import { Input, CheckBox } from '@rneui/themed'
import { MapForm } from '../MapForm/MapForm'

export function InfoForm(props) {

    const { formik } = props;
    const [showMap, setShowMap] = useState(false)

    const onOpenCloseMap = () => setShowMap((prevState) => !prevState)

    return (
        <View style={{ marginHorizontal: 5, marginTop: 20 }}>
            <View style={styles.viewForm}>
                {showLabel("Título de la publicación:")}
                <Input
                    placeholder="Ingresa un título"
                    containerStyle={styles.input}
                    style={{ fontFamily: 'ComfortaaM', fontSize: 15 }}
                    maxLength={30}
                    onChangeText={text => formik.setFieldValue('title', text)}
                    errorMessage={formik.errors.title}
                    errorStyle={{ fontFamily: 'ComfortaaB' }}
                />

                {showLabel("Tipo de mascota:")}
                <View style={styles.viewContainer}>
                    <Picker
                        selectedValue={formik.values.typePet}
                        style={{ height: 50 }}
                        fontFamily='ComfortaaM'
                        mode={'dialog'}
                        dropdownIconColor='#ff8e00'
                        onValueChange={(t) => formik.setFieldValue('typePet', t)}>
                        <Picker.Item label="-- Elige --" value="" />
                        <Picker.Item label="Gato" value="gato" />
                        <Picker.Item label="Perro" value="perro" />
                        <Picker.Item label="Otro" value="otro" />
                    </Picker>
                </View>
                {formik.errors.typePet && (
                    <View style={{ marginLeft: 16, marginBottom: 10 }}>
                        <Text style={{ fontFamily: 'ComfortaaB', fontSize: 12, color: 'red' }}>{formik.errors.typePet}</Text>
                    </View>
                )}


                {showLabel("Género de la mascota:")}
                <View style={styles.viewContainer}>
                    <Picker
                        selectedValue={formik.values.gender}
                        mode={'dialog'}
                        dropdownIconColor='#ff8e00'
                        style={{ height: 50 }}
                        onValueChange={(g) => formik.setFieldValue('gender', g)}>
                        <Picker.Item label="-- Elige --" value="" />
                        <Picker.Item label="Desconozco" value="d" />
                        <Picker.Item label="Hembra" value="h" />
                        <Picker.Item label="Macho" value="m" />
                        <Picker.Item label="Machos y hembras (Si son muchos)" value="myh" />
                    </Picker>
                </View>
                {formik.errors.gender && (
                    <View style={{ marginLeft: 16, marginBottom: 10 }}>
                        <Text style={{ fontFamily: 'ComfortaaB', fontSize: 12, color: 'red' }}>{formik.errors.gender}</Text>
                    </View>
                )}

                {showLabel("Raza o cruza de la mascota:")}
                <Input
                    placeholder="Ingresa la raza o cruza"
                    containerStyle={styles.input}
                    style={{ fontFamily: 'ComfortaaM', fontSize: 15 }}
                    maxLength={25}
                    onChangeText={text => formik.setFieldValue('race', text)}
                    errorMessage={formik.errors.race}
                    errorStyle={{ fontFamily: 'ComfortaaB' }}
                />

                {showLabel("Tamaño de la mascota:")}
                <View style={styles.viewContainer}>
                    <Picker
                        selectedValue={formik.values.size}
                        mode={'dialog'}
                        dropdownIconColor='#ff8e00'
                        style={{ height: 50 }}
                        onValueChange={(s) => formik.setFieldValue('size', s)}>
                        <Picker.Item label="-- Elige --" value="" />
                        <Picker.Item label="Pequeña" value="p" />
                        <Picker.Item label="Mediana" value="m" />
                        <Picker.Item label="Grande" value="g" />
                    </Picker>
                </View>
                {formik.errors.size && (
                    <View style={{ marginLeft: 16, marginBottom: 10 }}>
                        <Text style={{ fontFamily: 'ComfortaaB', fontSize: 12, color: 'red' }}>{formik.errors.size}</Text>
                    </View>
                )}

                {showLabel("Cuidado de la mascota:")}
                <View style={{ backgroundColor: '#fff', borderRadius: 10, marginBottom: 20 }}>
                    <CheckBox
                        title={<Text sizeText={14} style={styles.textCB}>Está desparacitada</Text>}
                        checked={formik.values.care1}
                        containerStyle={{ marginBottom: 0 }}
                        checkedColor='#ff8e00'
                        onPress={() => formik.setFieldValue("care1", !formik.values.care1)}
                    />

                    <CheckBox
                        title={<Text sizeText={14} style={styles.textCB}>Está vacunada</Text>}
                        containerStyle={{ margin: 0 }}
                        checked={formik.values.care2}
                        checkedColor='#ff8e00'
                        onPress={() => formik.setFieldValue("care2", !formik.values.care2)}
                    />
                    <CheckBox
                        title={<Text sizeText={14} style={styles.textCB}>Está castrada</Text>}
                        checked={formik.values.care3}
                        checkedColor='#ff8e00'
                        containerStyle={{ marginTop: 0 }}
                        textStyle={{ fontFamily: 'ComfortaaM' }}
                        onPress={() => formik.setFieldValue("care3", !formik.values.care3)}
                    />
                </View>




                {showLabel("Descripción de la publicación:")}
                <Input
                    placeholder="Ingresa una descripción, datos adicionales, caracteristicas de las mascotas, etc"
                    multiline={true}
                    inputContainerStyle={styles.textArea}
                    style={{ fontFamily: 'ComfortaaM', fontSize: 15 }}
                    onChangeText={text => formik.setFieldValue('description', text)}
                    errorMessage={formik.errors.description}
                    errorStyle={{ fontFamily: 'ComfortaaB' }}
                />

                {showLabel("Ubicación de la mascota:")}
                <Input
                    placeholder="Agrega info aqui o usa el mapa >>> "
                    containerStyle={styles.input}
                    style={{ fontFamily: 'ComfortaaM', fontSize: 15 }}
                    rightIcon={{
                        type: "material-community",
                        name: "google-maps",
                        color: getColorIconMap(formik),
                        onPress: onOpenCloseMap
                    }}
                    maxLength={25}
                    onChangeText={text => formik.setFieldValue('location', text)}
                    errorMessage={formik.errors.location}
                    errorStyle={{ fontFamily: 'ComfortaaB' }}
                />

            </View>
            {showMap && (
                <MapForm show={showMap} close={onOpenCloseMap} formik={formik} />
            )}
        </View>
    )
}

function showLabel(title) {
    return (
        <View style={{ marginBottom: 5 }}>
            <Text style={{ marginHorizontal: 10, fontFamily: "ComfortaaM", color: '#ff8e00' }}>{title}</Text>
        </View>
    )
}

const getColorIconMap = (formik) => {
    if (formik.values.location) return '#ff8e00'
    return '#c2c2c2'
}
