import { useEffect, useState } from "react";
import supabase from "./supabase";
import "./style.css";

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 4,
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

// function Counter() {
//   const [count, setCount] = useState(0);
//   return (
//     <div>
//       <span style={{ fontSize: "40px" }}>{count}</span>
//       <button className="btn btn-large" onClick={() => setCount((c) => c + 1)}>
//         +1
//       </button>
//     </div>
//   );
// }
function App() {
  // 1.1 Define state variable
  const [showForm, setShowForm] = useState(false);
  //facts prop displays the facts in FactList
  //setFacts will set(create a new) fact inside NewFactForm, as
  //NewFactForm contains the Form input elements
  const [facts, setFacts] = useState([]);
  //isLoading will display Loading...text while data is getting loaded
  const [isLoading, setIsLoading] = useState(false);
  //
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(
    function () {
      async function getFacts() {
        setIsLoading(true); // will display the Loading... text

        let query = supabase.from("facts").select("*");

        if (currentCategory !== "all")
          query = query.eq("category", currentCategory);
        //while the below data is loading
        //show all parameters in facts, sorted in ascending
        //order using votesInteresting, limiting to 1000 facts
        const { data: facts, error } = await query
          .order("votesInteresting", { ascending: true })
          .limit(1000);

        // console.log(facts);
        //if there is no error, setFacts will display the data once it is downloaded
        if (!error) setFacts(facts);
        //else display alert message
        else alert("There was a problem getting data");
        //Once data is loaded, we set setIsLoading(false);
        setIsLoading(false);
      }
      getFacts();
    },
    [currentCategory]
  );
  return (
    <>
      {/* first setShowForm is the prop name
    & second setShowForm in {} represents the setShowForm
    declared above  */}
      <Header showForm={showForm} setShowForm={setShowForm} />
      {/* <> represents a fragment */}

      {/* <Counter /> counter is no longer needed */}
      {/* 1.2 Use state variable */}
      {/* Ternary operator for viewing and hiding the form */}
      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}

      <main className="main">
        {/* Linking setCurrentCategory to category buttons by
        creating setCurrentCategory prop*/}
        <CategoryFilter setCurrentCategory={setCurrentCategory} />
        {/* if isLoading=true, then disaply Loading..text inside Loader func
        else display the facts */}
        {isLoading ? (
          <Loader />
        ) : (
          <FactList facts={facts} setFacts={setFacts} />
        )}
      </main>
    </>
  );
}
//Loader function
function Loader() {
  return <p className="message">Loading....</p>;
}
function Header({ showForm, setShowForm }) {
  const appTitle = "Dinesh React Site";
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" width="68" height="68" alt="Today I learned logo" />
        <h1>{appTitle}</h1>
      </div>

      <button
        className="btn btn-large btn-open"
        // 1.3 Update state variable
        onClick={() => setShowForm((show) => !show)}
      >
        {showForm ? "Close" : "Share a fact"}
        {/* If showform is visible then text=CLOSE
        if not visible then text = Share a fact */}
      </button>
    </header>
  );
}

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

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  async function handleSubmit(e) {
    //1. Prevent the browser reload
    e.preventDefault();
    console.log(text, source, category);

    //2. Check if the data is valid, if so, create a new fact
    if (text && isValidHttpUrl(source) && category && textLength <= 200) {
      //3. Create a new fact object
      // const newFact = {
      //   // Since text, source & category have same names,
      //   // so that why we just have text & not text = text etc
      //   id: Math.round(Math.random() * 100000),
      //   text,
      //   source,
      //   category,
      //   votesInteresting: 0,
      //   votesMindblowing: 0,
      //   votesFalse: 0,
      //   createdIn: new Date().getFullYear(),
      // };

      //3. Upload fact on Supabase and receive the new fact object
      //while data is uploading setIsUploading = true (Jump to: pix)
      setIsUploading(true);
      //Inserting only text, source & category values inside array object
      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([{ text, source, category }])
        .select();
      setIsUploading(false);
      //4. Add the new fact to the UI: add the fact to stat
      if (!error) setFacts((facts) => [newFact[0], ...facts]);
      //5. Reset input fields
      setText("");
      setSource("");
      setCategory("");
      //6. Close the form
      setShowForm(false);
    }
  }

  return (
    // while data is getting uploaded to Supabase, input fields, categories & button is disabled
    //i.e since IsUploading = true, so disabled={true} will disable the fields while the data is uploading
    //and once the data is uploaded, setIsUploading = false, so all the fields will become active again
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a fact with the World..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isUploading}
        // e stands for eventHandler, as
        //onChange is a type of Event Handler
      />
      <span>{200 - textLength}</span>
      <input
        type="text"
        placeholder="Trustworthy Source...."
        value={source}
        onChange={(e) => setSource(e.target.value)}
        disabled={isUploading}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUploading}
      >
        <option value="">Choose a Category</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUploading}>
        Post
      </button>
    </form>
  );
}

function CategoryFilter({ setCurrentCategory }) {
  //CategoryFilter components is for Technology, science, finance buttons etc
  return (
    <aside>
      <ul>
        <li className="category">
          <button
            className="btn btn-all-categories"
            onClick={() => setCurrentCategory("all")}
          >
            All
          </button>
        </li>
        {/* Below code is in { } as we are calling map (javascript)*/}
        {CATEGORIES.map((cat) => (
          <li key={cat.name} className="category">
            <button
              className="btn btn-category"
              style={{ backgroundColor: cat.color }}
              onClick={() => setCurrentCategory(cat.name)}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function FactList({ facts, setFacts }) {
  //If there are no facts in a specific category Eg: news, then
  //if condition will be called and return state inside it will execute
  if (facts.length === 0)
    return (
      <p className="message">
        {/* For Emoji press -> Ctrl + Command + Spacebar  */}
        No facts for this category yet. Create the first one✌️
      </p>
    );
  //or else if facts.length > 0 then the below return statement will exeute
  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => (
          <Fact key={fact.id} factObj={fact} setFacts={setFacts} />
        ))}
      </ul>
      <p>There are {facts.length} facts in the database. Add your own</p>
    </section>
  );
}
/*Note: I've used factObj word, but instructor uses fact*/
/*creating a function for displaying facts*/
function Fact({ factObj, setFacts }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isDisputed =
    factObj.votesInteresting + factObj.votesMindblowing < factObj.votesFalse;

  async function handleVote(columnName) {
    setIsUpdating(true);
    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({ [columnName]: factObj[columnName] + 1 })
      .eq("id", factObj.id)
      .select();
    setIsUpdating(false);

    console.log(updatedFact);
    if (!error)
      setFacts((facts) =>
        facts.map((f) => (f.id === factObj.id ? updatedFact[0] : f))
      );
  }
  return (
    <li className="fact">
      <p>
        {isDisputed ? <span className="disputed">[⛔️DISPUTED⛔️]</span> : null}
        {factObj.text}
        <a className="source" href="{fact.source}" target="_blank">
          (source)
        </a>
      </p>

      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find(
            (cat) => cat.name === factObj.category
          ).color,
        }}
      >
        {factObj.category}
      </span>

      <div className="vote-buttons">
        <button
          onClick={() => handleVote("votesInteresting")}
          disabled={isUpdating}
        >
          👍 {factObj.votesInteresting}
        </button>
        <button
          onClick={() => handleVote("votesMindblowing")}
          disabled={isUpdating}
        >
          🤯 {factObj.votesMindblowing}
        </button>
        <button onClick={() => handleVote("votesFalse")} disabled={isUpdating}>
          ⛔️ {factObj.votesFalse}
        </button>
      </div>
    </li>
  );
}
export default App;
