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
      ['France', 50],
      ['Italy', 30],
      ['Greece', 70],
      ['Spain', 3],
      // ['Bulgaria', 3],
      // ['Spain', 30],
      ['', 0],
      ['', 100]
    ]);
  
    var options = {
      region: '150', 
    };
  
    var chart = new google.visualization.GeoChart(document.getElementById('mapa_div'));
  
    chart.draw(data, options);
}
