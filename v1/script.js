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
];

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

console.log(CATEGORIES.find((cat) => cat.name === "society").color);

//Selecting DOM elements
const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");
const factsList = document.querySelector(".facts-list");

//console.dir(btn);

//create DOM elements. Render facts in list
factsList.innerHTML = "";

//LoadFacts func will load Data from Supabase

loadFacts();
async function loadFacts() {
  const res = await fetch(
    "https://xxbbopzqojdmhzezkzjg.supabase.co/rest/v1/facts",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4YmJvcHpxb2pkbWh6ZXprempnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU2NDIyNDgsImV4cCI6MjAyMTIxODI0OH0.JXIXWYbh52zgBBgREozIO9r8LnjrW0LHsVGG0Q6Xs2E",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4YmJvcHpxb2pkbWh6ZXprempnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU2NDIyNDgsImV4cCI6MjAyMTIxODI0OH0.JXIXWYbh52zgBBgREozIO9r8LnjrW0LHsVGG0Q6Xs2E",
      },
    }
  );

  const data = await res.json();
  //await keyword is only used for functions that returns promises
  //console.log(data);
  /*------------Filtering the data----------------------*/
  const filteredData = data.filter((facts) => facts.category === "history");
  /*-------------------------------------------------------*/
  createFactsList(data);
}

//createFactsList(initialFacts); //initialFacts is array of objects

function createFactsList(dataArray) {
  const htmlArr = dataArray.map(
    //facts.text will iterate through all the text properties using facts argument,
    //So facts.text will take each text element are then placing it inside
    // list that has a class name = fact, so each text will be in a list
    (facts) => `<li class="fact">
  <p>
  ${facts.text}
  <a
    class="source"
    href="${facts.source}"
    target="_blank"
    >(sour ce)</a>
</p>

<span class="tag" style="background-color: ${
      CATEGORIES.find((cat) => cat.name === facts.category).color
    }">${facts.category}</span>
  </li>`
  );
  //console.log(htmlArr);

  const html = htmlArr.join("");
  factsList.insertAdjacentHTML("afterbegin", html);
}

//Comment for testing Github

//Toggle form visiblility
btn.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btn.textContent = "Close";
  } else {
    form.classList.add("hidden");
    btn.textContent = "Share a Fact";
  }
});
//filter returns a new array that satisfies the given condition(all number > 10)
console.log([7, 64, 6, -23, 11].filter((el) => el > 10));
//find return a value(will return the 1st no that is > 10)
console.log([7, 64, 6, -23, 11].find((el) => el > 10));
/*
console.log(calcAge(1999));

console.log(calcAge(2034));

function calcAge(year) {
  const curYear = new Date().getFullYear();
  const age = curYear - year;

  if (age > 0) {
    return age;
  } else {
    return `Imposibble year. Year should be less than ${curYear}`;
  }
  // let ager = age > 0 ? age : "Impossibble Man";
  // console.log(ager);
}
const text = "Lisbon is capital of Portugal";
const UpText = text.toUpperCase();
console.log(UpText);

const str = `This is a String and current text is ${text}. It 
is ${calcAge(1994)} years old. And if the year is 2034 then output
is ${4 < 7 ? "true that" : "false bean"}`;
console.log(str);

/*Arrow keyword*/
/*const calcFactAge2 = (year) => 2022 - year;
console.log("Age in calcFactAge2 is: " + calcFactAge2(1990));
/*Arrow with terinary operator*/
/*
const calcAge3 = (year) =>
  year <= new Date().getFullYear()
    ? new Date().getFullYear() - year
    : `Impossible year`;

console.log("Age3:" + calcAge3(2008));

/* Basics Of JavaScript
let votesInteresting = 23;
let votesMindBlowing = 6;
votesInteresting = votesInteresting + 1;
votesInteresting++;
console.log("VotesInteresting: " + votesInteresting);
let totalVotes = votesMindBlowing + votesInteresting;
console.log("TotalVotes:", totalVotes);

let voteFalse = 31;
const isCorrect = voteFalse === totalVotes;
console.log(isCorrect);

console.log(parseInt("24.553ccc")); //print 24 in output
*/
/*
function calcFactAge(year) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - year;
  if (age >= 0) return age;
  else
    return `Impossible year. Year needs to be less or equal to ${currentYear}`;
}

const age1 = calcFactAge(2015);
console.log("Age:", age1);
console.log(calcFactAge(2020));
console.log(calcFactAge(2037));

console.log("Arrow function output");
// Arrow functions in Javascript
const calcFactAge2 = (year) => 2022 - year;
console.log("FactAge2:", calcFactAge2(2015));

// Arrow functions using Terenary operator ( Condition ? True : False )
//=> is arrow operator
const calcFactAge3 = (year) =>
  year <= new Date.getFullYear() //terinary operator condition(<= less then or equal condition)
    ? new Date.getFullYear() - year //true statement will return year difference
    : `Impossible year. Year needs to be less or equal to ${currentYear}`; //false will return this string

console.log("FactAge3:", calcFactAge2(1990));

/*
let votesInteresting = 21;
let votesMindBlowing = 0;

if (votesInteresting === votesMindBlowing) {
  alert("This fact is equally interesting and mindblowing");
} else if (votesInteresting > votesMindBlowing) {
  console.log("Interesting fact!!!");
} else if (votesInteresting < votesMindBlowing) {
  console.log("Mindblowing fact!!!");
}
/*--------------Falsy and Truthy values-------------*/
//falsy values are 0, '', null, undefined
//truthy values is everything else

