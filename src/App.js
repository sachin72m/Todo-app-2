// importing all required libraries
import { ReactNotifications } from "react-notifications-component";
// importing all required components
import TodoContainer from "./components/container/TodoContainer";

// creating an App component
function App() {
  return (
    <div className="App">
      {/* using ReactNotifications for rendering up all the notifications */}
      <ReactNotifications />
      {/* rendering the todo container component */}
      <TodoContainer />
    </div>
  );
}

// exporting app component by default
export default App;
