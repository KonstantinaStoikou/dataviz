d3.csv(
  "https://raw.githubusercontent.com/rfordatascience/tidytuesday/master/data/2021/2021-10-12/seafood-and-fish-production-thousand-tonnes.csv",
  function (d) {
    // process data
    return {
      [d.Year]: {
        location: d.Entity,
        year: d.Year,
        data: {
          pelagic_fish: parseInt(
            d[
              "Commodity Balances - Livestock and Fish Primary Equivalent - Pelagic Fish - 2763 - Production - 5510 - tonnes"
            ]
          ),
          crustaceans: parseInt(
            d[
              "Commodity Balances - Livestock and Fish Primary Equivalent - Crustaceans - 2765 - Production - 5510 - tonnes"
            ]
          ),
          cephalopods: parseInt(
            d[
              "Commodity Balances - Livestock and Fish Primary Equivalent - Cephalopods - 2766 - Production - 5510 - tonnes"
            ]
          ),
          demersal_fish: parseInt(
            d[
              "Commodity Balances - Livestock and Fish Primary Equivalent - Demersal Fish - 2762 - Production - 5510 - tonnes"
            ]
          ),

          freshwater_fish: parseInt(
            d[
              "Commodity Balances - Livestock and Fish Primary Equivalent - Freshwater Fish - 2761 - Production - 5510 - tonnes"
            ]
          ),

          molluscs_other: parseInt(
            d[
              "Commodity Balances - Livestock and Fish Primary Equivalent - Molluscs, Other - 2767 - Production - 5510 - tonnes"
            ]
          ),

          marine_fish_other: parseInt(
            d[
              "Commodity Balances - Livestock and Fish Primary Equivalent - Marine Fish, Other - 2764 - Production - 5510 - tonnes"
            ]
          ),
        },
      },
    };
  },
  function (data) {
    initData = data["1961"];
    console.log("AA", initData);

    Highcharts.chart("container-coordinates", {
      chart: {
        type: "spline",
        parallelCoordinates: true,
        parallelAxes: {
          lineWidth: 2,
        },
      },
      title: {
        text: "Marathon set",
      },
      lang: {
        accessibility: {
          axis: {
            yAxisDescriptionPlural:
              "The chart has 7 Y axes across the chart displaying Training date, Miles for training run, Training time, Shoe brand, Running pace per mile, Short or long, and After 2004.",
          },
        },
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
          tooltipValueFormat: "thousand tonnes",
        },
        {
          min: 0,
          tooltipValueFormat: "thousand tonnes",
        },
        {
          min: 0,
          tooltipValueFormat: "thousand tonnes",
        },
        {
          min: 0,
          tooltipValueFormat: "thousand tonnes",
        },
        {
          min: 0,
          tooltipValueFormat: "thousand tonnes",
        },
        {
          min: 0,
          tooltipValueFormat: "thousand tonnes",
        },
        {
          min: 0,
          tooltipValueFormat: "thousand tonnes",
        },
      ],
      colors: ["rgba(11, 200, 200, 0.1)"],
      series: data.map(function (set, i) {
        return {
          name: "Runner " + i,
          data: set,
          shadow: false,
        };
      }),
    });
  }
);
