module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var identifier = req.body.patientrefid;
    var demographics = context.bindings.patientDemographics;

    for (var i = 0; i < demographics.length; i ++) {
        if (identifier === demographics[i].patientrefid) {
            var patientAge = demographics[i].Age;
        }
    };

    context.res = {
        "patientAge": patientAge
    };

    context.done();
};