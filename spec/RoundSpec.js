'use-strict';

describe("Round", function() {

  var round;
  var firstRoll;
  var secondRoll;

  beforeEach(function() {
    round = new Round();
    firstRoll = jasmine.createSpyObj("firstRoll", ['showPinsHit']);
    secondRoll = jasmine.createSpyObj("secondRoll", ['showPinsHit']);
  });

  describe("At the start the round it ...", function() {

    it("should have 10 pins", function() {
      expect(round.showPinsLeft()).toEqual(10);
    });

    it("should have 0 rolls in the rolls array", function() {
      expect(round.showRolls()).toEqual([]);
    });

    it("should have a rawScore of 0", function() {
      expect(round.showRawScore()).toEqual(0);
    });

    it("should have a 0 as a the number of rolls", function() {
      expect(round.showNumRolls()).toEqual(0);
    });

    it("should have a spare set to false", function() {
      expect(round.showSpare()).toEqual(false);
    });

    it("should have the strike set to false", function() {
      expect(round.showStrike()).toEqual(false);
    });

  });

  describe("After one 'regular' roll... ", function() {

    beforeEach(function(){
        firstRoll.showPinsHit.and.returnValue(2);
      });

    it("rolls should have 1 object", function(){
      round.roll();
      expect(round._rolls.length).toEqual(1);
    });

    it("it should update the pinsLeft", function () {
      round.roll(firstRoll);
      expect(round.showPinsLeft()).toEqual(8);
    });

  });

  describe("After two 'regular' rolls ... ", function() {

    beforeEach(function(){
        firstRoll.showPinsHit.and.returnValue(2);
        secondRoll.showPinsHit.and.returnValue(5);
      });

    it("rolls should have 2 objects", function(){
      round.roll(firstRoll);
      round.roll(secondRoll);
      expect(round._rolls.length).toEqual(2);
    });

    it("should update the pinsLeft", function () {
      round.roll(firstRoll);
      round.roll(secondRoll);
      expect(round.showPinsLeft()).toEqual(3);
    });

    it("the firstRollPinHits = 2, secondRollPinsHit = 5", function() {
      round.roll(firstRoll);
      round.roll(secondRoll);
      expect(round.firstRollPinsHit()).toEqual(2);
      expect(round.secondRollPinsHit()).toEqual(5);
    });

  });

  describe("After a strike it... ", function() {

    beforeEach(function(){
        firstRoll.showPinsHit.and.returnValue(10);
      });

    it("should update the pinsLeft", function () {
      round.roll(firstRoll);
      expect(round.showPinsLeft()).toEqual(0);
      expect(round.showStrike()).toEqual(true);
    });

  });

  describe("After a spare it... ", function() {

    beforeEach(function(){
        firstRoll.showPinsHit.and.returnValue(7);
        secondRoll.showPinsHit.and.returnValue(3);
      });

    it("should update the pinsLeft", function () {
      round.roll(firstRoll);
      round.roll(secondRoll);
      expect(round.showPinsLeft()).toEqual(0);
      expect(round.showSpare()).toEqual(true);
    });

  });

});
