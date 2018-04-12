module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var referenceFiles = context.bindings.patientReferenceInt;
    var patient = req.body;
    var referenceArr = [];

    for(var i = 0; i < referenceFiles.length; i ++) {

     if (patient.patientrefid === referenceFiles[i].patientrefid) {

        referenceArr.push(referenceFiles[i].ULRI, referenceFiles[i].LLRI);
        context.log(referenceArr);
    }
    };

    context.res = {
        ULRI: referenceArr[0],
        LLRI: referenceArr[1]
    };

    context.done();
};