module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var referenceFiles = context.bindings.patientReferenceInt;
    var identifier = req.body.patientrefid;
    var upperReferenceInt = 0;
    var outcome;

// Get upperReferenceInt value for patient

    for (var i = 0; i < referenceFiles.length; i ++) {
        if (identifier === referenceFiles[i].patientrefid) {
            upperReferenceInt = referenceFiles[i].ULRI;
        }
    };

// Calulate 3 times ULRI

    var tripleULRI = upperReferenceInt * 3;

// Check condition (C1 > 3 * ULRI OR maximumRatio > 3)

    if (req.body.creatinineValue > tripleULRI || req.body.maximumRatio > 3) {
        outcome = true
    } else outcome = false;

    context.res = {
        "outcome": outcome
    };


    context.done();
};