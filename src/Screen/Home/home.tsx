import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Animated, Keyboard } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import 'react-native-get-random-values';
import { sw, sh } from '@/Helper/UI/ScaledView'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalization } from '@/Hooks/useLocalization';
import { Colors } from '@/Constant/Colors'
import { usePlaces } from '@/Hooks/usePlaces'
import styles from './home.style';
import { Place } from '@/Types/Place'
import useHistory from '@/Hooks/useHistory'
import LocationDetails from './Shared/LocationDetails';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
    const insets = useSafeAreaInsets();
    const localization = useLocalization();

    const { setHistoryVisible, historyVisible, fadeAnim } = useHistory();
    const { mapRef,
        location,
        history,
        handlePlaceSelection,
        selectFromHistory,
        GOOGLE_MAPS_API_KEY,
        detailVisible,
        setDetailVisible,
        googlePlacesRef
    } = usePlaces()

    const renderItem = ({ item, index }: { item: Place, index: number }) => (
        <TouchableOpacity onPress={() => {
            selectFromHistory(item);
            setHistoryVisible(false);
        }}>
            <View style={styles.historyItemContainer}>
                {index != 0 && <View style={styles.line}></View>}
                <Text style={styles.historyItem}>{item.name}</Text>
                <Text style={styles.historyAddress}>{item.address}</Text>
            </View>
        </TouchableOpacity>
    )

    return (
        <View style={{ flex: 1 }}>
            <GooglePlacesAutocomplete
                ref={googlePlacesRef}
                placeholder={localization.searchPlacesTitle}
                fetchDetails
                onPress={handlePlaceSelection}
                enablePoweredByContainer={false}
                query={{
                    key: GOOGLE_MAPS_API_KEY,
                    language: 'en',
                }}
                renderRightButton={() => (
                    googlePlacesRef.current?.getAddressText() ? (
                        <TouchableOpacity
                            style={styles.clearButton}
                            onPress={() => { googlePlacesRef.current?.setAddressText('') }} >
                            <Ionicons name={'close-circle-outline'} color={'black'} size={20} />
                        </TouchableOpacity>
                    ) : (<></>)
                )}
                styles={{
                    container: {
                        zIndex: 1,
                        position: 'absolute',
                        marginHorizontal: sw(16),
                        top: insets.top
                    },
                    listView: {
                        backgroundColor: Colors.white,
                        borderRadius: 5,
                        marginTop: sh(5)
                    },
                }}
                textInputProps={{
                    placeholderTextColor: Colors.black,
                    style: styles.searchInput,
                    onTouchStart: () => {
                        setHistoryVisible(true)
                    },
                    onChangeText: (text) => {
                        if (text.length > 0) {
                            setHistoryVisible(false)
                        } else if (text.length == 0) {
                            setDetailVisible(false)
                        }
                    },
                    autoCorrect: false,
                    autoCapitalize: 'none',
                    autoCompleteType: 'off',
                    clearButtonMode: 'never',
                }}
            />

            <MapView
                ref={mapRef}
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
                onTouchStart={() => {
                    setHistoryVisible(false)
                    Keyboard.dismiss()
                }}
                onTouchMove={() => {
                    setDetailVisible(false)
                    Keyboard.dismiss()
                }}
            >
                {location && (
                    <Marker
                        coordinate={location.coords}
                        title={location.name}
                        description={location.address}
                    />
                )}
            </MapView>

            {historyVisible && (
                <Animated.View
                    style={[
                        styles.historyContainer,
                        { top: insets.top + sh(55), opacity: fadeAnim },
                    ]} >
                    <FlatList
                        keyboardShouldPersistTaps="handled"
                        data={history}
                        keyExtractor={item => item.place_id}
                        renderItem={renderItem}
                    />
                </Animated.View>
            )}

            {detailVisible && < LocationDetails location={location} />}

        </View>
    );
}