const CustomerDetailsForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-black font-poppins capitalize mb-6">
          Customer Details
        </h2>

        {/* Name Input */}
        <div className="flex w-full mb-4">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-[#A1A1AA] font-semibold">Name</span>
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="input input-bordered border-black w-full"
            />
          </label>
        </div>

        {/* Email Input */}
        <div className="flex w-full mb-4">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-[#A1A1AA] font-semibold">Email</span>
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="input input-bordered border-black w-full"
            />
          </label>
        </div>

        {/* Divided Section: Mobile Number + Bio (Left) and Address Form (Right) */}
        <div className="flex w-full gap-6">
          {/* Left Side: Mobile Number and Bio */}
          <div className="flex-grow">
            {/* Mobile Number Input */}
            <label className="form-control w-full mb-4">
              <div className="label">
                <span className="label-text text-[#A1A1AA] font-semibold">Mobile Number</span>
              </div>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Your Mobile Number"
                className="input input-bordered border-black w-full"
              />
            </label>

            {/* Bio Text Area */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-[#A1A1AA] font-semibold">Message</span>
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Leave us a Message ..."
                className="textarea textarea-bordered textarea-md border-black w-full h-[140px]"
              ></textarea>
            </label>
          </div>

          {/* Right Side: Address Form */}
          <div className="flex-grow">
            <div className="flex flex-col gap-4">
              {/* Address */}
              <label className="form-control">
                <div className="label">
                  <span className="label-text text-[#A1A1AA] font-semibold">Address</span>
                </div>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="No"
                  className="input input-bordered border-black w-full"
                />
              </label>

              {/* Road */}
              <label className="form-control">
                <input
                  type="text"
                  name="road"
                  value={formData.road}
                  onChange={handleChange}
                  placeholder="Road"
                  className="input input-bordered border-black w-full"
                />
              </label>

              {/* City */}
              <label className="form-control">
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="input input-bordered border-black w-full"
                />
              </label>

              {/* District */}
              <label className="form-control">
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  placeholder="District"
                  className="input input-bordered border-black w-full"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default CustomerDetailsForm;
