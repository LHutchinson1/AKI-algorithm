module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var outcome;

// Check condition (maximumRatio >= 2 AND maximumRatio < 3)

    if (req.body.maximumRatio >= 2 && req.body.maximumRatio < 3) {
        outcome = true
    } else outcome = false;

    context.res = {
        "outcome": outcome
    };


    context.done();
};