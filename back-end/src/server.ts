import app from './app';
import mongoose from 'mongoose';
import 'dotenv/config';
import envsConfig from './conf/envConfs';

mongoose.set('strictQuery', true);
if (!envsConfig.dbHost) {
    console.error('No dbHost в envConfs');
    process.exit(1);
}

mongoose
    .connect(envsConfig.dbHost)
    .then(() => {
        app.listen(envsConfig.port, () => {
            console.log(
                `Server running. Use our API on port: ${envsConfig.port}`
            );
        });
    })
    .catch(error => {
        console.log(error.message);
        process.exit(1);
    });

// qE8JKFkyyODHhhoh //
