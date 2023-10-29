from pydantic import BaseModel

class FeedbackRequest(BaseModel):
    model: str
    question: str
    rubric: str
    correct_answer: str
    student_answer: str

class Question(BaseModel):
    question_id: int
    question_text: str
    correct_answer: str
    rubric: str

class Student(BaseModel):
    student_id: int
    question_id: int
    student_answer: str

