from sqlalchemy.orm import Session
from app.models.pyq import PYQFile, Question
from typing import List
from app.pyq.parser import parse_pdf_questions, parse_csv_questions
from transformers import AutoModelWithLMHead, AutoTokenizer
import torch
import torch.nn.functional as F

# Load model/tokenizer once
tokenizer = AutoTokenizer.from_pretrained("gpt2")
model = AutoModelWithLMHead.from_pretrained("gpt2")
model.eval()

def calculate_perplexity(sentence: str) -> float:
    # Encode input and calculate perplexity
    encodings = tokenizer(sentence, return_tensors='pt')
    max_length = model.config.n_positions
    stride = 512

    lls = []
    for i in range(0, encodings.input_ids.size(1), stride):
        begin_loc = max(i + stride - max_length, 0)
        end_loc = min(i + stride, encodings.input_ids.size(1))
        input_ids = encodings.input_ids[:, begin_loc:end_loc]
        target_ids = input_ids.clone()
        target_ids[:, :-stride] = -100

        with torch.no_grad():
            outputs = model(input_ids, labels=target_ids)
            log_likelihood = outputs.loss * (end_loc - begin_loc)
        lls.append(log_likelihood)

    ppl = torch.exp(torch.stack(lls).sum() / end_loc)
    return ppl.item()

def create_pyq_file(db: Session, uploader_id: int, filename: str, subject: str, year: int, file_bytes: bytes, filetype: str):
    pyq_file = PYQFile(filename=filename, uploader_id=uploader_id, subject=subject, year=year)
    db.add(pyq_file)
    db.commit()
    db.refresh(pyq_file)

    if filetype == "pdf":
        questions_texts = parse_pdf_questions(file_bytes)
    elif filetype == "csv":
        questions_texts = parse_csv_questions(file_bytes)
    else:
        questions_texts = []

    question_objs = []
    for q_text in questions_texts:
        ppl = calculate_perplexity(q_text)
        question = Question(pyq_file_id=pyq_file.id, text=q_text, topic=None, perplexity=str(ppl))
        question_objs.append(question)

    db.bulk_save_objects(question_objs)
    db.commit()
    return pyq_file