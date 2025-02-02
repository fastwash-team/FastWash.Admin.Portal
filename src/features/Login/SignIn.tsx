import { Button, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
// import { apiClient } from "@/config/axios";
import { AiOutlineLoading } from "react-icons/ai";
import {
  InitiateLoginTypeResponse,
  useInitiateLogin,
} from "@/modules/hooks/mutations/auth/useInitiateLogin";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { ADMIN_VERIFY_AUTH } from "@/router/paths";

export const SignIn = () => {
  const navigate = useNavigate();
  const initiateLoginMutation = useInitiateLogin();
  const formik = useFormik({
    initialValues: {
      userId: "",
    },
    onSubmit: async (values) => {
      initiateLoginMutation?.mutate(
        {
          userId: values.userId,
          isSystemInitiated: true,
        },
        {
          onSuccess: () => {
            toast.success("A verification code has been sent to your inbox");
            navigate(`${ADMIN_VERIFY_AUTH}?email=${values?.userId}`);
          },
          onError: (error) => {
            toast?.error(
              (
                (error as AxiosError)?.response
                  ?.data as InitiateLoginTypeResponse
              )?.statusMessage
            );
          },
        }
      );
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
        <Button
          color="primary"
          type="submit"
          className="w-full cursor-pointer gap-5"
          size="xl"
          disabled={
            formik.values.userId === "" || initiateLoginMutation?.isPending
          }
        >
          {initiateLoginMutation?.isPending ? (
            <AiOutlineLoading className="h-6 w-6 animate-spin" />
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </div>
  );
};

