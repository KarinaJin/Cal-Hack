import mindsdb_sdk

# Initialize the server
server = mindsdb_sdk.connect()
server = mindsdb_sdk.connect('http://127.0.0.1:47334')

db = server.create_database(
    engine = "mysql",
    name = "autograder_db",
    connection_args = {
      "user": "user",
      "password": "12345678",
      "host": "localhost",
      "port": "8000",
      "database": "public"
    }
)

# Create a project
project = server.get_project()

# Create a model
grader = project.models.create (
    name='grader',
    engine='openai',
    predict='feedback',
    prompt_template='''
        Grade the student's answer: {{student_answer}} 
        to the following question: {{question_text}}
        The correct answer is: {{correct_answer}}
        with the following rubric: {{rubric}}
        Your feedback should be exactly in this format:
        Grade: student's grade
        Feedback: evaluate each step. be concise and succient.'''
)

# create tables
db.create_table('questions', [
    ('question_id', 'int', 'NOT NULL'),
    ('question_text', 'text', 'NOT NULL'),
    ('correct_answer', 'text', 'NOT NULL'),
    ('rubric', 'text', 'NOT NULL')
])

db.create_table('students', [
    ('student_id', 'int', 'NOT NULL'),
    ('question_id', 'int', 'NOT NULL'),
    ('student_answer', 'text', 'NOT NULL')
])

db.create_table('feedback', [
    ('question_id', 'int', 'NOT NULL'),
    ('student_id', 'int', 'NOT NULL'),
    ('feedback', 'text', 'NOT NULL'),
])