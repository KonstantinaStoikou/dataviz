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

    var cur_year = "1950";

    var sectorChart = Highcharts.chart("container-sector", {
      chart: {
        polar: true,
        type: "area",
      },

      title: {
        text: "Amount of fish caught by sector (worldwide)",
      },

      subtitle: {
        text: "Year 1950",
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
          name: "Metric tonnes of fish",
          data: Object.values(data[cur_year]),
          pointPlacement: "on",
          fillColor: "rgba(177, 193, 224, 0.7)",
          color: "#15c6ea",
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
            },
          },
        ],
      },
    });

    function update(increment) {
      var input = $("#play-range")[0];

      value = parseInt(input.value);
      if (increment) {
        value += increment;
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
            text: "Year " + value,
          },
        });
        cur_year = value;
      } else {
        sectorChart.update({
          subtitle: {
            text: "Year " + cur_year + " (No data available for " + value + ")",
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
