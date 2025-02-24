import random

from .config import WordSearchConfig


WORDLE_WORDS_LA = "/home/sphere/src/wordsearch/backend/words/wordle_words_la.txt"


def read_words(file_path: str) -> list[str]:
    with open(file_path, "r") as f:
        words = f.read().splitlines()
    return words


WORD_LIST = read_words(WORDLE_WORDS_LA)


def get_word_search_config() -> WordSearchConfig:
    config = WordSearchConfig()
    config.words = []

    for _ in range(3):
        word = random.choice(WORD_LIST)
        config.words.append(word)

    return config
