import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import MapView from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Place, PlaceData, PlaceDetails } from '@/Types/Place'
import Constants from "expo-constants";
import { STORAGE_KEYS } from '@/Constant/StorageKey';

const GOOGLE_MAPS_API_KEY = Constants.expoConfig?.extra?.googleMapsApiKey as string;
const GOOGLE_MAPS_IMAGE_BASE_URL = Constants.expoConfig?.extra?.googleMapsImageBaseUrl as string;
const REGION_DELTA = {
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
};

export const usePlaces = () => {
    const mapRef = useRef<MapView>(null);
    const [location, setLocation] = useState<Place | null>(null);
    const [history, setHistory] = useState<Place[]>([]);
    const [detailVisible, setDetailVisible] = useState(false);
    const googlePlacesRef = useRef<any>(null);

    const handlePlaceSelection = (data: PlaceData, details: PlaceDetails | null) => {
        if (!details?.geometry?.location) return;

        const selectedPlace = createPlaceObject(data, details);
        setLocation(selectedPlace);
        setDetailVisible(true);
        saveToHistory(selectedPlace);
        animateToRegion(selectedPlace.coords);
    };

    // --------------------------- History Functions ---------------------------

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = useCallback(async () => {
        try {
            const stored = await AsyncStorage.getItem(STORAGE_KEYS.PLACE_HISTORY);
            if (stored) {
                const parsedHistory = JSON.parse(stored);
                setHistory(parsedHistory);
            }
        } catch (error) {
            console.error("Failed to load history:", error);
        }
    }, []);

    const saveToHistory = useCallback(async (place: Place) => {
        try {
            const newHistory = [place, ...history.filter(h => h.place_id !== place.place_id)];
            setHistory(newHistory);
            await AsyncStorage.setItem(STORAGE_KEYS.PLACE_HISTORY, JSON.stringify(newHistory));
        } catch (error) {
            console.error("Failed to save history:", error);
        }
    }, [history]);

    const selectFromHistory = useCallback((item: Place) => {
        setLocation(item);
        setDetailVisible(true);
        if (googlePlacesRef.current) {
            googlePlacesRef.current?.setAddressText(item.name);
            googlePlacesRef.current?.blur();
        }

        animateToRegion(item.coords);
    }, []);

    // --------------------------- History Functions ---------------------------

    // --------------------------- Helper Functions ---------------------------

    const animateToRegion = useCallback((coords: { latitude: number; longitude: number }) => {
        mapRef.current?.animateToRegion({
            ...coords,
            ...REGION_DELTA,
        });
    }, []);

    const createPlaceObject = useCallback((data: any, details: any): Place => {
        const photoReference = details.photos?.[0]?.photo_reference;
        const loc = details.geometry?.location;
        const photo = `${GOOGLE_MAPS_IMAGE_BASE_URL}${photoReference}&key=${GOOGLE_MAPS_API_KEY}`;

        return {
            name: data.structured_formatting.main_text,
            address: data.description,
            place_id: data.place_id,
            coords: { latitude: loc.lat, longitude: loc.lng },
            photo: photo,
        };
    }, []);

    // --------------------------- Helper Functions ---------------------------

    return useMemo(() => ({
        mapRef,
        location,
        history,
        handlePlaceSelection,
        selectFromHistory,
        GOOGLE_MAPS_API_KEY,
        detailVisible,
        setDetailVisible,
        googlePlacesRef
    }), [location, history, detailVisible, setDetailVisible]);
}