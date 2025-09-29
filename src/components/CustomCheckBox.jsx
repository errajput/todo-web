"use client";

const CustomCheckbox = ({ onChange, checked }) => {
  return (
    <label className="relative">
      <input
        type="checkbox"
        onChange={onChange}
        checked={checked}
        className="w-3 h-3 sm:w-4 sm:h-4 cursor-pointer appearance-none
        text-center
          border border-purple-400 rounded
          checked:bg-purple-400
          checked:border-purple-400
          checked:[&::after]:content-['✔']
          checked:[&::after]:text-purple-700
          checked:[&::after]:block
          checked:[&::after]:text-xs"
      />
    </label>
  );
};
export default CustomCheckbox;
