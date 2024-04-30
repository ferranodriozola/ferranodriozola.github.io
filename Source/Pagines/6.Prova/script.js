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
        title: 'Relació minuts corrent i quilòmetres',
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
