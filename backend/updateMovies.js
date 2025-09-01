const mongoose = require('mongoose');
const Movie = require('./models/Movie');
require('dotenv').config();

async function updateMovies() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    const moviesData = [
      {
        title: 'The Godfather',
        overview: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
        poster_path: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
        backdrop_path: 'https://image.tmdb.org/t/p/w1280/tmU7GeKVybMWFButWEGl2M4GeiP.jpg',
        genres: [
          { id: 18, name: 'Drama' },
          { id: 80, name: 'Crime' }
        ],
        director: {
          name: 'Francis Ford Coppola',
          profile_path: 'https://image.tmdb.org/t/p/w185/dUJYAgR9Z2qgdO5W2hK9c8Y9z5.jpg'
        },
        casts: [
          { name: 'Marlon Brando', profile_path: 'https://image.tmdb.org/t/p/w185/7KxhPHHvL8JLP4G3qplsOQhE3L.jpg' },
          { name: 'Al Pacino', profile_path: 'https://image.tmdb.org/t/p/w185/2dGBmpY2zHwn0pqmKS0YNpn4pFP.jpg' },
          { name: 'James Caan', profile_path: 'https://image.tmdb.org/t/p/w185/4Z0x0gqPw2Q7qLp5jWJNP2tHk1.jpg' },
          { name: 'Richard S. Castellano', profile_path: '' },
          { name: 'Robert Duvall', profile_path: 'https://image.tmdb.org/t/p/w185/kgLTBhkKjrQSsJX0MYOEwJut2gB.jpg' },
          { name: 'Sterling Hayden', profile_path: 'https://image.tmdb.org/t/p/w185/8rMqdvO6XKCnJfI3tWnMh5V8Vz.jpg' },
          { name: 'John Marley', profile_path: 'https://image.tmdb.org/t/p/w185/6Ksb8ANhhoWWGnlM6O1qrySd7e1.jpg' },
          { name: 'Richard Conte', profile_path: 'https://image.tmdb.org/t/p/w185/yhI4MK5atavKBD9wiJtaO1say1p.jpg' },
          { name: 'Al Lettieri', profile_path: 'https://image.tmdb.org/t/p/w185/uPq4xUPiJIMW5rXF9AT0GrRqgJY.jpg' },
          { name: 'Diane Keaton', profile_path: 'https://image.tmdb.org/t/p/w185/8rMqdvO6XKCnJfI3tWnMh5V8Vz.jpg' }
        ],
        release_date: new Date('1972-03-24'),
        original_language: 'en',
        tagline: 'An offer you can\'t refuse.',
        vote_average: 9.2,
        vote_count: 162036,
        runtime: 175,
        trailers: [
          { videoUrl: 'https://www.youtube.com/watch?v=sY1S34973zA' },
          { videoUrl: 'https://www.youtube.com/watch?v=5DO-nDW43Ik' }
        ]
      },
      {
        title: 'The Shawshank Redemption',
        overview: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
        poster_path: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
        backdrop_path: 'https://image.tmdb.org/t/p/w1280/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg',
        genres: [
          { id: 18, name: 'Drama' },
          { id: 80, name: 'Crime' }
        ],
        director: {
          name: 'Frank Darabont',
          profile_path: 'https://image.tmdb.org/t/p/w185/8rMqdvO6XKCnJfI3tWnMh5V8Vz.jpg'
        },
        casts: [
          { name: 'Tim Robbins', profile_path: 'https://image.tmdb.org/t/p/w185/6Ksb8ANhhoWWGnlM6O1qrySd7e1.jpg' },
          { name: 'Morgan Freeman', profile_path: 'https://image.tmdb.org/t/p/w185/oIciQWr8VwKoR8TmAw1owaiZGQ.jpg' },
          { name: 'Bob Gunton', profile_path: 'https://image.tmdb.org/t/p/w185/yhI4MK5atavKBD9wiJtaO1say1p.jpg' },
          { name: 'William Sadler', profile_path: 'https://image.tmdb.org/t/p/w185/uPq4xUPiJIMW5rXF9AT0GrRqgJY.jpg' },
          { name: 'Clancy Brown', profile_path: 'https://image.tmdb.org/t/p/w185/8rMqdvO6XKCnJfI3tWnMh5V8Vz.jpg' },
          { name: 'Gil Bellows', profile_path: 'https://image.tmdb.org/t/p/w185/6Ksb8ANhhoWWGnlM6O1qrySd7e1.jpg' },
          { name: 'Mark Rolston', profile_path: 'https://image.tmdb.org/t/p/w185/yhI4MK5atavKBD9wiJtaO1say1p.jpg' },
          { name: 'James Whitmore', profile_path: 'https://image.tmdb.org/t/p/w185/uPq4xUPiJIMW5rXF9AT0GrRqgJY.jpg' },
          { name: 'Jeffrey DeMunn', profile_path: 'https://image.tmdb.org/t/p/w185/8rMqdvO6XKCnJfI3tWnMh5V8Vz.jpg' },
          { name: 'Larry Brandenburg', profile_path: 'https://image.tmdb.org/t/p/w185/6Ksb8ANhhoWWGnlM6O1qrySd7e1.jpg' }
        ],
        release_date: new Date('1994-09-23'),
        original_language: 'en',
        tagline: 'Fear can hold you prisoner. Hope can set you free.',
        vote_average: 9.3,
        vote_count: 2343110,
        runtime: 142,
        trailers: [
          { videoUrl: 'https://www.youtube.com/watch?v=6hB3S9bIaco' }
        ]
      },
      {
        title: 'The Dark Knight',
        overview: 'Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets.',
        poster_path: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
        backdrop_path: 'https://image.tmdb.org/t/p/w1280/hqkIcbrOHL86UncnHIsHVcVmzue.jpg',
        genres: [
          { id: 28, name: 'Action' },
          { id: 80, name: 'Crime' },
          { id: 18, name: 'Drama' },
          { id: 53, name: 'Thriller' }
        ],
        director: {
          name: 'Christopher Nolan',
          profile_path: 'https://image.tmdb.org/t/p/w185/8rMqdvO6XKCnJfI3tWnMh5V8Vz.jpg'
        },
        casts: [
          { name: 'Christian Bale', profile_path: 'https://image.tmdb.org/t/p/w185/6Ksb8ANhhoWWGnlM6O1qrySd7e1.jpg' },
          { name: 'Heath Ledger', profile_path: 'https://image.tmdb.org/t/p/w185/5Y9HnYYa9jF4NunY9lSgJGjSe8E.jpg' },
          { name: 'Aaron Eckhart', profile_path: 'https://image.tmdb.org/t/p/w185/yhI4MK5atavKBD9wiJtaO1say1p.jpg' },
          { name: 'Michael Caine', profile_path: 'https://image.tmdb.org/t/p/w185/uPq4xUPiJIMW5rXF9AT0GrRqgJY.jpg' },
          { name: 'Maggie Gyllenhaal', profile_path: 'https://image.tmdb.org/t/p/w185/8rMqdvO6XKCnJfI3tWnMh5V8Vz.jpg' },
          { name: 'Gary Oldman', profile_path: 'https://image.tmdb.org/t/p/w185/6Ksb8ANhhoWWGnlM6O1qrySd7e1.jpg' },
          { name: 'Morgan Freeman', profile_path: 'https://image.tmdb.org/t/p/w185/oIciQWr8VwKoR8TmAw1owaiZGQ.jpg' },
          { name: 'Monique Gabriela Curnen', profile_path: 'https://image.tmdb.org/t/p/w185/yhI4MK5atavKBD9wiJtaO1say1p.jpg' },
          { name: 'Ron Dean', profile_path: 'https://image.tmdb.org/t/p/w185/uPq4xUPiJIMW5rXF9AT0GrRqgJY.jpg' },
          { name: 'Cillian Murphy', profile_path: 'https://image.tmdb.org/t/p/w185/8rMqdvO6XKCnJfI3tWnMh5V8Vz.jpg' }
        ],
        release_date: new Date('2008-07-18'),
        original_language: 'en',
        tagline: 'Why so serious?',
        vote_average: 9.0,
        vote_count: 2303232,
        runtime: 152,
        trailers: [
          { videoUrl: 'https://www.youtube.com/watch?v=EXeTwQWrcwY' }
        ]
      },
      {
        title: 'Pulp Fiction',
        overview: 'A burger-loving hit man, his philosophical partner, a drug-addled gangster\'s moll and a washed-up boxer converge in this sprawling, comedic crime caper.',
        poster_path: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
        backdrop_path: 'https://image.tmdb.org/t/p/w1280/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg',
        genres: [
          { id: 53, name: 'Thriller' },
          { id: 80, name: 'Crime' }
        ],
        director: {
          name: 'Quentin Tarantino',
          profile_path: 'https://image.tmdb.org/t/p/w185/8rMqdvO6XKCnJfI3tWnMh5V8Vz.jpg'
        },
        casts: [
          { name: 'John Travolta', profile_path: 'https://image.tmdb.org/t/p/w185/6Ksb8ANhhoWWGnlM6O1qrySd7e1.jpg' },
          { name: 'Uma Thurman', profile_path: 'https://image.tmdb.org/t/p/w185/yhI4MK5atavKBD9wiJtaO1say1p.jpg' },
          { name: 'Samuel L. Jackson', profile_path: 'https://image.tmdb.org/t/p/w185/uPq4xUPiJIMW5rXF9AT0GrRqgJY.jpg' },
          { name: 'Bruce Willis', profile_path: 'https://image.tmdb.org/t/p/w185/8rMqdvO6XKCnJfI3tWnMh5V8Vz.jpg' },
          { name: 'Ving Rhames', profile_path: 'https://image.tmdb.org/t/p/w185/6Ksb8ANhhoWWGnlM6O1qrySd7e1.jpg' },
          { name: 'Harvey Keitel', profile_path: 'https://image.tmdb.org/t/p/w185/yhI4MK5atavKBD9wiJtaO1say1p.jpg' },
          { name: 'Quentin Tarantino', profile_path: 'https://image.tmdb.org/t/p/w185/uPq4xUPiJIMW5rXF9AT0GrRqgJY.jpg' },
          { name: 'Julia Sweeney', profile_path: 'https://image.tmdb.org/t/p/w185/8rMqdvO6XKCnJfI3tWnMh5V8Vz.jpg' },
          { name: 'Christopher Walken', profile_path: 'https://image.tmdb.org/t/p/w185/6Ksb8ANhhoWWGnlM6O1qrySd7e1.jpg' },
          { name: 'Rosanna Arquette', profile_path: 'https://image.tmdb.org/t/p/w185/yhI4MK5atavKBD9wiJtaO1say1p.jpg' }
        ],
        release_date: new Date('1994-10-14'),
        original_language: 'en',
        tagline: 'Just because you are a character doesn\'t mean you have character.',
        vote_average: 8.5,
        vote_count: 2570366,
        runtime: 154,
        trailers: [
          { videoUrl: 'https://www.youtube.com/watch?v=s7EdQ4FqbhY' }
        ]
      },
      {
        title: 'Inception',
        overview: 'Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: "inception", the implantation of another person\'s idea into a target\'s subconscious.',
        poster_path: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
        backdrop_path: 'https://image.tmdb.org/t/p/w1280/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
        genres: [
          { id: 28, name: 'Action' },
          { id: 878, name: 'Science Fiction' },
          { id: 12, name: 'Adventure' }
        ],
        director: {
          name: 'Christopher Nolan',
          profile_path: 'https://image.tmdb.org/t/p/w185/8rMqdvO6XKCnJfI3tWnMh5V8Vz.jpg'
        },
        casts: [
          { name: 'Leonardo DiCaprio', profile_path: 'https://image.tmdb.org/t/p/w185/6Ksb8ANhhoWWGnlM6O1qrySd7e1.jpg' },
          { name: 'Joseph Gordon-Levitt', profile_path: 'https://image.tmdb.org/t/p/w185/yhI4MK5atavKBD9wiJtaO1say1p.jpg' },
          { name: 'Ellen Page', profile_path: 'https://image.tmdb.org/t/p/w185/uPq4xUPiJIMW5rXF9AT0GrRqgJY.jpg' },
          { name: 'Tom Hardy', profile_path: 'https://image.tmdb.org/t/p/w185/8rMqdvO6XKCnJfI3tWnMh5V8Vz.jpg' },
          { name: 'Ken Watanabe', profile_path: 'https://image.tmdb.org/t/p/w185/6Ksb8ANhhoWWGnlM6O1qrySd7e1.jpg' },
          { name: 'Dileep Rao', profile_path: 'https://image.tmdb.org/t/p/w185/yhI4MK5atavKBD9wiJtaO1say1p.jpg' },
          { name: 'Cillian Murphy', profile_path: 'https://image.tmdb.org/t/p/w185/uPq4xUPiJIMW5rXF9AT0GrRqgJY.jpg' },
          { name: 'Tom Berenger', profile_path: 'https://image.tmdb.org/t/p/w185/8rMqdvO6XKCnJfI3tWnMh5V8Vz.jpg' },
          { name: 'Marion Cotillard', profile_path: 'https://image.tmdb.org/t/p/w185/6Ksb8ANhhoWWGnlM6O1qrySd7e1.jpg' },
          { name: 'Pete Postlethwaite', profile_path: 'https://image.tmdb.org/t/p/w185/yhI4MK5atavKBD9wiJtaO1say1p.jpg' }
        ],
        release_date: new Date('2010-07-16'),
        original_language: 'en',
        tagline: 'Your mind is the scene of the crime.',
        vote_average: 8.8,
        vote_count: 3449410,
        runtime: 148,
        trailers: [
          { videoUrl: 'https://www.youtube.com/watch?v=YoHD9XEInc0' }
        ]
      }
    ];

    for (const movieData of moviesData) {
      let movie = await Movie.findOne({ title: movieData.title });

      if (movie) {
        // Update existing movie
        await Movie.findByIdAndUpdate(movie._id, movieData, { new: true });
        console.log(`Updated ${movieData.title}`);
      } else {
        // Insert new movie
        const newMovie = new Movie(movieData);
        await newMovie.save();
        console.log(`Inserted ${movieData.title}`);
      }
    }

    mongoose.connection.close();
  } catch (error) {
    console.error('Error updating movies:', error);
    mongoose.connection.close();
  }
}

updateMovies();
