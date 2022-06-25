d3.csv(
  "https://raw.githubusercontent.com/rfordatascience/tidytuesday/master/data/2021/2021-10-12/global-fishery-catch-by-sector.csv",
  function (d) {
    // process data
    return {
      [d.Year]: {
        artisanal: parseInt(d["Artisanal (small-scale commercial)"]),
        discards: parseInt(d.Discards),
        industrial: parseInt(d["Industrial (large-scale commercial)"]),
        recreational: parseInt(d.Recreational),
        subsistence: parseInt(d.Subsistence),
      },
    };
  },
  function (data) {
    data = Object.assign({}, ...data);

    var sectorChart = Highcharts.chart("container-sector", {
      chart: {
        polar: true,
        type: "area",
      },

      title: {
        text: "Global fishery by sector",
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

      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: "bottom",
        },
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

    function update(increment) {
      var input = $("#play-range")[0];

      if (increment) {
        value = parseInt(input.value) + increment;
      }
      newVal = data[value];
      if (newVal) {
        newVal = Object.values(newVal);
        sectorChart.series[0].update(
          {
            data: newVal,
          },
          true
        );
        sectorChart.update({
          subtitle: {
            text: "",
          },
        });
      } else {
        sectorChart.series[0].update(
          {
            data: [0, 0, 0, 0, 0],
          },
          true
        );
        sectorChart.update({
          subtitle: {
            text: "No data available for year " + value,
          },
        });
      }
    }

    function play() {
      sectorChart.sequenceTimer = setInterval(function () {
        update(1);
      }, 700);
    }

    function pause() {
      clearTimeout(sectorChart.sequenceTimer);
      sectorChart.sequenceTimer = undefined;
    }

    $("#play-pause-button").bind("click", function () {
      if (sectorChart.sequenceTimer === undefined) {
        play(this);
      } else {
        pause(this);
      }
    });

    $("#play-range").bind("input", function () {
      update();
    });
  }
);
