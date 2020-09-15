import { Component, OnInit,  ViewChild, ElementRef } from '@angular/core';

import { Question } from '../models/question';
import { XP } from '../config/xp';
import { Levels } from '../config/levels';

@Component({
  selector: 'app-multiplication',
  templateUrl: './multiplication.component.html',
  styleUrls: ['./multiplication.component.scss']
})

export class MultiplicationComponent implements OnInit {
  @ViewChild('newAnswer') newAnswer: ElementRef;

  question : Question = {
    firstValue: 0,
    secondValue: 0,
    submittedAnswer: 0,
    correctAnswer: 0,
    incorrectAnswer: false,
  };

  questions : Question[] = [];
  
  streak : number = 0;
  displayStreak : boolean = false;
  totalXp : number = 0;
  levelXp : number = 0;
  currentLevel: number = 1;
  currentLevelMaxXp: number = 0;
  currentLevelMinXp: number = 0;
  progressMax : number = 0;

  constructor() { 
    this.setInitialLevel();
  }

  ngOnInit(): void {
    this.createNewQuestion();
  }

  setInitialLevel() {
    let level = Levels.find(o => o.level === this.currentLevel);
    this.currentLevel = level.level;
    this.currentLevelMinXp = level.minXp;
    this.currentLevelMaxXp = level.maxXp;
  }

  onCalculate() {

    if (!this.newAnswer.nativeElement.value)
      return;

    let result = this.question.firstValue * this.question.secondValue;

    this.streak++;

    let incorrectAnswer = false;
    if (result != this.newAnswer.nativeElement.value) 
    {
      incorrectAnswer = true;
      this.streak = 0;
      this.totalXp += XP.incorrectAnswer;
    }
    else {
      if (this.streak % 5 == 0)
      {
        this.displayStreak = true;
        this.totalXp += XP.streak;
      }

      else{
        this.displayStreak = false;
        this.totalXp += XP.correctAnswer;
      }

    }

    let currentQuestion : Question = {
      firstValue: this.question.firstValue,
      secondValue: this.question.secondValue,
      submittedAnswer: this.newAnswer.nativeElement.value,
      correctAnswer: result,
      incorrectAnswer: incorrectAnswer,
    }

    this.newAnswer.nativeElement.value = null;

    this.questions.unshift(currentQuestion);

    this.createNewQuestion();

    this.calculateLevel();

  }

  calculateLevel(): void {

    for (let i = Levels.length - 1; i >= 0; i--)
    {
      if (this.totalXp <= Levels[i].maxXp && this.totalXp >= Levels[i].minXp)
      {
        const nextLevel = Levels[i];
        this.currentLevel = nextLevel.level
        this.currentLevelMaxXp = nextLevel.maxXp;
        this.currentLevelMinXp = nextLevel.minXp;
        this.progressMax = nextLevel.maxXp - nextLevel.minXp;
        break;
      }
    }

    this.levelXp = this.totalXp - this.currentLevelMinXp;

  }

  createNewQuestion(): void {
    this.question.firstValue = Math.floor(Math.random() * 11);
    this.question.secondValue = Math.floor(Math.random() * 11);
    this.question.submittedAnswer = 0;
    this.question.correctAnswer = null;
    this.question.incorrectAnswer = false;
  }

}
