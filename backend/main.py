from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import together
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

openai.api_key = "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"

together.api_key = "5447e04afe0692f4d110f25f8e24f261d924664e871ffa782cfb788af010c14e"

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

@app.get("/")
async def root():
    # # Define your LaTeX equation
    # tex = r"3^2-\frac{18}{11-5}"
    # # Convert LaTeX to a sympy expression
    # expr = latex2sympy(tex)
    # print(expr)
    return {"message": "hello"}

# an api to get feedback from gpt.
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
    
    

