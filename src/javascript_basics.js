// Variables: var, let
var name = 'Alex';
console.log(name);

name = 20;
console.log(name);

let age = 10;
console.log(age);

age  = 'Hello';
console.log(age);

a = 30;
console.log(a);

var a = 40;
console.log(a);

const hobby = 'Sport';
console.log(hobby);

// functions

const getUserInfo = (userName, userAge) => `User name is ${userName} and user age is ${userAge}`;
let sayHello = message => {
    console.log(message);
}

console.log(getUserInfo('Bilal', 30));

sayHello('Hello from javascript arrow function');

sayHello = (message1, message2) => {
    console.log(message1 + ',' + message2);
}

sayHello('Hello', 'Hi');

// Objects
const user = {
    firstname: 'Alex',
    lastname: 'Dubois',

    greeting() {
        console.log(`Hello, I\'m ${this.firstname}`);
    }
};

console.log(user.firstname)

user.greeting();

// Arrays
const hobbies = ['Sport', 'Traveling'];
console.log(hobbies)

const hobbies2 = hobbies.slice();
hobbies2.push('Reading')
console.log(hobbies2)
console.log(hobbies)

const hobbies3 = hobbies.map(hobby => 'Hobby: '+hobby);
console.log(hobbies3)
console.log(hobbies)

const hobbies4 = hobbies.filter(hobby => hobby.length>5);
console.log(hobbies4)
console.log(hobbies)

for(let hobby of hobbies){
    console.log(hobby)
}

for(let i = 0; i<hobbies.length; i++){
    console.log(hobbies[i])
}

hobbies.forEach(hobby => {
    console.log(hobby)
});

// Spred and Rest Operators
const hobbies5 = [...hobbies];
console.log(hobbies5)

const user2 = {...user};
console.log(user)

const convertToList = (...args) => {
    return args;
}

console.log(convertToList('Sport', 'traveling', 'Reading', 'Watching Movies'));

// Destructuring
const {firstname, lastname} = user;
console.log(firstname)
console.log(lastname)

const [hobby1, hobby2] = hobbies;
console.log(hobby1 + ', '+ hobby2);

// Async: setTimeout, setInterval and promises
console.log('Line 1')
console.log('Line 2')

setTimeout(() => {
    console.log('Line 3')
}, 2000);
console.log('Line 4')

/*
setInterval(() => {
    console.log('Line 5')
}, 1000);
console.log('Line 6')*/

fetchPersons = callback => {
    setTimeout(() => {
        const persons = [{firstname: 'Name 1', age: 10}, {firstname: 'Name 1', age: 20}, {firstname: 'Name 1', age: 30}]
        callback(persons);
    }, 2000);
}

fetchPersons((data) => {
    console.log(data)
});

const fetchPerons2 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const persons = [{firstname: 'Name 1', age: 10}, {firstname: 'Name 1', age: 20}, {firstname: 'Name 1', age: 30}]
            resolve(persons);
            // reject('An error was occured');
        }, 3000);
    });
}

fetchPerons2().then(data => {
    console.log('------------------ 1 ------------------')
    console.log(data);
    return fetchPerons2();
})
.then(data => {
    console.log('------------------ 2 ------------------')
    console.log(data);
}).catch(error => {
    console.log(error)
});