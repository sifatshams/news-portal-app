import dotenv from 'dotenv';
import path from 'path';

// Absolute Path
dotenv.config({
  path: path.resolve(
    process.cwd(),
    process.env.NODE_ENV === 'production'
      ? '.env.production'
      : '.env.development',
  ),
  override: true,
});

const { default: app } = await import('./src/app.js');
const { default: connectDB } = await import('./src/config/db.js');

const port = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
  });
});
