import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";

const theme = extendTheme({
  fonts: {
    body: "Inter, sans-serif",
    heading: "Inter, sans-serif",
    mono: "Inter, sans-serif",
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  )
}
