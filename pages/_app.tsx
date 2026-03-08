import Header from '@components/Header';
import { AppProps } from 'next/app';
import { StoreProvider } from '@store/globals/root/RootProvider';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <StoreProvider>
        <Header/>
        <Component {...pageProps} />
      </StoreProvider>
    </>
  )
}