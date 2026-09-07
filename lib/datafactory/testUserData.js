import { faker } from '@faker-js/faker';

export const generateUserData  = () => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    dob: faker.date.birthdate().toISOString().split('T')[0],
    country: faker.location.country(),
    zipeCode: faker.location.zipCode(),
    houseNumber: faker.location.buildingNumber(),
    streetName: faker.location.streetAddress(),
    cityName: faker.location.city(),
    stateName: faker.location.state(),
    phone: faker.string.numeric(10),
    email: faker.internet.email(),
    password: faker.internet.password({
        length: 12,
        pattern: /[A-Za-z0-9@%$#]/,
    }) + '$',

})
