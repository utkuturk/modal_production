PennController.ResetPrefix(null); // Initiates PennController
DebugOff(); // turn off debugger
SetCounter("setcounter");
// Items put in Oct1

const prolificcode = "CPFJYJQT";
var fname = "exp3_haveto_must.csv";
var fname_practice = "practice.csv";

// Header for the CSV file
Header(
  // newVar("subject").global,
  newVar("id").global(), // This is for Prolific
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
  .log("id", GetURLParameter("id")) // This is for Prolific
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
//   randomize("prac-rest"),
  "exp-start",
  sepWithN("break", rshuffle("trial", "filler", "check"), 4),
  "send_results",
  "bye1",
  "bye2"
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
var hideProgressBar = true;
var headerFontSize = "36";
var bodyFontSize = "24px";
var proceedFontSize = "30";
var dialogue_timeout = 120000;
var answer_timeout = 60000;
var dialogFontSize = "24px";

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
  width: "700px",
  "max-width": "700px",
  padding: "1em",
  "box-shadow": "4px 4px 2px #cacfd2",
  border: "1px solid #cacfd2",
  "border-radius": "2em",
};

var textCss = {
  "text-align": "center",
  margin: "0 auto",
  "font-size": dialogFontSize,
  "font-family": "sans-serif",
  // "width": "50em"
};



const speakerpageCss = {
  "font-family": "sans-serif",
  width: "700px",
  "max-width": "700px",
};

const speakerStyle = {
  "font-family": "sans-serif",
  "background-color": "#db8b76",
  color: "white", // White text for better contrast
  "font-size": dialogFontSize,
  padding: "0.25em 0.5em", // Reduced padding (top/bottom, left/right)
  "border-radius": "0.25em",
  margin: "10px auto", // Added margin for spacing and centering
  "text-align": "center",
  border: "none",
  display: "block",
  // width: "700px",
  "max-width": "700px",
};

const speakerdialogCss = {
  "font-size": dialogFontSize,
  "font-family": "sans-serif",
  "background-color": "#fff",
  border: "1px solid #ddd",
  "border-radius": "8px",
  "box-shadow": "2px 2px 5px rgba(0,0,0,0.1)",
  padding: "0.75em", // Reduced padding
  margin: "10px auto",
  "line-height": "1.5",
  width: "700px",
  "max-width": "700px",
};

var answerCss = {
  "box-sizing": "border-box",
  border: "solid 2px #ddd",
  padding: "15px",
  "max-width": "700px",
  "background-color": "#f9f9f9",
  "border-radius": "8px",
  "box-shadow": "2px 2px 5px rgba(0,0,0,0.1)",
  "font-family": "sans-serif",
  "line-height": "1.6",
  ":hover": {
    // Add the hover styles here
    "background-color": "#f2f2f2",
    "box-shadow": "3px 3px 8px rgba(0,0,0,0.15)",
  },
};

var dialogCss = {
  "font-size": dialogFontSize,
  width: "700px",
  "max-width": "700px",
  //   "border" : "solid 5px grey",
  //   "margin": "10px"
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
  ).css(textCss),
  newCanvas("welcome-page", 700, 500)
    .add(100, 20, newImage("umd_ling.png").size("60%", "auto"))
    .add(0, 120, getText("welcome-body"))
    .cssContainer(pageCss)
    .print(),
  newText("<p>").print(),
  newButton("CONTINUE").bold().css(buttonCss).print(),
  newSelector().add(getButton("CONTINUE")).keys(" ").wait()
).setOption("hideProgressBar", true);

