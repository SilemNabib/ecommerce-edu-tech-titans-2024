/**
 * 
 * @param {Object} props - The component props.
 * @param {Function} props.register - The register function from a form library.
 * @param {string} props.name - The name of the input field.
 * @returns {JSX.Element} The TogglePassword component.
 */
const InputText = ({ options, SideDecoration, onChange, value }) => {
  return (
    <div className="relative">
      <div className="flex items-center border focus-within:border-black rounded-md mb-1">
        {onChange ? (
          <input
            {...options}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-2 rounded-md focus:outline-none font-light"
          />
          ) : (
          <input
            {...options}
            value={value}
            className="w-full p-2 rounded-md focus:outline-none font-light"
          />
        )}

        {SideDecoration && <SideDecoration />}
      </div>
    </div>
  );
};

export default InputText;
