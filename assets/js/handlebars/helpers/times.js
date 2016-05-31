//
// Handlebars: Times helper
// Author: Graffino (http://www.graffino.com)
//

// Linting exceptions
/* global Handlebars */

Handlebars.registerHelper('times', function(n, block) {
    var accum = '';
    for (var i = 0; i < n; ++i) {
        accum += block.fn(i);
    }
    return accum;
});