//If votesMindBlowing has some value, it is truthy values
/*
if (votesMindBlowing) {
  console.log("MindBlowing!!!!");
} else {
  //if votesMindBlowing value = 0, '' ,null, undefined it becomes falsy values
  console.log("Nothing special | Falsy values");
}
let votesFalse = 7;
const totalUpVotes = votesInteresting + votesMindBlowing;
console.log("Total Up Votes:", totalUpVotes);
const message =
  totalUpVotes < votesFalse
    ? "This fact is true"
    : "Might be false, check source....";

console.log(message);

const text = "Lisbon is the capital of Portugal";
const upperText = text.toUpperCase();

console.log(upperText);

const str = `The current fact is ${text}. It is ${calcFactAge(
  2015
)} years old. It is probably
${totalUpVotes > votesFalse ? "correct" : "not true"}`;
console.log(str);
*/
/*
const fact = ["Lisbon is capital of Portugal", 2015, true, "something"];
console.log(fact);
console.log(fact[2]);
console.log(fact.length);
console.log(fact[fact.length - 1]);

/*Structuring part*/
//const [text, createdIn, isCorrect] = fact;
/*
text = Lisbon is capital of Portugal
createdIn = 2015
isCorrect = true
*/
/*console.log(createdIn);

const fact2 = [...fact, "society"];
console.log(fact2);

/*JS Objects*/
/*console.log("----------JavaScript Objectss----------");
const factObj = {
  text: "Lisbon is the capital of Portugal",
  category: "society",
  createdIn: 2015,
  isCorrectt: true,
  createSummary: function () {
    //this represents factObj, so this.text is equal to factObj.text
    return `The fact ${this.text} is from the
    ${this.category.toUpperCase()}`;
  },
};

console.log("Print these object values");
console.log(factObj.text);
console.log(factObj.createdIn);

/*Creating variable from Object*/
/* In the below code, we are creating category and isCorrectt variables that are
properties of factObj object.
so that instead of calling factObj.category, we can simply call category
as shown below*/
// const { category, isCorrectt } = factObj;

// console.log(category);

// console.log(factObj.createSummary());

/*-----------Looping using forEach methods----------*/
/*console.log("\nForEach Method");

let num = [2, 4, 6, 8];
num.forEach(function (el) {
  console.log(el * 3);
});

/*---------------Looping using Map method------------*/
/*console.log("\n<-------Looping using Map---------->");
const times10 = [2, 4, 6, 8].map(function (el) {
  return el * 10;
});
console.log(times10);

/*---------------Looping using Map & Arrow function------------*/
/*console.log("\nLooping using Map & Arrow function");

const timesTen = [2, 4, 6, 8].map((el) => el * 10);
/*this will print the updated values inside array*/
//console.log(timesTen);

/*this will print the array values as individual values*/
/*console.log("/n<---------Printing Individual values using Map---------->");
const times102 = [2, 4, 6, 8];
times102.map((el) => console.log(el * 10));

/*Each element in the CATEGORIES array is an Object inside { } brackets*/
/*const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];
/*Creating a new array allCategories using existing array CATEGORIES*/
/*const allCategoriesName = CATEGORIES.map((el) => el.name);
console.log(allCategoriesName);

const allCategoriesColor = CATEGORIES.map((el) => el.color);
console.log(allCategoriesColor);

/*------------------Array of Objects------------------------*/
/*Initial Facts array has three objects each inside a { } brackets*/
/*const initialFacts = [
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
];
console.log("\n Calculating Fact Ages");
/*calcFactAge mthd is declared at top*/
//const factAges = initialFacts.map((el) => calcFactAge(el.createdIn));
//console.log(factAges);

/*join mthd will join the 3 factAges elements seperated by & */
//console.log(factAges.join(" & "));

// const showAllId = initialFacts.map((el) => el.id);
// console.log(showAllId);
