from langchain.document_loaders import UnstructuredPDFLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain.llms import HuggingFacePipeline
from langchain.chains import RetrievalQA
from langchain.embeddings import HuggingFaceEmbeddings
from transformers import AutoTokenizer , pipeline



class RAG():
    def __init__(self):
        self.text_splitter = CharacterTextSplitter(chunk_size=128, chunk_overlap=20)
        self.miniLM = "sentence-transformers/all-MiniLM-L6-v2"
        self.embeddings = HuggingFaceEmbeddings(model_name= self.miniLM)
        self.model_name = "google/flan-t5-small"

        self.tokenizer = AutoTokenizer.from_pretrained(self.model_name, padding=True, truncation=True, max_length=512 , return_token_type_ids=False)

        self.question_answerer = pipeline(
            "text2text-generation", 
            model=self.model_name, 
            tokenizer= self.tokenizer,
        )

        self.llm = HuggingFacePipeline(
            pipeline=self.question_answerer,
            model_kwargs={"temperature": 0.7, "max_length": 512 , 'return_full_text':False},
        )

        
    def load_pdf(self , path):
        self.loader = UnstructuredPDFLoader(path)
        self.data = self.loader.load()
        self.texts = self.text_splitter.split_documents(self.data)

        self.vector_store = Chroma.from_documents(self.texts, embedding= self.embeddings, persist_directory="./chromadb")

        self.qa = RetrievalQA.from_chain_type(
            llm=self.llm,
            chain_type="stuff",
            retriever=self.vector_store.as_retriever(),
            return_source_documents=False,
        )


    def ask(self , query):
        result = self.qa({"query": query})

        return result['result']