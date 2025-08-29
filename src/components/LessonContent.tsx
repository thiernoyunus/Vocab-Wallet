import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, BookOpen, MessageCircle, Brain, PenTool, Globe } from 'lucide-react';
import { lessonOneContent } from '../data/lessonContent';

type TabType = 'vocabulary' | 'phrases' | 'grammar' | 'exercises' | 'culture';

export function LessonContent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('vocabulary');
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [showResults, setShowResults] = useState<{ [key: string]: boolean }>({});

  const lesson = lessonOneContent;

  if (!lesson) {
    return (
      <div className="h-full flex items-center justify-center dark:text-white">
        Lesson content not found
      </div>
    );
  }

  const tabs = [
    { id: 'vocabulary', label: 'Vocabulary', icon: BookOpen },
    { id: 'phrases', label: 'Phrases', icon: MessageCircle },
    { id: 'grammar', label: 'Grammar', icon: Brain },
    { id: 'exercises', label: 'Exercises', icon: PenTool },
    { id: 'culture', label: 'Culture', icon: Globe }
  ];

  const handleExerciseAnswer = (exerciseId: string, answer: string) => {
    setUserAnswers(prev => ({ ...prev, [exerciseId]: answer }));
  };

  const checkAnswer = (exerciseId: string) => {
    setShowResults(prev => ({ ...prev, [exerciseId]: true }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'vocabulary':
        return (
          <div className="space-y-4">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 dark:text-white">Learning Objectives</h3>
              <ul className="space-y-2">
                {lesson.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700 dark:text-gray-300">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="grid gap-4">
              {lesson.vocabulary.map((word, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">{word.english}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{word.transliteration}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl text-gray-800 dark:text-gray-200 rtl font-arabic">{word.arabic}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'phrases':
        return (
          <div className="space-y-4">
            {lesson.phrases.map((phrase, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="mb-3">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">{phrase.english}</h4>
                  <p className="text-xl text-gray-800 dark:text-gray-200 rtl font-arabic mb-1">{phrase.arabic}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">{phrase.transliteration}</p>
                </div>
                {phrase.context && (
                  <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Context:</strong> {phrase.context}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case 'grammar':
        return (
          <div className="space-y-6">
            {lesson.grammar.map((note, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{note.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{note.explanation}</p>
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">Examples:</h4>
                  {note.examples.map((example, exIndex) => (
                    <div key={exIndex} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <p className="text-lg text-gray-800 dark:text-gray-200 rtl font-arabic mb-1">{example.arabic}</p>
                      <p className="text-gray-600 dark:text-gray-400">{example.english}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 italic">{example.transliteration}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'exercises':
        return (
          <div className="space-y-6">
            {lesson.exercises.map((exercise, index) => (
              <div key={exercise.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                    Exercise {index + 1}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">{exercise.question}</p>
                </div>

                {exercise.type === 'multiple-choice' && exercise.options && (
                  <div className="space-y-2 mb-4">
                    {exercise.options.map((option, optIndex) => (
                      <button
                        key={optIndex}
                        onClick={() => handleExerciseAnswer(exercise.id, option)}
                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                          userAnswers[exercise.id] === option
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 dark:text-gray-300'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {(exercise.type === 'translation' || exercise.type === 'fill-blank') && (
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Type your answer..."
                      value={userAnswers[exercise.id] || ''}
                      onChange={(e) => handleExerciseAnswer(exercise.id, e.target.value)}
                      className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}

                <div className="flex space-x-3">
                  <button
                    onClick={() => checkAnswer(exercise.id)}
                    disabled={!userAnswers[exercise.id]}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Check Answer
                  </button>
                </div>

                {showResults[exercise.id] && (
                  <div className={`mt-4 p-4 rounded-lg ${
                    userAnswers[exercise.id]?.toLowerCase().trim() === exercise.correctAnswer.toLowerCase().trim()
                      ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
                      : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800'
                  }`}>
                    <p className={`font-medium mb-2 ${
                      userAnswers[exercise.id]?.toLowerCase().trim() === exercise.correctAnswer.toLowerCase().trim()
                        ? 'text-green-800 dark:text-green-200'
                        : 'text-red-800 dark:text-red-200'
                    }`}>
                      {userAnswers[exercise.id]?.toLowerCase().trim() === exercise.correctAnswer.toLowerCase().trim()
                        ? '✓ Correct!'
                        : '✗ Incorrect'}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      <strong>Correct answer:</strong> {exercise.correctAnswer}
                    </p>
                    {exercise.explanation && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {exercise.explanation}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case 'culture':
        return (
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Cultural Notes</h3>
              <div className="space-y-4">
                {lesson.culturalNotes?.map((note, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 dark:text-gray-300">{note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full w-full bg-gray-50 dark:bg-gray-900 flex flex-col">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-4">
            <button
              onClick={() => navigate('/')}
              className="mr-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <div>
              <h1 className="text-xl font-semibold dark:text-white">{lesson.title}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">{lesson.description}</p>
            </div>
          </div>
          
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Icon size={16} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-4xl mx-auto">
          {renderTabContent()}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <button
            onClick={() => navigate('/review?lesson=1')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Start Review Session
          </button>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {lesson.vocabulary.length} vocabulary words • {lesson.phrases.length} phrases
          </div>
        </div>
      </div>
    </div>
  );
}