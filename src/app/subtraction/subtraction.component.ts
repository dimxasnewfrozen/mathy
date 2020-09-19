import { Component, OnInit,  ViewChild, ElementRef } from '@angular/core';

import { Question } from '../models/question';
import { Level } from '../models/level';
import { XP } from '../config/xp';
import { Levels } from '../config/levels';
@Component({
  selector: 'app-subtraction',
  templateUrl: './subtraction.component.html',
  styleUrls: ['./subtraction.component.scss']
})

export class SubtractionComponent implements OnInit {
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
  currentLevelObject: Level = Levels[0];
  currentLevelMaxXp: number = 0;
  currentLevelMinXp: number = 0;
  progressMax : number = 0;
  gems: number = 0;
  displayGems: number = 0;
  streakCount : number = 5;

  constructor() { 
    this.setInitialLevel();
  }

  ngOnInit(): void {
    this.createNewQuestion();
  }

  setInitialLevel() {
    let level = Levels.find(o => o.level === this.currentLevel);
    this.currentLevelObject = level;
    this.currentLevel = level.level;
    this.currentLevelMinXp = level.minXp;
    this.currentLevelMaxXp = level.maxXp;
  }

  onCalculate() {

    if (!this.newAnswer.nativeElement.value)
      return;

    let result = this.question.firstValue - this.question.secondValue;

    this.streak++;

    let incorrectAnswer = false;
    if (result != this.newAnswer.nativeElement.value) 
    {
      incorrectAnswer = true;
      this.streak = 0;
      this.totalXp += XP.incorrectAnswer;
    }
    else {
      if (this.streak % this.streakCount == 0)
      {
        this.displayStreak = true;
        this.gems += 3;
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

    this.calculateLevel();

    this.createNewQuestion();

  }

  calculateLevel(): void {

    for (let i = Levels.length - 1; i >= 0; i--)
    {
      if (this.totalXp < Levels[i].maxXp && this.totalXp >= Levels[i].minXp)
      {
        const level = Levels[i];
        if (this.currentLevel != level.level){
          this.questions = [this.questions[0]];
        }

        this.currentLevelObject = level;
        this.currentLevel = level.level
        this.currentLevelMaxXp = level.maxXp;
        this.currentLevelMinXp = level.minXp;
        this.progressMax = level.maxXp - level.minXp;
        break;
      }
    }

    this.levelXp = this.totalXp - this.currentLevelMinXp;
    this.displayGems = this.gems + ((this.currentLevel - 1) * 5);

  }

  createNewQuestion(): void {
    const level = this.currentLevelObject;

    const secondValue = this.determineNewSecondValue(level);

    this.question.firstValue = this.determineNewFirstValue(level, secondValue);

    this.question.secondValue = secondValue;

    this.question.submittedAnswer = 0;
    this.question.correctAnswer = null;
    this.question.incorrectAnswer = false;
  }

  // Don't repeat the previous first value
  determineNewFirstValue(level: Level, secondValue: number): number {
    var value = Math.floor(Math.random() * level.firstValueRange[1] + 1);
    return (value == this.question.firstValue || value < secondValue) ? this.determineNewFirstValue(level, secondValue) : value;
  }

  // Don't repeat the previous second value
  determineNewSecondValue(level: Level): number {
    var value = Math.floor(Math.random() * ((level.secondValueRange[1] + 1) - level.secondValueRange[0]) + level.secondValueRange[0]);
    return (value == this.question.secondValue) ? this.determineNewSecondValue(level) : value;
  }
}
