
    const cases3 = [];
    const Newdate3 = [];
    const deaths3 = [];
    $.getJSON("https://api.covidactnow.org/v2/country/US.timeseries.json?apiKey="
    +key,caseNumber =function(result){
        var data = result.actualsTimeseries
        for (var i = data.length-41; i < data.length-1; i++) {
            cases3.push(data[i].newCases);
            Newdate3.push(data[i].date);
            deaths3.push(data[i].newDeaths);
        }
        var myChart3 = echarts.init(document.getElementById("chart3"));
        var option = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['New Case', 'New Death']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                    saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: Newdate3
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                    name: 'New Case',
                    type: 'line',
                    data: cases3
                    },
                    {
                    name: 'New Death',
                    type: 'line',
                    data: deaths3
                    }
                ]
            };    
    
            myChart3.setOption(option);
            window.addEventListener("resize", function() {
                myChart3.resize();
              });
    })