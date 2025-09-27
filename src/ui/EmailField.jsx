import { useId } from "react";

const EmailField = ({ value, onChange }) => {
  const id = useId();
  return (
    <div>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={value}
        onChange={onChange}
        className="peer w-full px-5 py-3 rounded-xl border border-gray-400  placeholder-transparent focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none transition duration-300 focus:text-purple-500 text-gray-500"
        required
        id={id}
      />
      <label
        htmlFor={id}
        className="absolute left-5 -top-2.5 text-gray-500 focus:text-purple-600 text-sm font-medium transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-purple-600 peer-focus:text-sm bg-white px-1"
      >
        Email
      </label>
    </div>
  );
};

export default EmailField;
