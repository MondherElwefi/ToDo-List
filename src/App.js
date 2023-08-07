
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./Pages/SignUp/SignUp";
import SignIn from "./Pages/SignIn/SignIn";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import TaskDetail from "./Pages/Home/TaskDetail";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element:<Home/>,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/profile",
      element: <Profile/> ,
    },
    {
      path: "/taskDetail/:taskId",
      element: <TaskDetail/> ,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
