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
  name: Yup.string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .test(
      "no-only-spaces",
      "Name cannot be just spaces",
      (val) => !!val?.trim()
    )
    .required("Please Enter name"),

  email: Yup.string()
    .trim()
    .matches(gmailRegex, "Please enter a valid Email")
    .email("Please Enter Valid Email")
    .test(
      "no-only-spaces",
      "Email cannot be just spaces",
      (val) => !!val?.trim()
    )
    .required("Please Enter Email"),

  phone: Yup.string()
    .trim()
    .matches(MOBILE_NUM_REGEX, "Enter a valid Phone number")
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits")
    .test(
      "no-only-spaces",
      "Phone number cannot be just spaces",
      (val) => !!val?.trim()
    )
    .required("Please Enter Phone number"),

  password: Yup.string()
    .trim()
    .matches(strongRegex, "Enter a Strong password")
    .min(5, "Password must be at least 5 characters")
    .test(
      "no-only-spaces",
      "Password cannot be just spaces",
      (val) => !!val?.trim()
    )
    .required("Please Enter password!"),

  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref("password")], "Password not matching")
    .test(
      "no-only-spaces",
      "Confirm password cannot be just spaces",
      (val) => !!val?.trim()
    )
    .required("Please Enter the confirm password!"),
});

export const CreatePostValidation = Yup.object({
  title: Yup.string()
    .transform((value) => value.trim()) // Trim input
    .min(3, "Title must be at least 3 characters")
    .required("Title is required")
    .test(
      "no-only-spaces",
      "Title cannot be just spaces",
      (value) => !!value && value.trim().length > 0
    ),

  description: Yup.string()
    .transform((value) => value.trim()) // Trim input
    .required("Description is required")
    .test(
      "no-only-spaces",
      "Description cannot be just spaces",
      (value) => !!value && value.trim().length > 0
    ),

  image: Yup.mixed()
    .required("Image is required")
    .test("fileType", "Unsupported File Format", (value) => {
      if (value && typeof value === "object" && "type" in value){
        return ["image/jpeg", "image/png", "image/webp"].includes(
          (value as File).type
        );
      }
      return false;
    }),
});
