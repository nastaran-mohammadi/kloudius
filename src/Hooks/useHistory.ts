import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

export default function useHistory() {
    const [historyVisible, setHistoryVisible] = React.useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (historyVisible) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [historyVisible]);

    return { setHistoryVisible, historyVisible, fadeAnim }
}