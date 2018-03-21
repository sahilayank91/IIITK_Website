var quoteCount = 0;
// var maxQuotes = 5;

var quoteArray = ["Nothing is impossible, the word itself says “I’m possible”!",
    "I’ve learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
    "Whether you think you can or you think you can’t, you’re right.",
    "Perfection is not attainable, but if we chase perfection we can catch excellence.",
    "If you look at what you have in life, you’ll always have more. If you look at what you don’t have in life, you’ll never have enough."
];

var WriterArray = ["——Audrey Hepburn",
    "——Maya Angelou",
    "——Henry Ford",
    "——Vince Lombardi",
    "——Oprah Winfrey"
];

function nextQuote(){
    quoteCount = (quoteCount+1 < quoteArray.length)? quoteCount+1 : 0;
    document.getElementById("quote_st").innerHTML = quoteArray[quoteCount];
    document.getElementById("quote_wtr").innerHTML = WriterArray[quoteCount];
    setTimeout('nextQuote()',5000);
}