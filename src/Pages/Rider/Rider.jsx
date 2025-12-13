const Rider = () => {
    return (
        <div>
            <h1 className="text-4xl font-bold my-5">Be a Rider</h1>
            <p className="w-1/2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum tempora dicta fuga nam modi voluptatibus impedit quos! Voluptate earum odit modi hic cumque! Cumque, voluptatibus. Rerum in, velit quae doloremque aperiam obcaecati incidunt exercitationem, pariatur, dolorum consequatur mollitia recusandae ipsam.</p>
            <div className="my-10">
                <h1 className="font-bold text-xl">Tell us about yourself</h1>
                <div className="flex gap-10 lg:w-1/2 w-150">
                    <div className="w-1/2 my-1"> <label className="label">Your Name</label>
                        <input type="text" placeholder="Type here" className="input" />
                    </div>
                    <div className="w-1/2 my-1"><label className="label">Your age</label>
                        <input type="text" placeholder="Type here" className="input" />
                    </div>
                </div>
                <div className="flex gap-10 lg:w-1/2 w-150">
                    <div className="w-1/2 my-1">
                     <label className="label">Your Email</label>
                        <input type="email" placeholder="Type here" className="input" />
                    </div>
                    <div className="w-1/2 my-1"><label className="label">Your Region</label>
                        <input type="text" placeholder="Type here" className="input" />
                    </div>

                </div>
                <div className="flex gap-10 lg:w-1/2 w-150">
                    <div className="w-1/2 my-1">  <label className="label">NID No</label>
                        <input type="text" placeholder="Type here" className="input" />
                    </div>
                    <div className="w-1/2 my-1"> <label className="label">Contact</label>
                        <input type="text" placeholder="Type here" className="input" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rider;