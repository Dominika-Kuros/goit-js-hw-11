import Notiflix from "notiflix";
import axios from "axios";



export const fetchPictures = async (value, page) => {
    try {
  const response = await axios.get(`https://pixabay.com/api/?key=35131902-21fe985f596ef482772d7ac91&q=${value}&page=${page}&per_page=40&image_type=photo&orientation=horizontal&safesearch=true`)
      return response.data;
    }
    
    catch(error) {
        console.error(error);
        Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");
        
  };
}



