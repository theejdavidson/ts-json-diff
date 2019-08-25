var JsonTypes;
(function (JsonTypes) {
    JsonTypes[JsonTypes["String"] = 0] = "String";
    JsonTypes[JsonTypes["Number"] = 1] = "Number";
    JsonTypes[JsonTypes["Boolean"] = 2] = "Boolean";
    JsonTypes[JsonTypes["Object"] = 3] = "Object";
    JsonTypes[JsonTypes["Array"] = 4] = "Array";
    JsonTypes[JsonTypes["Null"] = 5] = "Null";
})(JsonTypes || (JsonTypes = {}));
function json_flatten(json) {
    return recursive_flatten(JSON.parse(json));
}
function recursive_flatten(parsed) {
    console.log("Parsing " + parsed + " into -> " + typeof (parsed) + " -> " + parsed);
    var result = (function () {
        switch (typeof (parsed)) {
            case "string": return [JsonTypes.String];
            case "number": return [JsonTypes.Number];
            case "boolean": return [JsonTypes.Boolean];
            case "object": {
                if (parsed == null) {
                    return [JsonTypes.Null];
                }
                else if (Array.isArray(parsed)) {
                    var values = parsed.map(function (value) {
                        console.log("About to recur! " + JSON.stringify(value));
                        return recursive_flatten(value);
                    });
                    var flattened = values.reduce(function (a, b) { return a.concat(b); }, [JsonTypes.Array]);
                    console.log("The values now are " + JSON.stringify(flattened));
                    return flattened;
                }
                else {
                    return [JsonTypes.Object];
                }
            }
            default: return [];
        }
    })();
    return result;
}
[
    '"a"', '3.4', '2', 'null', '[1,3,4]', '{"a":[1,3,4]}', '[[[19]]]'
].forEach(function (term) {
    console.log("The result of flattening " + term + " is " + JSON.stringify(json_flatten(term)));
});
// let x = '"a"'
// console.log(`Before x is ${x}`)
// flatten(x)
// console.log(`Now x is ${x}`)
// flatten('null')
// flatten('true')
// flatten('1')
// flatten('2.5')
// flatten('[1,2,3]')
// flatten('{ "a": [1,2,3]}')
//console.log(`The type of [1,2,4] is ${typeof ([1, 2, 3])} but ${Array.isArray([1, 3, 4])}`)
