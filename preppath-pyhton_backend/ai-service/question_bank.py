import random


import random

question_database = [

    # ================= DSA EASY =================
    {
        "topic": "DSA Practice",
        "difficulty": "easy",
        "question": "Reverse an array",
        "companyTag": ["TCS", "Infosys", "Capgemini"]
    },
    {
        "topic": "DSA Practice",
        "difficulty": "easy",
        "question": "Check if string is palindrome",
        "companyTag": ["TCS", "Accenture"]
    },

    # ================= DSA MEDIUM =================
    {
        "topic": "DSA Practice",
        "difficulty": "medium",
        "question": "Find first non-repeating character",
        "companyTag": ["Deloitte", "EY"]
    },

    # ================= DSA HARD =================
    {
        "topic": "DSA Practice",
        "difficulty": "hard",
        "question": "Solve 0/1 Knapsack problem",
        "companyTag": ["Amazon", "Microsoft"]
    },

    # ================= APTITUDE =================
    {
        "topic": "Aptitude Practice",
        "difficulty": "easy",
        "question": "Find 20% of 450",
        "companyTag": ["TCS", "Infosys"]
    },

    # ================= HR =================
    {
        "topic": "HR & Communication",
        "difficulty": "easy",
        "question": "Tell me about yourself",
        "companyTag": ["All"]
    }
]
# ==========================================
# DSA QUESTION GENERATOR
# ==========================================

dsa_easy_topics = [
    "Reverse an array",
    "Find maximum element in array",
    "Check if string is palindrome",
    "Find sum of array elements",
    "Find minimum element in array",
    "Count vowels in string",
    "Check if number is prime",
    "Find factorial of number",
    "Remove duplicates from array",
    "Merge two sorted arrays"
]

dsa_medium_topics = [
    "Find first non-repeating character",
    "Detect cycle in linked list",
    "Implement binary search",
    "Sort array using merge sort",
    "Find intersection of two arrays",
    "Check if two strings are anagrams",
    "Find majority element",
    "Rotate array by K positions",
    "Find longest substring without repeating characters",
    "Implement stack using arrays"
]

dsa_hard_topics = [
    "Solve 0/1 Knapsack problem",
    "Implement LRU Cache",
    "Find strongly connected components",
    "Implement Dijkstra's Algorithm",
    "Find longest increasing subsequence",
    "Detect negative weight cycle",
    "Serialize and deserialize binary tree",
    "Solve N-Queens problem",
    "Find median of two sorted arrays",
    "Solve Word Ladder problem"
]


# ==========================================
# APTITUDE QUESTION GENERATOR
# ==========================================

aptitude_easy = [
    "Find {}% of {}",
    "Calculate simple interest on {} for {} years",
    "Find average of numbers {}",
    "Convert {} to percentage",
    "Find square root of {}"
]

aptitude_medium = [
    "Two people complete work in {} and {} days. Find total time",
    "Train of length {}m crosses platform in {} seconds. Find speed",
    "Boat speed {} km/h in still water. Stream speed {} km/h. Find downstream speed",
    "Calculate compound interest on {} at {}%",
    "Solve quadratic equation: x² + {}x + {} = 0"
]

aptitude_hard = [
    "Advanced probability problem involving {} outcomes",
    "Permutation problem with {} objects and {} restrictions",
    "Complex data interpretation with {} data points",
    "Advanced mixture problem with ratio {}:{}",
    "Statistics problem with mean {}, median {}"
]


# ==========================================
# HR QUESTION GENERATOR
# ==========================================

hr_easy = [
    "Tell me about yourself",
    "What are your strengths?",
    "What are your weaknesses?",
    "Why should we hire you?",
    "Where do you see yourself in 5 years?",
    "Why do you want to join our company?",
    "What motivates you?",
    "How do you handle stress?",
    "Describe your hobbies",
    "Are you willing to relocate?"
]

hr_medium = [
    "Describe a challenging situation you handled",
    "Explain a conflict you resolved",
    "Tell me about a leadership experience",
    "How do you handle failure?",
    "Describe a time you missed a deadline",
    "How do you prioritize tasks?",
    "Explain a team project you worked on",
    "Describe a time you showed initiative",
    "How do you handle criticism?",
    "Tell me about a difficult decision you made"
]

hr_hard = [
    "Describe a time you failed and what you learned",
    "How would you handle ethical conflict at work?",
    "Explain a situation where you disagreed with manager",
    "Tell me about a time you handled pressure",
    "How do you deal with ambiguity?",
    "Give an example of strategic thinking",
    "Describe a situation requiring negotiation",
    "Explain a time you motivated others",
    "How do you manage underperforming teammate?",
    "Describe a high-impact decision you made"
]


# ==========================================
# MAIN FUNCTION
# ==========================================

def generate_questions(topic, difficulty, count=10):

    questions = []

    if topic == "DSA Practice":
        if difficulty == "easy":
            base = dsa_easy_topics
        elif difficulty == "medium":
            base = dsa_medium_topics
        else:
            base = dsa_hard_topics

        expanded = base * 5   # 10 x 5 = 50 questions
        questions = random.sample(expanded, min(count, len(expanded)))


    elif topic == "Aptitude Practice":
        if difficulty == "easy":
            base = aptitude_easy
        elif difficulty == "medium":
            base = aptitude_medium
        else:
            base = aptitude_hard

        for _ in range(count):
            template = random.choice(base)
            question = template.format(
                random.randint(10, 90),
                random.randint(100, 500)
            )
            questions.append(question)


    elif topic == "HR & Communication":
        if difficulty == "easy":
            base = hr_easy
        elif difficulty == "medium":
            base = hr_medium
        else:
            base = hr_hard

        expanded = base * 5   # 10 x 5 = 50
        questions = random.sample(expanded, min(count, len(expanded)))

    return questions

def get_questions(topic, company, difficulty="easy", count=5):

    filtered = [
        q for q in question_database
        if q["topic"] == topic
        and q["difficulty"] == difficulty
        and (company in q["companyTag"] or "All" in q["companyTag"])
    ]

    if not filtered:
        return []

    return random.sample(filtered, min(len(filtered), count))