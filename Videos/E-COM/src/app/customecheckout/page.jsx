
import { Suspense } from 'react'; // Import Suspense
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CuCheckoutForm from "@/components/CuCheckoutForm";
import Banner from "@/components/Banner";


export default function customecheckout() {


    return (
        <>
        <Header />
      {/* <Banner />*/}
      <Suspense fallback={<div>Loading checkout form...</div>}>
        <CuCheckoutForm />

        </Suspense>
        <Footer />
</>
  );
}