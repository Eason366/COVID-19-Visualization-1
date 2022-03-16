const myChart1 = echarts.init(document.getElementById("chart1"));
const myChart2 = echarts.init(document.getElementById("chart2"));
const myChart3 = echarts.init(document.getElementById("chart3"));
const myChart4 = echarts.init(document.getElementById("chart4"));
const stateSelect = { name: "NULL" };

//============================================= ON ====================================
(function () {
    $.getJSON("https://api.covidactnow.org/v2/country/US.json?apiKey="
        + key, caseNumber = function (result) {
            var nowcase = result.actuals.cases;
            var nowdeaths = result.actuals.deaths;
            var updata = result.lastUpdatedDate;
            document.querySelector(".nowcase").innerHTML = nowcase;
            document.querySelector(".nowdeaths").innerHTML = nowdeaths;
            document.querySelector(".updataTime").innerHTML = "Last Updated Date: " + updata;
        })
})();

(function () {
    LoadmyChart1();
})();

(function () {
    LoadmyChart2();
})();

(function () {
    LoadmyChart3();
})();

(function () {
    LoadmyChart4();
})();

// ========================================== myChart ==========================================

// LoadmyChart1
function LoadmyChart1() {
    var cases = [];
    var Newdate = [];
    var deaths = [];
    $.getJSON("https://api.covidactnow.org/v2/country/US.timeseries.json?apiKey="
        + key, caseNumber = function (result) {
            document.getElementById("StateNew").innerHTML = result.country + " Distribution (Recent 40 Days)"
            var data = result.actualsTimeseries
            for (var i = data.length - 41; i < data.length - 1; i++) {
                cases.push(data[i].newCases);
                Newdate.push(data[i].date);
                deaths.push(data[i].newDeaths);
            }
            var option = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: [
                        { name: 'New Case', textStyle: { color: "#fff" } },
                        { name: 'New Death', textStyle: { color: "#fff" } }
                    ]
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

            myChart1.setOption(option);
            window.addEventListener("resize", function () {
                myChart1.resize();
            });
        })
}

// LoadmyChart2
function LoadmyChart2() {
    $.getJSON("https://api.covidactnow.org/v2/states.json?apiKey="
        + key, caseNumber = function (result) {
            document.getElementById("ActualCase").innerHTML = "Actual Case in All States"
            var cases = [];
            var allStates = [];
            for (var i = 0; i < result.length; i++) {
                cases.push(result[i].actuals.cases);
                allStates.push(result[i].state)
            }
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
                    data: allStates
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: 'Actual Case',
                        type: 'bar',
                        data: cases,
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    if (params.data > 4000000) {
                                        return '#4169E1';
                                    } else if (params.data <= 4000000 && params.data > 2000000) {
                                        return '#00BFFF';
                                    } else {
                                        return '#ADD8E6';
                                    }
                                }
                            }
                        }
                    }
                ]
            };
            myChart2.setOption(option);
            window.addEventListener("resize", function () {
                myChart2.resize();
            });
        })
}


// LoadmyChart3
function LoadmyChart3() {

    $.getJSON("https://api.covidactnow.org/v2/country/US.json?apiKey="
        + key, caseNumber = function (result) {
            document.getElementById("StateSituation").innerHTML = result.country + " Situation"

            var metrics = result.metrics
            var data = [
                keepTwoDecimal(metrics.icuCapacityRatio * 100),
                keepTwoDecimal(metrics.infectionRate * 100),
                keepTwoDecimal(metrics.vaccinationsAdditionalDoseRatio * 100),
                keepTwoDecimal(metrics.vaccinationsCompletedRatio * 100),
                keepTwoDecimal(metrics.vaccinationsInitiatedRatio * 100)
            ];
            var titlename = [
                "ICU Capacity Ratio",
                "Infection Rate",
                "Vaccinations\nAdditional Dose Ratio",
                "Vaccinations\nCompleted Ratio",
                "Vaccinations\nInitiated Ratio"
            ];
            var valdata = [
                metrics.icuCapacityRatio,
                metrics.infectionRate,
                metrics.vaccinationsAdditionalDoseRatio,
                metrics.vaccinationsCompletedRatio,
                metrics.vaccinationsInitiatedRatio
            ];
            var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
            option = {
                grid: {
                    top: "5%",
                    left: "25%",
                    bottom: "5%"
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    show: false
                },
                yAxis: [
                    {
                        show: true,
                        data: titlename,
                        inverse: true,
                        axisLine: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            color: "#fff",

                            rich: {
                                lg: {
                                    backgroundColor: "#339911",
                                    color: "#fff",
                                    borderRadius: 15,
                                    // padding: 5,
                                    align: "center",
                                    width: 15,
                                    height: 15
                                }
                            }
                        }
                    },
                    {
                        show: true,
                        inverse: true,
                        data: valdata,
                        axisLabel: {
                            textStyle: {
                                fontSize: 12,
                                color: "#fff"
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: "条",
                        type: "bar",
                        yAxisIndex: 0,
                        data: data,
                        barCategoryGap: 50,
                        barWidth: 10,
                        itemStyle: {
                            normal: {
                                barBorderRadius: 20,
                                color: function (params) {
                                    var num = myColor.length;
                                    return myColor[params.dataIndex % num];
                                }
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: "inside",
                                formatter: "{c}%"
                            }
                        }
                    },
                    {
                        name: "框",
                        type: "bar",
                        yAxisIndex: 1,
                        barCategoryGap: 50,
                        data: [100, 100, 100, 100, 100],
                        barWidth: 15,
                        itemStyle: {
                            normal: {
                                color: "none",
                                borderColor: "#00c1de",
                                borderWidth: 3,
                                barBorderRadius: 15
                            }
                        }
                    }
                ]
            };
            myChart3.setOption(option);
            window.addEventListener("resize", function () {
                myChart3.resize();
            });
        })
}

// LoadmyChart4
function LoadmyChart4() {
    $.getJSON("https://api.covidactnow.org/v2/states.json?apiKey="
        + key, caseNumber = function (result) {
            document.getElementById("countyTest").innerHTML = "All States in US";
            console.log(result);
            var County = [];
            for (var i = 0; i < result.length; i++) {
                County.push({ value: result[i].actuals.cases, name: result[i].state });
            }
            County.sort(function (a, b) {
                return (a.value - b.value)
            });
            var option = {
                tooltip: {
                    trigger: 'item'
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 1
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '15',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: County
                    }
                ]
            };
            myChart4.setOption(option);
            window.addEventListener("resize", function () {
                myChart4.resize();
            });
        })
}
















