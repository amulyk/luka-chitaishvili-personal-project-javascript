export class Validator {
    static vaildate(data, schema) {
        let result = false;
        let keys = [];
        if (Array.isArray(schema)) {
            keys = Object.getOwnPropertyNames(schema);
        }
        for (let key of keys) {
            
        }
        
        return result;
    }
}

let data = {
    name: 'Roma',
    age: 2,
    index: 1
}

let schema = {
    name: {
        type: 'string',
        optional: false
    },
    age: {
        type: 'number',
        optional: false
    },
    index: {
        type: 'number',
        optional: true
    }

}

console.log(Validator.vaildate(data, schema));
