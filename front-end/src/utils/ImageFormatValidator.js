export const validImageFormats = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/jpg'];

export const ImageFormatValidator = (fileType) => {
  return validImageFormats.includes(fileType);
};