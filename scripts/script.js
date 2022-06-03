data = {
  Atlantic: { sustainable: 15, overexploited: 85 },
  Mediterranean: { sustainable: 23, overexploited: 77 },
  Pacific: { sustainable: 52, overexploited: 48 },
};

var gaugeOptions = {
  chart: {
    type: "solidgauge",
  },

  title: null,

  pane: {
    center: ["50%", "85%"],
    size: "140%",
    startAngle: -90,
    endAngle: 90,
    background: {
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || "#EEE",
      innerRadius: "60%",
      outerRadius: "100%",
      shape: "arc",
    },
  },

  exporting: {
    enabled: false,
  },

  tooltip: {
    enabled: false,
  },

  // the value axis
  yAxis: {
    stops: [
      [0.1, "#55BF3B"], // green
      [0.5, "#DDDF0D"], // yellow
      [0.9, "#DF5353"], // red
    ],
    lineWidth: 0,
    tickWidth: 0,
    minorTickInterval: null,
    tickAmount: 2,
    title: {
      y: -70,
    },
    labels: {
      y: 16,
    },
  },

  plotOptions: {
    solidgauge: {
      dataLabels: {
        y: 5,
        borderWidth: 0,
        useHTML: true,
      },
    },
  },
};

// The speed gauge
var chartSpeed = Highcharts.chart(
  "container-speed",
  Highcharts.merge(gaugeOptions, {
    yAxis: {
      min: 0,
      max: 100,
      title: {
        text: "Overexploited share of fish stocks",
      },
    },

    credits: {
      enabled: false,
    },

    series: [
      {
        name: "Speed",
        data: [
          {
            y: data.Atlantic.overexploited,
            sust: data.Atlantic.sustainable,
          },
        ],
        dataLabels: {
          formatter: function () {
            console.log(this);
            return (
              '<div style="text-align:center">' +
              '<span style="font-size:25px">' +
              this.y +
              "%</span><br/>" +
              '<span style="font-size:12px;opacity:0.4">' +
              this.point.options.sust +
              "% sustainable</span>" +
              "</div>"
            );
          },
          // format:
          //   '<div style="text-align:center">' +
          //   '<span style="font-size:25px">{y}%</span><br/>' +
          //   '<span style="font-size:12px;opacity:0.4">{this.sust}% sustainable</span>' +
          //   "</div>",
        },
        tooltip: {
          valueSuffix: "%",
        },
      },
    ],
  })
);

var activities = document.getElementById("country");

activities.addEventListener("change", function () {
  console.log(activities.value, data[activities.value].overexploited);

  var point, newVal;

  if (chartSpeed) {
    point = chartSpeed.series[0].points[0];
    console.log(chartSpeed.series);
    newVal = {
      y: data[activities.value].overexploited,
      sust: data[activities.value].sustainable,
    };

    point.update(newVal);
  }
});

function find_percent(x) {
  return 100 - x;
}