newTrial(
  "consent",
  newText(
    "consent-body",
    "<center><b>Consent Form</b></center>" +
      "<p>Please click <a target='_blank' rel='noopener noreferrer' href='irb.pdf'> here</a> to download the consent form for this study. If you read it and agree to participate in this study, click 'I Agree' below. If you do not agree to participate in this study, you can leave this study by closing the tab. You can leave the experiment at any time by closing the tab during the experiment. If you leave the experiment before completion of both parts, you will not be compensated for your time. If you encounter any problems, do not hesitate to reach us either via " +
      // "Prolific or e-mail." +
      "email. " +
      "<br><br><b> Researchers:</b> <br>Sarah Boukendour<sup>*</sup> <i> (sboukend@umd.edu)</i>, Utku Turk<sup>*</sup>, Alexander Williams<sup>*</sup>, Dan Goodhue<sup>&dagger;</sup>, Valentine Hacquard<sup>*</sup> <br><sup>*</sup> University of Maryland, Department of Linguistics <br> <sup>&dagger;</sup>  Leibniz-Centre for General Linguistics (ZAS), Berlin, Germany"
  ).css(textCss),
  newCanvas("consent-page", 1500, 600)
    .add(100, 20, newImage("umd_ling.png").size("60%", "auto"))
    .add(0, 120, getText("consent-body"))
    .cssContainer(pageCss)
    .print(),
  newText("<p>").print(),
  newButton("agree", "I AGREE").bold().css(buttonCss).print(),
  newSelector().add(getButton("agree")).keys(" ").wait()
).setOption("hideProgressBar", true);

newTrial(
  "demo",
  newTextInput("age")
    .before(newText("Age*:").css(textCss).size("17em", "1.5em"))
    .size("17em", "1.5em")
    .lines(1)
    .css(underline_blank)
    .center()
    .log(),
  newTextInput("gender")
    .before(newText("Gender*:").css(textCss).size("17em", "1.5em"))
    .size("17em", "1.5em")
    .lines(1)
    .css(underline_blank)
    .log(),
  newTextInput("geo")
    .before(
      newText("Location (state, country)*:").css(textCss).size("17em", "1.5em")
    )
    .size("17em", "1.5em")
    .lines(1)
    .css(underline_blank)
    .log(),
  newTextInput("comp")
    .before(
      newText("Computer type (e.g. Mac, PC)*:")
        .css(textCss)
        .size("17em", "1.5em")
    )
    .size("17em", "1.5em")
    .lines(1)
    .css(underline_blank)
    .log(),
  newTextInput("language")
    .before(newText("Native language*:").css(textCss).size("17em", "1.5em"))
    .size("17em", "1.5em")
    .lines(1)
    .css(underline_blank)
    .log(),
  newTextInput("otherlg")
    .before(
      newText("Other languages you speak (please list):")
        .css(textCss)
        .size("17em", "1.5em")
    )
    .size("17em", "1.5em")
    .lines(1)
    .css(underline_blank)
    .log(),
  newCanvas("page2", 1500, 450)
    .add(100, 20, newImage("umdling2", "umd_ling.png").size("60%", "auto"))
    .add(
      0,
      130,
      newText(
        "Make sure that you entered all the information below. Obligatory ones are marked with *."
      ).css(textCss)
    )
    .add(0, 190, getTextInput("age"))
    .add(0, 230, getTextInput("gender"))
    .add(0, 270, getTextInput("geo"))
    .add(0, 310, getTextInput("comp"))
    .add(0, 350, getTextInput("language"))
    .add(0, 390, getTextInput("otherlg"))
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
      "<p>In each trial in this experiment, you will see dialogues like the one on the next page. Your task is to read the dialogue carefully and choose the best completion.</p>" +
      "<p>You’ll be presented with the dialogue first. <b>You will have 15 seconds to read the dialogue.</b></p>"
  ).css(textCss),
  newText(
    "inst-1b-body",
    "<p><b>Speaker A:</b> Whenever it’s foggy in the morning, flights from Oliver Municipal Airport are delayed.</p>" +
      "<p><b>Speaker B:</b> I just heard from a friend at Oliver, and she said it was foggy early today.</p>" +
      "<p><b>Speaker A:</b> Well, if it was foggy this morning...</p>" +
      "<div class='box'>Then, you’ll need to press <b>SPACE</b> to see the possible continuations.</div>"
  ),
  newText(
    "inst-1c-body",
    "<p>...the flights from Oliver Airport might have been delayed.</p>" +
      "<p>...the flights from Oliver Airport must have been delayed.</p>" +
      "<div class='box'>Please pick your answers intuitively—these are not trick questions. Follow your gut instinct and go with the first answer that comes to mind. Try not to overthink it. </div>" +
      "<p>Let’s go through an example. Some examples you encounter during the experiment might feel obvious to you..."
  ),
  newCanvas("inst-1-page", 1500, 400)
    .add(100, 20, newImage("umd_ling.png").size("60%", "auto"))
    .add(0, 120, getText("inst-1a-body"))
    .cssContainer(pageCss)
    .print(),
  newText("<p>").print(),
  newButton("c1", "CONTINUE").bold().css(buttonCss).print(),
  newSelector().add(getButton("c1")).keys(" ").wait(),
  getCanvas("inst-1-page").remove(),
  getButton("c1").remove(),
  getText("inst-1b-body").css({ "font-size": dialogFontSize }).print(),
  newText("<p>").print(),
  newButton("c2", "CONTINUE").bold().css(buttonCss).print(),
  newSelector().add(getButton("c2")).keys(" ").wait(),
  getText("inst-1b-body").remove(),
  getButton("c2").remove(),
  getText("inst-1c-body").css({ "font-size": dialogFontSize }).print(),
  newText("<p>").print(),
  newButton("c3", "CONTINUE").bold().css(buttonCss).print(),
  newSelector().add(getButton("c3")).keys(" ").wait()
);


