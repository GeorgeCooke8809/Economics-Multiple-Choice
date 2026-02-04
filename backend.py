import sqlite3
import random

class Data:
    def __init__(self, debugging: bool = False) -> None:
        self.debugging = debugging

    def __connection(self) -> sqlite3.Connection:
        """
        The connection used for all references to the database.
        
        :param self: The parent class
        :return: The connection to be used
        :rtype: Connection
        """

        connection = sqlite3.Connection("database.db")

        return connection
    
    def __get_random_question_ID(self, subjects) -> int:
        """
        The internal function used to get a random QuestionID that is in the filtered subjects
        
        :param self: The parent class
        :param subjects: A list of the subjects that have been filtered
        :return: The random question ID that can be used, -1 if none apply
        :rtype: int
        """

        possible = []
        
        with self.__connection() as connection:
            cursor = connection.cursor()

            for subject in subjects:
                cursor.execute("SELECT QuestionID FROM questions WHERE Type = ?", (subject,))

                for element in cursor.fetchall():
                    possible.append(element[0])

                self.debugging_statement(f"{possible = }")

        if possible != []:
            return random.choice(possible)
        else:
            return -1

    def get_question(self, subjects:list = ["MACROECONOMICS", "MICROECONOMICS"]) -> tuple[int, str, str, str, str, str]:
        """
        Images will be entitled by the ID and will have the file type of jpg.

        :param self: The parent class
        :param subjects: The subjects being studied (macroeconomics and/or microeconomics)
        :type subjects: list
        :return: Tuple of question in following format: (Question ID, Question, Option A, Option B, Option C, Option D)
        :rtype: tuple[int, str, str, str, str, str, str]
        """

        with self.__connection() as connection:
            if connection != None:
                cursor = connection.cursor()

                cursor.execute("SELECT QuestionID, Question, OptionA, OptionB, OptionC, OptionD FROM questions WHERE QuestionID = ?", (self.__get_random_question_ID(subjects=subjects),))
                return cursor.fetchone()
            else:
                raise Exception("ERROR, failed to connect to database")

    def check_answer(self, QuestionID:int, answer:str) -> bool:
        """        
        :param self: The parent class
        :param QuestionID: The ID of the question being referenced
        :type QuestionID: int
        :param answer: The letter answer being checked
        :type answer: str
        :return: A boolean true or false for if the answer is correct
        :rtype: bool
        """

        with self.__connection() as connection:
            if connection != None:
                cursor = connection.cursor()
                cursor.execute("SELECT Answer FROM questions WHERE QuestionID = ?", (QuestionID,))

                try:
                    correct = cursor.fetchone()[0]
                except:
                    correct = None

                self.debugging_statement(f"{correct = }")
            else:
                raise Exception("ERROR, failed to connect to database")
            
        if correct == answer:
            return True
        else:
            return False

    def debugging_statement(self, message) -> None:
        if self.debugging:
            print(f"\033[94m{message}\033[0m")

if __name__ == "__main__":
    data = Data(debugging=True)
    print(data.get_question())