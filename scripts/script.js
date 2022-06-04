d3.csv(
  // "https://raw.githubusercontent.com/KonstantinaStoikou/dataviz/main/data/fish-stocks-within-sustainable-levels.csv?token=GHSAT0AAAAAABOUNHA6GE7YSMTJRUY5QGUIYU2Q6PQ",
  "https://raw.githubusercontent.com/rfordatascience/tidytuesday/master/data/2021/2021-10-12/fish-stocks-within-sustainable-levels.csv",
  function (d) {
    // process data
    return {
      location: d.Entity,
      year: d.Year,
      overexploited: parseInt(d["Share of fish stocks that are overexploited"]),
      sustainable: parseInt(
        d[
          "Share of fish stocks within biologically sustainable levels (FAO, 2020)"
        ]
      ),
    };
  },
  function (data) {
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
                y: data.filter(
                  (x) =>
                    x.location === "Northeast Central Atlantic" &&
                    x.year === "2015"
                )[0].overexploited,
                sust: data.filter(
                  (x) =>
                    x.location === "Northeast Central Atlantic" &&
                    x.year === "2015"
                )[0].sustainable,
              },
            ],
            dataLabels: {
              formatter: function () {
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
            },
            tooltip: {
              valueSuffix: "%",
            },
          },
        ],
      })
    );

    var activities = document.getElementById("region");

    activities.addEventListener("change", function () {
      var point, newVal;

      if (chartSpeed) {
        point = chartSpeed.series[0].points[0];
        datum = data.filter(
          (x) => x.location === activities.value && x.year === "2015"
        )[0];
        console.log(datum);
        newVal = {
          y: datum.overexploited,
          sust: datum.sustainable,
        };

        point.update(newVal);
      }

      const img = document.querySelector("#map-img");

      img.src = "images/" + activities.value + ".jpg";
    });
  }
);
