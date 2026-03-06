
import { BrowserRouter,Route,Routes } from "react-router-dom"
import './App.css'
import UserLayout from './layouts/UserLayout'
import AdminLayout from './layouts/AdminLayout'
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { Provider } from "react-redux"
import store from "../store"
import SongDetailsPage from "./pages/SongDetailsPage"
import Support from "./components/Support"
import AdminHomePage from "./Admin/AdminHomePage"
import UserManagment from "./Admin/UserManagment"
import SongsManagment from "./Admin/SongsManagment"
import AddSongForm from "./Admin/AddSongForm"
import PlaylistDetails from "./common/PlaylistDetails"
function App() {

  return (
    <>
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
      {/* USERLAYOUT  */}
      <Route path="/" element={<UserLayout/>}>
      <Route index element={<Home/>} />
      <Route path="support" element={<Support/>} />
      <Route path="songdetails/:id" element={<SongDetailsPage/>} />
      <Route path="playlistDetails/:id" element={<PlaylistDetails/>} />
      </Route>
      <Route path="login" element={<Login/>} />
      <Route path="signup" element={<Signup/>} />
      
      {/* ADMINLAYOUT */}
      <Route path="/admin" element={<AdminLayout/>} >
              <Route index element={<AdminHomePage/>} />
              <Route path="users" element={<UserManagment/>} />
              <Route path="songs" element={<SongsManagment/>} />
              <Route path="addSongs" element={<AddSongForm/>} />
      </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
