(async () => {
  const topology = await fetch(
    "https://code.highcharts.com/mapdata/custom/world-highres3.topo.json"
  ).then((response) => response.json());

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
      initData = data.filter((x) => x.year === "1961");
      initData = initData.map(function (e) {
        if (e.location != "") {
          return { code: e.location, value: e.consumption };
        } else {
          return null;
        }
      });
      console.log(initData);

      // Create the chart
      Highcharts.mapChart("container-map", {
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
                  console.log(this.name);
                },
                // mouseOver: function () {
                // console.log(this.name);
                //   },
              },
            },
          },
        },

        series: [
          {
            data: initData,
            joinBy: ["iso-a3", "code"],
            name: "Random data",
            states: {
              hover: {
                // color: "#BADA55",
                borderWidth: 1,
              },
            },
            dataLabels: {
              enabled: true,
              format: "{point.name}",
            },
          },
        ],
      });
    }
  );
})();
