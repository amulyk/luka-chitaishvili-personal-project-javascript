export class Validator {
    static validate(data, schema) {
        let keys = Object.getOwnPropertyNames(schema);
        let dataKeys = Object.getOwnPropertyNames(data);
        let invalidProperties = dataKeys.filter(property => !keys.includes(property));

        if (invalidProperties.length) {
            throw new Error(`${invalidProperties} --- invalid properties found in scenario`)
        }

        for (let key of keys) {
            if (typeof data[key] === 'object' && !Array.isArray(data[key])) {
                Validator.validate(data[key], schema[key]);
            } else if (Array.isArray(data[key])) {
                for (let item of data[key]) {
                    Validator.validate(item, schema[key][0]);
                }
            } else if (data.hasOwnProperty(key)) {
                if (!(typeof data[key] === schema[key]['type'])) {
                    throw new Error(`invalid '${key}' property type in scenario`)
                }
            } else if (!data.hasOwnProperty(key)) {
                if (!schema[key]['optional']) {
                    throw new Error(`missing '${key}' property in scenario`)
                }
            } 
        }
        return true;
    }
}
