const mongoose = require('mongoose');
users().catch(err => console.log(err));
async function users() {
   await mongoose.connect("mongodb://127.0.0.1:27017/test")
}
const usersSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number },
    gender: { type: String },
    phone: { type: String },
});

const postsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  });

const user = mongoose.model('User', usersSchema );
const post = mongoose.model('Post', postsSchema);
module.exports = { user, post}


app.use(express.json());
app.post('/signup', async (req, res) => {
  try {
    
    const newUser = new user(req.body);

    
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    if (error.code === 11000) {
    
      res.status(400).json({ message: 'Email is already registered' });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
});
// ======================================================================
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await user.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }
    res.status(200).json({ message: 'Sign-in successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// =========================================================================
app.put('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  const updateData = req.body;
  try {
    const updatedUser = await user.findByIdAndUpdate(userId, updateData, {
      new: true, 
    });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// ==========================================================================================
app.delete('/users/:userId', async (req, res) => {
  const { userId } = req.params; 
  try {
    const deletedUser = await user.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.delete('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await User.deleteOne({ _id: userId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// ========================================================================================
app.get('/users/search', async (req, res) => {
  const { nameStartsWith, maxAge } = req.query;
  try {
    const query = {};
    if (nameStartsWith) {
      query.userName = { $regex: `^${nameStartsWith}`, $options: 'i' };
    }
    if (maxAge) {
      query.age = { $lt: parseInt(maxAge) };
    }
    const users = await user.find(query);

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// ==============================================================================
app.get('/users/search', async (req, res) => {
  const { minAge, maxAge } = req.query;
  try {
    const query = {};
    if (minAge) {
      query.age = { $gte: parseInt(minAge) };
    }
    if (maxAge) {
      query.age = { ...query.age, $lte: parseInt(maxAge) };
    }
    const users = await user.find(query);

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// ===================================================================
app.get('/users', async (req, res) => {
  try {
    const users = await user.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// =============================================================================
app.get('/users/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const userProfile = await user.findById(userId).populate('posts');

    if (!userProfile) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(userProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});