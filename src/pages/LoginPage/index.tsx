import { Button, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { apiClient } from "@/config/axios";

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      userId: "",
    },
    onSubmit: async (values) => {
      await apiClient.post("/api/Authentication/login/initiate", {
        userId: values.userId,
        isSystemInitiated: true,
      });
    },
  });

  return (
    <div className="space-y-2 mt-10">
      <div className="space-y-1">
        <h4 className="font-semibold text-4xl">Login</h4>
        <p className="text-gray mt-1">
          Log into your account with your email or phone number
        </p>
      </div>
      <form onSubmit={formik.handleSubmit} className="mt-10 w-full">
        <div className="mb-8">
          <Label htmlFor="userId" value="Email or Phone" />
          <TextInput
            id="userId"
            name="userId"
            placeholder="Enter email or phone number"
            sizing="lg"
            onChange={formik.handleChange}
            value={formik.values.userId}
          />
        </div>
        <Button color="primary" type="submit" className="w-full" size="xl">
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
