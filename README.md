# Demo: Towards Better Understanding of Cybercrime: The Role of Fine-Tuned LLMs in Translation
This repository contains a Dockerized web application that serves as a demo for the research related to the paper "Towards Better Understanding of Cybercrime: The Role of Fine-Tuned LLMs in Translation". The research is about translating Russian hacktivism messages using a Fine-Tuned GPT-3.5 model and comparing it with traditional translation services. The goal is to showcase the differences between translations and highlight the effectiveness of the LLM-based approach in real-world scenarios, such as understanding cybercrime discussions.

# Usage
Clone the Repository:

```bash
:~$ git clone https://github.com/stratosphereips/demo-hacktivism-llm-translation.git demo-llm-translation
:~$ cd demo-llm-translation
:~$ docker build -t llm-translation-demo .
:~$ docker run -d -p 80:80 --name llm-translation-demo llm-translation-demo
```

## Access the Application

Open your web browser and go to http://localhost.

The application displays messages originally written in Russian along with their translated versions. It automatically rotates through different messages every 5 seconds, highlighting the differences in translations from multiple sources.

# About
This tool was developed at the Stratosphere Laboratory at the Czech Technical University in Prague. The Stratosphere Laboratory is committed to advancing research in cybersecurity, machine learning, and open-source tools for the security community.