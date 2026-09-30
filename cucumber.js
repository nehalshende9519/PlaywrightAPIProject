module.exports = {

  default: {

    require: [
      "tests/Stepdefinitions/**/*.js"
    ],

    paths: [
      "tests/Feature/Userreqbodyvalidandinvalid.feature"
    ],

    format: [
      "html:reports/cucumber-report.html",
      "json:reports/cucumber-report.json"
    ]

  }

};