import { z, ZodType } from "zod";
import "./App.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: string;
  confirmPassword: string;
};

function App() {
  const schema: ZodType<FormData> = z
    .object({
      firstName: z.string().min(2).max(30),
      lastName: z.string().min(2).max(30),
      email: z.string().email(),
      age: z.number().min(18).max(80),
      password: z.string().min(5).max(20),
      confirmPassword: z.string().min(5).max(20),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not Match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      age: 0,
      password: "",
      confirmPassword: "",
    },
  });

  const submitData = (data: FormData) => {
    if (Object.keys(errors).length > 0) {
      // Show a toast notification for each error
      Object.values(errors).forEach((error) => {
        toast.error(error.message);
      });
    } else {
      console.log("It worked", data);
      // Optionally, reset the form after successful submission
      reset();
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(submitData)}>
        <label>First Name :</label>
        <input type="text" {...register("firstName")} />
        <label>Last Name :</label>
        <input type="text" {...register("lastName")} />
        <label>Email :</label>
        <input type="email" {...register("email")} />
        <label>Age :</label>
        <input type="number" {...register("age", { valueAsNumber: true })} />
        <label>Password :</label>
        <input type="password" {...register("password")} />
        <label>Confirm Password :</label>
        <input type="password" {...register("confirmPassword")} />
        <button type="submit" className="submit">
          Submit
        </button>
        <button type="button" onClick={() => reset()} className="reset">
          Reset
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default App;
