import React from "react";

/**
 * 
 * @param {Object} props - The component props.
 * @param {Function} props.register - The register function from a form library.
 * @param {string} props.name - The name of the input field.
 * @returns {JSX.Element} The TextArea component.
 */
const TextArea = ({ options, SideDecoration }) => {
  return (
    <div className="relative">
      <div className="flex items-start border focus-within:border-black rounded-md mb-1">
        <textarea
          //Aqui debe recibir las opciones del textarea
          {...options}
          className="w-full p-2 h-20 rounded-md focus:outline-none font-light"
        />
        {SideDecoration && <SideDecoration />}
      </div>
    </div>
  );
};

export default TextArea;