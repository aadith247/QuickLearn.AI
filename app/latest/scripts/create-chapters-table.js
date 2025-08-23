const { drizzle } = require('drizzle-orm/postgres-js');
const postgres = require('postgres');
const { pgTable, serial, varchar, json, integer, timestamp } = require('drizzle-orm/pg-core');

// Database connection
const connectionString = process.env.NEXT_PUBLIC_DATABASE_URL;
const client = postgres(connectionString);
const db = drizzle(client);

// Define the chapters table schema
const Chapters = pgTable('chapters', {
    id: serial('id').primaryKey(),
    courseId: varchar('courseId').notNull(),
    chapterId: integer('chapterId').notNull(),
    title: varchar('title').notNull(),
    content: json('content').notNull(),
    videoId: varchar('videoId'),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt')
});

async function createChaptersTable() {
    try {
        console.log('Creating chapters table...');
        
        // Create the chapters table
        await client`
            CREATE TABLE IF NOT EXISTS chapters (
                id SERIAL PRIMARY KEY,
                courseId VARCHAR NOT NULL,
                chapterId INTEGER NOT NULL,
                title VARCHAR NOT NULL,
                content JSONB NOT NULL,
                videoId VARCHAR,
                createdAt TIMESTAMP DEFAULT NOW(),
                updatedAt TIMESTAMP
            );
        `;
        
        console.log('✅ Chapters table created successfully!');
        
        // Create index for better performance
        await client`
            CREATE INDEX IF NOT EXISTS idx_chapters_courseId ON chapters(courseId);
        `;
        
        console.log('✅ Index created successfully!');
        
    } catch (error) {
        console.error('❌ Error creating chapters table:', error);
        throw error;
    } finally {
        await client.end();
    }
}

// Run the migration
createChaptersTable()
    .then(() => {
        console.log('Migration completed successfully!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Migration failed:', error);
        process.exit(1);
    });
