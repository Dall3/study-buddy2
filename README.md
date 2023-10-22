# Study Buddy

A simple web app for my Individual Project PA1414 at BTH.
The app is designed to help with your studying by creating your own flashcards that you can use in a Study Mode or Quiz mode.

## Functions:

- User creates an account with email and password.
- User can create Subjects, example Math or Programming.
- User can then create Courses within the created Subjects, for example an Algebra Course or a C++ Course. (For now when you delete, it doesn't delete all courses linked to subject)
- User then creates Flashcards that gets assigned to the Subject and Course.
- User can edit or delete Subjects, Courses and Flashcards. (Can't edit images, and will delete image when editing a flashcard)
- User can go into Quiz Mode: - Here the user chooses a course, and puts in the answer, if answer is correct it will say, if answer is wrong, it will say and correct answer will be shown.
- User can go into Study Mode. - Here the user can mouse over the flashcard and the answer will show.
- User can edit their display name under Profile.

## Structure

- [Backend](./backend/): All files handling the backend
- [Backend](./backend/db.js): Connection to SQL Database
- [Backend](./backend/server.js): Main backend file, this is the file you run
- [Backend](./backend/studdybuddy.db): is the SQL database
- [Backend](./backend/Routes/): Here are the Routes for fething data from Database, I have named them accordingly.

- [Src](./src/About/): Was going to do a little about page with info but never got that far.
- [Src](./src/Catalog/): These are the files used in the Create Subject section.
- [Src](./src/firestore/): Section for connecting to Firebase for creating accounts, login and so
- [Src](./src/Flashcards/): Creating and Editing Flashcards
- [Src](./src/Home/): The landing page where the user comes after login, aka the /home
- [Src](./src/Meny/): The top Menu
- [Src](./src/Quiz): Quiz Mode and Study Mode

## Installing and running

Install: npm install

To run backend, I used nodemon to auto-update after changing code:
In - [Backend](./backend/) : nodemon server.js

To run frontend:
In [Src](./src/) : npm start
