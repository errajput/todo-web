"use client";

const CustomCheckbox = ({ onChange, checked }) => {
  return (
    <label className="relative flex items-center">
      <input
        type="checkbox"
        onChange={onChange}
        checked={checked}
        className="w-5 h-5  cursor-pointer appearance-none
               border border-purple-400 rounded
               checked:bg-purple-400
               checked:border-purple-400
               checked:[&::after]:content-['✔']
               checked:[&::after]:text-purple-700
               checked:[&::after]:block
               checked:[&::after]:text-lg
               flex items-center justify-center"
      />
    </label>
  );
};
export default CustomCheckbox;
