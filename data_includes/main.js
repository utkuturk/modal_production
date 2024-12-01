PennController.ResetPrefix(null); // Initiates PennController
DebugOff(); // turn off debugger
SetCounter("setcounter");

//Randomly assign the participant to one of the four answer conditions
const answerConditions = ["bare", "haveto", "will", "prob"];
var answerCondition = answerConditions[Math.floor(Math.random() * 4)];
// Transform answerCondition to a text that can be used in the filter function
var answerConditionText = answerConditions[answerCondition];


// Header for the CSV file
Header(
  // newVar("subject").global,
  // newVar("id").global(), // This is for Prolific
  newVar("Type").global(),
  newVar("Group").global(),
  newVar("Item").global(),
  newVar("Inference").global(),
  newVar("Answer").global(),
  newVar("ConditionName").global(),
  newVar("Condition").global(),
  newVar("D1").global(),
  newVar("D2").global(),
  newVar("D3").global(),
  newVar("A1").global(),
  newVar("A2").global(),
  newVar("DialogueRT").global(),
  newVar("AnswerRT").global(),
  newVar("TrialNumber").global()
)
  // .log("subject", s)
  // .log("id", GetURLParameter("id")) // This is for Prolific
  .log("Type", getVar("Type"))
  .log("Group", getVar("Group"))
  .log("Item", getVar("Item"))
  .log("Inference", getVar("Inference"))
  .log("Answer", getVar("Answer"))
  .log("ConditionName", getVar("ConditionName"))
  .log("Condition", getVar("Condition"))
  .log("D1", getVar("D1"))
  .log("D2", getVar("D2"))
  .log("D3", getVar("D3"))
  .log("A1", getVar("A1"))
  .log("A2", getVar("A2"))
  .log("DialogueRT", getVar("DialogueRT"))
  .log("AnswerRT", getVar("AnswerRT"))
  .log("TrialNumber", getVar("TrialNumber"));

Sequence(
  "setcounter",
  "intro",
  "consent",
  "demo",
  startsWith("inst"),
  randomize("prac-rest"),
  "exp-start",
  sepWithN("break", rshuffle("trial", "filler", "check"), 4),
  "send_results",
  "debrief"
);


//for inserting breaks
function SepWithN(sep, main, n) {
  this.args = [sep, main];

  this.run = function (arrays) {
    assert(
      arrays.length == 2,
      "Wrong number of arguments (or bad argument) to SepWithN"
    );
    assert(parseInt(n) > 0, "N must be a positive number");
    let sep = arrays[0];
    let main = arrays[1];

    if (main.length <= 1) return main;
    else {
      let newArray = [];
      while (main.length) {
        for (let i = 0; i < n && main.length > 0; i++)
          newArray.push(main.pop());
        for (let j = 0; j < sep.length && main.length > 0; ++j)
          newArray.push(sep[j]);
      }
      return newArray;
    }
  };
}
function sepWithN(sep, main, n) {
  return new SepWithN(sep, main, n);
}




/// IMPORTANT VARIABLES
var fname = answerCondition + ".csv";
var fname_practice = "practice.csv";
var hideProgressBar = true;
var headerFontSize = "36";
var bodyFontSize = "22";
var proceedFontSize = "30";
var dialogue_timeout = 5000;
var answer_timeout = 5000;
var dialogFontSize = "20px";

var underline_blank = {
  outline: "none",
  resize: "none",
  border: "0",
  padding: "0",
  margin: "0",
  "margin-left": "1ex",
  "margin-right": "1ex",
  "vertical-align": "-.33em",
  "background-color": "white",
  "border-bottom": "2px solid black",
  display: "inline",
};

var pageCss = {
  overflow: "auto",
  padding: "1em",
  "box-shadow": "4px 4px 2px #cacfd2",
  border: "1px solid #cacfd2",
  "border-radius": "2em",
};

