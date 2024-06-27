const ImagesList = ({ images, onSelect }) => {
  return (
    <div className="w-1/4 h-full overflow-y-auto border border-gray-200 p-2 rounded-md bg-white shadow-md">
      {images.length === 0 ? (
        <div className="text-gray-500">No images uploaded</div>
      ) : (
        images.map((image, index) => (
          <div 
            key={index} 
            className="mb-2 cursor-pointer border border-gray-300 rounded-md overflow-hidden" 
            onClick={() => onSelect(image)}
          >
            <img src={image.url} alt={`uploaded-${index}`} className="w-full h-auto" />
          </div>
        ))
      )}
    </div>
  );
};

export default ImagesList;
