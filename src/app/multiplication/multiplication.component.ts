import { Component, OnInit } from '@angular/core';

export interface Question {
  firstValue: number;
  secondValue: number;
  submittedAnswer: number;
  correctAnswer: number;
  incorrectAnswer: boolean;
}

@Component({
  selector: 'app-multiplication',
  templateUrl: './multiplication.component.html',
  styleUrls: ['./multiplication.component.scss']
})

export class MultiplicationComponent implements OnInit {

  question : Question = {
    firstValue: 0,
    secondValue: 0,
    submittedAnswer: 0,
    correctAnswer: 0,
    incorrectAnswer: false,
  };

  questions : Question[] = [];

  constructor() { 

  }

  ngOnInit(): void {
    this.createNewQuestion();
  }

  onCalculate(answer: number) {

    if (!answer)
      return;

    let result = this.question.firstValue * this.question.secondValue;

    let incorrectAnswer = false;
    if (result != answer)
      incorrectAnswer = true;

    let currentQuestion : Question = {
      firstValue: this.question.firstValue,
      secondValue: this.question.secondValue,
      submittedAnswer: answer,
      correctAnswer: result,
      incorrectAnswer: incorrectAnswer,
    }

    this.questions.unshift(currentQuestion);

    this.createNewQuestion();

  }

  createNewQuestion(): void {
    this.question.firstValue = Math.floor(Math.random() * 11);
    this.question.secondValue = Math.floor(Math.random() * 11);
    this.question.submittedAnswer = 0;
    this.question.correctAnswer = 0;
    this.question.incorrectAnswer = false;
  }

}