var trial_inst = (label) => (row) => {
  return newTrial(
    label,
    // Record the Trial Number
    newVar("TrialN", 0)
      .settings.global()
      .set((v) => v + 1),
    // INTRODUCE ELEMENTS
    // SPEAKER LIST
    // DIALOGUES
    newText("sA1", "<b>Speaker A:</b> "),
    newText("sA2", "<b>Speaker B:</b> "),
    newText("sA3", "<b>Speaker A:</b> "),
    newText("dia1", row.dialog1 ),
    newText("dia2", row.dialog2 ),
    newText("dia3", row.dialog3 ),
    newTimer("dialogue_timeout", dialogue_timeout).start(),
    newVar("dialogue_RT")
      .global()
      .set((v) => Date.now()),
    newCanvas("dialogue", 1500, 300)
      .add("left at 1%", 10, getText("sA1").css(speakerStyle))
      .add("left at 23%", 10, getText("dia1").css(speakerdialogCss))
      .add("left at 1%", 130, getText("sA2").css(speakerStyle))
      .add("left at 23%", 130, getText("dia2").css(speakerdialogCss))
      .add("left at 1%", 250, getText("sA3").css(speakerStyle))
      .add("left at 23%", 250, getText("dia3").css(speakerdialogCss))
      // .css({ width: "100px", "max-width": "1000px" })
      .css(speakerpageCss)
      .print(),
    newKey("show_answers", " ").callback(getTimer("dialogue_timeout").stop()),
    getVar("dialogue_RT").set((v) => Date.now() - v),
    getTimer("dialogue_timeout").wait(),

    // ANSWERS
    newTimer("answer_timeout", answer_timeout).start(),
    // PRINT FEEDBACK
    newVar("answer_RT")
      .global()
      .set((v) => Date.now()),
    newText("a1", row.answer1).cssContainer(answerCss),
    newText("a2", row.answer2).cssContainer(answerCss),
    newCanvas("answers", 1500, 120)
      .add("left at 5%", 50, getText("a1"))
      .add("left at 5%", 160, getText("a2"))
      .print()
      .cssContainer(dialogCss),
    newSelector("comparison")
      .add(getText("a1"), getText("a2"))
      .shuffle()
      //   .keys("F", "J")
      .once()
      .log()
      .callback(getTimer("answer_timeout").stop()),

    // TIMER
    getTimer("answer_timeout").wait(),
    // GET RT
    getVar("answer_RT").set((v) => Date.now() - v),
    getCanvas("answers").remove(),
    getText("dia1").remove(),
    getText("dia2").remove(),
    getText("dia3").remove(),
    getSelector("comparison").remove(),

    // RECORD STUFF

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

Template(
  GetTable(fname_practice).filter("condition_name", "obvious_example"),
  trial_inst("inst-3")
);

newTrial(
  "inst-4",
  newText(
    "Others may not feel so obvious to you, but you’ll still need to choose what you feel is the best option out of the two provided."
  ).css(textCss).print(),
  newText("<p>").print(),
  newButton("see", "See an example").bold().css(buttonCss).print(),
  newSelector().add(getButton("see")).keys(" ").wait()
);

Template(
  GetTable(fname_practice).filter("condition_name", "negobvious_example"),
  trial_inst("inst-5")
);

// newTrial(
//   "inst-6",
//   newText(
//     "Got it? Now let’s move on to a few more practice items to help you adjust to the task."
//   ).css(textCss).print(),
//   newText("<p>").print(),
//   newButton("see", "See an example").bold().css(buttonCss).print(),
//   newSelector().add(getButton("see")).keys(" ").wait()
// );

// Template(
//   GetTable(fname_practice).filter("condition_name", /practice/),
//   trial_inst("prac-rest")
// );

newTrial(
  "exp-start",
  fullscreen(),
  newText(
    "inst-4-body",
    "<p>When you are ready, please turn off any distractions " +
      "such as music, television, or your cell phone for the duration of the experiment, " +
      "and click below to continue to the experiment. Thank you!"
  ).css(textCss),
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
      .set((v) => v + 1),
    // DIALOGUES
    newText("sA1", "<b>Speaker A:</b> "),
    newText("sA2", "<b>Speaker B:</b> "),
    newText("sA3", "<b>Speaker A:</b> "),
    newText("dia1", row.dialog1),
    newText("dia2", row.dialog2),
    newText("dia3", row.dialog3),
    newTimer("dialogue_timeout", dialogue_timeout).start(),
    newVar("dialogue_RT")
      .global()
      .set((v) => Date.now()),
    newCanvas("dialogue", 1500, 300)
      .add("left at 1%", 10, getText("sA1").css(speakerStyle))
      .add("left at 23%", 10, getText("dia1").css(speakerdialogCss))
      .add("left at 1%", 130, getText("sA2").css(speakerStyle))
      .add("left at 23%", 130, getText("dia2").css(speakerdialogCss))
      .add("left at 1%", 250, getText("sA3").css(speakerStyle))
      .add("left at 23%", 250, getText("dia3").css(speakerdialogCss))
      .css(speakerpageCss)
      .print(),
    newKey("show_answers", " ").callback(getTimer("dialogue_timeout").stop()),
    getVar("dialogue_RT").set((v) => Date.now() - v),
    getTimer("dialogue_timeout").wait(),
    // ANSWERS
    newTimer("answer_timeout", answer_timeout).start(),
    // PRINT FEEDBACK
    newVar("answer_RT")
      .global()
      .set((v) => Date.now()),
    newText("a1", row.answer1).cssContainer(answerCss),
    newText("a2", row.answer2).cssContainer(answerCss),
    newCanvas("answers", 1500, 120)
      .add("left at 5%", 50, getText("a1"))
      .add("left at 5%", 160, getText("a2"))
      .print()
      .cssContainer(dialogCss),
    newSelector("comparison")
      .add(getText("a1"), getText("a2"))
      .shuffle()
      //   .keys("F", "J")
      .once()
      .log()
      .callback(getTimer("answer_timeout").stop()),

    // TIMER
    getTimer("answer_timeout").wait(),
    // GET RT
    getVar("answer_RT").set((v) => Date.now() - v),
    getCanvas("answers").remove(),
    getText("dia1").remove(),
    getText("dia2").remove(),
    getText("dia3").remove(),
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
Template(GetTable(fname).filter("Type", "exp"), trial("trial"));
Template(GetTable(fname).filter("Type", "filler"), trial("filler"));
Template(GetTable(fname).filter("Type", "check"), trial("check"));

// END OF EXPERIMENT!!!
SendResults("send_results");

newTrial(
  "bye1",
  newText(
    "<p>This is the end of the experiment.Thank you for participating! " +
      "<p>Click 'See the Code' button to receive a PROLIFIC code."
  )
    .center()
    .print(),
  newButton("See the Code")
    .center()
    .settings.css("margin", "40px")
    .print()
    .wait()
);

newTrial(
  "bye2",
  newText("confirmation", "Thank you for participating in our study!")
    .center()
    .print(),
  newText(".   ") // Adding space for formatting
    .print()
    .color("white"),
  newText(
    "The experiment code is " +  prolificcode + " ." +
      "Please paste this value into Prolific." +
      "<p>You can also confirm your participation on Prolific by clicking the link below: " +
      "<a href='https://app.prolific.com/submissions/complete?cc=" +  prolificcode + "'>Confirm your participation.</a>" +
      "<p>When you are finished, you may close this tab."
  )
    .center()
    .bold()
    .print(),
  newTimer("infinite", 1000).wait()
);
