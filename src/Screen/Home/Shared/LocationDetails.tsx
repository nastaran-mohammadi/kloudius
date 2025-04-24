import React from 'react';
import { View, Text, Animated, Image, StyleSheet } from 'react-native';
import { sw, sh } from '@/Helper/UI/ScaledView'
import { Colors } from '@/Constant/Colors'
import { Place } from '@/Types/Place'

interface LocationDetailsProps {
    location: Place | null;
}

const LocationDetails: React.FC<LocationDetailsProps> = ({ location }) => {
    if (location == null) {
        return null;
    }
    return <Animated.View style={styles.container}>
        <View style={styles.row}>
            <View style={styles.handler}></View>
        </View>
        <Text style={styles.title}> {location.name} </Text>
        <Text style={styles.address}> {location.address} </Text>
        {location.photo != null && location.photo != '' &&
            <Image
                source={{ uri: location.photo }}
                style={styles.photo}
            />}
    </Animated.View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        position: 'absolute',
        bottom: 0,
        borderRadius: 20,
        elevation: 5,
        boxShadow: '0 -2px 10px rgba(0,0,0,0.2)',
        width: '100%',
        paddingTop: sh(15),
    },
    row: {
        width: '100%',
        alignItems: 'center',
    },
    handler: {
        height: 3,
        width: sw(45),
        backgroundColor: Colors.grayAA,
        borderRadius: 5,
    },
    title: {
        color: Colors.black,
        fontSize: 16,
        marginHorizontal: sw(16),
        marginBottom: sh(5),
        fontWeight: 'bold',
        textAlign: 'left',
        marginRight: sw(16),
        marginTop: sh(10),
    },
    address: {
        color: Colors.black,
        fontSize: 12,
        marginHorizontal: sw(16),
        marginBottom: sh(10),
    },
    photo: {
        width: '100%',
        height: sh(200),
        marginTop: sh(10),
        backgroundColor: Colors.grayCC,
    }
})

export default LocationDetails