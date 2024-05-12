//Back to top
var backToTopLink = document.createElement('a');
backToTopLink.href = '#top';
backToTopLink.innerHTML = 'Torna a dalt';
backToTopLink.classList.add('back-to-top-link');
document.body.appendChild(backToTopLink);


google.charts.load('current', {
    'packages':['geochart'],
  });
  google.charts.setOnLoadCallback(drawRegionsMap);
  
  function drawRegionsMap() {
    var data = google.visualization.arrayToDataTable([
      ['País', 'Dies'],
      ['France', 60],
      ['Italy', 47],
      ['Greece', 91],
      ['Spain', 4],
      ['', 0],
      ['', 100]
    ]);
  
    var options = {
      region: '150', 
    };
  
    var chart = new google.visualization.GeoChart(document.getElementById('mapa_div'));
  
    chart.draw(data, options);
}






function creartitol(Id, textContent) {
  var paragraf = document.createElement("p");
  var text = document.createTextNode(textContent);
  paragraf.appendChild(text);
  paragraf.classList.add('titol');

  document.getElementById(Id).appendChild(paragraf);
}

function creartitolclass(Id, textContent, classe) {
  var paragraf = document.createElement("p");
  var text = document.createTextNode(textContent);
  paragraf.appendChild(text);
  paragraf.classList.add(classe);

  var parentElement = document.getElementById(Id);
  parentElement.appendChild(paragraf);
}


function crearimatges(Id, boldContent, textContent, imageUrl) {
  var paragraf = document.createElement("p");

  var img = document.createElement("img");
  img.src = imageUrl;
  img.className = 'icones';
  img.setAttribute("loading", "lazy"); // Afegeix l'atribut per càrrega mandrosa

  paragraf.appendChild(img);

  var strong = document.createElement("strong");
  var strongText = document.createTextNode(boldContent);
  strong.appendChild(strongText);
  paragraf.appendChild(strong);

  var text = document.createTextNode(textContent);
  paragraf.appendChild(text);
  paragraf.classList.add('text_icones');

  document.getElementById(Id).appendChild(paragraf);
}


fetch('cases.txt')
    .then(response => response.text())
    .then(rawData => {
        const lines = rawData.split('\n');
        lines.forEach((line, index) => {
            const [id, nom, host, nits, companys, truites] = line.split('.');

            creartitol(id, nom)

            crearimatges(id, "Host: ", host, "../../Icones/host.png")
            crearimatges(id, "Nits: ", nits, "../../Icones/nits.png")
            crearimatges(id, "Truites: ", truites, "../../Icones/truita.png")

            if (id === "1") {
              crearimatges(id, "Companys: ", "", "../../Icones/companys.png")
              imprimirLiniesDesitjades([1,2,3], id);

          } else if (id === "2") {
            crearimatges(id, "Companys: ", "", "../../Icones/companys.png")
            imprimirLiniesDesitjades([4,5,6,7], id);
              
          } else if (id === "3") {
            crearimatges(id, "Companys: ", "", "../../Icones/companys.png")
            imprimirLiniesDesitjades([8,9], id);
              
          } else if (id === "5") {
            crearimatges(id, "Companys: ", "", "../../Icones/companys.png")
            imprimirLiniesDesitjades([10,11,12,13,14,15,16,17,18,19,20], id);
              
          } else if (id === "7") {
            crearimatges(id, "Companys: ", "", "../../Icones/companys.png")
            imprimirLiniesDesitjades([21], id);

          } else if (id === "8") {
            crearimatges(id, "Companys: ", "", "../../Icones/companys.png")
            imprimirLiniesDesitjades([22], id);

          } else if (id === "13") {
            crearimatges(id, "Companys: ", "", "../../Icones/companys.png")
            imprimirLiniesDesitjades([23], id);

              
          } else {
          }

        });
    })
    .catch(error => {
        console.error('Error al cargar el archivo:', error);
});





function imprimirLiniesDesitjades(liniesDesitjades, id) {  
  fetch('companys.txt')
    .then(response => response.text())
    .then(text => {
      var liniesArray = text.split('\n');
      liniesDesitjades.forEach(function(index) {
        if (index >= 0 && index < liniesArray.length) {
          creartitolclass(id, liniesArray[index-1], 'companys_text');
        }
      });
    })
    .catch(error => console.error('Error:', error));
}
