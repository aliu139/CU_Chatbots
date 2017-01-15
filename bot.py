#!/usr/bin/python3
import random
import sys
import os
PROB_KEYS = ["CC", "DT", "IN", "JJ", "JJR", "MD", "NN", "NNP", "NNS", "PRP", "RB", "RBR", "RP", "TO", "VB", "VBD", "VBG", "VBN", "VBP", "VBZ", "WDT", "WRB"];

# chat client
def chat_client():
    run = True
    while run:
        a = input()
        if "later" in a:
            run = False
            print("yung charmin: loll k byee")
        else:
            generate_response()

# helper to normalize
def normalize(arr):
    runSum = 0
    sum = arr.sum()
    for i in range (0, len(arr)):
        arr[i] = (arr[i]/sum) + runSum
        runSum+=arr[i]
    return arr

# function getNextPart
def getNextPart(prev):
    prevIdx = PROB_KEYS.index(prev)
    rand = random.random()

# response generator
def generate_response():


    print("test")


chat_client()
