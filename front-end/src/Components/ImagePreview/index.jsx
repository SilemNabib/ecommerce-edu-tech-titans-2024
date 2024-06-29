/**
 * Renders an image preview component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.selectedImage - The selected image object.
 * @param {string} props.selectedImage.url - The URL of the selected image.
 * @returns {JSX.Element} The rendered ImagePreview component.
 */
const ImagePreview = ({ selectedImage }) => {
  return (
    <div className="w-3/4 h-full border border-gray-200 rounded-md bg-white shadow-md flex items-center justify-center p-4">
      {selectedImage ? (
        <img src={selectedImage.url} alt="preview" className="max-w-full max-h-full" />
      ) : (
        <span className="text-gray-500">Image Preview</span>
      )}
    </div>
  );
};

export default ImagePreview;