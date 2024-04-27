import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get("window");

const quoteStyles = StyleSheet.create({
	item: {
		width,
		height,
		alignItems: "center",
		// justifyContent: "flex-end",
		// paddingBottom: 20
	},
	scrollViewContainer: {
		alignItems: "center",
		justifyContent: "center"
	},
	font: {
		fontFamily: "sans-serif-light",
		color: "#CC5500",
		fontWeight: "bold"
	},
	image: {
		width: width * 0.85,
		height: width * 0.85,
		resizeMode: "contain"
	},
	metaContainer: {
		alignItems: "center",
		justifyContent: "flex-end",
		backgroundColor: "transparent",
		padding: 15
	},
	description: {
		fontSize: 18,
		marginVertical: 15,
		textAlign: "center"
	},
	svgContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		zIndex: -1
	},
	container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default quoteStyles;
