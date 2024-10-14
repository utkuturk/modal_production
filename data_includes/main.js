PennController.ResetPrefix(null); // Initiates PennController
PennController.DebugOff(); // turn off debugger
PennController.SetCounter("setcounter");

// IMPORTANT FUNCTIONS
function getRandomStr() {
  const LENGTH = 8;
  const SOURCE = "abcdefghijklmnopqrstuvwxyz";
  let result = "";

  for (let i = 0; i < LENGTH; i++) {
    result += SOURCE[Math.floor(Math.random() * SOURCE.length)];
  }
  return result;
}
// Generate a subject ID
const s = getRandomStr();


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

//Randomly assign the participant to one of the four answer conditions
const answerConditions = ["bare", "haveto", "will", "probably"];
const answerCondition = answerConditions[Math.floor(Math.random() * 4)];
// Transform answerCondition to a text that can be used in the filter function
const answerConditionText = answerConditions[answerCondition];


Sequence(
  "intro",
  "consent",
  "demo",
  "inst-1",
  "inst-2a",
  "inst-4",
  "break",
  sepWithN("break", rshuffle("trial", "filler"), 30),
  "send_results",
  "bye2"
);

/// IMPORTANT VARIABLES
var fname = "example.csv";
var fname_filler = "example.csv";
var hideProgressBar = true;
var headerFontSize = "36";
var bodyFontSize = "22";
var proceedFontSize = "30";
var timeout = 5000;
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
  "border" : "solid 5px grey",
  "margin": "10px"
};

var answerCss = {
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


// Header for the CSV file
Header(
  newVar("subject").global,
  // newVar("id").global(), // This is for Prolific
  newVar("inference_type").global(),
  newVar("item").global(),
  newVar("answer_type").global(),
  newVar("condition_name").global(),
  newVar("condition").global(),
  newVar("answer1").global(),
  newVar("answer2").global(),
  newVar("RT").global(),
  newVar("trialNum").global()
)
  .log("subject", s)
  // .log("id", GetURLParameter("id")) // This is for Prolific
  .log("inference_type", getVar("inference_type"))
  .log("item", getVar("item"))
  .log("answer_type", getVar("answer_type"))
  .log("condition_name", getVar("condition_name"))
  .log("condition", getVar("condition"))
  .log("answer1", getVar("answer1"))
  .log("answer2", getVar("answer2"))
  .log("RT", getVar("RT"))
  .log("trialNum", getVar("trialNum"));

      getVar("RT").set(getVar("RT")),
      getVar("trialNum").set(getVar("TrialN"));


// INTRO

newTrial(
  "intro",
  newText(
    "welcome-body",
    "<center><b>Welcome!</b></center>" +
      "<p>Please read these instruction sections carefully! " +
      "If you fail to understand the task, your data will NOT be usable." +
      "<p>In this experiment, you will be DOING XXX." +
      "<p>This experiment requires your FULL ATTENTION. " +
      "The experiment is reasonably brief. Most people find that the study takes around XXX  minutes. " +
      "During this time, you must give your complete attention." +
      "<p>Before proceeding please make sure:<ol>" +
      "<li>You are using your <b>computer</b>, and not your phone or tablet,</li>" +
      "<li>You are using <b>Google Chrome</b>, and not Safari or Firefox,</li>" +
      "<li>You have a <b>working mouse/trackpad and keyboard</b>,</li>" +
      "<li>You are a native speaker of <b>American English</b>,</li>" +
      "<li>You are <b>older than 18</b> years old,</li>" +
      "<li>This is your <b>first time doing this experiment</b>,</li></ol>"
  ),
  newCanvas("welcome-page", 1500, 550)
    .add(100, 20, newImage("umd_ling.png").size("60%", "auto"))
    .add(0, 120, getText("welcome-body"))
    .cssContainer(pageCss)
    .print(),
  newText("<p>").print(),
  newButton("CONTINUE").bold().css(buttonCss).print().wait()
).setOption("hideProgressBar", true);

newTrial(
  "consent",
  newText(
    "consent-body",
    "<center><b>Consent Form</b></center>" +
      "<p>Please click <a target='_blank' rel='noopener noreferrer' href='XXX'> here</a> to download the consent form for this study. If you read it and agree to participate in this study, click 'I Agree' below. If you do not agree to participate in this study, you can leave this study by closing the tab. You can leave the experiment at any time by closing the tab during the experiment. If you leave the experiment before completion of both parts, you will not be compensated for your time. If you encounter any problems, do not hesitate to reach us either via " +
      // "Prolific or e-mail." +
      "email. " +
      "<br><br><b> Researchers:</b> <br>XXX, PhD Student <i> (XXX@umd.edu)</i>,<br>XXX<br>University of Maryland, Department of Linguistics"
  ),
  newCanvas("consent-page", 1500, 400)
    .add(100, 20, newImage("umd_ling.png").size("60%", "auto"))
    .add(0, 120, getText("consent-body"))
    .cssContainer(pageCss)
    .print(),
  newText("<p>").print(),
  newButton("agree", "I AGREE").bold().css(buttonCss).print().wait()
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
  newCanvas("page2", "500px", 350)
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
    "inst-1-body",
    " <p>Please read this instruction carefully! </p>" +
      "<p>In each trial in this experiment, you will read a conversation between two people." +
      "The final piece of the conversation will be incomplete." +
      "Your task is to <b> complete the conversation by choosing the most natural " +
      "continuation from one of the options presented to you. </b> </p>" +
      "The scenes will be described using 7-word long sentence, " +
      "such as 'The women near the tomato are sunbathing,' or 'the women near the strawberry are sunbathing.' See an example below. </p>" +
      "<p> <i>We understand this is not an easy task. So no need to worry if you are not perfect. </i>" +
      "Click 'Continue' to see the example in action.</p>"
  ),
  newCanvas("inst-1-page", 1500, 570)
    .add(100, 20, newImage("umd_ling.png").size("60%", "auto"))
    .add(0, 120, getText("inst-1-body"))
    .cssContainer(pageCss)
    .print(),
  newText("<p>").print(),
  newButton("CONTINUE").bold().css(buttonCss).print().wait()
);

