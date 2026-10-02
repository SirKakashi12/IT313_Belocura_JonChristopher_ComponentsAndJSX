# IT313 – Mobile Programming
## Laboratory 4 – React Components & JSX in Action

### Student Roster Card Renderer

This laboratory demonstrates the use of React Native functional components, props, destructuring, JSX expressions, conditional rendering, `.map()`, and the `key` prop.

The application displays a list of currently enrolled IT313 students using reusable `StudentCard` components.

---

# Step 1 – Create a New Expo Project

Create a new Expo project using the Blank TypeScript template.

```powershell
npx create-expo-app test1 --template
```

Select:

```text
Blank (TypeScript)
```

Then enter the project folder:

```powershell
cd test1
```

The project uses TypeScript and Expo SDK 57.

---

# Step 2 – Create the StudentCard Component

Create a separate file named:

```text
StudentCard.tsx
```

The purpose of `StudentCard` is to create a reusable component that displays information about one student.

The component receives four props:

- `name`
- `course`
- `units`
- `isFullLoad`

A TypeScript type was created for these props.

```typescript
type props = {
    name: string;
    course: string;
    units: number;
    isFullLoad: boolean;
};
```

The props are destructured directly in the function parameter.

```typescript
export function StudentCard({name, course, units, isFullLoad}: props) {
```

This allows the component to use `name`, `course`, `units`, and `isFullLoad` directly.

The values are then rendered inside JSX:

```tsx
<View>
    <Text>{name}</Text>
    <Text>{course}</Text>
    <Text>{units}</Text>
    <Text>{isFullLoad}</Text>
</View>
```

---

# Step 3 – Add Conditional Rendering

The `isFullLoad` property determines whether the student should receive a **Full Load** label.

Instead of displaying the boolean value directly, JSX conditional rendering was used:

```tsx
{isFullLoad && <Text>Full Load</Text>}
```

The `&&` operator means that the `Text` component will only be rendered when `isFullLoad` is `true`.

For example:

```text
Ana Cruz
IT313
21
Full Load
```

A student whose `isFullLoad` is `false` will not display the label.

---

# Step 4 – Create the StudentRoster Component

Create another file named:

```text
StudentRoster.tsx
```

`StudentRoster` acts as the parent component.

It contains the student data and is responsible for creating one `StudentCard` for every student.

The starter student data is:

```typescript
const students = [
    { id: "s1", name: "Ana Cruz", course: "IT313", units: 21, isFullLoad: true },
    { id: "s2", name: "Bea Santos", course: "IT313", units: 15, isFullLoad: false },
    { id: "s3", name: "Cid Ramos", course: "IT313", units: 18, isFullLoad: true },
    { id: "s4", name: "Dex Alonzo", course: "IT313", units: 12, isFullLoad: false },
];
```

---

# Step 5 – Render StudentCard Using .map()

The `.map()` method is used to loop through the students array and create one `StudentCard` for every student.

```tsx
roster.map((student) => (
    <StudentCard
        key={student.id}
        name={student.name}
        course={student.course}
        units={student.units}
        isFullLoad={student.isFullLoad}
    />
))
```

The values from each student object are passed to `StudentCard` as props.

The `key` prop uses the student's unique ID:

```tsx
key={student.id}
```

This gives React a stable identity for each item in the list.

---

# Step 6 – Display the Number of Students

A JSX expression was used to calculate and display the number of students.

```tsx
<Text>{`${roster.length} students`}</Text>
```

The value is calculated from the array instead of manually writing the number.

The template literal combines the array length with the word `students`.

The result is:

```text
4 students
```

---

# Step 7 – Use a Single Root Element

`StudentRoster` returns a single root `View` containing both the header and the list of student cards.

```tsx
return (
    <View>
        <Text>{`${roster.length} students`}</Text>

        {roster.map((student) => (
            <StudentCard
                key={student.id}
                name={student.name}
                course={student.course}
                units={student.units}
                isFullLoad={student.isFullLoad}
            />
        ))}
    </View>
);
```

React components must return a single root element.

The `View` acts as the root element that wraps the header and all the student cards.

---

# Step 8 – Add the Reverse Roster Button

A button was added to demonstrate how the list behaves when its order changes.

React's `useState` hook was used to store the current roster.

```tsx
const [roster, setRoster] = useState(students);
```

`roster` represents the current array being displayed.

`setRoster` is the function used to update the roster.

The button uses:

