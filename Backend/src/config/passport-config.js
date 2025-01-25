import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../models/user.model.js'; // Asegúrate de que la ruta sea correcta

// Configura la estrategia de inicio de sesión local
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username }); // O cualquier otro campo que uses para el login
      if (!user || !(await user.comparePassword(password))) {
        return done(null, false, { message: 'Credenciales incorrectas' });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

// Serializa y deserializa al usuario
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
