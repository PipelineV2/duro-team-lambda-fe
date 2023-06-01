export const generateRandomCharacters = (length: number) => {
  // Generate a random number between 0 and 36^length.
  const randomNumber = Math.floor(Math.random() * 36 ** length);

  // Convert the random number to a string of characters.
  const randomCharacters = randomNumber.toString(36);

  // Return the random string.
  return randomCharacters;
};

// const newForm = doc(db, `Form-${uid}`, uid);
//         await setDoc(
//           newForm,
//           {
// vendor: businessName,
// vendorId: uid,
// date: Date(),
// ticketNo: Math.random()*9999999,
// name:,
//             lastName: lastName,

//           },
//           { merge: true }
//         )