```tsx
<Button
    title="Reverse Roster"
    onPress={() => setRoster([...roster].reverse())}
/>
```

The expression:

```tsx
[...roster]
```

creates a new array containing the roster items.

Then:

```tsx
.reverse()
```

reverses the new array.

Finally:

```tsx
setRoster(...)
```

updates the state, causing React to render the new order.

---

# Step 9 – Test the Array Index as a Key

The laboratory requires testing the difference between using a stable student ID and using the array index as the key.

The normal version uses:

```tsx
key={student.id}
```

For the experiment, it was temporarily changed to:

```tsx
roster.map((student, index) => (
    <StudentCard
        key={index}
```

The array index represents the position of an item:

```text
0 → first student
1 → second student
2 → third student
3 → fourth student
```

After reversing the roster, the positions change even though the students themselves remain the same.

In this simple application, the list may still appear to update correctly because the `StudentCard` does not contain its own state.

However, using an index as a key can cause problems when list items have their own state or when items are inserted or removed.

After the experiment, the key was restored to:

```tsx
key={student.id}
```

This gives each student a stable identity regardless of their position in the array.

---

# Step 10 – Display StudentRoster in App.tsx

The `StudentRoster` component was imported into the main application entry file.

```tsx
import StudentRoster from "./StudentRoster";

export default function App() {
    return <StudentRoster />;
}
```

`App.tsx` is responsible for displaying the `StudentRoster` component on the screen.

The component structure is:

```text
App
└── StudentRoster
    ├── Header
    ├── Reverse Roster Button
    └── StudentCard
        ├── Ana Cruz
        ├── Bea Santos
        ├── Cid Ramos
        └── Dex Alonzo
```

---

# Step 11 – Run the Application

Start the Expo development server with:

```powershell
npx expo start
```

The application can then be opened using an Android emulator or Expo Go.

For an Android emulator, press:

```text
a
```

inside the Expo terminal.

The expected screen contains:

```text
4 students

Reverse Roster

Ana Cruz
IT313
21
Full Load

Bea Santos
IT313
15

Cid Ramos
IT313
18
Full Load

Dex Alonzo
IT313
12
```

Pressing **Reverse Roster** changes the order of the students.

---

# Step 12 – GitHub Repository

Create a public GitHub repository using the required naming format:

```text
IT313_LastName_FirstName_ComponentsAndJSX
```

Initialize Git inside the project:

```powershell
git init
```

Add the project files:

```powershell
git add .
```

Create the first commit:

```powershell
git commit -m "Complete Lab 4 React Components and JSX"
```

Connect the local project to the GitHub repository:

```powershell
git remote add origin YOUR_GITHUB_REPOSITORY_URL
```

Rename the branch to `main`:

```powershell
git branch -M main
```

Push the project:

```powershell
git push -u origin main
```

The repository should contain at least:

```text
App.tsx
StudentCard.tsx
StudentRoster.tsx
README.md
package.json
```

---

# React Concepts Demonstrated

This laboratory demonstrates the following concepts:

### Functional Components

`StudentCard` and `StudentRoster` are functional React components.

### Props

`StudentRoster` passes student information to `StudentCard` using props.

### Props Destructuring

`StudentCard` destructures its props directly in the function parameter:

```tsx
function StudentCard({name, course, units, isFullLoad}: props)
```

### JSX Expressions

JavaScript values are embedded in JSX using `{}`:

```tsx
<Text>{name}</Text>
```

and:

```tsx
<Text>{`${roster.length} students`}</Text>
```

### Conditional Rendering

The `&&` operator conditionally displays the Full Load label:

```tsx
{isFullLoad && <Text>Full Load</Text>}
```

### .map()

`.map()` converts each student object into a `StudentCard` component.

### key Prop

`key={student.id}` gives each list item a stable identity.

### useState

`useState` stores the current roster and allows the Reverse Roster button to update the displayed order.

---

# How to Run

Install the project dependencies:

```powershell
npm install
```

Start Expo:

```powershell
npx expo start
```

For Android:

```text
Press a
```

The project can also be opened using Expo Go or the web option provided by Expo.

---

# Conclusion

This laboratory demonstrates how React Native can use reusable components to transform an array of student data into a complete user interface.

`StudentRoster` manages the student list and passes individual student information to `StudentCard` through props. JSX expressions display dynamic values, conditional rendering controls the Full Load label, and `.map()` creates multiple cards from the array.

The key experiment demonstrates why stable identifiers such as `student.id` are preferred over array indexes when rendering dynamic lists.
