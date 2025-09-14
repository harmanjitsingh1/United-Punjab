import { useState } from "react";

export default function UserFormWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log("Saved:", data);
      alert("User details submitted successfully!");
    } catch (error) {
      console.error(error);
      alert("Error submitting form");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {step === 1 && (
        <div>
          <h2 className="text-xl mb-2">Enter Name</h2>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <button onClick={nextStep} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-xl mb-2">Enter Email</h2>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <div className="mt-2">
            <button onClick={prevStep} className="mr-2 bg-gray-500 text-white px-4 py-2 rounded">
              Back
            </button>
            <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded">
              Next
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-xl mb-2">Enter Phone</h2>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <div className="mt-2">
            <button onClick={prevStep} className="mr-2 bg-gray-500 text-white px-4 py-2 rounded">
              Back
            </button>
            <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
