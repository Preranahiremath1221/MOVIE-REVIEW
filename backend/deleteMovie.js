const mongoose = require('mongoose');
const Movie = require('./models/Movie');
require('dotenv').config();

async function deleteMovie() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    const movie = await Movie.findOneAndDelete({ title: 'Goodfellas' });

    if (movie) {
      console.log(`Deleted movie: ${movie.title}`);
    } else {
      console.log('Movie "Goodfellas" not found in the database');
    }

    mongoose.connection.close();
  } catch (error) {
    console.error('Error deleting movie:', error);
    mongoose.connection.close();
  }
}

deleteMovie();
