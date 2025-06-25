/* eslint-disable react/prop-types */
function InputField({
  id,
  label,
  type,
  placeholder,
  register,
  validation,
  error,
  onChange,
  autoComplete,
  defaultValue
}) {
  // Default handler: prevent negative numbers
  const defaultHandler = (e) => {
    if (type === "number") {
      const value = Number(e.target.value);
      if (value < 0) e.target.value = 0;
    }
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        id={id}
        defaultValue={defaultValue}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(id, validation)}
        onChange={onChange || defaultHandler}
        className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 shadow-sm ${
          error ? "border-red-500" : "border-gray-300"
        } focus:ring-green-500 focus:border-green-500`}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
}

export default InputField;
