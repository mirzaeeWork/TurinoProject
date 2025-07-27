import Layuot from "@/components/Layouts";
import "@/styles/globals.css";
import "@/styles/SolarDatePicker.css";
import "@/styles/StackGallery.css";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import QueryProvider from "@/lib/QueryProvider";
import HeadManager from "@/components/element/HeadManager";

// https://www.figma.com/design/MMjxNJiAEN8AhtxbPVPatB/torino?node-id=1-2&p=f&t=AKTWGzxuteWtr81R-0

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const getLayout = Component.getLayout || ((page) => (
    <Layuot>
      <HeadManager />
      {page}
      <ToastContainer position="top-right" rtl />
    </Layuot>
  ));

  return (
    <SessionProvider session={session}>
      <QueryProvider>
        {getLayout(<Component {...pageProps} />)}
      </QueryProvider>
    </SessionProvider>
  );
}
