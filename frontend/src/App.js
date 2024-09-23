import { BrowserRouter, Routes, Route } from "react-router-dom"
import { LoginPage, SignupPage, ActivationPage } from './Routes.js'
import './App.css'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { server } from "./server.js";
import axios from "axios";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get(`${server}/user/get-user`, {withCredentials: true});
        console.log(res.data);
        toast.success(res.data)
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }

    fetchUser();
  }, [])

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route path="/activation/:activation_token" element={<ActivationPage />} />
        </Routes>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </BrowserRouter>
    </div>
  )
}
export default App