import React from 'react';
import { useForm } from 'react-hook-form';

const SendParcel = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleSendParcel = (data) => {
        console.log(data);

    }
    return (
        <div className='w-11/12 mx-auto'>
            <h1 className="text-4xl font-bold my-10">Send A Parcel</h1>

            <form className='my-10 p-4  border' onSubmit={handleSubmit(handleSendParcel)}>
                {/* parcel type */}
                <div className='flex gap-5 mb-4 '>
                    <label className="label gap-2 ">
                        <input type="radio" {...register('parcelType')}
                            value='document' className='radio' defaultChecked
                        />
                        Document
                    </label>
                    <label className="label gap-2">
                        <input type="radio" {...register('parcelType')}
                            value='non-document' className='radio' defaultChecked
                        />
                        Non-Document
                    </label>
                </div>
                {/* parcel info */}
                <div className='lg:flex md:flex gap-5 '>
                    <fieldset className='my-1 w-1/2'>
                        <label className="label text-black">Parcel Name</label><br />
                        <input type="text" {...register('parcelName')} placeholder="Type here" className="input w-full" />
                    </fieldset>
                    <fieldset className='my-1 w-1/2'>
                        <label className="label text-black">Parcel Weight (kg)</label><br />
                        <input type="text" {...register('parcelWeight')} placeholder="Type here" className="input w-full" />
                    </fieldset>
                </div>
                {/* two column */}
                <div className='grid lg:grid-cols-2 grid-cols-1 my-10 gap-4 '>
                    {/* Receiver details */}
                    <div>
                        <h1 className="text-3xl font-semibold">Sender Details</h1>
                        <fieldset className='my-1 w-1/2'>
                            <label className="label text-black">Sender Name</label><br />
                            <input type="text" {...register('senderName')} placeholder="Type here" className="input w-full" />
                        </fieldset>
                        <fieldset className='my-1 w-1/2'>
                            <label className="label text-black">Sender Email</label>
                            <input type="email"  {...register('senderEmail')} placeholder="Type here" className="input w-full" />
                        </fieldset>
                        <fieldset className='my-1 w-1/2'>
                            <label className="label text-black">Address</label><br />
                            <input type="text" {...register('senderAddress')} placeholder="Type here" className="input w-full" />
                        </fieldset>
                        <fieldset className='my-1 w-1/2'>
                            <label className="label text-black">Sender Phone No</label><br />
                            <input type="text" {...register('senderPhone')} placeholder="Type here" className="input w-full" />
                        </fieldset>
                        <fieldset className='my-1 w-1/2'>
                            <label className="label text-black">Sender District</label><br />
                            <input type="text" {...register('senderDistrict')} placeholder="Type here" className="input w-full" />
                        </fieldset>
                        <fieldset className='my-1 w-1/2'>
                            <label className="label text-black">Pick Up Instruction</label><br />
                            <input type="text" {...register('pickUp')} placeholder="Type here" className="input w-full" />
                        </fieldset>
                    </div>
                    {/* reciever details  */}

                    <div>
                        <h1 className="text-3xl font-semibold">Receiver Details</h1>
                        <fieldset className='my-1 w-1/2'>
                            <label className="label text-black">Receiver Name</label><br />
                            <input type="text" {...register('receiverName')} placeholder="Type here" className="input w-full" />
                        </fieldset>
                        <fieldset className='my-1 w-1/2'>
                            <label className="label text-black">Receiver Email</label>
                            <input type="email"  {...register('receiverEmail')} placeholder="Type here" className="input w-full" />
                        </fieldset>
                        <fieldset className='my-1 w-1/2'>
                            <label className="label text-black">Address</label><br />
                            <input type="text" {...register('receiverAddress')} placeholder="Type here" className="input w-full" />
                        </fieldset>
                        <fieldset className='my-1 w-1/2'>
                            <label className="label text-black">Receiver Phone No</label><br />
                            <input type="text" {...register('receiverPhone')} placeholder="Type here" className="input w-full" />
                        </fieldset>
                        <fieldset className='my-1 w-1/2'>
                            <label className="label text-black">Receiver District</label><br />
                            <input type="text" {...register('receiverDistrict')} placeholder="Type here" className="input w-full" />
                        </fieldset>
                        <fieldset className='my-1 w-1/2'>
                            <label className="label text-black">Delivery Instruction</label><br />
                            <input type="text" {...register('delivery')} placeholder="Type here" className="input w-full" />
                        </fieldset>
                    </div>

                </div>
                <input type="submit" className="btn bg-lime-300 mt-5" value='Send Parcel' />
            </form>
        </div>
    );
};

export default SendParcel;