(async () => {
  const topology = await fetch(
    "https://code.highcharts.com/mapdata/custom/world-highres3.topo.json"
  ).then((response) => response.json());

  d3.csv(
    "https://raw.githubusercontent.com/rfordatascience/tidytuesday/master/data/2021/2021-10-12/seafood-and-fish-production-thousand-tonnes.csv",
    function (d) {
      // process data
      return {
        location: d.Entity,
        year: d.Year,
        data: [
          parseInt(
            d[
              "Commodity Balances - Livestock and Fish Primary Equivalent - Pelagic Fish - 2763 - Production - 5510 - tonnes"
            ]
          ),
          parseInt(
            d[
              "Commodity Balances - Livestock and Fish Primary Equivalent - Crustaceans - 2765 - Production - 5510 - tonnes"
            ]
          ),
          parseInt(
            d[
              "Commodity Balances - Livestock and Fish Primary Equivalent - Cephalopods - 2766 - Production - 5510 - tonnes"
            ]
          ),
          parseInt(
            d[
              "Commodity Balances - Livestock and Fish Primary Equivalent - Demersal Fish - 2762 - Production - 5510 - tonnes"
            ]
          ),
          parseInt(
            d[
              "Commodity Balances - Livestock and Fish Primary Equivalent - Freshwater Fish - 2761 - Production - 5510 - tonnes"
            ]
          ),
          parseInt(
            d[
              "Commodity Balances - Livestock and Fish Primary Equivalent - Molluscs, Other - 2767 - Production - 5510 - tonnes"
            ]
          ),
          parseInt(
            d[
              "Commodity Balances - Livestock and Fish Primary Equivalent - Marine Fish, Other - 2764 - Production - 5510 - tonnes"
            ]
          ),
        ],
      };
    },
    function (data) {
      initData = data.filter((x) => x.year === "1961");
      initData = initData.map(function (set, i) {
        return {
          name: set.location,
          data: set.data,
          shadow: false,
        };
      });

      productionChart = Highcharts.chart("container-coordinates", {
        chart: {
          type: "spline",
          parallelCoordinates: true,
          parallelAxes: {
            lineWidth: 2,
          },
        },
        title: {
          text: "Global fishery catch by sector by country",
        },
        lang: {
          accessibility: {
            axis: {
              yAxisDescriptionPlural:
                "The chart has 7 Y axes across the chart displaying Training date, Miles for training run, Training time, Shoe brand, Running pace per mile, Short or long, and After 2004.",
            },
          },
        },
        credits: {
          enabled: false,
        },

        exporting: {
          enabled: false,
        },

        plotOptions: {
          series: {
            accessibility: {
              enabled: false,
            },
            animation: false,
            marker: {
              enabled: false,
              states: {
                hover: {
                  enabled: false,
                },
              },
            },
            states: {
              hover: {
                halo: {
                  size: 0,
                },
              },
            },
            events: {
              mouseOver: function () {
                this.group.toFront();
                var mapPoints = mapChart.series[0].points;
                p = mapPoints.filter((x) => x.name === this.name)[0];
                if (p) {
                  p.setState("hover");
                }
              },
              mouseOut: function () {
                var mapPoints = mapChart.series[0].points;
                p = mapPoints.filter((x) => x.name === this.name)[0];
                if (p) {
                  p.setState();
                }
              },
            },
          },
        },
        tooltip: {
          pointFormat:
            '<span style="color:{point.color}">\u25CF</span>' +
            "{series.name}: <b>{point.formattedValue}</b><br/>",
        },
        xAxis: {
          categories: [
            "Pelagic Fish",
            "Crustaceans",
            "Cephalopods",
            "Demersal Fish",
            "Freshwater Fish",
            "Molluscs",
            "Marine Fish",
          ],
          offset: 10,
        },
        yAxis: [
          {
            min: 0,
            tooltipValueFormat: "{value} thousand tonnes",
          },
          {
            min: 0,
            tooltipValueFormat: "{value} thousand tonnes",
          },
          {
            min: 0,
            tooltipValueFormat: "{value} thousand tonnes",
          },
          {
            min: 0,
            tooltipValueFormat: "{value} thousand tonnes",
          },
          {
            min: 0,
            tooltipValueFormat: "{value} thousand tonnes",
          },
          {
            min: 0,
            tooltipValueFormat: "{value} thousand tonnes",
          },
          {
            min: 0,
            tooltipValueFormat: "{value} thousand tonnes",
          },
        ],
        colors: ["rgba(11, 200, 200, 0.1)"],
        series: initData,
      });

      function update(increment) {
        var input = $("#play-range")[0],
          output = $("#play-output")[0];

        if (increment) {
          input.value = parseInt(input.value) + increment;
        }

        newVal = data.filter((x) => x.year === input.value);
        newVal = newVal.map(function (set, i) {
          return {
            name: set.location,
            data: set.data,
            shadow: false,
          };
        });
        productionChart.series[0].update(newVal);
        output.innerHTML = input.value;
        if (input.value >= input.max) {
          // Auto-pause
          pause($("#play-pause-button")[0]);
        }
      }

      function play(button) {
        button.title = "pause";
        button.className = "fa fa-pause";
        productionChart.sequenceTimer = setInterval(function () {
          update(1);
        }, 700);
      }

      function pause(button) {
        button.title = "play";
        button.className = "fa fa-play";
        clearTimeout(productionChart.sequenceTimer);
        productionChart.sequenceTimer = undefined;
      }

      $("#play-pause-button").bind("click", function () {
        if (productionChart.sequenceTimer === undefined) {
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

  d3.csv(
    "https://raw.githubusercontent.com/rfordatascience/tidytuesday/master/data/2021/2021-10-12/capture-fisheries-vs-aquaculture.csv",
    function (d) {
      // process data
      return {
        location: d.Entity,
        year: d.Year,
        aquaculture: parseFloat(d["Aquaculture production (metric tons)"]),
        fisheries: parseFloat(d["Capture fisheries production (metric tons)"]),
      };
    },
    function (data) {
      initData = data.filter((x) => x.location === "World");
      let aquacultureData = Object.values(
        initData.reduce((acc, cur) => {
          acc.push(cur.aquaculture);
          return acc;
        }, [])
      );
      let fisheriesData = Object.values(
        initData.reduce((acc, cur) => {
          acc.push(cur.fisheries);
          return acc;
        }, [])
      );

      areaChart = Highcharts.chart("container-area", {
        chart: {
          type: "area",
        },
        credits: {
          enabled: false,
        },

        exporting: {
          enabled: false,
        },

        title: {
          text: "Capture fisheries vs aquaculture",
        },

        xAxis: {
          allowDecimals: false,
          labels: {
            formatter: function () {
              return this.value; // clean, unformatted number for year
            },
          },
        },
        yAxis: {
          title: {
            text: "Metric tons",
          },
          labels: {
            formatter: function () {
              return this.value / 1000 + "k";
            },
          },
        },
        tooltip: {
          pointFormat:
            "{point.y:,.0f} metric tons of {series.name} in {point.x}",
        },
        plotOptions: {
          area: {
            pointStart: 1940,
            marker: {
              enabled: false,
              symbol: "circle",
              radius: 2,
              states: {
                hover: {
                  enabled: true,
                },
              },
            },
          },
        },
        series: [
          {
            name: "Aquaculture",
            data: aquacultureData,
          },
          {
            name: "Fisheries",
            data: fisheriesData,
          },
        ],
      });
    }
  );

  d3.csv(
    "https://raw.githubusercontent.com/rfordatascience/tidytuesday/master/data/2021/2021-10-12/fish-and-seafood-consumption-per-capita.csv",
    function (d) {
      // process data
      return {
        location: d.Code,
        year: d.Year,
        consumption: parseFloat(
          d["Fish, Seafood- Food supply quantity (kg/capita/yr) (FAO, 2020)"]
        ),
      };
    },
    function (data) {
      initData = data.filter((x) => x.year === "2010");
      initData = initData.map(function (e) {
        if (e.location != "") {
          return { code: e.location, value: e.consumption };
        } else {
          return null;
        }
      });

      // Create the chart
      mapChart = Highcharts.mapChart("container-map", {
        chart: {
          map: topology,
        },

        credits: {
          enabled: false,
        },

        exporting: {
          enabled: false,
        },

        title: {
          text: "Fish & seafood supply quantity (kg/capita/yr)",
        },

        subtitle: {
          text: 'Source map: <a href="http://code.highcharts.com/mapdata/custom/world-highres3.topo.json">World countries</a>',
        },

        tooltip: {
          pointFormat: "{point.name}: <b>{point.value} kg/capita/yr</b><br/>",
        },

        mapNavigation: {
          enabled: true,
          buttonOptions: {
            verticalAlign: "bottom",
          },
        },

        colorAxis: {
          min: 0,
        },

        plotOptions: {
          series: {
            point: {
              events: {
                mouseOver: function () {
                  var productionPoints = productionChart.series;
                  p = productionPoints.filter((x) => x.name === this.name)[0];
                  if (p) {
                    p.setState("hover");
                  }
                },
                mouseOut: function () {
                  var productionPoints = productionChart.series;
                  p = productionPoints.filter((x) => x.name === this.name)[0];
                  if (p) {
                    p.setState();
                  }
                },
              },
            },
          },
        },

        series: [
          {
            data: initData,
            joinBy: ["iso-a3", "code"],
            name: "Quantity",
            states: {
              hover: {
                color: "#15c6ea",
              },
            },
            dataLabels: {
              enabled: false,
              format: "{point.name}",
            },
          },
        ],
      });

      function update(increment) {
        var input = $("#play-range")[0],
          output = $("#play-output")[0];

        if (increment) {
          input.value = parseInt(input.value) + increment;
        }

        newVal = data.filter((x) => x.year === input.value);
        newVal = newVal.map(function (e) {
          if (e.location != "") {
            return { code: e.location, value: e.consumption };
          } else {
            return null;
          }
        });
        mapChart.series[0].setData(newVal);
        output.innerHTML = input.value;
        if (input.value >= input.max) {
          // Auto-pause
          pause($("#play-pause-button")[0]);
        }
      }

      function play(button) {
        button.title = "pause";
        button.className = "fa fa-pause";
        mapChart.sequenceTimer = setInterval(function () {
          update(1);
        }, 700);
      }

      function pause(button) {
        button.title = "play";
        button.className = "fa fa-play";
        clearTimeout(mapChart.sequenceTimer);
        mapChart.sequenceTimer = undefined;
      }

      $("#play-pause-button").bind("click", function () {
        if (mapChart.sequenceTimer === undefined) {
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
})();