var textCss = {
  "text-align": "center",
  margin: "0 auto",
  // "width": "50em"
};

var dialogCss = {
  "font-size": dialogFontSize,
//   "border" : "solid 5px grey",
//   "margin": "10px"
};

var answerCss = {
  "box-sizing": "content-box",
  "border": "solid 2px grey",
  "padding": "5px",
};

var buttonCss = {
  "background-color": "#E03A3E",
  color: "white",
  "font-size": "1.25em",
  padding: "0.5em",
  "border-radius": "0.25em",
  // "width": "4em",
  margin: "0 auto",
  "text-align": "center",
  border: "none", // Remove default button border
  display: "block", // To center the button
};


newTrial(
  "intro",
  newText(
    "welcome-body",
    "<center><b>Welcome!</b></center>" +
      "<p>This experiment requires your FULL ATTENTION. " +
      "The experiment is reasonably brief. Most people find that the study takes around 25 minutes. " +
      "During this time, you must give your complete attention." +
      "<p>Before proceeding please make sure:<ol>" +
      "<li>You are using your <b>computer</b>, and not your phone or tablet,</li>" +
      "<li>You are using <b>Google Chrome</b>, and not Safari or Firefox,</li>" +
      "<li>You have a <b>working mouse/trackpad and keyboard</b>,</li>" +
      "<li>You are a native speaker of <b>American English</b>,</li>" +
      "<li>You are <b>older than 18</b> years old,</li>" +
      "<li>This is your <b>first time doing this experiment</b>,</li></ol>"
  ),
  newCanvas("welcome-page", 600, 400)
    .add(100, 20, newImage("umd_ling.png").size("60%", "auto"))
    .add(0, 120, getText("welcome-body"))
    .cssContainer(pageCss)
    .print(),
  newText("<p>").print(),
  newButton("CONTINUE").bold().css(buttonCss).print()
  ,
  newSelector()
        .add(getButton("CONTINUE"))
        .keys( " " )
        .wait()
).setOption("hideProgressBar", true);


newTrial(
  "consent",
  newText(
    "consent-body",
    "<center><b>Consent Form</b></center>" +
      "<p>Please click <a target='_blank' rel='noopener noreferrer' href='XXX'> here</a> to download the consent form for this study. If you read it and agree to participate in this study, click 'I Agree' below. If you do not agree to participate in this study, you can leave this study by closing the tab. You can leave the experiment at any time by closing the tab during the experiment. If you leave the experiment before completion of both parts, you will not be compensated for your time. If you encounter any problems, do not hesitate to reach us either via " +
      // "Prolific or e-mail." +
      "email. " +
      "<br><br><b> Researchers:</b> <br>Sarah Boukendour<sup>*</sup> <i> (sboukend@umd.edu)</i>, Utku Turk<sup>*</sup>, Alexander Williams<sup>*</sup>, Dan Goodhue<sup>&dagger;</sup>, Valentine Hacquard<sup>*</sup>, <br><sup>*</sup> University of Maryland, Department of Linguistics <br> <sup>&dagger;</sup> Dan's Affiliation"
  ),
  newCanvas("consent-page", 1500, 400)
    .add(100, 20, newImage("umd_ling.png").size("60%", "auto"))
    .add(0, 120, getText("consent-body"))
    .cssContainer(pageCss)
    .print(),
  newText("<p>").print(),
  newButton("agree", "I AGREE").bold().css(buttonCss).print()
  ,
  newSelector()
        .add(getButton("agree"))
        .keys( " " )
        .wait()
).setOption("hideProgressBar", true);

