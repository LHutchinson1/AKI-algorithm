module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var previousMeasurements = context.bindings.checkPreviousMeasurements;
    var identifier = req.body.patientrefid;

    context.log(previousMeasurements.length);

//Push all patientrefid from previousMeasurements into an array

    var allPatients = [];

    for(var i = 0; i < previousMeasurements.length; i ++) {
        allPatients.push(previousMeasurements[i].patientrefid);
    };

    context.log(allPatients);

//Check if any patientids match the new patientid

    var identifierCheck = allPatients.includes(identifier);

    context.res = {
        identifierCheck
    };

    context.done();
};