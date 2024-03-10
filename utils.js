const remingtonMapping = {
    q: "ु",
    w: "ू",
    e: "म",
    r: "त",
    t: "ज",
    y: "ल",
    u: "न",
    i: "प",
    o: "व",
    p: "च",
    a: "ं",
    s: "े",
    d: "क",
    f: "ि",
    g: "ह",
    h: "ी",
    j: "र",
    k: "ा",
    l: "स",
    z: "्र",
    x: "ग",
    c: "ब",
    v: "अ",
    b: "इ",
    n: "द",
    m: "उ",
    "~": "द्य",
    "`": "़",
    1: "१",
    2: "२",
    3: "३",
    4: "४",
    5: "५",
    6: "६",
    7: "७",
    8: "८",
    9: "९",
    0: "०",
    "-": "ञ",
    _: ".",
    "=": "ृ",
    "\\": ".",
    "[": "ख्",
    "]": ",",
    ";": "य",
    "?": "घ्‍",
    ",": "ए",
    ".": "ण्",
    "/": "ध्",
    Q: "फ",
    W: "ॅ",
    E: "म्",
    R: "त्",
    T: "ज्",
    Y: "ल्",
    U: "न्",
    I: "प्",
    O: "व्",
    P: "च्",
    A: "ा",
    S: "ै",
    D: "क्",
    F: "थ्",
    G: "ळ",
    H: "भ्",
    J: "श्र",
    K: "ज्ञ",
    L: "स्",
    Z: "र्",
    X: "ग्",
    C: "ब्",
    V: "ट",
    B: "ठ",
    N: "छ",
    M: "ड",
    "`": "़",
    "!": "|",
    "@": "/",
    "#": ":",
    $: "ऱ्‍",
    "%": "-",
    "^": "“",
    "&": "‘",
    "*": "द्ध",
    "(": "त्र",
    ")": "ऋ",
    "+": "्",
    "|": "\\",
    "{": "क्ष्",
    "}": "द्व",
    ":": "रू",
    '"': "ष्",
    "<": "ढ",
    ">": "झ",
    "?": "घ्",
    '"': "ष्",
    "'": "श्‍",
  };
  
  const half_letter = {
    H: "भ",
    E: "म",
    R: "त",
    T: "ज",
    Y: "ल",
    U: "न",
    I: "प",
    O: "व",
    P: "च",
  
    "[": "ख",
    "{": "क्ष",
    D: "क",
    F: "थ",
    L: "स",
    '"': "ष",
    "'": "श",
    X: "ग",
    C: "ब",
    v: "आ",
    ".": "ण",
    "?": "घ",
    "/": "ध",
  };
  
  const half_letter_rafar = {
    F: "र्थ",
    H: "र्भ",
    '"': "र्ष ",
    "'": "र्श ",
    ".": "र्ण",
    "?": "र्घ",
    "/": "र्ध",
    "{": "र्क्ष",
    "[": "र्ख ",
  };
  
  /**
   * This function will return array of words which match with expected passage words
   * If expected word is present in output array of words return by executing this function
   * then we will mark that word in green in expected passage else it will be marked in red
   * @param {Expected Passage} expectedPassage | string
   * @param {User Input} userInput | string
   * @returns string
   */
  const getLongestContinuousSequence = (expectedPassage, userInput) => {
    const expectedPassageWords = expectedPassage.trim().split(" ");
    const userInputWords = userInput.trim().split(" ");
  
    const m = expectedPassageWords.length;
    const n = userInputWords.length;
  
    // Create a 2D array to store the lengths of LCS
    const dp = [];
    for (let i = 0; i <= m; i++) {
      dp[i] = new Array(n + 1).fill(0);
    }
  
    // Build the dp array in bottom-up manner
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (expectedPassageWords[i - 1] === userInputWords[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }
  
    // Reconstruct the correctWords
    let i = m;
    let j = n;
    const correctWords = [];
    while (i > 0 && j > 0) {
      if (expectedPassageWords[i - 1] === userInputWords[j - 1]) {
        correctWords.unshift(expectedPassageWords[i - 1]);
        i--;
        j--;
      } else if (dp[i - 1][j] > dp[i][j - 1]) {
        i--;
      } else {
        j--;
      }
    }
  
    return correctWords;
  };
  
  const getCorrectWordsHighlighted = (wordsCorrectlyTyped, expectedWords) => {
    let expectedWordsIndex = 0;
    let typedWordIndex = 0;
    let correctWords = 0;
    const spansStartingWithW = document.querySelectorAll('[id^="w"]');
  
    // Iterate through both arrays
    while (
      typedWordIndex < wordsCorrectlyTyped.length &&
      expectedWordsIndex < expectedWords.length
    ) {
      const currentExpectedWord = expectedWords[expectedWordsIndex];
      const currentCorrectWord = wordsCorrectlyTyped[typedWordIndex];
      // If the words match, move to the next word in both arrays
      if (currentExpectedWord === currentCorrectWord) {
        const currentElement = spansStartingWithW[expectedWordsIndex];
        currentElement.style.color = "green";
        typedWordIndex += 1;
        correctWords += 1;
      } else if (!expectedWords.includes(currentCorrectWord)) {
        // If the words from wordsCorrectlyTyped is not present in expectedWords, move to the next word in wordsCorrectlyTyped
        typedWordIndex += 1;
      }
      expectedWordsIndex += 1;
    }
  
    return correctWords;
  };
  
  const isHalfLetter = (letter) => {
    return half_letter.hasOwnProperty(letter);
  };
  
  function convertToMarathiUpdated(englishText) {
    const a = [];
    let z = 0;
  
    const EnglishTextReal = englishText;
  
    console.log("engtext" , {EnglishTextReal})
    
  
    for (let i = 0; i < EnglishTextReal.length; i++) {
      console.log("LOOP KRAMANK-> " + i + " -> " + a);
      console.log("(EnglishTextReal", EnglishTextReal);
  
      // for half letter and full letter rafar and kana with half letter for र्भा , र्भ .
      if (
        EnglishTextReal[i - 1] == "k" &&
        EnglishTextReal[i] == "Z" &&
        EnglishTextReal[i - 2] != " " &&
        EnglishTextReal[i - 2] != undefined
        
      ) {
        if (isHalfLetter(EnglishTextReal[i - 2])) {
          console.log("a[i] first ", a[i]);
          if (EnglishTextReal[i - 3] == "f") {
            console.log("a[i]", a[i]);
            const halfLetterValue = half_letter[EnglishTextReal[i - 2]];
            a[i - 3] =
              remingtonMapping[EnglishTextReal[i]] +
              halfLetterValue +
              remingtonMapping[EnglishTextReal[i - 3]];
            console.log("for र्भि like letters ", a[i - 3]);
            i++;
            // done
          } else {
            const halfLetterValue = half_letter[EnglishTextReal[i - 2]];
  
            a[i - 2] = remingtonMapping[EnglishTextReal[i]] + halfLetterValue;
            console.log("BOOO " + a[i - 2], "><><><><", a[i - 3]);
            i++;
          }
        } else if (
          isHalfLetter(EnglishTextReal[i - 3]) &&
          EnglishTextReal[i - 1] == "k" &&
          EnglishTextReal[i - 2] == "k"
        ) {
          const halfLetterValue = half_letter[EnglishTextReal[i - 3]];
          a[i - 3] = remingtonMapping[EnglishTextReal[i]] + halfLetterValue;
          console.log("o", a[i - 3]);
          i++;
        } else if (
          isHalfLetter(EnglishTextReal[i - 3]) &&
          EnglishTextReal[i - 1] == "k"
        ) {
          // H ; k Z \\ H ; Z
          a[i - 3] =
            remingtonMapping[EnglishTextReal[i]] +
            remingtonMapping[EnglishTextReal[i - 3]];
          i++;
        } else {
          a[i - 2] =
            remingtonMapping[EnglishTextReal[i]] +
            remingtonMapping[EnglishTextReal[i - 2]];
          console.log("in rafar with kana", a[i - 2]);
          i++;
        }
      }
  
      // for rafar with pahili velanti
      if (
        EnglishTextReal[i - 2] == "f" &&
        EnglishTextReal[i] == "Z" &&
        EnglishTextReal[i - 1] != " " &&
        EnglishTextReal[i - 1] != undefined
      ) {
        a[i - 2] =
          remingtonMapping[EnglishTextReal[i]] +
          remingtonMapping[EnglishTextReal[i - 1]] +
          remingtonMapping[EnglishTextReal[i - 2]];
  
        console.log("in rafar with pahili velanti (र्वि)", a[i - 2]);
        i++;
      }
      // "for letters like (प्रि)"
      if (
        EnglishTextReal[i - 2] == "f" &&
        EnglishTextReal[i] == "z" &&
        EnglishTextReal[i - 1] != " " &&
        EnglishTextReal[i - 1] != undefined
      ) {
        a[i - 2] =
          remingtonMapping[EnglishTextReal[i - 1]] +
          remingtonMapping[EnglishTextReal[i]] +
          remingtonMapping[EnglishTextReal[i - 2]];
  
        console.log("for letters like (प्रि)", a[i - 2]);
        i++;
      }
  
      //  for rafar with dusri velanti
      if (
        EnglishTextReal[i - 1] == "h" &&
        EnglishTextReal[i] == "Z" &&
        EnglishTextReal[i - 2] != " " &&
        EnglishTextReal[i - 2] != undefined
      ) {
        // for half letter rafar and velanti
        if (
          EnglishTextReal[i - 2] == "k" &&
          isHalfLetter(EnglishTextReal[i - 3])
        ) {
          const halfLetterValue = half_letter[EnglishTextReal[i - 3]];
          a[i - 3] = remingtonMapping[EnglishTextReal[i]] + halfLetterValue;
          i++;
        }
        // for full letter rafar and velanti
        else {
          a[i - 2] =
            remingtonMapping[EnglishTextReal[i]] +
            remingtonMapping[EnglishTextReal[i - 2]];
          console.log("in rafar with  dusri velanti", a[i - 2]);
          i++;
        }
      }
  
      // for velanti of half lettr velanti
      if (
        EnglishTextReal[i] != "" &&
        EnglishTextReal[i] != "k" &&
        isHalfLetter(EnglishTextReal[i - 1]) &&
        EnglishTextReal[i - 2] === "f"
      ) {
        var joiner =
          remingtonMapping[EnglishTextReal[i - 1]] +
          remingtonMapping[EnglishTextReal[i]] +
          remingtonMapping[EnglishTextReal[i - 2]];
        a[i - 2] = joiner;
        console.log("hurrey NAVIN " + joiner);
        i++;
      }
  
      // for world like "स्थि"
      if (
        EnglishTextReal[i] == "k" &&
        isHalfLetter(EnglishTextReal[i - 2]) &&
        isHalfLetter(EnglishTextReal[i - 1]) &&
        EnglishTextReal[i - 3] === "f"
      ) {
        const halfLetterValue = half_letter[EnglishTextReal[i - 1]];
        a[i - 3] =
          remingtonMapping[EnglishTextReal[i - 2]] +
          halfLetterValue +
          remingtonMapping[EnglishTextReal[i - 3]];
        console.log("for two half letter with pahili velanti ", a[i - 3]);
      }
  
      // for थ्रि
      else if (
        isHalfLetter(EnglishTextReal[i - 2]) &&
        EnglishTextReal[i - 3] == "f" &&
        EnglishTextReal[i - 1] == "k" &&
        EnglishTextReal[i] == "z"
      ) {
        const halfLetterValue = half_letter[EnglishTextReal[i - 2]];
        a[i - 3] =
          halfLetterValue +
          remingtonMapping[EnglishTextReal[i]] +
          remingtonMapping[EnglishTextReal[i - 3]];
        console.log("for थ्रि ", a[i - 3]);
      }
  
      // for words like र्हे and र्धे
      else if (
        EnglishTextReal[i] == "Z" &&
        EnglishTextReal[i - 1] == "s" &&
        EnglishTextReal[i - 2] != " " &&
        EnglishTextReal[i - 2] != undefined
      ) {
        // for words like र्धे (half letter vale )
        if (
          isHalfLetter(EnglishTextReal[i - 3]) &&
          EnglishTextReal[i - 2] == "k"
        ) {
          const halfLetterValue = half_letter[EnglishTextReal[i - 3]];
          a[i - 3] = remingtonMapping[EnglishTextReal[i]] + halfLetterValue;
          console.log(" for words like र्धे", a[i - 3]);
        }
        // for words like र्हे
        else {
          a[i - 2] =
            remingtonMapping[EnglishTextReal[i]] +
            remingtonMapping[EnglishTextReal[i - 2]];
          console.log("for words like र्हे ", a[i - 2]);
        }
      }
  
      // else if (
      //   EnglishTextReal[i] == "Z" &&
      //   EnglishTextReal[i - 1] == "s" &&
      //   half_letter_keys.includes(EnglishTextReal[i - 3]) &&
      //   EnglishTextReal[i - 2] == "k"
      // ) {
  
      // }
  
      // FOR PAHILE VELANTI
      else if (
        EnglishTextReal[i] === "k" &&
        isHalfLetter(EnglishTextReal[i - 1]) &&
        EnglishTextReal[i - 2] === "f"
      ) {
        const halfLetterValue = half_letter[EnglishTextReal[i - 1]];
  
        var temp = halfLetterValue + remingtonMapping[EnglishTextReal[i - 2]];
        a[i - 2] = temp;
        console.log("hurrey" + temp);
        // i++
      } else if (
        EnglishTextReal[i] == "f" &&
        EnglishTextReal[i + 1] != " " &&
        remingtonMapping[EnglishTextReal[i + 1]] != undefined
      ) {
        a[i] =
          remingtonMapping[EnglishTextReal[i + 1]] +
          remingtonMapping[EnglishTextReal[i]];
        i++;
        console.log("PRIMARY IF");
      }
      //FOR half letter and kana and AA
      else if (
        isHalfLetter(EnglishTextReal[i]) &&
        (EnglishTextReal[i + 1] == "k" || EnglishTextReal[i + 1] == "A")
      ) {
        console.log("in 2nd if");
        const halfLetterValue = half_letter[EnglishTextReal[i]];
        a[i] = "";
        a[i] = halfLetterValue;
        console.log("SECONDARY IF  for AA ", a[i]);
        i++;
      }
      // for "ओ"
      else if (
        EnglishTextReal[i - 2] == "v" &&
        EnglishTextReal[i - 1] == "k" &&
        EnglishTextReal[i] == "s"
      ) {
        a[i - 2] = "ओ";
        console.log("in ओ");
      }
  
      // for "औ"
      else if (
        EnglishTextReal[i - 2] == "v" &&
        EnglishTextReal[i - 1] == "k" &&
        EnglishTextReal[i] == "S"
      ) {
        a[i - 2] = "औ";
        console.log("in औ");
      }
  
      // for ॲ
      else if (EnglishTextReal[i - 1] == "v" && EnglishTextReal[i] == "W") {
        a[i - 1] = "ॲ";
      }
  
      // for ऑ
      else if (
        EnglishTextReal[i - 2] == "v" &&
        EnglishTextReal[i - 1] == "k" &&
        EnglishTextReal[i] == "W"
      ) {
        a[i - 2] = "ऑ";
      }
  
      // for ऐ
      else if (EnglishTextReal[i - 1] == "," && EnglishTextReal[i] == "s") {
        a[i - 1] = "ऐ";
      }
  
      // for ऊ
      else if (EnglishTextReal[i] == "m" && EnglishTextReal[i + 1] == "Q") {
        // initialize only for ऊ
        console.log("in ऊ");
        a[i] = "ऊ";
        i++;
      }
      //   for rafar of jodshabda and purna shbda rafar
      else if (
        EnglishTextReal[i] == "Z" &&
        EnglishTextReal[i - 1] != " " &&
        remingtonMapping[EnglishTextReal[i - 1]] != undefined
      ) {
        // for jodshabda
  
        if (isHalfLetter(EnglishTextReal[i - 2])) {
          console.log("in jeeee ", EnglishTextReal[i - 2]);
          console.log(
            "for if wala rafar ",
            EnglishTextReal[i],
            EnglishTextReal[i - 1],
            EnglishTextReal[i - 2]
          );
          console.log(
            remingtonMapping[EnglishTextReal[i]],
            remingtonMapping[EnglishTextReal[i - 1]],
            remingtonMapping[EnglishTextReal[i - 2]]
          );
          a[i - 2] =
            remingtonMapping[EnglishTextReal[i]] +
            remingtonMapping[EnglishTextReal[i - 2]];
        } else {
          // for sadha rafar
          console.log("in else");
          a[i - 1] =
            remingtonMapping[EnglishTextReal[i]] +
            remingtonMapping[EnglishTextReal[i - 1]];
          console.log(EnglishTextReal[i], EnglishTextReal[i - 1]);
        }
        console.log("in rafar");
      } else if (
        // in big rafar
        EnglishTextReal[i] == "Z" &&
        EnglishTextReal[i - 1] == "k" &&
        remingtonMapping[EnglishTextReal[i - 1]] != undefined
      ) {
        a[i] =
          remingtonMapping[EnglishTextReal[i]] +
          remingtonMapping[EnglishTextReal[i - 1]];
      }
  
      // for big "E"
      else if (EnglishTextReal[i] == "b" && EnglishTextReal[i + 1] == "Z") {
        a[i] = "ई";
        console.log("in ई ");
        i++;
      }
      // else if (EnglishTextReal[i] == " "){
      //   a[i] = " ";
      //   console.log("Inspace loop ")
      // }
      //FOR NORMAL
      else {
        console.log("in sadha loop");
        a[i] = remingtonMapping[EnglishTextReal[i]] || EnglishTextReal[i];
      }
    }
    const return_value = a.join("")
    console.log(return_value , "return");
    return return_value;
    
  }
  