const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  limit,
} = require("firebase/firestore");

const firebaseConfig = {
  projectId: "engdb-11b7f",
  apiKey: "AIzaSyC-WalCvtgdBIGTUYNhnWjoFoNFAMSUi3M",
  authDomain: "engdb-11b7f.firebaseapp.com",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const expressionsRef = collection(db, "EnglishExpressions");

async function testSearch(searchTerm) {
  console.log(`\nTesting search for: "${searchTerm}"`);

  // Prefix search on 'primary' field
  const q = query(
    expressionsRef,
    where("primary", ">=", searchTerm),
    where("primary", "<=", searchTerm + "\uf8ff"),
    limit(5)
  );

  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log("No results found.");
      return;
    }

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log(`- [${doc.id}] ${data.primary}`);
      console.log(`  Meaning: ${data.meaning}`);
      console.log(
        `  Synonyms: ${data.similar ? data.similar.join(", ") : "none"}`
      );
    });
  } catch (error) {
    console.error("Error during search:", error);
  }
}

async function runTests() {
  await testSearch("What");
  await testSearch("I have");
  await testSearch("Don't");
  process.exit(0);
}

runTests();
