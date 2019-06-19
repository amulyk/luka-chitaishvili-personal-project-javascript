export class Validator {
    static validate(data, schema) {
        let keys = Object.getOwnPropertyNames(schema);
        let result = true;

        if (!Object.getOwnPropertyNames(data).every(property => Object.getOwnPropertyNames(schema).includes(property))) {
            throw new Error(`Invalid property name found in scenario`)
        }

        for (let key of keys) {
            if (typeof data[key] === 'object' && !Array.isArray(data[key])) {
                result = Validator.validate(data[key], schema[key]);
                if (!result) {
                    break;
                }
            } else if (Array.isArray(data[key])) {
                for (let item of data[key]) {
                    result = Validator.validate(item, schema[key][0]);
                    if (!result) {
                        break;
                    }
                }
            } else if (data.hasOwnProperty(key)) {
                if (!(typeof data[key] === schema[key]['type'])) {
                    throw new Error(`Invalid '${key}' property type in scenario`)
                }
            } else if (!data.hasOwnProperty(key)) {
                if (!schema[key]['optional']) {
                    throw new Error(`Missing '${key}' property in scenario`)
                }
            } 
        }
        return result;
    }
}
