const {user, post} = require('./UsersAndPosts');
const newUser = new user({
    userName: 'Mousa Salib',
    email: 'moussakhairy@gmail.com',
    password: 'securepassword',
    age: 24,
    gender: 'Male',
    phone: '01151522174',
});
newUser.speak();
await newUser.save();
newUser.speak()

const newPost = new post({
    title: 'My First Post',
    content: 'This is the content of my first post.',
    userID: user._id,
  });
  newPost.speak();
  await newPost.save();
  newPost.speak();



