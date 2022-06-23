d3.csv(
  "https://raw.githubusercontent.com/rfordatascience/tidytuesday/master/data/2021/2021-10-12/seafood-and-fish-production-thousand-tonnes.csv",
  function (d) {
    // process data
    return {
      location: d.Entity,
      year: d.Year,
      data: [
        {
          name: "pelagic_fish",
          value: parseInt(
            d[
              "Commodity Balances - Livestock and Fish Primary Equivalent - Pelagic Fish - 2763 - Production - 5510 - tonnes"
            ]
          ),
        },
        {
          name: "crustaceans",
          value: parseInt(
            d[
              "Commodity Balances - Livestock and Fish Primary Equivalent - Crustaceans - 2765 - Production - 5510 - tonnes"
            ]
          ),
        },
        {
          name: "cephalopods",
          value: parseInt(
            d[
              "Commodity Balances - Livestock and Fish Primary Equivalent - Cephalopods - 2766 - Production - 5510 - tonnes"
            ]
          ),
        },
        {
          name: "demersal_fish",
          value: parseInt(
            d[
              "Commodity Balances - Livestock and Fish Primary Equivalent - Demersal Fish - 2762 - Production - 5510 - tonnes"
            ]
          ),
        },
        {
          name: "freshwater_fish",
          value: parseInt(
            d[
              "Commodity Balances - Livestock and Fish Primary Equivalent - Freshwater Fish - 2761 - Production - 5510 - tonnes"
            ]
          ),
        },
        {
          name: "molluscs_other",
          value: parseInt(
            d[
              "Commodity Balances - Livestock and Fish Primary Equivalent - Molluscs, Other - 2767 - Production - 5510 - tonnes"
            ]
          ),
        },
        {
          name: "marine_fish_other",
          value: parseInt(
            d[
              "Commodity Balances - Livestock and Fish Primary Equivalent - Marine Fish, Other - 2764 - Production - 5510 - tonnes"
            ]
          ),
        },
      ],
    };
  },
  function (data) {
    continents = [
      "Europe",
      "Asia",
      "South America",
      "Northern America",
      //   "Central America",
      "Australia & New Zealand",
      "Africa",
    ];

    initData = data.filter(
      (x) => continents.includes(x.location) && x.year === "1961"
    );

    let d = [];
    for (let i = 0; i < initData.length; i++) {
      d.push({ name: initData[i].location, data: initData[i].data });
    }
    console.log(d);

    var productionChart = Highcharts.chart("container-production", {
      chart: {
        type: "packedbubble",
        height: "100%",
      },
      credits: {
        enabled: false,
      },
      exporting: {
        enabled: false,
      },
      title: {
        text: "Carbon emissions around the world (2014)",
      },
      tooltip: {
        useHTML: true,
        pointFormat: "<b>{point.name}:</b> {point.value} thousand tonnes",
      },
      plotOptions: {
        packedbubble: {
          minSize: "20%",
          maxSize: "100%",
          zMin: 0,
          zMax: 10000000,
          layoutAlgorithm: {
            gravitationalConstant: 0.05,
            splitSeries: true,
            seriesInteraction: false,
            dragBetweenSeries: false,
            parentNodeLimit: true,
          },
          dataLabels: {
            enabled: true,
            format: "{point.name}",
            // filter: {
            //   property: "y",
            //   operator: ">",
            //   value: 250,
            // },
            style: {
              color: "black",
              textOutline: "none",
              fontWeight: "normal",
            },
          },
        },
      },
      series: d,
    });

    function update(increment) {
      var input = $("#play-range1")[0],
        output = $("#play-output1")[0];

      if (increment) {
        input.value = parseInt(input.value) + increment;
      }
      //   newVal = Object.values(data[input.value]);

      newVal = data.filter(
        (x) => continents.includes(x.location) && x.year === input.value
      );

      let d1 = [];
      for (let i = 0; i < newVal.length; i++) {
        d1.push({ name: newVal[i].location, data: newVal[i].data });
      }

      console.log(d1);

      productionChart.series[0].update(d1, true);
      output.innerHTML = input.value;
      if (input.value >= input.max) {
        // Auto-pause
        pause($("#play-pause-button1")[0]);
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

    $("#play-pause-button1").bind("click", function () {
      if (productionChart.sequenceTimer === undefined) {
        play(this);
      } else {
        pause(this);
      }
    });

    $("#play-range1").bind("input", function () {
      update();
    });
  }
);
