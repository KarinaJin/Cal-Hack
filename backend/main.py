from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import FeedbackRequest, Question, Student
from typing import List, Dict, Any

import together
import openai
import mysql

import mindsdb_sdk

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

openai.api_key = ""

together.api_key = ""

feedback_prompt = '''
    Grade the student's answer:
    """{}"""
    to the following question:
    """{}"""
    The correct answer is:
    """{}"""
    with the following rubric:
    """{}"""
    Your feedback should be exactly in this format:
    Grade: student's grade
    Feedback: evaluate each step. be concise and succient.
'''

db_config = {
    "host": "localhost",
    "user": "your_username",
    "password": "your_password",
    "database": "AutoGrading"
}

server = mindsdb_sdk.connect()
db = server.get_database('autograder_db')

def get_response_from_gpt(prompt):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant providing feedback and grades to a student."},
            {"role": "user", "content": prompt}
        ]
    )
    if response and response.choices:
        return response['choices'][0]['message']['content'].strip()
    return None

def get_response_from_together(prompt):
    response = together.Complete.create(
        prompt = "<human>: " + prompt + "<bot>:", 
        model = "togethercomputer/llama-2-70b-chat", 
        max_tokens = 256,
        temperature = 0.6,
        top_k = 50,
        top_p = 0.8,
        repetition_penalty = 1.1,
        stop = ['<human>', '\n\n'])
    if response and 'output' in response and 'choices' in response['output']:
        return response['output']['choices'][0]['text'].strip()
    return None

# get feedback and grade
@app.post("/get_feedback_and_grade")
def get_feedback_and_grade(request: FeedbackRequest):

    prompt = feedback_prompt.format(request.student_answer,request.question, request.correct_answer, request.rubric)

    if request.model == "together":
        feedback_and_grade = get_response_from_together(prompt)
    elif request.model == "gpt":
        feedback_and_grade = get_response_from_gpt(prompt)

    if feedback_and_grade:
        return {"feedback_and_grade": feedback_and_grade}
    else:
        raise HTTPException(status_code=500, detail="Failed to get feedback from {}".format(request.model))

# add a question
@app.post("/add_question/")
def add_question(data: Question):
    try:
        question_id = data.question_id
        question_text = data.question_text
        correct_answer = data.correct_answer
        rubric = data.rubric
        
        question_table = db.get_table('questions')
        question_table.insert({
            'question_id': question_id,
            'question_text': question_text,
            'correct_answer': correct_answer,
            'rubric': rubric
        })

        return {"status": "success", "message": "Question added successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# add a student answer
@app.post("/add_student/")
def add_student(data: Student):
    try:
        student_id = data.student_id
        question_id = data.question_id
        student_answer = data.student_answer

        student_table = db.get_table('students')
        student_table.insert({
            'student_id': student_id,
            'question_id': question_id,
            'student_answer': student_answer
        })

        return {"status": "success", "message": "Answer added successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# grade all students
@app.post("/grade_all/")
def grade_all():

# grade a question for all students
@app.post("/grade_question/")
def grade_question(question_number: int):
    try:
        project = server.get_project()
        grader = project.get_model('grader')

        query = project.query("SELECT q.question_id, q.question_text, q.correct_answer, q.rubric, s.student_id, s.student_answer FROM questions q JOIN students s ON q.question_id = s.question_id WHERE q.question_id{question_number};")
        table_to_grade = query.fetch()
        
        result = grader.predict(table_to_grade)

        feedback_table = db.get_table('feedback')
        for row in result:
            feedback_table.insert({
                'question_id': row['question_id'],
                'student_id': row['student_id'],
                'feedback': row['feedback']
            })

        return {"status": "success", "message": "Question graded successfully"}
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# grade a student for all questions
@app.post("/grade_student/")
def grade_student(student_id: int):

# get all current questions
@app.get("/get_all_questions/", response_model=List[Dict[str, Any]])
def get_all_questions():
    try:
        question_table = db.get_table('questions')
        questions = question_table.query().fetch_all()
        return questions
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# get all current students
@app.get("/get_all_student_answers/", response_model=List[Dict[str, Any]])
def get_all_student_answers():
    try:
        student_table = db.get_table('students')
        students = student_table.query().fetch_all()
        return students
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# get all current feedback
@app.get("/get_all_feedback/", response_model=List[Dict[str, Any]])
def get_all_feedback():
    try:
        feedback_table = db.get_table('feedback')
        feedback = feedback_table.query().fetch_all()
        return feedback
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/")
async def root():
    # # Define your LaTeX equation
    # tex = r"3^2-\frac{18}{11-5}"
    # # Convert LaTeX to a sympy expression
    # expr = latex2sympy(tex)
    # print(expr)
    return {"message": "hello"}
