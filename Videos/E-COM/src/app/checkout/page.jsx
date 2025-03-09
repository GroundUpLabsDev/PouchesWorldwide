import { Suspense } from 'react'; // Import Suspense
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CheckoutForm from "@/components/CheckoutForm";
import Banner from "@/components/Banner";

export default function Checkout() {
    return (
        <>
            <Header />
            {/* <Banner /> */}
            <Suspense fallback={<div>Loading checkout form...</div>}>
                <CheckoutForm />
            </Suspense>
            <Footer />
        </>
    );
}