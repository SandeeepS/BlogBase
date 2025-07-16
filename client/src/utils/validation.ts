import * as Yup from "yup";
import {
  gmailRegex,
  MOBILE_NUM_REGEX,
  strongRegex,
} from "../../src/constants/commonConstants";

export const LoginValidation = Yup.object({
  email: Yup.string()
    .email("please Enter a valid Email Address!")
    .trim()
    .required("please Enter Email!"),
    
  password: Yup.string().trim().required("please Enter your password!"),
});

export const SignupValidation = Yup.object({
  name: Yup.string().min(3).required("Please Enter name"),
  email: Yup.string()
    .matches(gmailRegex, "Please enter a valid Email")
    .email("Please Enter Valid Email")
    .required("please Enter Email"),
  phone: Yup.string()
    .matches(MOBILE_NUM_REGEX, "Enter a valid Phone number")
    .min(10)
    .max(10)
    .required("Please Enter Phone number"),
  password: Yup.string()
    .matches(strongRegex, "Enter a Strong password")
    .min(5,"Password must be at least 5 characters")
    .required("please Enter password!"),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password not matching")
    .required("please Enter the confirm password!"),
});
