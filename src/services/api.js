import axios from 'axios';

const fetchGallery = async ({ searchQuery = '', currentPage = 1 }) => {
  const API_KEY = '27295449-3daac49b31b72326d27830ec0';
  return await axios
    .get(
      `https://pixabay.com/api/?q=${encodeURIComponent(
        searchQuery
      )}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then(response => response.data);
};

export default fetchGallery;
