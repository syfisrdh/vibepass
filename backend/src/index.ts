import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initializeDatabase } from './utils/database';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
// app.set('trust proxy', true);

const startServer = async () => {
    await initializeDatabase();

    // Import routes *after* database initialization
    const authRoutes = (await import('./routes/auth.routes')).default;

    app.get("/", (req, res) => {
        res.send("Backend is running.");
    });

    // Register routes
    app.use('/auth', authRoutes);
    // app.use("/chat", chatRoutes);

    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
        console.error("Unhandled error:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    });

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
};

startServer().catch(error => {
    console.error("Failed to start server:", error);
    process.exit(1);
});
