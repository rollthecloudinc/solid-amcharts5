import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { ContentPluginManager } from '@rollthecloudinc/content';
import * as am5 from "@amcharts/amcharts5/index";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Dark from "@amcharts/amcharts5/themes/Dark";
import * as am5plugins_json from "@amcharts/amcharts5/plugins/json";

const sampleJsonXYChart = {
    refs: {
      data: [
        { date: 1652425200000, value: 92 },
        { date: 1652511600000, value: 95 },
        { date: 1652598000000, value: 100 },
        { date: 1652684400000, value: 100 },
        { date: 1652770800000, value: 96 },
        { date: 1652857200000, value: 97 },
        { date: 1652943600000, value: 94 },
        { date: 1653030000000, value: 89 },
        { date: 1653116400000, value: 89 },
        { date: 1653202800000, value: 87 },
        { date: 1653289200000, value: 84 },
        { date: 1653375600000, value: 81 },
        { date: 1653462000000, value: 85 },
        { date: 1653548400000, value: 89 },
        { date: 1653634800000, value: 86 },
        { date: 1653721200000, value: 90 },
        { date: 1653807600000, value: 93 },
        { date: 1653894000000, value: 94 },
        { date: 1653980400000, value: 94 },
        { date: 1654066800000, value: 96 }
      ],
      xAxis: {
        type: "DateAxis",
        settings: {
          maxDeviation: 0.5,
          baseInterval: {
            timeUnit: "day",
            count: 1
          },
          renderer: {
            type: "AxisRendererX",
            settings: {
              pan: "zoom"
            }
          },
          tooltip: {
            type: "Tooltip",
          },
        }
      },
      yAxis: {
        type: "ValueAxis",
        settings: {
          maxDeviation: 1,
          renderer: {
            type: "AxisRendererY",
            settings: {
              pan: "zoom"
            },
          },
        }
      },
    },
    type: "XYChart",
    settings: {
      panX: false,
      panY: false,
      wheelX: "panX",
      wheelY: "zoomX",
      cursor: {
        type: "XYCursor",
        settings: {
          behavior: "zoomX"
        },
        properties: {
          lineY: {
            settings: {
              visible: false
            },
          },
        },
      },
      scrollbarX: {
        type: "Scrollbar",
        settings: {
          orientation: "horizontal"
        }
      },
    },
    properties: {
      xAxes: [
        "#xAxis",
      ],
      yAxes: [
        "#yAxis",
      ],
      series: [{
        type: "LineSeries",
        settings: {
          name: "Series",
          xAxis: "#xAxis",
          yAxis: "#yAxis",
          valueYField: "value",
          valueXField: "date",
          tooltip: {
            type: "Tooltip",
            settings: {
              labelText: "{valueX}: {valueY}"
            }
          },
        },
        properties: {
          data: "#data"
        }
      }]
    }
  };

@Component({
    selector: 'amcharts5-plugin-json-chart-render',
    template: ` `,
    styles: [':host { height: 300px; display: block; }']
})

export class JsonChartRenderComponent implements OnInit {
    private cpm = inject(ContentPluginManager);
    private hostEl = inject(ElementRef);
    ngOnInit() { 
        var root = am5.Root.new(this.hostEl.nativeElement);

        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
          am5themes_Animated.new(root),
          am5themes_Dark.new(root)
        ]);
        
        // Specify date fields, so that they are formatted accordingly in tooltips
        // https://www.amcharts.com/docs/v5/concepts/formatters/data-placeholders/#Formatting_placeholders
        root.dateFormatter.setAll({
          dateFields: ["valueX"]
        });

        var parser = am5plugins_json.JsonParser.new(root);
        
        parser.parse(sampleJsonXYChart, { parent: root.container })
            .then(chart => {
                // This kicks in when config is parsed
                (chart as any).series.getIndex(0).appear(1000);
                (chart as any).appear(1000, 100);
            });
    }
}