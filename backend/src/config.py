from typing import List


class WordSearchConfig:
    def __init__(self):
        self.words: List[str] = []


class WeaveConfig:
    def __init__(self):
        self.start_word: str | None = None
        self.target_word: str | None = None
        self.word_list: List[str] = None


class Config:
    def __init__(self):
        self.word_search_config: WordSearchConfig = None
        self.weave_config: WeaveConfig = None
