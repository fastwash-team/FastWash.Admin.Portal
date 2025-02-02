import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { AiOutlineLoading } from "react-icons/ai";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { verifyAuthSchema } from "@/features/VerifyAuth/validations/verifyAuth.validations";
import {
  CompleteLoginTypeResponse,
  useCompleteLogin,
} from "@/modules/hooks/mutations/auth/useCompleteLogin";
import { useNavigate, useSearchParams } from "react-router";
import {
  ADMIN_DASHBOARD,
  ADMIN_LOGIN,
} from "@/router/paths";
import {
  InitiateLoginTypeResponse,
  useInitiateLogin,
} from "@/modules/hooks/mutations/auth/useInitiateLogin";
import { fastWashCookies } from "@/utils/libs";

export const Verify = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryParam = searchParams?.get("email");
  const queryParamExists =
    queryParam !== "" && queryParam !== undefined && queryParam !== null;

  const completeLoginMutation = useCompleteLogin();
  const initiateLoginMutation = useInitiateLogin();
  const Cookies = fastWashCookies();

  const formik = useFormik({
    initialValues: {
      passcode: "",
    },
    onSubmit: async (values) => {
      completeLoginMutation?.mutate(
        {
          passCode: values.passcode,
        },
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onSuccess: (res: any) => {
            Cookies.set(
              "tk",
              (res as CompleteLoginTypeResponse)?.responseObject?.access_token
            );
            navigate(ADMIN_DASHBOARD);
          },
          onError: (error) => {
            toast?.error(
              (
                (error as AxiosError)?.response
                  ?.data as CompleteLoginTypeResponse
              )?.statusMessage
            );
          },
        }
      );
    },
    validationSchema: verifyAuthSchema,
  });

  const {
    handleSubmit,
    handleChange,
    values,
    handleBlur,
    errors,
    touched,
    dirty,
    isValid,
  } = formik;

  const handleResendEmail = () => {
    initiateLoginMutation?.mutate(
      {
        userId: `${queryParam}`,
        isSystemInitiated: true,
      },
      {
        onSuccess: () => {
          toast.success("A verification code has been sent to your inbox");
        },
        onError: (error) => {
          toast?.error(
            ((error as AxiosError)?.response?.data as InitiateLoginTypeResponse)
              ?.statusMessage
          );
        },
      }
    );
  };

  const isDisabled =
    initiateLoginMutation?.isPending ||
    completeLoginMutation?.isPending ||
    !(isValid && dirty);

  const isLoading = completeLoginMutation?.isPending;

  return (
    <div className="space-y-2 mt-10">
      <div className="space-y-1">
        <h4 className="font-semibold text-4xl">Enter Code</h4>
        <p className="text-gray mt-1">
          Enter code that was sent to your email or phone number
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mt-10 w-full">
        <div className="mb-8">
          <Label htmlFor="passcode" value="Code" />
          <TextInput
            id="passcode"
            name="passcode"
            placeholder="Enter 6 digit code"
            sizing="lg"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.passcode}
            color={errors?.passcode && touched?.passcode ? "failure" : "gray"}
            helperText={
              <>
                <span className="font-medium text-xs text-[#FF3B30]">
                  {errors?.passcode}
                </span>
              </>
            }
          />
        </div>
        <Button
          color="primary"
          type="submit"
          className="w-full cursor-pointer"
          size="xl"
          disabled={isDisabled}
        >
          {isLoading ? (
            <AiOutlineLoading className="h-6 w-6 animate-spin" />
          ) : (
            "Take me in"
          )}
        </Button>
      </form>
      <div className="flex w-full items-center justify-center text-center">
        <p className="text-sm leading-[21px] ">
          Didn’t get code?{" "}
          <b
            onClick={() => {
              if (queryParamExists) {
                handleResendEmail();
              } else {
                navigate(ADMIN_LOGIN);
              }
            }}
            className="font-bold cursor-pointer text-[#17499F] gap-2"
          >
            Resend{" "}
            {initiateLoginMutation?.isPending && (
              <Spinner size="xs" aria-label="small-spinner" />
            )}
          </b>
        </p>
      </div>
    </div>
  );
};
