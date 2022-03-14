    const cases1 = [];
    const allStates1 = [];
    $.getJSON("https://api.covidactnow.org/v2/states.json?apiKey="
    +key,caseNumber =function(result){
    for (var i = 0; i < result.length; i++) {
        cases1.push(result[i].actuals.cases); 
        allStates1.push(result[i].state)  
    }
    var myChart1 = echarts.init(document.getElementById("chart1"));
    var option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
        type: 'shadow'
        }
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
        data: allStates1

    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
        name: 'Actual Case',
        type: 'bar',
        data: cases1,
        itemStyle: {
                normal: {
                    color: function(params){
                        if(params.data > 4000000){
                            return '#4169E1';
                        }else if(params.data<=4000000 && params.data>2000000){
                            return '#00BFFF';
                        }else {
                            return '#ADD8E6';
                        }
                    }
                }
            }
        }
    ]
    };
    myChart1.setOption(option);
    window.addEventListener("resize", function() {
        myChart1.resize();
      });
})