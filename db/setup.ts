import Database from "better-sqlite3";

const db = Database("db/data.db", { verbose: console.log });

const applicants = [
  {
    name: "John",
    surname: "Cole",
  },
  {
    name: "Ross",
    surname: "Obama",
  },
  {
    name: "Joe",
    surname: "Clinton",
  },
  {
    name: "Zoe",
    surname: "Hoe",
  },
  {
    name: "Fred",
    surname: "Miller",
  },
];

const interviewers = [
  {
    name: "Klevis",
    surname: "Hoxha",
  },
  {
    name: "Alban",
    surname: "Rama",
  },
  {
    name: "Ardian",
    surname: "Sula",
  },
  {
    name: "Altin",
    surname: "Meta",
  },
];

const interviews = [
  {
    applicantId: 1,
    interviewerId: 1,
    date: "10/10/2020",
  },
  {
    applicantId: 1,
    interviewerId: 2,
    date: "11/10/2020",
  },
  {
    applicantId: 1,
    interviewerId: 3,
    date: "12/10/2020",
  },
  {
    applicantId: 2,
    interviewerId: 2,
    date: "13/10/2020",
  },
  {
    applicantId: 2,
    interviewerId: 3,
    date: "14/10/2020",
  },
  {
    applicantId: 3,
    interviewerId: 3,
    date: "15/10/2020",
  },
  {
    applicantId: 4,
    interviewerId: 4,
    date: "16/10/2020",
  },
  {
    applicantId: 5,
    interviewerId: 4,
    date: "17/10/2020",
  },
];


const deleteApplicantsTable = db.prepare(`
DROP TABLE IF EXISTS applicants;
`)
deleteApplicantsTable.run()

const createApplicantsTable = db.prepare(`
CREATE TABLE IF NOT EXISTS applicants (
  id INTEGER,
  name TEXT NOT NULL,
  surname TEXT NOT NULL,
  PRIMARY KEY (id)
);
`)
createApplicantsTable.run()

const createApplicant = db.prepare(`
INSERT INTO applicants (name, surname) VALUES (@name, @surname);
`)

for (let applicant of applicants) 
{createApplicant.run(applicant)}



const deleteInterviewersTable = db.prepare(`
DROP TABLE IF EXISTS interviewers;
`)
deleteInterviewersTable.run()

const createInterviewersTable = db.prepare(`
CREATE TABLE IF NOT EXISTS interviewers(
    id INTEGER,
  name TEXT NOT NULL,
  surname TEXT NOT NULL,
  PRIMARY KEY (id)
)
`)
createInterviewersTable.run()

const createInterviewer = db.prepare(`
INSERT INTO interviewers (name, surname) VALUES (@name, @surname)
`)

for (let interviewer of interviewers)
createInterviewer.run(interviewer)


const deleteInterviewsTable = db.prepare(`
DROP TABLE IF EXISTS interviews;
`)

deleteInterviewsTable.run()

const createInterviewsTable = db.prepare(`
CREATE TABLE IF NOT EXISTS interviews (
  id INTEGER,
  applicantId INTEGER NOT NULL,
  interviewerId INTEGER NOT NULL,
  date TEXT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (applicantId) REFERENCES applicants(id) ON DELETE CASCADE,
  FOREIGN KEY (interviewerId) REFERENCES interviewers(id) ON DELETE CASCADE
);
`)
createInterviewsTable.run()

const createInterview = db.prepare(`
INSERT INTO interviews (applicantId, interviewerId, date) VALUES (@applicantId, @interviewerId, @date);
`)

for (let interview of interviews) 
createInterview.run(interview)