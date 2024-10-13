PennController.ResetPrefix(null); // Initiates PennController
PennController.DebugOff(); // turn off debugger
PennController.SetCounter("setcounter");

Sequence(
  "intro",
  "consent",
  "demo",
  "inst-1",
  "inst-2a",
  "inst-4",
  "break",
  "send_results",
  "bye2"
);

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

/// IMPORTANT VARIABLES
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

newTrial(newButton("Hello World").print().wait());



// END OF EXPERIMENT!!!
SendResults("send_results");

newTrial("debrief", exitFullscreen(), newHtml("debrief.html").print().wait());

newTrial(
  "bye2",
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
