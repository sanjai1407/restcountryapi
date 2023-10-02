fetch("https://restcountries.com/v3.1/all")

   .then((request) => request.json())
   .then((call) => {

      let lists = `<tr><th>S.No</th><th>Countries</th><th>Capital</th><th>Population</th><th>Currencies</th><th>Flags</th><th>Details</th></tr>`;

      call.forEach((file, i) => {
         lists += `<tr>
         <td>${i + 1}</td>
         <td>${file.name.common} </td>
         <td>${file.capital}</td>
         <td>${file.population.toLocaleString()}</td>
         <td>${file.currencies ? Object.values(file.currencies)[0].symbol : "-"}</td> 
         <td><img src = "${file.flags.png}"></td>              
         <td>
            <button class="detail" onclick="allCountryDetails(${i})">  
               More details
            </button>
         </td>
      </tr>`;
      });

      document.getElementById("countries").innerHTML = lists;
      //console.log(lists);

   });

function searchPanel() {
   var input, filter, table, tr, td, cell, i, j;
   input = document.getElementById("country-input");
   filter = input.value.toUpperCase();
   table = document.getElementById("countries");
   tr = table.getElementsByTagName("tr");
   for (i = 1; i < tr.length; i++) {
      tr[i].style.display = "none";

      td = tr[i].getElementsByTagName("td");
      for (var j = 0; j < td.length; j++) {
         cell = tr[i].getElementsByTagName("td")[j];
         if (cell) {
            if (cell.innerHTML.toUpperCase().indexOf(filter) > -1) {
               tr[i].style.display = "";
            }
         }
      }
   }
}

var modalbox = document.getElementById("popups");

function allCountryDetails(i) {
   fetch("https://restcountries.com/v3.1/all")
      .then((request) => request.json())
      .then((call) => {
         document.getElementById("flag").innerHTML = `<img src="${call[i].flags.png}" class="flag-image">`;
         document.getElementById("countryname").innerHTML = `<h3>${call[i].name.common}</h3>`;
         document.getElementById("countrycapital").innerHTML = call[i].capital;
         document.getElementById("population").innerHTML = call[i].population.toLocaleString();
         document.getElementById("currencyname").innerHTML = (call[i].currencies[Object.keys(call[i].currencies)].name);
         document.getElementById("currencysymbol").innerHTML = (call[i].currencies[Object.keys(call[i].currencies)].symbol);
         document.getElementById("longitude").innerHTML = call[i].latlng[1];
         document.getElementById("latitude").innerHTML = call[i].latlng[0];
      })
   modalbox.style.display = "block";
}

var closebutton = document.getElementById("buttonclose");

closebutton.addEventListener('click', closemodalbox);

function closemodalbox() {
   modalbox.style.display = "none";
}
