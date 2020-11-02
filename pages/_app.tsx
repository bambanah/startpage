import { AuthProvider } from "../components/context/AuthContext";
import { AppProps } from "next/app";
import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
