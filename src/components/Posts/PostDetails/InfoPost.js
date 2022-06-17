import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default InfoPost = (props) => {
    const { gender, race, size, description, cares } = props

    // GENERO
    var genderMascota = "";
    if (gender == "h") { genderMascota = "Es una hembra" }
    else {
        if (gender == "m") { genderMascota = "Es un macho" }
        else {
            if (gender == "myh") { genderMascota = "Son varios de ambos sexo" }
            else {
                if (gender == "d") { genderMascota = "Desconoce" }
            }
        }
    }

    // Tamaño
    var sizeMascota = "";
    if (size == "p") { sizeMascota = "Pequeña" } else {
        if (size == "m") { sizeMascota = "Mediana" } else {
            if (size == "g") { sizeMascota = "Grande" }
        }
    }

    const showCares = cares => {
        if (cares.length == 0) {
            return (<View>
                <Text style={styles.headers} weight="ComfortaaBold" color="#Ff8a00">Cuidado de la mascota:</Text>
                <Text sizeText={15}>No se mencionaron cuidados</Text>
            </View>
            )
        } else {
            return (<View>
                <Text style={styles.headers} weight="ComfortaaBold" color="#Ff8a00">Cuidado de la mascota:</Text>
                <Text sizeText={15}>{cares[0]}  {cares[1]}  {cares[2]}</Text>
            </View>
            )
        }
    }

    return (
        <View style={styles.mascotaInfoBasic}>
            <Text style={styles.headers} weight="ComfortaaBold" color="#Ff8a00">Género de la mascota:</Text>
            <Text sizeText={15}>{genderMascota}</Text>
            <Text style={styles.headers} weight="ComfortaaBold" color="#Ff8a00">Raza o cruza de la mascota:</Text>
            <Text sizeText={15}>{race}</Text>
            <Text style={styles.headers} weight="ComfortaaBold" color="#Ff8a00">Tamaño de la mascota:</Text>
            <Text sizeText={15}>{sizeMascota}</Text>
            {showCares(cares)}
            <Text style={styles.headers} weight="ComfortaaBold" color="#Ff8a00">Descripción:</Text>
            <Text sizeText={15}>{description}</Text>
        </View>

    )
}


const styles = StyleSheet.create({
    headers: {
        marginTop: 10,
        fontSize: 12,
    },
    mascotaInfoBasic: {
        marginLeft: 20,
        marginRight: 20,
    },
})
