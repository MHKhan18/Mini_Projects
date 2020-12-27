

let getNYdata = (response) => {
    for( item of response){
        if ( ( (item.Province).localeCompare("New York")) === 0){
            let city = item.City;
            let deaths = item.Deaths;
            
            let display = `City: ${city}, Deaths: ${deaths}`;
            let data = document.createElement('div');
            data.innerHTML = display;
            document.body.appendChild(data);
        } 
    }
}


var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
fetch("https://api.covid19api.com/country/united-states?from=2020-06-01T00:00:00Z&to=2020-06-02T00:00:00Z", requestOptions)
    .then(response => response.json())
    .then(response => getNYdata(response))
    .catch(error => console.log('error', error));