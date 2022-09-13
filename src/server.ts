import Database from "better-sqlite3";
import cors from "cors";
import express from "express";

const db = Database("db/data.db", { verbose: console.log });
const app = express();
app.use(cors());
app.use(express.json());

const port = 3333;

const getApplicant = db.prepare(`
SELECT * FROM applicants WHERE id = @id
`);

const getInterviewer = db.prepare(`
SELECT * FROM interviewers WHERE id = @id
`);

const getInterviewsForInterviewers = db.prepare(`
SELECT * FROM interviews WHERE interviewerId = @interviewerId
`);

const getApplicantsForInterviewer = db.prepare(`
SELECT applicants.* FROM applicants
JOIN interviews ON applicants.id = interviews.applicantId
WHERE interviews.interviewerId = interviewerId
`);

const getInterviewersForApplicant = db.prepare(`
SELECT interviewers.* FROM interviewers
JOIN interviews ON interviewers.id = interviews.interviewerId
WHERE interviews.applicantId = @applicantId
`);

app.get("/interviewers/:id", (req, res) => {
  const interviewer = getInterviewer.get(req.params);

  if (interviewer) {
    interviewer.interviews = getInterviewsForInterviewers.all({
      interviewerId: interviewer.id,
    });
    interviewer.applicants = getApplicantsForInterviewer.all({
      interviewerId: interviewer.id,
    });
    res.send(interviewer);
  } else {
    res.status(404).send({ error: "Not Found" });
  }
});

app.get("/applicants/:id", (req, res) => {
  const applicant = getApplicant.get(req.params);
  if (applicant) {
    applicant.interviewers = getInterviewersForApplicant.all({
      applicantId: applicant.id,
    });
    res.send(applicant);
  } else {
    res.status(404).send({ error: "Not Found" });
  }
});

app.listen(port);