newTrial(
  "demo",
  newTextInput("age")
    .before(newText("Age*:").size("15em", "1.5em"))
    .size("15em", "1.5em")
    .lines(1)
    .css(underline_blank)
    .center()
    .log(),
  newTextInput("gender")
    .before(newText("Gender*:").size("15em", "1.5em"))
    .size("15em", "1.5em")
    .lines(1)
    .css(underline_blank)
    .log(),
  newTextInput("geo")
    .before(newText("Location (state, country):").size("15em", "1.5em"))
    .size("15em", "1.5em")
    .lines(1)
    .css(underline_blank)
    .log(),
  newTextInput("comp")
    .before(newText("Computer type (e.g. Mac, PC)*:").size("15em", "1.5em"))
    .size("15em", "1.5em")
    .lines(1)
    .css(underline_blank)
    .log(),
  newTextInput("language")
    .before(newText("Native language*:").size("15em", "1.5em"))
    .size("15em", "1.5em")
    .lines(1)
    .css(underline_blank)
    .log(),
  newTextInput("otherlg")
    .before(
      newText("Other languages you speak (please list):").size("15em", "1.5em")
    )
    .size("15em", "1.5em")
    .lines(1)
    .css(underline_blank)
    .log(),
  newCanvas("page2", 1500, 350)
    .add(100, 20, newImage("umdling2", "umd_ling.png").size("60%", "auto"))
    .add(
      0,
      120,
      newText(
        "Make sure that you entered all the information below. Obligatory ones are marked with *."
      )
    )
    .add(0, 160, getTextInput("age"))
    .add(0, 190, getTextInput("gender"))
    .add(0, 220, getTextInput("geo"))
    .add(0, 250, getTextInput("comp"))
    .add(0, 280, getTextInput("language"))
    .add(0, 310, getTextInput("otherlg"))
    .cssContainer(pageCss)
    .print(),
  newText("<p>").print(),
  newButton("CONTINUE")
    .bold()
    .css(buttonCss)
    .print()
    .wait(
      getTextInput("age")
        .test.text(/^\d+.+$/)
        .failure(
          newText("Age should be a numeric value").settings.color("red").print()
        )
        .and(
          getTextInput("language")
            .testNot.text("")
            .failure(
              newText("Please enter your mother language")
                .settings.color("red")
                .print()
            )
        )
        .and(
          getTextInput("gender")
            .testNot.text("")
            .failure(
              newText(
                "Please indicate your gender or write 'prefer not to say'"
              )
                .settings.color("red")
                .print()
            )
        )
        .and(
          getTextInput("geo")
            .testNot.text("")
            .failure(
              newText("Please enter your current location")
                .settings.color("red")
                .print()
            )
        )
        .and(
          getTextInput("comp")
            .testNot.text("")
            .failure(
              newText("Please indicate your computer type")
                .settings.color("red")
                .print()
            )
        )
    )
).setOption("hideProgressBar", true);


// INSTRUCTIONS