// ===================================== myMapChart ==========================================
(function () {
    var allStatesCase = [];
    $.getJSON("https://api.covidactnow.org/v2/states.json?apiKey="
        + key, caseNumber = function (result) {
            for (var i = 0; i < result.length; i++) {
                var data = { name: result[i].state, value: result[i].actuals.cases };
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
            });
            window.addEventListener("resize", function () {
                myMapChart.resize();
            });
            myMapChart.on('click', function (params) {
                if (stateSelect.name == params.name) {
                    stateSelect.name = '';
                    LoadmyChart1();
                    LoadmyChart2();
                    LoadmyChart3();
                    LoadmyChart4();
                } else {
                    stateSelect.name = params.name;
                    clickLoad(params.name);
                }

            });
        })
})();








//============================================ ReLoad ==========================================
function clickLoad(stateSelect) {
    $.getJSON("https://api.covidactnow.org/v2/state/"
        + stateSelect
        + ".timeseries.json?apiKey="
        + key, caseNumber = function (result) {
            // change myChart1
            document.getElementById("StateNew").innerHTML = result.state + " Distribution (Recent 40 Days)"
            var cases = [];
            var Newdate = [];
            var deaths = [];
            var data = result.actualsTimeseries
            for (var i = data.length - 41; i < data.length - 1; i++) {
                cases.push(data[i].newCases);
                Newdate.push(data[i].date);
                deaths.push(data[i].newDeaths);
            };
            var option1 = myChart1.getOption();
            option1.xAxis.data = Newdate;
            option1.series[0].data = cases;
            option1.series[1].data = deaths;
            myChart1.setOption(option1);






            // change myChart3
            document.getElementById("StateSituation").innerHTML = result.state + " Situation";
            var metrics = result.metrics;
            var data = [
                keepTwoDecimal(metrics.icuCapacityRatio * 100),
                keepTwoDecimal(metrics.infectionRate * 100),
                keepTwoDecimal(metrics.vaccinationsAdditionalDoseRatio * 100),
                keepTwoDecimal(metrics.vaccinationsCompletedRatio * 100),
                keepTwoDecimal(metrics.vaccinationsInitiatedRatio * 100)
            ];
            var valdata = [
                metrics.icuCapacityRatio,
                metrics.infectionRate,
                metrics.vaccinationsAdditionalDoseRatio,
                metrics.vaccinationsCompletedRatio,
                metrics.vaccinationsInitiatedRatio
            ];
            var option3 = myChart3.getOption();
            option3.yAxis[1].data = valdata;
            option3.series[0].data = data;
            myChart3.setOption(option3);


        });
    $.getJSON("https://api.covidactnow.org/v2/county/"
        + stateSelect
        + ".json?apiKey="
        + key, caseNumber = function (result) {

            // change myChart2
            document.getElementById("ActualCase").innerHTML = "Actual Case in "+stateSelect;
            var cases = [];
            var allStates = [];
            for (var i = 0; i < result.length; i++) {
                cases.push(result[i].actuals.cases);
                allStates.push(result[i].county)
            }
            var option2 = myChart2.getOption();
            option2.series[0].data = cases;
            option2.xAxis[0].data = allStates
            option2.series[0].itemStyle.color = function (params) {
                if (params.data > 200000) {
                    return '#4169E1';
                } else if (params.data <= 200000 && params.data > 100000) {
                    return '#00BFFF';
                } else {
                    return '#ADD8E6';
                }
            }
            myChart2.setOption(option2);


            // change myChart4
            document.getElementById("countyTest").innerHTML = "All Counties in " + stateSelect;
            var County = [];
            for (var i = 0; i < result.length; i++) {
                County.push({ value: result[i].actuals.cases, name: result[i].county });
            }
            County.sort(function (a, b) {
                return (a.value - b.value)
            });
            var option4 = myChart4.getOption();
            option4.series[0].data = County;
            myChart4.setOption(option4);
        });

}

function keepTwoDecimal(num) {
    var result = parseFloat(num);
    if (isNaN(result)) {
        alert('Error');
        return false;
    }
    result = Math.round(num * 100) / 100;
    return result;
}