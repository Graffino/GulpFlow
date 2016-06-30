//
// Handlebars: Math helper
// Author: Graffino (http://www.graffino.com)
//

// Linting exceptions
/* global Handlebars */

Handlebars.registerHelper('math', function (lvalue, operator, rvalue) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);

    return {
        '+': lvalue + rvalue,
        '-': lvalue - rvalue,
        '*': lvalue * rvalue,
        '/': lvalue / rvalue,
        '%': lvalue % rvalue
    }[operator];
});
