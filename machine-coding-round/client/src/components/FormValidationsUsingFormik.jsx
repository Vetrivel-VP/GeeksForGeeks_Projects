import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// validation schema using yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  mobile: Yup.string()
    .matches(/^\d{10}$/, "Mobile number must be 10 digits long")
    .required("Mobile number is required"),
  postalCode: Yup.string()
    .matches(/^\d{5}$/, "Postal Code must be 5 digits long")
    .required("Postal code is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&_])/,
      "Password must include atleast one uppercase letter, one lowercase letter, one number and one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords don't match")
    .required("Confirm your password"),
});

const FormValidationsUsingFormik = () => {
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="w-full">
      <div className="max-w-2xl mx-auto p-8 shadow-lg rounded-lg bg-gray-50">
        <h2 className=" text-xl text-center mb-6 text-gray-800">
          Form Validations Using Formik & Yup
        </h2>

        <Formik
          initialValues={{
            name: "",
            email: "",
            mobile: "",
            postalCode: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-6">
              <div className="flex flex-col">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <Field
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  className="form-input"
                />
                <ErrorMessage
                  name="name"
                  component={"p"}
                  className="form-error"
                />
              </div>

              {/* email */}
              <div className="flex flex-col">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="form-input"
                />
                <ErrorMessage
                  name="email"
                  component={"p"}
                  className="form-error"
                />
              </div>

              {/* mobile number */}
              <div className="flex flex-col">
                <label htmlFor="mobile" className="form-label">
                  Mobile Number
                </label>
                <Field
                  id="mobile"
                  name="mobile"
                  type="text"
                  placeholder="Enter your mobile number"
                  className="form-input"
                />
                <ErrorMessage
                  name="mobile"
                  component={"p"}
                  className="form-error"
                />
              </div>

              {/* postal code  */}

              <div className="flex flex-col">
                <label htmlFor="postalCode" className="form-label">
                  Postal Code
                </label>
                <Field
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  placeholder="Enter your postal code"
                  className="form-input"
                />
                <ErrorMessage
                  name="postalCode"
                  component={"p"}
                  className="form-error"
                />
              </div>

              {/* password */}
              <div className="flex flex-col">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="form-input"
                />
                <ErrorMessage
                  name="password"
                  component={"p"}
                  className="form-error"
                />
              </div>

              {/* confirmpassword */}
              <div className="flex flex-col">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Enter your password"
                  className="form-input"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component={"p"}
                  className="form-error"
                />
              </div>

              {/* submit button */}
              <button
                disabled={isSubmitting}
                type="submit"
                className="p-3 text-white bg-blue-500 hover:bg-blue-600 cursor-pointer"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormValidationsUsingFormik;
