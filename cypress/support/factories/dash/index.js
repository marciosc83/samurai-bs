import _ from 'underscore'

exports.customer = {
    name: 'Nikki Sixx',
    email: 'sixx@motleycrue.com',
    password: 'pwd123',
    is_provider: false
}

exports.provider = {
    name: 'Ramon Valdez',
    email: 'ramon@televisa.com',
    password: 'pwd123',
    is_provider: true
}

exports.appointment = {
    hour: _.sample(['08','09','10','11','12','13','14','15','16'])
} 