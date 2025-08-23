import { pgTable, serial, varchar, json, integer, timestamp } from "drizzle-orm/pg-core";

export const courseList = pgTable('courseList', {
    id: serial('id').primaryKey(),
    courseId: varchar('courseId').notNull(),
    name: varchar('name').notNull(),
    category: varchar('category').notNull(),
    level: varchar('level').notNull(),
    courseOutput: json('courseOutput').notNull(),
    createdBy: varchar('createdBy').notNull(),
    userName: varchar('username'),
    userProfileImage: varchar('userProfileImage'),
    videoIncluded: varchar('videoIncluded')
});

export const Chapters = pgTable('chapters', {
    id: serial('id').primaryKey(),
    courseId: varchar('courseId').notNull(),
    chapterId: integer('chapterId').notNull(),
    title: varchar('title').notNull(),
    content: json('content').notNull(),
    videoId: varchar('videoId'),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt')
});

