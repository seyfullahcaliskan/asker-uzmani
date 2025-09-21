import PaymentSuccessClient from "./PaymentSuccessClient";

export default async function PaymentSuccessPage({ params }) {
    const { id } = await params;
    return <PaymentSuccessClient id={id} />;
}