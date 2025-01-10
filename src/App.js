import "./App.css";
import { useForm } from "react-hook-form";
import { useState } from "react";

function App() {
  const { register, handleSubmit } = useForm();
  const [solidityContract, setSolidityContract] = useState("");

  const onSubmit = (data) => {
    console.log("Submitting data:", data); // Debug log to verify form data
    fetch("http://127.0.0.1:8000/generate_contract/", {
      method: "POST", // Ensure POST request
      headers: {
        "Content-Type": "application/json", // Indicate JSON payload
      },
      body: JSON.stringify(data), // Pass data as JSON
    })
      .then((response) => {
        console.log("Fetch response received"); // Log after fetch is complete
        return response.json(); // Parse response JSON
      })
      .then((json) => {
        const contractText = json.contract_code; // Extract contract text
        console.log("Contract Text Received:", contractText); // Debug log
        setSolidityContract(contractText); // Update state
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Handle errors
      });
  };

  return (
    <div className="w-screen h-[2000px] bg-gradient-to-r from-green-400 to-green-700 flex flex-col items-center">
      <div className="flex flex-col items-center">
        <div className="font-bold font-sans text-center text-white text-5xl mt-10">
          EcoContractor AI
        </div>
        <div className="text-white font-bold mt-4 mb-4">
          Start generating green smart contracts like these!
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 justify-left mb-[100px]"
      >
        <div className="flex flex-col gap-3 items-left">
          <label className="text-orange-100 font-bold">Issuer: </label>
          <input
            {...register("issuer", { required: true, maxLength: 20 })}
            className="p-3 bg-slate-100 rounded-sm w-[350px]"
          />
          <label className="text-orange-100 font-bold">Buyer: </label>
          <input
            {...register("buyer", { required: true, maxLength: 20 })}
            className="p-3 bg-slate-100 rounded-sm"
          />
          <label className="text-orange-100 font-bold">Verifier: </label>
          <input
            {...register("verifier", { required: true, maxLength: 20 })}
            className="p-3 bg-slate-100 rounded-sm"
          />
          <label className="text-orange-100 font-bold">Location: </label>
          <input
            {...register("location", { required: true, maxLength: 20 })}
            className="p-3 bg-slate-100 rounded-sm"
          />
          <label className="text-orange-100 font-bold">Project Type: </label>
          <input
            {...register("project_type", { required: true, maxLength: 20 })}
            className="p-3 bg-slate-100 rounded-sm"
          />
          <label className="text-orange-100 font-bold">Certification: </label>
          <input
            {...register("certification", { required: true, maxLength: 20 })}
            className="p-3 bg-slate-100 rounded-sm"
          />
          <label className="text-orange-100 font-bold">
            Retirement Status:{" "}
          </label>
          <input
            {...register("retirement_status", {
              required: true,
              maxLength: 20,
            })}
            className="p-3 bg-slate-100 rounded-sm"
          />
        </div>
        <button
          type="submit"
          className="rounded bg-green-200 font-sans font-bold"
        >
          Generate Contract
        </button>
      </form>

      <div className="h-[1000px] bg-green-100 w-[800px] rounded-md p-4 overflow-auto">
        <pre className="text-sm font-mono whitespace-pre-wrap">
          {solidityContract}
        </pre>
      </div>
    </div>
  );
}

export default App;
