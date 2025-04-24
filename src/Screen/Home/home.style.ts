import { sw, sh } from "@/Helper/UI/ScaledView";
import { StyleSheet } from "react-native";
import { Colors } from "@/Constant/Colors";

const styles = StyleSheet.create({
    searchInput: {
        backgroundColor: Colors.white,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontSize: 16,
        color: Colors.black,
        width: '100%',
        height: 50,
    },
    historyContainer: {
        position: 'absolute',
        left: sw(16),
        right: sw(16),
        backgroundColor: Colors.white,
        borderRadius: 5,
        elevation: 4,
        maxHeight: sh(300),
    },
    historyItemContainer: { paddingHorizontal: sw(16) },
    historyItem: {
        fontWeight: '500',
        fontSize: 14,
        marginTop: sh(10),
        marginBottom: sh(5),
        color: Colors.black,
    },
    historyAddress: {
        fontSize: 12,
        color: Colors.gray3A,
        marginBottom: sh(10),
    },
    line: {
        height: 1,
        backgroundColor: Colors.grayCC,
    },
    container: {
        position: 'relative',
    },
    clearButton: {
        position: 'absolute',
        right: 10,
        top: 15,
        zIndex: 1,
    },
});

export default styles