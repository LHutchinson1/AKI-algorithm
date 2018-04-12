module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var outcome;

// Check condition (maximumRatio >= 1.5 AND maximumRatio < 2)

    if (req.body.maximumRatio >= 1.5 && req.body.maximumRatio < 2) {
        outcome = true
    } else outcome = false;

    context.res = {
        "outcome": outcome
    };


    context.done();
};