/**
 * Truncate Filter
 * @Param text
 * @Param length, default is 10
 * @Param end, default is "..."
 * @return string
 */
app.filter('truncate', function () {
        return function (text, length, end) {
            if (isNaN(length))
                length = 10;

            if (end === undefined)
                end = "...";
            var getLength=function(str) {
                try{var len = str.length;}catch(e){var len=0;}
                var reLen = 0;
                for (var i = 0; i < len; i++) {
                    if (str.charCodeAt(i) < 27 || str.charCodeAt(i) > 126) {
                        // 全角
                        reLen += 2;
                    } else {
                        reLen++;
                    }
                }
                return reLen;
            };
            var textlength=getLength(text);
            var endLenght=getLength(end);
            if (textlength <= length || textlength - endLenght <= length) {
                return text;
            }
            else {
                return String(text).substring(0, length-endLenght) + end;
            }

        };
    });

/**
 * Usage
 *
 * var myText = "This is an example.";
 *
 * {{myText|Truncate}}
 * {{myText|Truncate:5}}
 * {{myText|Truncate:25:" ->"}}
 * Output
 * "This is..."
 * "Th..."
 * "This is an e ->"
 *
 */
