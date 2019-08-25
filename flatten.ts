
enum JsonTypes {
    String,
    Number,
    Boolean,
    Object,
    Array,
    Null
}



function json_flatten(json: string): JsonTypes[] {
    return recursive_flatten(JSON.parse(json))
}

function recursive_flatten(parsed: any): JsonTypes[] {
    console.log(`Parsing ${parsed} into -> ${typeof (parsed)} -> ${parsed}`)

    let result = (() => {
        switch (typeof (parsed)) {
            case "string": return [JsonTypes.String];
            case "number": return [JsonTypes.Number];
            case "boolean": return [JsonTypes.Boolean];
            case "object": {
                if (parsed == null) {
                    return [JsonTypes.Null]
                } else if (Array.isArray(parsed)) {
                    let values: JsonTypes[][] = parsed.map((value) => {
                        console.log(`About to recur! ${JSON.stringify(value)}`)
                        return recursive_flatten(value)
                    })

                    let flattened = values.reduce((a, b) => a.concat(b), [JsonTypes.Array])
                    console.log(`The values now are ${JSON.stringify(flattened)}`)
                    return flattened
                } else {
                    return [JsonTypes.Object]
                }
            }
            default: return []
        }
    })();
    return result;
}


[
     '"a"', '3.4', '2', 'null', '[1,3,4]', '{"a":[1,3,4]}', '[[[19]]]'
].forEach(function (term: string) {
    console.log(`The result of flattening ${term} is ${JSON.stringify(json_flatten(term))}`);
})

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