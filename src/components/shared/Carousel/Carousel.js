import React, { useState, ref, useRef } from 'react'
import { View, Text, Dimensions } from 'react-native'
import { styles } from './Carousel.styles'
import CarouselSnap, { Pagination, ParallaxImage } from 'react-native-snap-carousel'
import { Image } from '@rneui/base'

const { width } = Dimensions.get('window')
const SLIDER_1_FIRST_ITEM = 0;
//const ITEM_WIDTH = Math.round(width * 0.8);

export function Carousel(props) {

    const { images, width, height } = props

    const [slideActiveIndex, setSlideActiveIndex] = useState(SLIDER_1_FIRST_ITEM)

    let ref = useRef()



    const renderItem = ({ item }, parallaxProps) => (
        <View style={styles.item}>
            <ParallaxImage
                source={{ uri: item }}
                containerStyle={styles.imageContainer}
                style={styles.image}
                parallaxFactor={0}
                {...parallaxProps}
            />
        </View>
    )


    const pagination = () => {
        return (
            <Pagination
                dotsLength={images.length}
                activeDotIndex={slideActiveIndex}
                containerStyle={{ paddingVertical: 6 }}
                dotStyle={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginHorizontal: 8,
                    backgroundColor: '#ff8e00'
                }}
                inactiveDotStyle={{
                    // Define styles for inactive dots here
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                carouselRef={ref}
                onSnapToItem={(i) => console.log(i)}
            />
        );
    }



    return (
        <View>
            <CarouselSnap
                ref={r => ref = r}
                //layoutCardOffset={5}
                data={images}
                sliderWidth={width}
                itemWidth={width - 60}
                renderItem={renderItem}
                //inactiveSlideShift={0}
                //inactiveSlideScale={0.95}
                //inactiveSlideOpacity={0.7}
                loop={false}
                //containerCustomStyle={{ marginTop: 15, overflow: 'visible' }}
                contentContainerCustomStyle={{ paddingVertical: 5 }}
                onSnapToItem={i => setSlideActiveIndex(i)}
                //scrollEnabled={true}
                //useScrollView={true}
                enableSnap={true}
                hasParallaxImages={true}

            />
            {pagination()}
        </View>
    )
}