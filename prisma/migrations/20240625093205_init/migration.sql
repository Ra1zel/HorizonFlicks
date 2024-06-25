-- CreateTable
CREATE TABLE "SavedMovie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "posterSrc" TEXT NOT NULL,
    "backdropSrc" TEXT NOT NULL,
    "releaseDate" TEXT NOT NULL
);
