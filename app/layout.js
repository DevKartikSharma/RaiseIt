import "./globals.css";
import { Baloo_Bhai_2 } from "next/font/google"; //
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SessionWrapper from "./components/SessionWrappper";
import { AppProvider } from '../app/context/AppContext';
import { ToastContainer, toast } from 'react-toastify';

const balooBhai = Baloo_Bhai_2({
  variable: "--font-baloo-bhai",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "RaiseIt",
  description: "A crowd funding platform",
};


export default function RootLayout({ children }) {
  return <>

    <html lang="en">
      <body className="">
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <div className="fixed inset-0 -z-10 bg-[rgb(2,6,23)] overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
        </div>
        <div>
          <SessionWrapper>
            <AppProvider>
              <Navbar />
              {children}
              <Footer />
            </AppProvider>
          </SessionWrapper>
        </div>
        
      </body>
    </html>
  </>;
}
