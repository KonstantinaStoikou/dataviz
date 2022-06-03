data = {
  1950: {
    artisanal: 15000,
    discards: 28000,
    industrial: 1900,
    recreational: 73260,
    subsistence: 40000,
  },
  1951: {
    artisanal: 15230,
    discards: 38000,
    industrial: 1400,
    recreational: 56260,
    subsistence: 40000,
  },
};

var chartSpeed = Highcharts.chart("container", {
  chart: {
    polar: true,
    type: "area",
  },

  title: {
    text: "Global fishery by sector",
    x: -80,
  },

  credits: {
    enabled: false,
  },

  exporting: {
    enabled: false,
  },

  pane: {
    size: "80%",
  },

  xAxis: {
    categories: [
      "Artisanal",
      "Discards",
      "Industrial",
      "Recreational",
      "Subsistence",
    ],
    tickmarkPlacement: "on",
    lineWidth: 0,
  },

  yAxis: {
    gridLineInterpolation: "polygon",
    lineWidth: 0,
    min: 0,
  },

  tooltip: {
    shared: true,
    pointFormat:
      '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>',
  },

  legend: {
    align: "right",
    verticalAlign: "middle",
    layout: "vertical",
  },

  series: [
    {
      name: "Number of fish",
      data: Object.values(data[1950]),
      pointPlacement: "on",
      fillColor: "#91d4db",
    },
  ],

  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 500,
        },
        chartOptions: {
          legend: {
            align: "center",
            verticalAlign: "bottom",
            layout: "horizontal",
          },
          pane: {
            size: "70%",
          },
        },
      },
    ],
  },
});

console.log(chartSpeed.series[0].points[0]);

var activities = document.getElementById("year");

activities.addEventListener("change", function () {
  console.log(chartSpeed.series[0].points[0]);
  point = chartSpeed.series[0].points[0].series.YData;
  newVal = Object.values(data[activities.value]);
  chartSpeed.series[0].update(
    {
      data: Object.values(data[activities.value]),
    },
    true
  );
});