newTrial(
  "inst-1",
  newText(
    "inst-1a-body",
    " <p>Please read this instruction carefully! </p>" +
      "<p>In each trial in this experiment, You will see dialogues like the one below. Your task is to read the dialogue carefully and choose the best completion.</p>" +
      "<p>You’ll be presented with the dialogue first. </p>"
  )
  ,
  newText("inst-1b-body",
  "<p><b>A:</b> Whenever it’s foggy in the morning, flights from Oliver Municipal Airport are delayed.</p>" +
      "<p><b>B:</b> I just heard from a friend at Oliver, and she said it was foggy early today.</p>" +
      "<p><b>A:</b> Well, if it was foggy this morning...</p>" +
      "<div class='box'>Then, you’ll need to press <b>SPACE</b> to see the possible continuations.</div>"
  )
  ,
  newText("inst-1c-body",
  "<p>...the flights from Oliver Airport might’ve been delayed.</p>" +
      "<p>...the flights from Oliver Airport must’ve been delayed.</p>" +
      "<div class='box'><b>Please pick your answers intuitively—these are not trick questions. Follow your gut instinct and go with the first answer that comes to mind. Try not to overthink it. </b></div>" +
      "<p>Let’s go through an example. Some examples you encounter during the experiment might feel obvious to you..."
  )
  ,
  newCanvas("inst-1-page", 1500, 300)
    .add(100, 20, newImage("umd_ling.png").size("60%", "auto"))
    .add(0, 120, getText("inst-1a-body"))
    .cssContainer(pageCss)
    .print()
  ,
  newText("<p>").print()
  ,
  newButton("c1","CONTINUE").bold().css(buttonCss).print()
  ,
  newSelector()
        .add(getButton("c1"))
        .keys( " " )
        .wait()
  ,
  getCanvas("inst-1-page").remove()
  ,
  getButton("c1").remove()
  ,
  getText("inst-1b-body").print()
  ,
  newText("<p>").print()
  ,
  newButton("c2","CONTINUE").bold().css(buttonCss).print()
  ,
  newSelector()
        .add(getButton("c2"))
        .keys( " " )
        .wait()
  ,
  getText("inst-1b-body").remove()
  ,
  getButton("c2").remove()
  ,
  getText("inst-1c-body").print()
  ,
  newText("<p>").print()
  ,
  newButton("c3", "CONTINUE").bold().css(buttonCss).print()
  ,
  newSelector()
        .add(getButton("c3"))
        .keys( " " )
        .wait()
);


// newTrial("inst-2",
//     newText("Some examples you encounter during the experiment might feel obvious to you...").print()
//     ,
//     newText("<p>").print()
//   ,
//   newButton("see", "See an example").bold().css(buttonCss).print()
//   ,
//   newSelector()
//         .add(getButton("see"))
//         .keys( " " )
//         .wait()
// );

var trial_inst = (label) => (row) => {
  return newTrial(
    label,
    // Record the Trial Number
    newVar("TrialN", 0)
      .settings.global()
      .set((v) => v + 1)
    ,
    // INTRODUCE ELEMENTS
    // SPEAKER LIST
    // You can introduce them from the csv file as well. row.speaker1 + ": " + row.dialog1bana i, row.speaker2, etc.
    // DIALOGUES
    newText("dia1", "<b>A:</b> " + row.dialog1 + "<br><br>")
    ,
    newText("dia2", "<b>B:</b> " + row.dialog2 + "<br><br>")
    ,
    newText("dia3", "<b>A:</b> " + row.dialog3 + "<br><br>")
    ,
    newTimer("dialogue_timeout", dialogue_timeout).start()
    ,
    newVar("dialogue_RT").global().set( v => Date.now() )
    ,
    getText("dia1").css(dialogCss).print()
    ,
    getText("dia2").css(dialogCss).print()
    ,
    getText("dia3").css(dialogCss).print()
    ,
    newKey("show_answers"," ").callback( getTimer("dialogue_timeout").stop() )
    ,
    getVar("dialogue_RT").set( v => Date.now() - v )
    ,
    getTimer("dialogue_timeout").wait()
    ,
    getKey("show_answers")
        .test.pressed(" ")
        // .success(
        //     getSelector("comparison").test.selected(row.check)
        //     .success( newText("<p style=color:darkgreen padding-bottom: 25px>Correct!</p>").bold().print() )
        //     .failure( newText("<p style=color:red padding-bottom: 25px>That was incorrect! Please be more careful.</p>").bold().print() )
        //     )
        .failure( newText("contextslow","<p style=color:red padding-bottom: 25px>Try to read faster!</p>").bold().css(dialogCss).center().print(), newTimer("contextslow",2000).start().wait(), getText("contextslow").remove() )
    ,
    // ANSWERS
    newTimer("answer_timeout", answer_timeout).start()
    ,
    // PRINT FEEDBACK
    newVar("answer_RT").global().set( v => Date.now() )
    ,
    newText("a1", row.answer1).cssContainer(answerCss)
    ,
    newText("a2", row.answer2).cssContainer(answerCss)
    ,
    newCanvas("answers", 500,100)
        .add("left at 5%", 10, getText("a1"))
        .add("left at 5%", 80, getText("a2"))
        .print()
        .cssContainer(dialogCss)
    ,
    newSelector("comparison")
      .add(getText("a1"), getText("a2"))
      .shuffle()
    //   .keys("F", "J")
      .once()
      .log()
      .callback(getTimer("answer_timeout").stop()),

    // TIMER
    getTimer("answer_timeout").wait()
    ,
    // GET RT
    getVar("answer_RT").set( v => Date.now() - v )
    ,
    getCanvas("answers").remove(),
    getText("dia1").remove()
    ,
    getText("dia2").remove()
    ,
    getText("dia3").remove()
    ,
    getSelector("comparison").remove(),
    getSelector("comparison")
            .test.selected()
            // .success(
            //     getSelector("comparison").test.selected(row.check)
            //     .success( newText("<p style=color:darkgreen padding-bottom: 25px>Correct!</p>").bold().print() )
            //     .failure( newText("<p style=color:red padding-bottom: 25px>That was incorrect! Please be more careful.</p>").bold().print() )
            //     )
            .failure( newText("answerslow","<p style=color:red padding-bottom: 25px>Try to answer faster!</p>").bold().css(dialogCss).center().print(), newTimer("answerslow",2000).start().wait() )
        ,

    // SELECTION PART
    // newText("Press space key to proceed")
    //   .css({ "font-size": proceedFontSize })
    //   .print("center at 50vw", "middle at 40vh"),
    // newKey(" ").wait(),
    getVar("Type").set(row.Type),
    getVar("Group").set("practice"),
    getVar("Item").set(row.item),
    getVar("Inference").set("practice"),
    getVar("Answer").set("practice"),
    getVar("ConditionName").set(row.condition_name),
    getVar("Condition").set("practice"),
    getVar("D1").set(row.dialog1),
    getVar("D2").set(row.dialog2),
    getVar("D3").set(row.dialog3),
    getVar("A1").set(row.answer1),
    getVar("A2").set(row.answer2),
    getVar("DialogueRT").set(getVar("dialogue_RT")),
    getVar("AnswerRT").set(getVar("answer_RT")),
    getVar("TrialNumber").set(getVar("TrialN"))
  );

};

