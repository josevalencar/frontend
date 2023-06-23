import { BASE_URL, normalizeFilter } from "./Service";

export const getEsps = (filter) => {
    return new Promise((resolve, reject) => {
      fetch(`${BASE_URL}esps${ filter ? `?filter=${normalizeFilter(filter)}` : '' }`)
        .then((response) => response.json())
        .then(data => {     
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    }) 
}