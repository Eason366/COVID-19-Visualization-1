
    const cases = [];
    const Newdate = [];
    const deaths = [];
    $.getJSON("https://api.covidactnow.org/v2/country/US.timeseries.json?apiKey="
    +key,caseNumber =function(result){
        var data = result.actualsTimeseries
        for (var i = data.length-41; i < data.length-1; i++) {
            cases.push(data[i].newCases);
            Newdate.push(data[i].date);
            deaths.push(data[i].newDeaths);
        }
        var myChart2 = echarts.init(document.getElementById("chart2"));
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
                    data: Newdate
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                    name: 'New Case',
                    type: 'line',
                    data: cases
                    },
                    {
                    name: 'New Death',
                    type: 'line',
                    data: deaths
                    }
                ]
            };    
    
            myChart2.setOption(option);
            window.addEventListener("resize", function() {
                myChart2.resize();
              });
    })