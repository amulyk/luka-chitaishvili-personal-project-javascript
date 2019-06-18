export class Validator {
    static vaildate(data, schema) {
        let result = false;
        if (typeof schema === 'object' && !Array.isArray(schema)) {
            
        }
        return result;
    }
}

let data = {
    name: 'Roma',
    age: 2,
}

let schema = {
    name: 'string',
    age: 'number'
}

console.log(Validator.vaildate(data, schema));