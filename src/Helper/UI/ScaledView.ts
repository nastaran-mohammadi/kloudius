import { Dimensions } from "react-native";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const DESIGN_HEIGHT = 844;
const DESIGN_WIDTH = 390;

const sh = (size: number) => (SCREEN_HEIGHT / DESIGN_HEIGHT) * size;
const sw = (size: number) => (SCREEN_WIDTH / DESIGN_WIDTH) * size;

export { sh, sw }