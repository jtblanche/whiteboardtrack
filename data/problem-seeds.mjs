export default [{
    name: "Stairs",
    imageUrl: "//i.imgur.com/5nF8sic.gif",
    short: "We're going to build stairs, for a console application using console.log!",
    UserId: 1,
    description: `# Stairs
### Directions:
* Write a function that takes in one number as input
  *This input will be how many levels of stairs the output should have.
* It will then console.log stairs that match the following look:
  * When input is 3:
  \`\`\`javascript
  *
  **
  ***
  \`\`\`
  * When input is 5:
  \`\`\`javascript
  *
  **
  ***
  ****
  *****
  \`\`\`
`,
    hint: `# Hints
* Use a for loop
* Use a variable to store and build your output
* Try and figure out a pattern to build one line from the previous line
* Use that pattern in the for loop
* Remember you can only use console.log so you must print out an entire line for each console.log
* You could use an array to hold the stairs data and then use array methods to add and remove from the front and end of the array if needed.
`
}]