// @ts-nocheck
const { test, expect } = require('@playwright/test');

const data = [
  'Prototype',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9'
]

//Concatenate

data.forEach(version => {
  test.describe(version + ': Concatenate', () => {
    test('Concatenating 2 and 3 results in 23', async ({ page }) => {
      await page.goto('https://testsheepnz.github.io/BasicCalculator');
      await page.selectOption('#selectBuild', { label: version});
      await page.locator('#number1Field').type('2');
      await page.locator('#number2Field').type('3');
      await page.selectOption('#selectOperationDropdown', {label: 'Concatenate'});
      await page.locator('#calculateButton').click();
  
      await expect(page.locator('#numberAnswerField')).toHaveValue('23');
      await page.pause();
    });
  });
});

//Devide by zero error message

data.forEach(version => {
  test.describe(version + ': Devide by 0', () => {
    test('Deviding number by 0 getting 0', async ({ page }) => {
      await page.goto('https://testsheepnz.github.io/BasicCalculator');
      await page.selectOption('#selectBuild', { label: version});
      await page.locator('#number1Field').type('2');
      await page.locator('#number2Field').type('0');
      await page.selectOption('#selectOperationDropdown', {label: 'Divide'});
      await page.locator('#calculateButton').click();
  
      await expect(page.locator('#numberAnswerField')).toHaveValue('');
      await page.pause();
    });
  });
});

//If ts number?

data.forEach(version => {
  test.describe(version + ': Is it number', () => {
    test('Check if letter "a" is a number result is not a number', async ({ page }) => {
      await page.goto('https://testsheepnz.github.io/BasicCalculator');
      await page.selectOption('#selectBuild', { label: version});
      await page.locator('#number1Field').type('a');
      await page.locator('#number2Field').type('b');
      await page.selectOption('#selectOperationDropdown', {label: 'Add'});
      await page.locator('#calculateButton').click();
  
      await expect(page.locator('#numberAnswerField')).toBeEmpty();
      await page.pause();
    });
  });
});

//Not only integer or negative numbers FAAILED PATAISYTI!!!

data.forEach(version => {
  test.describe(version + ': Does it counts', () => {
    test(': Multiplying 0.2 by -0.3 results in -0.06', async ({ page }) => {
      await page.goto('https://testsheepnz.github.io/BasicCalculator');
      await page.selectOption('#selectBuild', { label: version});
      await page.locator('#number1Field').type('0.2');
      await page.locator('#number2Field').type('-0.3');
      await page.selectOption('#selectOperationDropdown', {label: 'Multiply'});
      await page.locator('#calculateButton').click();
  
      await expect(page.locator('#numberAnswerField')).toHaveValue('-0.06');
      await page.pause();
    });
  });
});

//Checkbox "integer"

data.forEach(version => {
  test.describe(version + ': Checkbox integer', () => {
    test(': Integer check box should be enabled after clicking', async ({ page }) => {
      await page.goto('https://testsheepnz.github.io/BasicCalculator');
      await page.selectOption('#selectBuild', { label: version});
      await page.locator('#number1Field').type('1.1');
      await page.locator('#number2Field').type('2.2');
      await page.selectOption('#selectOperationDropdown', {label: 'Multiply'});
      await page.locator('#integerSelect').isEnabled(); //neturi praeiti 4-tame
      await page.locator('#integerSelect').click(); // patikrinam ar funkcionuoja

      await page.locator('#calculateButton').click();
      await expect(page.locator('#numberAnswerField')).toHaveValue('2');
      await page.pause();
    });
  });
});

//Button clear

data.forEach(version => {
  test.describe(version + ': Button clear', () => {
    test(': Clear button should be clickable', async ({ page }) => {
      await page.goto('https://testsheepnz.github.io/BasicCalculator');
      await page.selectOption('#selectBuild', { label: version});

      await page.locator('#clearButton').click();
      await expect(page.locator('#numberAnswerField')).toBeEmpty(); //neturi praeiti 5-ame
      await page.pause();
    });
  });
});

//Funtionality check add

data.forEach(version => {
  test.describe(version + ': Add function', () => {
    test(': Add 1 to 2 results 3', async ({ page }) => {
      await page.goto('https://testsheepnz.github.io/BasicCalculator');
      await page.selectOption('#selectBuild', { label: version});
      await page.locator('#number1Field').type('1');
      await page.locator('#number2Field').type('2');
      await page.selectOption('#selectOperationDropdown', {label: 'Add'});
      await page.locator('#calculateButton').click();
  
      await expect(page.locator('#numberAnswerField')).toHaveValue('3');
      await page.pause();
    });
  });
});

//Funtionality check repeat

data.forEach(version => {
  test.describe(version + ': Repeat calculations', () => {
    test(': Add 1 to 2 results 3 repeat and result 3', async ({ page }) => {
      await page.goto('https://testsheepnz.github.io/BasicCalculator');
      await page.selectOption('#selectBuild', { label: version});
      await page.locator('#number1Field').type('1');
      await page.locator('#number2Field').type('2');
      await page.selectOption('#selectOperationDropdown', {label: 'Add'});
      await page.locator('#calculateButton').click();
      await page.locator('#calculateButton').click();
      await expect(page.locator('#numberAnswerField')).toHaveValue('3');
      await page.pause();
    });
  });
});

//2nd nr fill

data.forEach(version => {
  test.describe(version + ': Fill tabs', () => {
    test(': Fields  #2 should be enabled', async ({ page }) => {
      await page.goto('https://testsheepnz.github.io/BasicCalculator');
      await page.selectOption('#selectBuild', { label: version});
      await page.locator('#number2Field').type('2');
      await expect(page.locator('#number2Field')).toHaveValue('2');         //bandziau tobeEmpty toHaveValue isEnabled isVisible irtt.
      await page.pause();
    });
  });
});