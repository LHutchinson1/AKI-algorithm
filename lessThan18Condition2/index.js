module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var outcome;

// Check condition (C1 > 354 OR maximumRatio > 3)

    if (req.body.creatinineValue > 354 || req.body.maximumRatio > 3) {
        outcome = true
    } else outcome = false;

    context.res = {
        "outcome": outcome
    };


    context.done();
};