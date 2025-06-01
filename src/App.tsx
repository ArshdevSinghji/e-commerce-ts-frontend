import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import ProductDiscription from "./pages/ProductDiscription"
import Nav from "./components/Nav"
import Cart from "./pages/Cart"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
// import Dialog from "./components/Dialog"

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Nav />}>
          <Route path = "/" element={<Home />} />
          <Route path = "/product" element={<ProductDiscription/>} />
          <Route path = "/cart" element={<Cart/>} />
        </Route>
        <Route path = "/signin" element = {<SignIn/>} />
        <Route path = "/signup" element = {<SignUp/>} />
        {/* <Route path = "/dialog" element = {<Dialog/>} /> */}
      </Routes>
    </>
  )
}

export default App
