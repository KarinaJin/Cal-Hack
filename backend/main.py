from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import together
import requests
import openai

# Base model for all requests
class FeedbackRequest(BaseModel):
    model: str
    question: str
    rubric: str
    correct_answer: str
    student_answer: str

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_KEY = ""

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
    Feedback: your feedback to the student in two sentences
'''

revised_prompt = '''
    Act as a very diligent and harsh teacher’s assistant evaluating your student's response on a given PROBLEM. 
    Evaluate each step of the student in STUDENT SUBMISSION and provide helpful feedback guiding the student to solve the PROBLEM.
    Grade STUDENT SUBMISSION based on the CRITERIA provided below.
    The answer should be formatted as follows in a single text block:

    FEEDBACK: [what did the student do well and what could be improved (but isn’twrong) in plain text for each step]

    FIXING: [Anything that is missing, incorrect or incomplete from the PROBLEM]
    
    GRADE: [Number of points student get based on the rubric]

    Here follows the assignment, and student submission
    PROBLEM:
    """
    {}
    """
    CRITERIA:
    """
    {}
    """
    STUDENT SUBMISSION:
    """
    {}
    """
    CORRECT ANSWER
    """
    {}
    """
'''

def get_response_from_gpt(prompt):
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json',
    }
    data = {
        "model": "gpt-4",
        "messages": [
            {"role": "system", "content": "You are a helpful assistant providing hints to a student."},
            {"role": "user", "content": prompt}
        ]
    }
    response = requests.post('https://api.openai.com/v1/chat/completions', headers=headers, json=data)
    response = response.json()
    hint = ""
    if 'choices' in response and len(response['choices']) > 0:
        hint = response['choices'][0]['message']['content'].strip()
    # response = openai.ChatCompletion.create(
    #     model="gpt-3.5-turbo",
    #     messages=[
    #         {"role": "system", "content": "You are a helpful assistant providing feedback and grades to a student."},
    #         {"role": "user", "content": prompt}
    #     ]
    # )
    # if response and response.choices:
    #     return response['choices'][0]['message']['content'].strip()
    return hint

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

@app.get("/")
def root():
    return {"message": "hello"}

# an api to get feedback from gpt.
@app.post("/get_feedback_and_grade")
def get_feedback_and_grade(request: FeedbackRequest):

    # prompt = feedback_prompt.format(request.student_answer,request.question, request.correct_answer, request.rubric)
    prompt = revised_prompt.format(request.question, request.rubric, request.student_answer, request.correct_answer)

    if request.model == "together":
        feedback_and_grade = get_response_from_together(prompt)
    elif request.model == "gpt":
        feedback_and_grade = get_response_from_gpt(prompt)

    if feedback_and_grade:
        return {"feedback_and_grade": feedback_and_grade}
    else:
        raise HTTPException(status_code=500, detail="Failed to get feedback from {}".format(request.model))
    
    

