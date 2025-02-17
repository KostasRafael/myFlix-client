// The following block of code, was in movies-list.jsx
// starting from line 30
// betwwen all the const, and the next useEffect

useEffect(() => {
  fetch(
    `https://murmuring-ridge-94608-7a62e12e52db.herokuapp.com/users/${user.Username}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  )
    .then((response) => response.json())
    .then((fetchedUser) => {
      setUserObject(fetchedUser);
    });
}, []);

// The following block of code, was in movies-list.jsx
// underneath the userEfeect above
// just before the const filteredMovies ...

//-----------------------------------------------------------------------------------------------------------------

// The following block of code was within the profile-view.jsx
// starting just after const [userObject ...]
// ending just before const moviesDisplay ...

// Here, userObject is { FavoriteMovies: [] }
useEffect(() => {
  fetch(
    `https://murmuring-ridge-94608-7a62e12e52db.herokuapp.com/users/${user.Username}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  )
    .then((response) => response.json())
    .then((fetchedUser) => {
      setUserObject(fetchedUser);
    });
}, []);

// Here, userObject is
// {
// _id: '67a4ff1c658256f0b9fa4904',
// Username: 'user2025',
// Password: '$2a$10$N37rC4frTa0AKLhxRdHR/u.uy4fkMNHvhNYHCZUF290uA4jx.n8Ju',
// Email: 'user2025@gmail.com',
// Birthday: '1990-01-10T00:00:00.000Z',
// FavoriteMovies: [string, string]
// }

let userEmail = userObject.Email;

useEffect(() => {
  if (userObject.FavoriteMovies.length > 0) {
    setFetchedUserFavoriteMovies(userObject.FavoriteMovies);
  }
}, [userObject]);
