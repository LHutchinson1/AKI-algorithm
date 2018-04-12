module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var identifier = req.body.patientrefid;
    var allMeasurements = context.bindings.previousMeasurements;

// Create array of all previous readings for patient with new reading
    
    var previousMeasurements = [];

    for (var i = 0; i < allMeasurements.length; i ++) {
        if (identifier === allMeasurements[i].patientrefid) {
            previousMeasurements.push(allMeasurements[i]);
        }
    };

// Push readings into arrays for previous 7 days and 8 - 365 days

    var lastWeek = [];
    var uptoYear = [];
    var oneDay = 24*60*60*1000;
    var myNow = Date.parse(req.body.readingDate);

    for (var i = 0; i < previousMeasurements.length; i ++) {
        previousMeasurements[i].readingDate = Date.parse(previousMeasurements[i].readingDate);
            var d = previousMeasurements[i].readingDate;
                var diffDays = Math.round(Math.abs((myNow - d)/(oneDay)));
                context.log(diffDays);
            if (diffDays <= 7) {
                lastWeek.push(previousMeasurements[i]);
                    } else if (diffDays > 7 && diffDays <= 365) {
                          uptoYear.push(previousMeasurements[i]);
                      }
    }    

// Create function to sort array by key

    function sortByKey(array, key) {
         return array.sort(function(a, b) {
             var x = a[key]; var y = b[key];
             return ((x < y) ? -1 : ((x > y) ? 1 : 0));
              });
              }

// Sort lastWeek array by value and select lowest value to get RV1. If no values in lastWeek array, set RV1 = 0

    lastWeek = sortByKey(lastWeek, 'creatinineValue');

    var uptoWeekValues = [];

    for (var i = 0; i < lastWeek.length; i ++) {
        uptoWeekValues.push(lastWeek[i].creatinineValue);
    };

    context.log(uptoWeekValues);

    if (uptoWeekValues[0] == null) {
        var RV1 = 0;
    } else RV1 = uptoWeekValues[0];

    context.log(RV1);

// Sort uptoYear values and push to a new array (uptoYearValues)

    uptoYear = sortByKey(uptoYear, 'creatinineValue');

    var uptoYearValues = [];

    for (var i = 0; i < uptoYear.length; i ++) {
        uptoYearValues.push(uptoYear[i].creatinineValue);
    };

    context.log(uptoYearValues);

// Use a function to calulate the median

    function median(values){
         values.sort(function(a,b){
              return a-b;
               });

        var half = Math.floor(values.length / 2);
               
            if(values.length === 0) {
                return 0;
            } else if (values.length === 1) {
                return values[0];
            } else if (values.length % 2) {
                return values[half];
            } else
                return (((values[(half - 1)]) + (values[(half)])) / 2.0);
    };

// Calculate the median from the uptoYearValues (RV2)

    var RV2 = median(uptoYearValues);

    context.log(RV2);

// Get new creatinine value and divide by RV1 and RV2

    var newCreatinine = req.body.creatinineValue;
    var ratioRV1 = newCreatinine/RV1;
    var ratioRV2 = newCreatinine/RV2;

    context.log(ratioRV1, ratioRV2);

// Exclude infinity values and return max from RV1 and RV2 ratios

    if (isFinite(ratioRV1)) {
        ratioRV1 = ratioRV1
    } else ratioRV1 = 0;

    if (isFinite(ratioRV2)) {
        ratioRV2 = ratioRV2
    } else ratioRV2 = 0;

    if (ratioRV1 > ratioRV2) {
        var maximumRatio = ratioRV1;
    } else if (ratioRV2 > ratioRV1) {
        maximumRatio = ratioRV2;
    } else if (ratioRV1 === ratioRV2) {
        maximumRatio = ratioRV1;
    };
    context.res = {
        "maximumRatio": maximumRatio
    }; 

    context.done();
};