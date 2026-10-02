import { View, Text} from "react-native";

type Props = {
	name: string;
	course: string;
	units: number;
	isFullLoad: boolean;
};

export  function StudentCard({name, course, units, isFullLoad}:Props) {
	return (
		<View>
			<Text>{name}</Text>
			<Text>{course}</Text>
			<Text>{units}</Text>
			{isFullLoad && <Text>Full Load</Text>}
			<Text>_____________</Text>
		</View>
	);
}