newTrial(
  "inst-2a",
  newText("inst-2a" + "-ready-title", "READY?")
    .css({ "font-size": headerFontSize, "text-align": "center" })
    .center()
    .bold()
    .print(),
  newText("inst-2a" + "-ready-body", "<br><br>PRESS ANY KEY TO PROCEED")
    .css({ "font-size": bodyFontSize, "text-align": "center" })
    .center()
    .print(),
  newKey("").wait(),
  getText("inst-2a" + "-ready-title").remove(),
  getText("inst-2a" + "-ready-body").remove()
); //! PUT THE EXAMPLE HERE


//! NOW LET'S DO SOME PRACTICES



newTrial(
  "inst-4",
  newText(
    "inst-4-body",
    "<p>Please move to a quiet environment so that there are no background sounds " +
      "(e.g. music, television, voices) that will be picked up in the audio recordings. " +
      "Please also silence computer notifications or use headphones " +
      "(note that there will be audio during the experiment, so please do not mute your computer)." +
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
  newButton("CONTINUE").bold().css(buttonCss).print().wait(),
  fullscreen()
);


// BREAK BETWEEN TRIALS
newTrial(
  "break",
  newText(
    "Let's take a short break! Press any key to continue when you are ready."
  )
    .css({ "font-size": headerFontSize })
    .print("center at 50vw", "middle at 40vh"),
  newKey("anykey58", "").wait()
);



// EXPERIMENTAL TRIALS
var trial = (label) => (row) => {
  return newTrial(
    label,
    // Record the Trial Number
    newVar("TrialN", 0)
      .settings.global()
      .set((v) => v + 1),
    // INTRODUCE ELEMENTS
    // SPEAKER LIST
    // You can introduce them from the csv file as well. row.speaker1 + ": " + row.dialog1bana i, row.speaker2, etc.
    // DIALOGUES
    newText("dia1", "A: " + row.dialog1),
    newText("dia2", "B: " + row.dialog2),
    newText("dia3", "A: " + row.dialog3),
    newText("dia4", "B: " + row.dialog4),

    // ANSWERS
    newText("a1", row.answer1).cssContainer(answerCss),
    newText("a2", row.answer2).cssContainer(answerCss),

    newTimer("timeout", timeout).start(),

    newCanvas("dialogue", 500, 200)
      .add("left at 10%", 10, getText("dia1"))
      .add("left at 10%", 40, getText("dia2"))
      .add("left at 10%", 70, getText("dia3"))
      .add("left at 10%", 100, getText("dia4"))
      .add("left at 65%", 160, getText("a1"))
      .add("left at 25%", 160, getText("a2"))
      .print()
      .center()
      .cssContainer(dialogCss),

    newSelector("comparison")
      .add(getText("a1"), getText("a2"))
      .shuffle()
      .keys("F", "J")
      .once()
      .log()
      .callback(getTimer("timeout").stop()),

    // TIMER
    getTimer("timeout").wait(),

    // GET RT
    getVar("RT").set((v) => Date.now() - v),

    getCanvas("dialogue").remove(),
    getSelector("comparison").remove(),
    // SELECTION PART
    newText("Press any key to proceed")
      .css({ "font-size": proceedFontSize })
      .print("center at 50vw", "middle at 40vh"),
    newKey("").wait(),
    getVar("inference_type").set(row.inference),
    getVar("item").set(row.item),
    getVar("answer_type").set(row.answer),
    getVar("condition_name").set(row.condition_name),
    getVar("condition").set(row.condition),
    getVar("answer1").set(row.answer1),
    getVar("answer2").set(row.answer2),
    getVar("RT").set(getVar("RT")),
    getVar("trialNum").set(getVar("TrialN"))
  );

};


// Filter the table based on the answer condition
Template(
  GetTable(fname)
    .filter("answer", answerCondition)
  ,
  trial("trial")
);

Template(
  GetTable(fname_filler)
  ,
  trial("filler")
);

// END OF EXPERIMENT!!!
SendResults("send_results");

// newTrial("debrief", exitFullscreen(), newHtml("debrief.html").print().wait());

newTrial(
  "bye2",
  exitFullscreen(),
  newText("confirmation", "Thank you for participating in our study!")
    .center()
    .print(),
  newText(".   ") // Adding space for formatting
    .print()
    .color("white"),
  newText(
    "The experiment code is XXXXX  " +
      "Please paste this value into Prolific." +
      "<p>You can also confirm your participation on Prolific by clicking the link below: " +
      "<a href='https://app.prolific.com/submissions/complete?cc=XXXXX'>Confirm your participation.</a>" +
      "<p>When you are finished, you may close this tab."
  )
    .center()
    .bold()
    .print(),
  newTimer("infinite", 1000).wait()
);
