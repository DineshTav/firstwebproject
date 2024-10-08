/*Array of Objects*/
const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
  {
    text: "Dinesh Tavasalkar is an excellent coder",
  },
];
//Sample comment for testing now
/*
//create DOM elements
factlist.innerHTML = "";
factlist.insertAdjacentHTML("afterbegin", "<li>Jonas</li>");

/*In the below code, factArg is an argument
  <li class = "fact"> refers to "fact" class list(li) element in HTML tag
  ${factArg.text} will take the text elements value from initialFacts array 
  and display it inside fact's class list(li)
  */
/*const htmlArr = initialFacts.map(
  (factArg) => `<li class="fact">${factArg.text}</li>`
);

/*console.log(htmlArr); will print the text values inside an array as array elements*/
/*console.log(htmlArr);
const html = htmlArr.join("");
factlissct.insertAdjacentHTML("afterbegin", html);*/
