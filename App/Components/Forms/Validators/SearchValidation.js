import validatejs from 'validate.js'

const validation = {
    search: {
        presence: {
            allowEmpty: false,
            message: '^Please enter a search query'
        },
        format: {
            pattern: "^[a-z0-9_-]+$",
            message: "^Please use only lowercase characters"
        }
    }
}

export default function validate(fieldName, value) {
    var formValues = {}
    formValues[fieldName] = value
    var formFields = {}
    formFields[fieldName] = validation[fieldName]
    const result = validatejs(formValues, formFields)

    if (result) {
        return result[fieldName]
    }
    return null
}