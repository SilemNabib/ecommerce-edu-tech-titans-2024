import { useState } from 'react';

/**
 * A custom select component.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.options - The array of options for the select.
 * @param {string} props.placeholder - The placeholder text for the select.
 * @param {string} props.className - The additional CSS class name for the select.
 * @returns {JSX.Element} The rendered Select component.
 */
const Select = ({ options, placeholder, className, onChange, value }) => {
  const [selectedOption, setSelectedOption] = useState(value);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <select
      value={selectedOption}
      onChange={handleChange}
      className={`block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 ${className}`}
    >
      <option value="">{placeholder}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
