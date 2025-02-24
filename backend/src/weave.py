import random

from .config import WeaveConfig


WORDLE_WORDS_ALL = "/home/sphere/src/wordsearch/backend/words/wordle_words_all.txt"


def read_words(file_path: str) -> list[str]:
    with open(file_path, "r") as f:
        words = f.read().splitlines()
    return words


WORD_LIST = read_words(WORDLE_WORDS_ALL)


def get_weave_config() -> WeaveConfig:
    config = WeaveConfig()

    config.start_word = random.choice(WORD_LIST)
    config.target_word = random.choice(WORD_LIST)

    return config
