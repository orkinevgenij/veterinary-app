import cloudinaryModule from 'cloudinary';

const cloudinary = cloudinaryModule.v2;

cloudinary.config({
  cloud_name: 'orkinevgenij',
  api_key: '819829142245664',
  api_secret: 'nUggKcIq3CnebD8wNXO_5XI_1X0',
});

export default cloudinary;
