var redIcon = L.icon({
    iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png',
    shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});  

var greenIcon = L.icon({
    iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
    shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});  

function crearmapa(id, nom, zoom) {
    var map = L.map(id, { zoomControl: true });

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

    var gpxLayer = omnivore.gpx(nom).addTo(map);

    gpxLayer.on('ready', function() {
    map.fitBounds(gpxLayer.getBounds());

    map.setZoom(map.getZoom() - zoom);

    var coordinates = [];
    gpxLayer.eachLayer(function(layer) {
        if (layer.getLatLng) {
            coordinates.push(layer.getLatLng());
        } else if (layer.getLatLngs) {
            coordinates = coordinates.concat(layer.getLatLngs());
        }
    });

    L.marker(coordinates[0], {icon: greenIcon}).addTo(map).bindPopup("Sortida");
    L.marker(coordinates[coordinates.length - 1], {icon: redIcon}).addTo(map).bindPopup("Arribada");

    });
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
    var firstChild = parentElement.firstChild; // Obté el primer fill del div

    parentElement.insertBefore(paragraf, firstChild);
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

function crearcomentari(Id, boldContent, textContent, imageUrl) {
    var paragraf = document.createElement("p");

    var img = document.createElement("img");
    img.src = imageUrl;
    img.className = 'icones';

    paragraf.appendChild(img);

    var strong = document.createElement("strong");
    var strongText = document.createTextNode(boldContent);
    strong.appendChild(strongText);
    paragraf.appendChild(strong);

    paragraf.appendChild(document.createElement("br")); // Afegir un salt de línia
    paragraf.appendChild(document.createElement("br")); // Afegir un salt de línia

    var text = document.createTextNode(textContent);
    paragraf.appendChild(text);
    paragraf.classList.add('text_icones');

    document.getElementById(Id).appendChild(paragraf);
}

function generarHTML(id) {
    // Crear el div amb la classe 'titols' i l'id 'titol1'
    var titolDiv = document.createElement("div");
    titolDiv.className = "titols";
    titolDiv.id = `titol${id}`;

    // Crear el div amb la classe 'informacio'
    var informacioDiv = document.createElement("div");
    informacioDiv.className = "informacio";

    // Crear el div amb la classe 'mapa' i l'id 'mapa1'
    var mapaDiv = document.createElement("div");
    mapaDiv.className = "mapa";
    mapaDiv.id = `mapa${id}`;

    // Crear el div amb la classe 'map-text' i l'id 'mapText1'
    var mapTextDiv = document.createElement("div");
    mapTextDiv.className = "map-text";
    mapTextDiv.id = `mapText${id}`;

    // Crear el div amb la classe 'fotos' i l'id 'fotos1'
    var fotosDiv = document.createElement("div");
    fotosDiv.className = "fotos";
    fotosDiv.id = `fotos${id}`;

    // Crear el div amb la classe 'gallery' i l'id 'gallery1'
    var galleryDiv = document.createElement("div");
    galleryDiv.className = "gallery";
    galleryDiv.id = `gallery${id}`;

    // Afegir els elements creats al div amb la classe 'map-section'
    var mapSectionDiv = document.querySelector(".map-section");
    mapSectionDiv.appendChild(titolDiv);
    mapSectionDiv.appendChild(informacioDiv);
    informacioDiv.appendChild(mapaDiv);
    informacioDiv.appendChild(mapTextDiv);
    informacioDiv.appendChild(fotosDiv);
    fotosDiv.appendChild(galleryDiv);

}

function crearMedia(numeroArgument, cadenamedia, id) {
    var numero = parseInt(numeroArgument);
    var arrayCadenes = cadenamedia.split(",");

    for (var i = 0; i < numero; i++) {
        var nouElement;
        if (arrayCadenes[i].endsWith("mp4") || arrayCadenes[i].endsWith("avi") || arrayCadenes[i].endsWith("mov") || arrayCadenes[i].endsWith("MP4")) {
            // Si l'extensió és de vídeo, crea un element de vídeo
            nouElement = document.createElement("video");
            nouElement.src = "../5.Correr/Videos/" + id + "/" + (i + 1) + "." + arrayCadenes[i];
            nouElement.alt = "Vídeo " + (i + 1);
            nouElement.loading = "lazy"; 
            nouElement.controls = true;
            nouElement.classList.add("video");

        } else {
            // Si no, crea un element d'imatge
            nouElement = document.createElement("img");
            nouElement.src = "../5.Correr/Imatges/" + id + "/" + (i + 1) + "." + arrayCadenes[i];
            nouElement.alt = "Imatge " + (i + 1);
            nouElement.loading = "lazy"; 

        }

        var nouDiv = document.createElement("div");
        nouDiv.classList.add("grid-item");
        nouDiv.appendChild(nouElement);

        var pare = document.getElementById("gallery" + id);
        pare.appendChild(nouDiv);
    }
}





fetch('mapa.txt')
    .then(response => response.text())
    .then(rawData => {
        const lines = rawData.split('\n');
        lines.forEach((line, index) => {
            const [titol, id, km, estona, desnivell, ritme, lloc, data, zoom, media, cadenamedia, comentari] = line.split('#');
            generarHTML(id)

            crearmapa(`mapa${id}`, `gpx/${id}.gpx`, zoom);
            
            if (id === "1") {
                creartitol(`titol${id}`, `${id}a "SORTIDA"`);

            } else if (id === "cursa") {
                creartitol(`titol${id}`, `CURSA AL CASTELL DE RACCONIGI`);

            } else if (id === "25") {
                creartitol(`titol${id}`, `40ENA MARATÓ D'ATENES`);
                
            } else {
                creartitol(`titol${id}`, `${id}a SORTIDA${titol}`);
            }

            crearimatges(`mapText${id}`, "Temps: ", estona, '../../Icones/temps.png');
            crearimatges(`mapText${id}`, "Quilòmetres: ", `${km} km`, '../../Icones/distancia.png');
            crearimatges(`mapText${id}`, "Desnivell: ", `${desnivell} m`, '../../Icones/desnivell.png');
            crearimatges(`mapText${id}`, "Ritme: ", `${ritme} m/km`, '../../Icones/ritme.png');
            crearimatges(`mapText${id}`, "Lloc: ", lloc, '../../Icones/mapa.png');
            crearimatges(`mapText${id}`, "Data: ", data, '../../Icones/calendari.png');
            crearcomentari(`mapText${id}`, "Comentari Ignasi: ", comentari, '../../Icones/comentari.png');

            creartitolclass(`fotos${id}`, `Multimèdia (${media})`, "titolmedia");

            if (media !== 0) {
                crearMedia(media, cadenamedia, id)
                }

        });
    })
    .catch(error => {
        console.error('Error al cargar el archivo:', error);
});


//Back to top
var backToTopLink = document.createElement('a');
backToTopLink.href = '#top';
backToTopLink.innerHTML = 'Torna a dalt';
backToTopLink.classList.add('back-to-top-link');
document.body.appendChild(backToTopLink);










google.load("visualization", "1", {
    packages: ["corechart"]
});
google.setOnLoadCallback(drawChart1);

function drawChart1() {
    var rawData = [
    ["1a. Vl (13/8)", "Quilòmetres", 3,13],
    ["1a. Vl (13/8)", "Minuts corrent", 38,3666666666667],
    
    ["2a. Vl (15/8)", "Quilòmetres", 2,77],
    ["2a. Vl (15/8)", "Minuts corrent", 19,9166666666667],
    
    ["3a. Pr (22/8)", "Quilòmetres", 5,0o1],
    ["3a. Pr (22/8)", "Minuts corrent", 36,9333333333333],
    
    ["4a. Pr (26/8)", "Quilòmetres", 6,31],
    ["4a. Pr (26/8)", "Minuts corrent", 42,6],
    
    ["5a. Pr (27/8)", "Quilòmetres", 6,69],
    ["5a. Pr (27/8)", "Minuts corrent", 43,6333333333333],
    
    ["6a. Pr (29/8)", "Quilòmetres", 7,31],
    ["6a. Pr (29/8)", "Minuts corrent", 53,4333333333333],
    
    ["7a. Gz (1/9)", "Quilòmetres", 7,0o2],
    ["7a. Gz (1/9)", "Minuts corrent", 55,4],
    
    ["8a. Gz (4/9)", "Quilòmetres", 7,81],
    ["8a. Gz (4/9)", "Minuts corrent", 56,0o666666666667],
    
    ["9a. Gz (6/9)", "Quilòmetres", 10,0o6],
    ["9a. Gz (6/9)", "Minuts corrent", 77,2833333333333],
    
    ["10a. Ch (13/9)", "Quilòmetres", 5,28],
    ["10a. Ch (13/9)", "Minuts corrent", 33,4166666666667],
    
    ["Cursa (17/9)", "Quilòmetres", 12,42],
    ["Cursa (17/9)", "Minuts corrent", 71,6333333333333],
    
    ["11a. OM (26/9)", "Quilòmetres", 10,52],
    ["11a. OM (26/9)", "Minuts corrent", 75,1333333333333],
    
    ["12a. OM (29/9)", "Quilòmetres", 7,55],
    ["12a. OM (29/9)", "Minuts corrent", 65,4666666666667],
    
    ["13a. OM (2/10)", "Quilòmetres", 17,0o3],
    ["13a. OM (2/10)", "Minuts corrent", 120,0o33333333333],
    
    ["14. BB (11/10)", "Quilòmetres", 10,0o4],
    ["14. BB (11/10)", "Minuts corrent", 76,2],
    
    ["15. BB (14/10)", "Quilòmetres", 5,77],
    ["15. BB (14/10)", "Minuts corrent", 41,9],
    
    ["16. BBA (22/10)", "Quilòmetres", 9,0o1],
    ["16. BBA (22/10)", "Minuts corrent", 72,9666666666667],
    
    ["17. Ath (27/10)", "Quilòmetres", 14,71],
    ["17. Ath (27/10)", "Minuts corrent", 113,233333333333],
    
    ["18. Ath (30/10)", "Quilòmetres", 30,3],
    ["18. Ath (30/10)", "Minuts corrent", 257,216666666667],
    
    ["19. Ath (1/11)", "Quilòmetres", 5,2],
    ["19. Ath (1/11)", "Minuts corrent", 34,15],
    
    ["20. Ath (3/11)", "Quilòmetres", 21,1],
    ["20. Ath (3/11)", "Minuts corrent", 151,683333333333],
    
    ["21. Ath (5/11)", "Quilòmetres", 5,11],
    ["21. Ath (5/11)", "Minuts corrent", 32,45],
    
    ["22. Ath (6/11)", "Quilòmetres", 6,4],
    ["22. Ath (6/11)", "Minuts corrent", 45,8166666666667],
    
    ["23. Ath (8/11)", "Quilòmetres", 10,14],
    ["23. Ath (8/11)", "Minuts corrent", 66,1],
    
    ["24. Ath (10/11)", "Quilòmetres", 5,12],
    ["24. Ath (10/11)", "Minuts corrent", 33,15],
    
    ["25. Marató d'Atenes", "Quilòmetres", 43,66],
    ["25. Marató d'Atenes", "Minuts corrent", 327,916666666667],
    ];
    
    var data = new google.visualization.DataTable();
    data.addColumn("string", "Sortida");
    data.addColumn("number", "Minuts corrent");
    data.addColumn("number", "Quilòmetres");
    
    var currentRow = null;
    for (var i=0; i < rawData.length; i++) {
        var date = rawData[i][0];
        var col = rawData[i][1];
        var value = rawData[i][2];
        
        if (currentRow == null || currentRow[0] != date) {
            if (currentRow != null) data.addRow(currentRow);
            currentRow = [date, null, null];      
        }
        
        if (col == "Minuts corrent") currentRow[1] = value;
        else if (col == "Quilòmetres") currentRow[2] = value;
    }
    
    if (currentRow != null) data.addRow(currentRow);
    
    var options = {
        backgroundColor: 'transparent',
        vAxes: [{
            title: "",
            minValue: 0
        }],
        series: {
            0: { type: 'line', targetAxisIndex: 0 },
            1: { type: 'bars', targetAxisIndex: 1 }
        },
        interpolateNulls: true
    }
    
    var chart = new google.visualization.ComboChart(document.getElementById("chart1"));
    chart.draw(data, options);
}
