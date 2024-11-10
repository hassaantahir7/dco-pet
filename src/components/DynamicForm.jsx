import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import avatar from "../data/placedolder_avatar.jpg";

const FormField = ({
  type,
  name,
  placeholder,
  text,
  buttonText,
  buttonOneText,
  buttonTwoText,
  error,
  options,
  onChange,
  value,
  isRow,
  customMargins,
  apiLoading,
  disabled,
  images,
  setImages,
}) => {
  const [selectedValue, setSelectedValue] = useState(
    useSelector((state) => state.students.studentInfo[name])
  );
  const [isChecked, setIsChecked] = useState(false);
  const [image, setImage] = useState(null);
  const fileInput = useRef();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  useEffect(() => {
    onChange(selectedValue);
  }, [selectedValue]);

  const handleChange = (event, type, multiple = false, index = null) => {
    if (type === "select" || type === "select-2") {
      setSelectedValue(event.target.value);
      onChange(event.target.value);
    } else if (type === "file") {
      if (multiple) {
        const files = Array.from(event.target.files);
        const images = files.map((file) => URL.createObjectURL(file));
        setImages(images);
        onChange(files);
      } else {
        const file = event.target.files[0];
        setImage(URL.createObjectURL(file));
        onChange(file);
      }
    } else if (type === "phone") {
      onChange(event);
    } else if (type === "checkbox") {
      onChange(event.target.checked);
    } else if (type === "token") {
      const newOtp = [...otp];
      newOtp[index] = event.target.value;
      setOtp(newOtp);
      console.log(newOtp);
      onChange(newOtp.join(""));
    } else {
      onChange(event.target.value);
    }
  };

  switch (type) {
    case "text":
    case "number":
    case "email":
    case "password":
    case "confirmedPassword":
      return (
        <div
          className={`${
            isRow ? `w-1/2 ${customMargins}` : "md:flex"
          } md:items-center mb-6`}
        >
          <div className="w-full">
            <label
              className="block text-gray-700 font-semibold mb-2 pr-4"
              htmlFor={name}
            >
              {placeholder}
            </label>
            <input
              name={name}
              className={`bg-white appearance-none border border-gray-300 
                            rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none
                            focus:border-gray-600 ${
                              disabled ? "bg-gray-100 cursor-not-allowed" : ""
                            }`}
              type={type === "confirmedPassword" ? "password" : type}
              placeholder={placeholder}
              value={value || ""}
              onChange={(event) => handleChange(event, "text")}
              disabled={disabled}
            />
            {error && (
              <p className="text-red-500 pt-2 text-xs italic">{error}</p>
            )}
          </div>
        </div>
      );
    case "hidden":
      return (
        <input
          name={name}
          className={`bg-white appearance-none border-1 border-gray-200 
                    rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none
                    focus:border-gray-600 ${
                      disabled ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
          type={type}
          placeholder={placeholder}
          value={value || ""}
          onChange={(event) => handleChange(event, "text")}
          disabled={disabled}
        />
      );
    case "tel":
      return (
        <div className="md:flex md:items-center mb-6">
          <div className="w-full">
            <label
              className="block text-gray-700 font-semibold mb-2 pr-4"
              htmlFor={name}
            >
              {placeholder}
            </label>
            <PhoneInput
              name={name}
              value={value}
              onChange={(event) => handleChange(event, "phone")}
              country={"ae"}
              onlyCountries={["us", "pk", "ae", "in", "sa", "lk", "bd"]}
              containerStyle={{ width: "100%" }}
              inputStyle={{ width: "100%", borderColor: "#E5E7EB" }}
              placeholder={placeholder}
            />
            {error && (
              <p className="text-red-500 pt-2 text-xs italic">{error}</p>
            )}
          </div>
        </div>
      );
    case "forgotPassword":
      return (
        <div className="md:flex md:items-center mb-6">
          <div className="w-full text-right">
            <Link
              to="/auth/forgot-password"
              className="text-blue-500 font-semibold hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      );
    case "token":
      return (
        <div className="md:flex md:items-center mb-6">
          <div className="w-full flex flex-col space-y-2">
            <div className="flex justify-start space-x-4">
              {otp.map((value, index) => (
                <div key={index} className="flex flex-col items-left">
                  <input
                    type="text"
                    maxLength="1"
                    className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={value || ""}
                    onChange={(event) =>
                      handleChange(event, "token", false, index)
                    }
                  />
                </div>
              ))}
            </div>
            {error && (
              <p className="text-red-500 pt-2 text-xs italic">{error}</p>
            )}
          </div>
        </div>
      );
    case "textarea":
      return (
        <div className="md:flex md:items-center mb-6">
          <div className="w-full">
            <label
              className="block text-gray-700 font-semibold mb-2 pr-4"
              htmlFor={name}
            >
              {placeholder}
            </label>
            <textarea
              name={name}
              className="bg-white appearance-none border border-gray-300 
                            rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none
                            focus:border-gray-600"
              placeholder={placeholder}
              value={value}
              rows={5}
              onChange={(event) => handleChange(event, "text")}
            />
            {error && (
              <p className="text-red-500 pt-2 text-xs italic">{error}</p>
            )}
          </div>
        </div>
      );
    case "checkbox":
      return (
        <div className="md:flex md:items-center mb-6">
          <div className="w-full">
            <label className="block text-gray-500">
              <div className="checkbox-container">
                <input
                  name={name}
                  className="checkbox mr-2 leading-tight"
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {
                    setIsChecked(!isChecked);
                    handleChange(
                      { target: { checked: !isChecked } },
                      "checkbox"
                    );
                  }}
                />
                <span
                  className={`checkbox-custom ${isChecked ? "bg-green" : ""}`}
                ></span>
              </div>
              <span
                className="text-xs"
                dangerouslySetInnerHTML={{ __html: text }}
              ></span>
            </label>
            {error && (
              <p className="text-red-500 pt-2 text-xs italic">{error}</p>
            )}
          </div>
        </div>
      );
    case "imageUpload":
      return (
        <div className="mb-6">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gray-200 mr-4 rounded-full">
              {image && (
                <img
                  src={image}
                  alt="Profile"
                  className="w-full h-full rounded-full"
                />
              )}
            </div>
            <input
              name={name}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInput}
              onChange={(event) => handleChange(event, "file")}
            />
            <button
              className="profileButton border border-gray-300 text-gray-500 
                                hover:bg-gray-200 focus:outline-none py-2 px-4 rounded"
              type="button"
              onClick={() => fileInput.current.click()}
            >
              {buttonText}
            </button>
          </div>
          {error && <p className="text-red-500 pt-2 text-xs italic">{error}</p>}
        </div>
      );
    case "multipleImageUpload":
      return (
        <div className="mb-6">
          <div className="flex items-center mb-6">
            <input
              name={name}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInput}
              onChange={(event) => handleChange(event, "file", true)}
              multiple
            />
            <button
              className="profileButton border border-gray-300 text-gray-500 
                                hover:bg-gray-200 focus:outline-none py-2 px-4 rounded"
              type="button"
              onClick={() => fileInput.current.click()}
            >
              {buttonText}
            </button>
          </div>
          <div className="flex flex-wrap">
            {images &&
              images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Profile ${index}`}
                  className="w-16 h-16 m-1"
                />
              ))}
          </div>
          {error && <p className="text-red-500 pt-2 text-xs italic">{error}</p>}
        </div>
      );
    case "select":
      return (
        <div className={`${isRow ? `w-1/2 ${customMargins}` : "w-full"} mb-6`}>
          <label
            className="block text-gray-700 font-semibold mb-2 pr-4"
            htmlFor={name}
          >
            {placeholder}
          </label>
          <div className="relative inline-flex w-full">
            <svg
              className="w-2.5 h-2.5 absolute top-[-0.2rem] right-0 m-4 
                            pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 412 232"
            >
              <path
                d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.762-9.763 25.591 0 35.354l181 181c9.763 9.763 25.592 9.763 35.355 0l181-181c9.762-9.763 9.762-25.592 0-35.354-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                fill="#01563F"
                fillRule="nonzero"
              />
            </svg>
            <select
              className="border border-gray-300 rounded text-gray-500 
                            h-8.5 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none 
                            appearance-none w-full"
              id={name}
              name={name}
              value={selectedValue || ""}
              onChange={(event) => handleChange(event, "select")}
            >
              {options.map((option, index) => (
                <option
                  key={index}
                  value={name === "course_name" ? option.value : option.id}
                >
                  {option.value}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
    case "select-2":
      return (
        <div className={`${isRow ? `w-1/2 ${customMargins}` : "w-full"} mb-6`}>
          <label
            className="block text-gray-700 font-semibold mb-2 pr-4"
            htmlFor={name}
          >
            {placeholder}
          </label>
          <div className="relative inline-flex w-full">
            <svg
              className="w-2.5 h-2.5 absolute top-[-0.2rem] right-0 m-4 
                            pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 412 232"
            >
              <path
                d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.762-9.763 25.591 0 35.354l181 181c9.763 9.763 25.592 9.763 35.355 0l181-181c9.762-9.763 9.762-25.592 0-35.354-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                fill="#01563F"
                fillRule="nonzero"
              />
            </svg>
            <select
              className="border border-gray-300 rounded text-gray-500 
                            h-8.5 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none 
                            appearance-none w-full"
              id={name}
              name={name}
              value={selectedValue || ""}
              onChange={(event) => handleChange(event, "select-2")}
            >
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
      return (
        <div className="md:flex md:items-center mb-6">
          <div className="w-full">
            <label className="block text-gray-700 font-semibold mb-2 pr-4">
              {placeholder}
            </label>
            <Calendar />
          </div>
        </div>
      );
    case "button":
      return (
        <div className="md:flex md:items-center">
          <button
            className="w-1/4 shadow bg-blue-600 hover:bg-dark-green 
                    focus:shadow-outline focus:outline-none text-white  
                    py-3 px-4 rounded-md"
            type="submit"
          >
            {buttonText}
          </button>
        </div>
      );
    case "buttons":
      return (
        <div>
          <div className="flex md:items-center justify-between">
            <button
              className="w-1/2 shadow bg-transparent hover:bg-dark-green border border-gray-300 
                        focus:shadow-outline focus:outline-none text-green  
                        py-2 px-4 rounded green-border"
            >
              {buttonOneText}
            </button>

            <button
              className="w-1/2 shadow bg-green hover:bg-dark-green 
                        focus:shadow-outline focus:outline-none text-white  
                        py-2 px-4 rounded ml-2"
              type="submit"
            >
              {buttonTwoText}
            </button>
          </div>
        </div>
      );
    default:
      return null;
  }
};

const DynamicForm = ({
  fields,
  formData,
  errors,
  onChange,
  onSubmit,
  customClasses,
  isMaxWidth,
  teacherList,
  apiLoading,
  foundTeacher,
  images,
  setImages,
}) => {
  let skipNext = false;

  const containerClass = isMaxWidth ? "" : "max-w-md";

  return (
    <form
      className={`w-full ${containerClass} ${
        customClasses ? customClasses : "pt-10"
      }`}
      onSubmit={onSubmit}
    >
      {fields.map((field, index) => {
        if (skipNext) {
          skipNext = false;
          return null;
        }

        if (field.isRow && fields[index + 1] && fields[index + 1].isRow) {
          skipNext = true;
          return (
            <div
              key={field.name || field.text || field.buttonText}
              className="flex"
            >
              <FormField
                {...field}
                value={formData[field.name]}
                onChange={(value) => onChange(field.name, value)}
                error={errors[field.name]}
                teacherList={teacherList}
                apiLoading={apiLoading}
                foundTeacher={foundTeacher}
              />
              <FormField
                {...fields[index + 1]}
                value={formData[fields[index + 1].name]}
                onChange={(value) => onChange(fields[index + 1].name, value)}
                error={errors[fields[index + 1].name]}
                teacherList={teacherList}
                apiLoading={apiLoading}
                foundTeacher={foundTeacher}
              />
            </div>
          );
        } else {
          return (
            <div key={field.name || field.text || field.buttonText}>
              <FormField
                {...field}
                value={formData[field.name]}
                onChange={(value) => onChange(field.name, value)}
                error={errors[field.name]}
                teacherList={teacherList}
                apiLoading={apiLoading}
                foundTeacher={foundTeacher}
                images={images}
                setImages={setImages}
              />
            </div>
          );
        }
      })}
    </form>
  );
};

export default React.memo(DynamicForm);
