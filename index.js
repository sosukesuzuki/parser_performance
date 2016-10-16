const parse = require('babylon').parse;
const fs = require('fs');
const Table  = require("cli-table");

const ITERATIONS = 100;

const table = new Table({
  head: ["name", "run"],
  chars: {
    top: "",
    "top-mid": "" ,
    "top-left": "" ,
    "top-right": "",
    bottom: "" ,
    "bottom-mid": "" ,
    "bottom-left": "" ,
    "bottom-right": "",
    left: "",
    "left-mid": "",
    mid: "",
    "mid-mid": "",
    right: "" ,
    "right-mid": "",
    middle: " ",
  },
  style: {
    "padding-left": 0,
    "padding-right": 0,
    head: ["bold"],
  },
});

function test(input) {
  for (let i = 0; i < ITERATIONS; i++) {
    parse(input, {
      sourceType: "script",

      plugins: [
        "doExpressions",
        "objectRestSpread",
        "decorators",
        "classProperties",
        "exportExtensions",
        "asyncGenerators",
        "functionBind",
        "functionSent",
        "dynamicImport",
        "jsx",
        "flow"
      ]
    });
  }
}

const files = [
  './fixtures/angular.js',
  './fixtures/backbone.js',
  './fixtures/ember.debug.js',
  './fixtures/jquery.js',
  './fixtures/react-with-addons.js',
];

const results = [];

files.forEach((file) => {
  const code = fs.readFileSync('./fixtures/jquery.js', 'utf-8');
  const start = Date.now();
  const result = test(code);
  const end = Date.now();
  const run = (end - start) / ITERATIONS;

  results.push({ file, run });
});


results.forEach(function (result, i) {
  let row = [
    result.file,
    Math.round(result.run) + "ms",
  ];

  table.push(row);
});

console.log(table.toString());