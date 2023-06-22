const BASE_URL = 'https://sfqlqf-3000.csb.app/v1/';

const normalizeFilter = (filter) => {
    let stringfiedFilter = '';
    if(filter) {
        if(typeof filter == 'string'){
            if(filter.includes('=')){
                stringfiedFilter = filter
            }else {
                stringfiedFilter = `filter=${filter}`
            }
        } else if(typeof filter == 'object'){
            stringfiedFilter = Object.entries(filter).map(entrie => {
                return `${entrie[0]}=${entrie[1]}`
            }).join('&');
        }
    }
    return stringfiedFilter;
}

export const getSetoresWithEsps = (filter) => {
    return new Promise((resolve, reject) => {
      fetch(`${BASE_URL}sectors/esps${ filter ? `?${normalizeFilter(filter)}` : '' }`)
        .then((response) => response.json())
        .then(data => {     
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    }) 
}

export const getSetores = (filter) => {
    return new Promise((resolve, reject) => {
      fetch(`${BASE_URL}sectors${ filter ? `?filter=${normalizeFilter(filter)}` : '' }`)
        .then((response) => response.json())
        .then(data => {     
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    }) 
  }

export const postSetor = (setor) => {
    return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}sectors`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(setor)
    })
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
}

export const putSetor = (id, setor) => {
    return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}sectors/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(setor)
    })
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
}

export const deleteSetor = (id) => {
    return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}sectors/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
}