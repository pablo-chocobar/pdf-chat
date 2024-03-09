from pypdf import PdfReader
import spacy
import re

class Reader():
    def __init__(self):
        self.nlp = spacy.load('en_core_web_sm')

    def read_text(self , path):
        
        self.reader = PdfReader(path)
        self.path = path
        self.num_pages = len(self.reader.pages)
        self.text = ["".join(self.reader.pages[i].extract_text().split("\n")) for i in range(self.num_pages)]

        self.processed_text = "".join([self.remove_headers(["11 Free eBooks at Planet eBook.com" , "The Great Gatsby"] , self.preprocess_text(doc))for doc in self.text])



    def preprocess_text(self , text):

        pattern = "[^\w.\s]+"
        doc = self.nlp(text)
        processed_text = ' '.join([token.text for token in doc ])

        text = re.sub(pattern , "", processed_text)
        
        return text
    
    def remove_headers(self , headers : list[str] , text : list[str] ):
        for header in headers:
            text = text.lstrip(header)
        return text
        
