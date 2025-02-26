from typing import List
import random

from .config import WeaveConfig


WORDLE_WORDS_ALL = "/home/sphere/src/wordsearch/backend/words/wordle_words_all.txt"


def read_words(file_path: str) -> list[str]:
    with open(file_path, "r") as f:
        words = f.read().splitlines()
    return words


WORD_LIST = read_words(WORDLE_WORDS_ALL)


def get_neighbors(word: str, word_list: List[str]) -> List[str]:
    neighbors = []
    for neighbor in word_list:
        if len(neighbor) != len(word):
            continue
        diff = 0
        for i in range(len(word)):
            if word[i] != neighbor[i]:
                diff += 1
        if diff == 1:
            neighbors.append(neighbor)
    return neighbors

def is_max_sep(word1: str, word2: str) -> bool:
    count = 0
    for c1, c2 in zip(word1, word2):
        if c1 != c2:
            count += 1
    return count >= 5

def get_weave_config() -> WeaveConfig:
    config = WeaveConfig()

    start_word = random.choice(WORD_LIST)

    target_word = None
    while target_word is None:
        cur = start_word

        queue = [cur]
        visited = set()

        while queue:
            cur = queue.pop(0)
            visited.add(cur)

            if is_max_sep(start_word, cur):
                target_word = cur
                break

            neighbors = get_neighbors(cur, WORD_LIST)
            for neighbor in neighbors:
                if neighbor not in visited:
                    queue.append(neighbor)

    config.start_word = start_word
    config.target_word = target_word
    config.word_list = WORD_LIST

    return config

