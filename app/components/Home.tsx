import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet, Dimensions } from 'react-native';

type Question = {
    question: string;
    Options: string[];
    correct: number;
};

function Home() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState<Array<{ question: string; userAnswer: string; isCorrect: boolean }>>([]);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setUserAnswers([]);
        setScore(0);
        setQuizCompleted(false);
        setSelectedOption(null);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const url = 'http://192.168.29.119:3030/api/questions';
                const jwt = await AsyncStorage.getItem('jwtToken');

                const token = jwt;
                console.log('jwt :', jwt?.toString());

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                console.log('data :', data);
                setQuestions(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    const isOptionCorrect = (question: Question, selectedOption: string) => {
        return question.correct === question.Options.indexOf(selectedOption);
    };

    const handleAnswer = (selectedOption: string) => {
        if (quizCompleted) {
            return;
        }

        const currentQuestionData = questions[currentQuestion];
        const isCorrect = currentQuestionData.correct === currentQuestionData.Options.indexOf(selectedOption);

        if (isCorrect) {
            setScore(score + 1);
        }

        setUserAnswers([...userAnswers, { question: currentQuestionData.question, userAnswer: selectedOption, isCorrect }]);

        setSelectedOption(selectedOption);
    };
    const handleNextQuestion = () => {
        if (currentQuestion === questions.length - 1) {
            setQuizCompleted(true);
        } else {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null);
        }
    };

    const renderPagination = () => {
        return (
            <View style={styles.pagination}>
                {questions.map((question, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.pageNumber, currentQuestion === index ? styles.currentPage : {}]}
                        onPress={() => handlePageChange(index)}
                    >
                        <Text style={{ color: 'white' }}>{index + 1}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber >= 0 && pageNumber < questions.length) {
            setCurrentQuestion(pageNumber);
            setSelectedOption(null);
        }
    };

    const renderItem = ({ item }: { item: Question }) => (
        <View style={{ width: Dimensions.get('window').width, padding: 15 }}>

            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>{item.question}</Text>
            {item.Options.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => handleAnswer(option)}
                    style={[
                        styles.option,
                        selectedOption === option
                            ? isOptionCorrect(item, option)
                                ? styles.correctOption
                                : styles.incorrectOption
                            : {},
                        quizCompleted ? styles.disabledOption : {},
                    ]}

                    disabled={quizCompleted}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: 'black', fontSize: 15 }}>{index + 1} . </Text>
                        <Text>{option}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );

    if (quizCompleted) {
        return (
            <View style={{ padding: 20 }}>
                <Text style={{ color: 'black', fontSize: 20, padding: 5 }}>Exam Completed!</Text>
                <Text style={{ color: 'black', fontSize: 20, padding: 5 }}>Your Score: {score}/{questions.length}</Text>
                <Button title="Restart Exam" onPress={resetQuiz} />
            </View>
        );
    }

    if (questions.length === 0) {
        return <Text style={{ textAlign: 'center', fontSize: 30 }}>Loading questions...</Text>;
    }

    return (
        <View>
            <View>

                <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold', color: 'black' }}>Welcome in the Exam</Text>
            </View>

            <View style={{ width: '100%', flexDirection: 'row', padding: 15 }}>
                <Button title="Submit" onPress={() => setQuizCompleted(true)} />
            </View>
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal pagingEnabled
                style={{ width: Dimensions.get('window').width, marginBottom: 10 }}
                data={[questions[currentQuestion]]}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                extraData={currentQuestion}
            />
            {selectedOption && (
                <View style={{ width: 100, padding: 15, flexDirection: 'row' }}>
                    <Button title="Next" onPress={() => handleNextQuestion()} />
                </View>
            )}
            {renderPagination()}
        </View>
    );
}

const styles = StyleSheet.create({
    option: {
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: 'gray',
    },
    selectedOption: {
        backgroundColor: 'green',
        borderColor: 'green',
    },
    disabledOption: {
        backgroundColor: 'gray',
        borderColor: 'gray',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 15,
    },
    pageNumber: {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        backgroundColor: 'black'
    },
    currentPage: {
        backgroundColor: 'blue',
        borderColor: 'green',
    },
    correctOption: {
        backgroundColor: 'green',
        borderColor: 'green',
    },
    incorrectOption: {
        backgroundColor: 'red',
        borderColor: 'red',
    },
});

export default Home;