Template(GetTable(fname_practice).filter("condition_name", "obvious_example"), trial_inst("inst-3"));

newTrial("inst-4",
    newText("Others may not feel so obvious to you, but you’ll still need to choose what you feel is the best option out of the two provided.").print()
    ,
    newText("<p>").print()
  ,
  newButton("see", "See an example").bold().css(buttonCss).print()
  ,
  newSelector()
        .add(getButton("see"))
        .keys( " " )
        .wait()
);

Template(GetTable(fname_practice).filter("condition_name", "negobvious_example"), trial_inst("inst-5"));

newTrial("inst-6",
    newText("Got it? Now let’s move on to a few more practice items to help you adjust to the task.").print()
    ,
    newText("<p>").print()
  ,
  newButton("see", "See an example").bold().css(buttonCss).print()
  ,
  newSelector()
        .add(getButton("see"))
        .keys( " " )
        .wait()
);

Template(GetTable(fname_practice).filter("condition_name", /practice/), trial_inst("prac-rest"));

newTrial(
  "exp-start",
  fullscreen(),
  newText(
    "inst-4-body",
      "<p>When you are ready, please turn off any distractions " +
      "such as music, television, or your cell phone for the duration of the experiment, " +
      "and click below to continue to the familiarization section. Thank you!"
  ),
  newCanvas("inst-4-page", 1500, 300)
    .add(100, 20, newImage("umd_ling.png").size("60%", "auto"))
    .add(0, 130, getText("inst-4-body"))
    .cssContainer(pageCss)
    .print(),
  newText("<p>").print(),
  newButton("CONTINUE").bold().css(buttonCss).print().wait()
);


