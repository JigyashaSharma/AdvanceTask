export const fieldValidationRules = [
    {
        field: "firstName",
        regex: /^\w+$/i,
        errorMessage: "Please provide valid first name (Alphabets, digits and underscore)"
    },
    {
        field: "lastName",
        regex: /^\w+$/i,
        errorMessage: "Please provide valid last name(Only Alphabets, digits and underscore)"
    },
    {
        field: "phone",
        regex: /^\d+$/,
        errorMessage: "Please provide valid phone numbers(Only Digits)"
    },
    {
        field: "email",
        regex: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
        errorMessage: "Please provide valid email"
    },
    {
        field: "linkedIn",
        regex: /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/,
        errorMessage: "Please provide valid linkedIn url (https://www.linkedin.com/in/username)"
    },
    {
        field: "github",
        regex: /^https:\/\/github\.com\/[a-zA-Z0-9-]+\/?$/,
        errorMessage: "Please provide valid github url (https://github.com/username)"
    },
    {
        field: "number",
        regex: /^[\w-\/]+$/i,
        errorMessage: "Please provide valid HouseNo (Only Alphabets, digits, _, -, /)"
    },
    {
        field: "street",
        regex: /^(?=.*[A-Za-z0-9])[A-Za-z0-9\s.,-]+$/,
        errorMessage: "Please provide valid street (Only Alphabets, digits and underscore)"
    },
    {
        field: "suburb",
        regex: /^(?=.*[A-Za-z0-9])[A-Za-z0-9\s.,-]+$/,
        errorMessage: "Please provide valid suburb (Only Alphabets, digits and underscore)"
    },
    {
        field: "postCode",
        regex: /^\d+$/,
        errorMessage: "Please provide valid last name (Only Digits)"
    },
    {
        field: "name",
        regex: /^[A-Za-z0-9 #._+@/ ]+$/i,
        errorMessage: "Please provide valid language/skill name"
    },
    {
        field: "company",
        regex: /^[A-Za-z0-9 #._+@\/\- ]+$/,
        errorMessage: "Please provide valid company name.Any combination of letters, digits, spaces, #.+/_@-"
    },
    {
        field: "position",
        regex: /^[A-Za-z0-9 #._+\/ ]+$/,
        errorMessage: "Please provide valid position name. Any combination of letters, digits, spaces, #.+/"
    },
    {
        field: "responsibilities",
        regex: /^[A-Za-z0-9_+\-\/#@. %'",()]+$/,
        errorMessage: "Please provide valid Responsibilities. Any combination of letters, digits, spaces, _+-#@.%,'\"()"
    },
    {
        field: "certificationName",
        regex: /^[A-Za-z0-9_+\-\/#@. %'"() ]+$/,
        errorMessage: "Please provide valid certification name (letters, digits, spaces, _+#-@/.%'\"()). EX: AWS Certification 2023"
    },
    {
        field: "certificationFrom",
        regex: /^[A-Za-z0-9_+\-\/#@. %'"() ]+$/,
        errorMessage: "Please provide valid certification from (letters, digits, spaces, _+#-@,%'\"()). EX: Certified Cloud Architect (AWS)"
    },
    {
        field: "certificationYear",
        regex: /^\d+$/,
        errorMessage: "Please provide valid certification year (digits only)"
    },
    {
        field: "instituteName",
        regex: /^[A-Za-z0-9_+\-\/#@. ]+$/,
        errorMessage: "Please provide valid institute name in Education section(letters, digits, spaces, +-#@.). Ex: XYZ School 2025"
    },
    {
        field: "title",
        regex: /^[A-Za-z0-9_+\-\/#@. %'"()]+$/,
        errorMessage: "Please provide valid title in Education section (letters, digits, spaces, _#@'\"()+-). Ex: Software Engineer, Junior Developer 2, JavaScript/React Developer"
    },
    {
        field: "degree",
        regex: /^[A-Za-z\s.'()]+(?:'s|\.| [A-Za-z]+)?$/,
        errorMessage: "Please provide valid degree in Education Section (letters, digits, _+.')Ex: B.A, Bachelor's, Doctorate in Philosophy)"
    },
    {
        field: "yearOfGraduation",
        regex: /^\d+$/,
        errorMessage: "Please provide valid year of graduation in Education section (digits only)"
    }
];
