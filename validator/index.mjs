export class Validator {
    static validate(data, schema) {
        let keys = Object.getOwnPropertyNames(schema);
        let result = true;

        if (!Object.getOwnPropertyNames(data).every(property => Object.getOwnPropertyNames(schema).includes(property))) {
            return false;
        }

        for (let key of keys) {
            if (typeof data[key] === 'object' && !Array.isArray(data[key])) {
                result = Validator.validate(data[key], schema[key]);
                if (!result) {
                    break;
                }
            } else if (data.hasOwnProperty(key)) {
                if (!(typeof data[key] === schema[key]['type'])) {
                    result = false;
                    break;
                } else {
                    continue;
                }
            } else if (!data.hasOwnProperty(key)) {
                if (!schema[key]['optional']) {
                    result = false;
                    break;
                } else {
                    continue;
                }
            } 
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