// BREAK BETWEEN TRIALS
newTrial(
  "break",
  newText(
    "Let's take a short break! Press space key to continue when you are ready."
  )
    .css({ "font-size": headerFontSize })
    .print("center at 50vw", "middle at 40vh"),
  newKey(" ").wait()
);



// EXPERIMENTAL TRIALS
var trial = (label) => (row) => {
  return newTrial(
    label,
    newVar("TrialN", 0)
      .settings.global()
      .set((v) => v + 1)
    ,
    // DIALOGUES
    newText("dia1", "<b>A:</b> " + row.dialog1 + "<br><br>")
    ,
    newText("dia2", "<b>B:</b> " + row.dialog2 + "<br><br>")
    ,
    newText("dia3", "<b>A:</b> " + row.dialog3 + "<br><br>")
    ,
    newTimer("dialogue_timeout", dialogue_timeout).start()
    ,
    newVar("dialogue_RT").global().set( v => Date.now() )
    ,
    getText("dia1").css(dialogCss).print()
    ,
    getText("dia2").css(dialogCss).print()
    ,
    getText("dia3").css(dialogCss).print()
    ,
    newKey("show_answers"," ").callback( getTimer("dialogue_timeout").stop() )
    ,
    getVar("dialogue_RT").set( v => Date.now() - v )
    ,
    getTimer("dialogue_timeout").wait()
    ,
    // ANSWERS
    newTimer("answer_timeout", answer_timeout).start()
    ,
    // PRINT FEEDBACK
    newVar("answer_RT").global().set( v => Date.now() )
    ,
    newText("a1", row.answer1).cssContainer(answerCss)
    ,
    newText("a2", row.answer2).cssContainer(answerCss)
    ,
    newCanvas("answers", 500,100)
        .add("left at 5%", 10, getText("a1"))
        .add("left at 5%", 80, getText("a2"))
        .print()
        .cssContainer(dialogCss)
    ,
    newSelector("comparison")
      .add(getText("a1"), getText("a2"))
      .shuffle()
    //   .keys("F", "J")
      .once()
      .log()
      .callback(getTimer("answer_timeout").stop()),

    // TIMER
    getTimer("answer_timeout").wait()
    ,
    // GET RT
    getVar("answer_RT").set( v => Date.now() - v )
    ,
    getCanvas("answers").remove(),
    getText("dia1").remove()
    ,
    getText("dia2").remove()
    ,
    getText("dia3").remove()
    ,
    getSelector("comparison").remove(),
    // SELECTION PART
    // newText("Press space key to proceed")
    //   .css({ "font-size": proceedFontSize })
    //   .print("center at 50vw", "middle at 40vh"),
    // newKey(" ").wait(),
    getVar("Type").set(row.Type),
    getVar("Group").set(row.Group),
    getVar("Item").set(row.item),
    getVar("Inference").set(row.inference),
    getVar("Answer").set(row.answer),
    getVar("ConditionName").set(row.condition_name),
    getVar("Condition").set("practice"),
    getVar("D1").set(row.dialog1),
    getVar("D2").set(row.dialog2),
    getVar("D3").set(row.dialog3),
    getVar("A1").set(row.answer1),
    getVar("A2").set(row.answer2),
    getVar("DialogueRT").set(getVar("dialogue_RT")),
    getVar("AnswerRT").set(getVar("answer_RT")),
    getVar("TrialNumber").set(getVar("TrialN"))
  );

};


// Filter the table based on the answer condition
Template(GetTable(fname).filter("Type", "exp"),trial("trial"));
Template(GetTable(fname).filter("Type", "filler"),trial("filler"));
Template(GetTable(fname).filter("Type", "check"),trial("check"));

// END OF EXPERIMENT!!!
SendResults("send_results");

newTrial("debrief", exitFullscreen(), newHtml("debrief.html").print().wait());
