import * as Yup from "yup";

const containsNumbersRegex = /^\d+$/;

export const verifyAuthSchema = Yup.object({
  passcode: Yup.string()
    .required("Please enter your passcode")
    .trim("Passcode cannot contain spaces")
    .length(6, "Passcode must be 6 digits")
    .matches(containsNumbersRegex, {
      message: "Your passcode should only contain numbers",
      excludeEmptyString: true,
    })
    .test(
      "passcode",
      "Your passcode can only contain numbers",
      (value) => !Number.isNaN(Number(value))
    ),
});
