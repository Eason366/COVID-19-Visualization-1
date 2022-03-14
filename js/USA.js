function Load(result){
    var metrics = result.metrics;
    document.getElementById('StateSituation').innerHTML = result.state+" Situation";
    document.getElementById('countryState').innerHTML = result.state;
    document.getElementById('caseDensity').innerHTML = metrics.caseDensity;
    document.getElementById('infectionRate').innerHTML = metrics.infectionRate;
    document.getElementById('infectionRateCI90').innerHTML = metrics.infectionRateCI90;
    document.getElementById('icuCapacityRatio').innerHTML = metrics.icuCapacityRatio;
    document.getElementById('vaccinationsInitiatedRatio').innerHTML = metrics.vaccinationsInitiatedRatio;
    document.getElementById('vaccinationsCompletedRatio').innerHTML = metrics.vaccinationsCompletedRatio;
    document.getElementById('vaccinationsAdditionalDoseRatio').innerHTML = metrics.vaccinationsAdditionalDoseRatio;
}

function LoadUS(){
    $.getJSON("https://api.covidactnow.org/v2/country/US.json?apiKey="
    +key,caseNumber =function(result){
        var metrics = result.metrics;
        document.getElementById('StateSituation').innerHTML = result.country+" Situation";
        document.getElementById('countryState').innerHTML = result.country;
        document.getElementById('caseDensity').innerHTML = metrics.caseDensity;
        document.getElementById('infectionRate').innerHTML = metrics.infectionRate;
        document.getElementById('infectionRateCI90').innerHTML = metrics.infectionRateCI90;
        document.getElementById('icuCapacityRatio').innerHTML = metrics.icuCapacityRatio;
        document.getElementById('vaccinationsInitiatedRatio').innerHTML = metrics.vaccinationsInitiatedRatio;
        document.getElementById('vaccinationsCompletedRatio').innerHTML = metrics.vaccinationsCompletedRatio;
        document.getElementById('vaccinationsAdditionalDoseRatio').innerHTML = metrics.vaccinationsAdditionalDoseRatio;
    })    
}

var isShow = true;
const allStatesCase = [];
var stateSelect;
    $.getJSON("https://api.covidactnow.org/v2/states.json?apiKey="
    +key,caseNumber =function(result){
    for (var i = 0; i < result.length; i++) { 
        var data = {name:result[i].state,value: result[i].actuals.cases};
        allStatesCase.push(data)
    }

var chartDom = document.getElementById('USA');
var myMapChart = echarts.init(chartDom);
var option;

myMapChart.showLoading();
$.get('../json/USA.json', function (usaJson) {
    myMapChart.hideLoading();
  echarts.registerMap('USA', usaJson, {
    AK: {
      left: -131,
      top: 25,
      width: 15
    },
    HI: {
      left: -110,
      top: 28,
      width: 5
    },
    PR: {
        left: -76,
        top: 26,
        width: 2
      }
  });
  option = {
    tooltip: {
      trigger: "item",
      showDelay: 0,
      transitionDuration: 0.2
      },
      
    visualMap: {
        left: 'right',
        min: 0,
        max: 10000000,
        inRange: {
          color: [
            '#313695',
            '#4575b4',
            '#74add1',
            '#abd9e9',
            '#e0f3f8',
            '#ffffbf',
            '#fee090',
            '#fdae61',
            '#f46d43',
            '#d73027',
            '#a50026'
          ]
        },
        text: ['High', 'Low'],
        calculable: true
      },
    series: [
      {
        name: 'Total Case',
        type: 'map',
        roam: false,
        map: 'USA',
        label: {
          emphasis: {
            show: true,
            color: "#fff"
          }
        },
        itemStyle: {
          normal: {
            areaColor: "rgba(20, 41, 87,0.6)",
            borderColor: "#195BB9",
            borderWidth: 1
          },
          emphasis: {
            areaColor: "#2B91B7"
          }
        },
        data: allStatesCase
      }
    ]
  };
  myMapChart.setOption(option);
  myMapChart.on('click', function (params) {
    console.log(params)  
        if(params.name != stateSelect){
            stateSelect = params.data.name
            $.getJSON("https://api.covidactnow.org/v2/state/"
                    +stateSelect
                    +".timeseries.json?apiKey="
                    +key,caseNumber =function(result){
                        // console.log(result)  
                        Load(result);  
                    })
        }else{
            LoadUS()
            isShow = true
        }
    
    });
});
window.addEventListener("resize", function() {
    myMapChart.resize();
  });
})