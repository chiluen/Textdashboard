FROM node
MAINTAINER Chiluen

EXPOSE 3000 5000

RUN apt-get update || : && apt-get install -y python3 git python3-pip git-lfs vim
RUN pip install git+https://github.com/huggingface/transformers
RUN git clone https://github.com/chiluen/Textdashboard.git
WORKDIR /Textdashboard
RUN pip install -r requirement.txt && yarn install-all && yarn get-model

CMD ["/bin/sh"]