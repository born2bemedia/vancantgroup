"use client";
import React, { useState } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  useField,
  useFormikContext,
} from "formik";
import * as Yup from "yup";
import { usePopup } from "@/src/utils/PopupsContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReCAPTCHA from "react-google-recaptcha";

const CustomInput = React.forwardRef(
  ({ value, onClick, inputPlaceholder }, ref) => (
    <span
      className="custom-input"
      data-placeholder={inputPlaceholder}
      onClick={onClick}
      ref={ref}
    >
      <span>{value || inputPlaceholder}</span>
      <img src="/images/date.svg" />
    </span>
  )
);

const FormikDatePicker = ({ placeholder, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);
  return (
    <div>
      <DatePicker
        {...field}
        {...props}
        selected={field.value ? new Date(field.value) : null}
        onChange={(date) => setFieldValue(field.name, date)}
        customInput={<CustomInput inputPlaceholder={placeholder} />}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

function RequestPopup({
  requestPopup_title,
  requestPopup_namePlaceholder,
  requestPopup_emailPlaceholder,
  requestPopup_phonePlaceholder,
  requestPopup_projectPlaceholder,
  requestPopup_datePlaceholder,
  requestPopup_descriptionPlaceholder,
  requestPopup_acceptTerms,
  requestPopup_submitButton,
  requestPopup_successMessage,
  requestPopup_successDescription,
  validation_required,
  validation_email,
}) {
  const { requestPopupDisplay, setRequestPopupDisplay } = usePopup();
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [resetFormFunction, setResetFormFunction] = useState(() => () => {});

  const onCaptchaVerify = (token) => {
    setIsCaptchaVerified(!!token);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(validation_required),
    email: Yup.string().email(validation_email).required(validation_required),
    phone: Yup.string().required(validation_required),
    project: Yup.string().required(validation_required),
    acceptTermsRequest: Yup.boolean().oneOf([true], validation_required),
  });

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    project: "",
    description: "",
    date: null,
    acceptTermsRequest: false,
  };

  const closePopup = () => {
    setRequestPopupDisplay(false);
    resetFormFunction();
  };

  const handleSubmit = async (
    values,
    { setSubmitting, resetForm, setStatus }
  ) => {
    try {
      console.log('Submitting form with values:', values);
      
      const response = await fetch("/api/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      let data;
      const contentType = response.headers.get("content-type");
      console.log('Content-Type:', contentType);
      
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error('Received non-JSON response:', text);
        throw new Error('Server returned non-JSON response');
      }

      data = await response.json();
      console.log('Response data:', data);

      if (response.ok && data.success) {
        console.log('Form submission successful, resetting form...');
        resetForm();
        setStatus({ success: true });
        setSubmitting(false);
        setResetFormFunction(() => resetForm);
      } else {
        console.log('Form submission failed:', data);
        setStatus({ 
          success: false, 
          error: data.message || 'Failed to send message' 
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus({
        success: false,
        error: "An error occurred while sending the message",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={`request-popup-wrap ${requestPopupDisplay ? "opened" : ""}`}
    >
      <div className="overlay" onClick={() => closePopup()}></div>
      <div className="popup-inner">
        <svg
          className="popup-close"
          onClick={() => closePopup()}
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 18.5L2 2.5M18 2.5L2 18.5"
            stroke="#fff"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
        <div>
          <div className="form-wrap">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, status, touched, errors }) => (
                <Form>
                  {!status && (
                    <div className="form-inner">
                      <h2>{requestPopup_title}</h2>
                      <div>
                        <Field
                          name="name"
                          type="text"
                          placeholder={requestPopup_namePlaceholder}
                          className={
                            touched.name && errors.name ? "invalid" : ""
                          }
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="error"
                        />
                      </div>

                      <div>
                        <Field
                          name="email"
                          type="email"
                          placeholder={requestPopup_emailPlaceholder}
                          className={
                            touched.email && errors.email ? "invalid" : ""
                          }
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="error"
                        />
                      </div>

                      <div>
                        <Field
                          name="phone"
                          type="tel"
                          placeholder={requestPopup_phonePlaceholder}
                          className={
                            touched.phone && errors.phone ? "invalid" : ""
                          }
                        />
                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="error"
                        />
                      </div>

                      <div>
                        <Field
                          name="project"
                          type="text"
                          placeholder={requestPopup_projectPlaceholder}
                          className={
                            touched.project && errors.project ? "invalid" : ""
                          }
                        />
                        <ErrorMessage
                          name="project"
                          component="div"
                          className="error"
                        />
                      </div>

                      <div>
                        <FormikDatePicker
                          name="date"
                          placeholder={requestPopup_datePlaceholder}
                        />
                      </div>

                      <div className="full">
                        <Field
                          name="description"
                          as="textarea"
                          placeholder={requestPopup_descriptionPlaceholder}
                          className={
                            touched.description && errors.description
                              ? "invalid"
                              : ""
                          }
                        />
                        <ErrorMessage
                          name="description"
                          component="div"
                          className="error"
                        />
                      </div>

                      <div className="checkbox">
                        <Field
                          type="checkbox"
                          name="acceptTermsRequest"
                          id="acceptTermsRequest"
                        />
                        <label htmlFor="acceptTermsRequest">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="7" cy="7" r="6.5" stroke="#333333" />
                            <circle cx="7" cy="7" r="3" fill="#E74848" />
                          </svg>
                          <span>{requestPopup_acceptTerms}</span>
                        </label>
                        <ErrorMessage
                          name="acceptTermsRequest"
                          component="div"
                          className="error"
                        />
                        <ReCAPTCHA style={{margin: '12px auto', display: 'flex', justifyContent: 'center'}} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} onChange={onCaptchaVerify} />
                      </div>
                      <button
                        type="submit"
                        className="main-button"
                        disabled={isSubmitting || !isCaptchaVerified}
                      >
                        {requestPopup_submitButton}
                      </button>
                    </div>
                  )}
                  {status && status.success && (
                    <div className="success">
                      <img src="/images/success.svg" />
                      <h3>{requestPopup_successMessage}</h3>
                      <p>{requestPopup_successDescription}</p>
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestPopup;
