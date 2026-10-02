import { View, Text, Button } from "react-native";
import { useState } from "react"
import {StudentCard} from "./StudentCard";

const students = [
	{ id: "s1", name: "Ana Cruz", course: "IT313", units: 21, isFullLoad:true },
	{ id: "s2", name: "Bea Santos", course: "IT313", units: 15, isFullLoad:false },
	{ id: "s3", name: "Cid Ramos", course: "IT313", units: 18, isFullLoad:true },
	{ id: "s4", name: "Dex Alonzo", course: "IT313", units: 12, isFullLoad:false },
];

export default function StudentRoster() {

	const [roster, setRoster] = useState(students);

	return (
		<View>
			<Text>{`${students.length} students`}</Text>

			<Button
				title ="reverses	"
				onPress={()=> setRoster([...roster].reverse())}
			/>

			{
				roster.map((student) => (			
					<StudentCard 
						key = {student.id}
						name = {student.name}
						course = {student.course}
						units = {student.units}
						isFullLoad = {student.isFullLoad}
					/> 
				))
			}
			
		</View>
	);
}
