import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure/useAxiosSecure';

const PaymentSuccessPage = () => {
    const [searchParams] = useSearchParams();
    const axiosSecure = useAxiosSecure();
    const [paymentInfo, setPaymentInfo] = useState({});
    // const [transactionId, setTransactionId] = useState({});
    const sessionId = searchParams.get('session_id');
    // console.log(sessionId);

    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    console.log(res.data);
                    setPaymentInfo({
                        transactionId: res.data.transactionId,
                        trackingId: res.data.trackingId
                    })
                })
        }
    }, [sessionId, axiosSecure])
    return (
        <div className='border w-3/4  mx-auto p-5'>
            <h1 className="text-3xl font-semibold tex-center my-3">Payment Successful</h1>
            <p>Your TransactionId : {paymentInfo.transactionId}</p>
            <p>Your TrackingId : {paymentInfo.trackingId}</p>
        </div>
    );
};

export default PaymentSuccessPage;